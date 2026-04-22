import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import JSZip from "jszip";
import { loadRegistry } from "@/lib/registry/load-registry";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

type GitHubTreeRef = {
  owner: string;
  repo: string;
  branch: string;
  path: string;
};

type GitHubContentEntry = {
  type: string;
  path: string;
  name: string;
  download_url: string | null;
};

type BundleFile = {
  bundlePath: string;
  downloadUrl: string;
};

function parseGitHubTreeUrl(sourceUrl: string): GitHubTreeRef | null {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch {
    return null;
  }

  if (parsedUrl.hostname !== "github.com") {
    return null;
  }

  const match = parsedUrl.pathname.match(/^\/([^/]+)\/([^/]+)\/tree\/([^/]+)\/(.+)$/);
  if (!match) {
    return null;
  }

  const [, owner, repo, branch, path] = match;
  return {
    owner: decodeURIComponent(owner),
    repo: decodeURIComponent(repo),
    branch: decodeURIComponent(branch),
    path: decodeURIComponent(path)
  };
}

async function fetchDirectoryEntries(ref: GitHubTreeRef, dirPath: string): Promise<GitHubContentEntry[]> {
  const encodedPath = dirPath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(ref.owner)}/${encodeURIComponent(ref.repo)}/contents/${encodedPath}?ref=${encodeURIComponent(ref.branch)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "arsflow-skills-platform"
      },
      next: { revalidate: 300 }
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub directory request failed (${response.status}) for ${dirPath}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected GitHub contents response for ${dirPath}`);
  }

  return data as GitHubContentEntry[];
}

async function collectBundleFiles(ref: GitHubTreeRef, rootPath: string, currentPath: string): Promise<BundleFile[]> {
  const entries = await fetchDirectoryEntries(ref, currentPath);
  const files: BundleFile[] = [];

  for (const entry of entries) {
    if (entry.type === "dir") {
      const nested = await collectBundleFiles(ref, rootPath, entry.path);
      files.push(...nested);
      continue;
    }

    if (entry.type === "file" && entry.download_url) {
      const bundlePath = entry.path.startsWith(`${rootPath}/`) ? entry.path.slice(rootPath.length + 1) : entry.name;
      files.push({
        bundlePath,
        downloadUrl: entry.download_url
      });
    }
  }

  return files;
}

async function buildSkillZip(ref: GitHubTreeRef): Promise<Uint8Array> {
  const files = await collectBundleFiles(ref, ref.path, ref.path);
  if (files.length === 0) {
    throw new Error("No files found to bundle.");
  }

  const zip = new JSZip();
  for (const file of files.sort((left, right) => left.bundlePath.localeCompare(right.bundlePath))) {
    const response = await fetch(file.downloadUrl, { next: { revalidate: 300 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch file for zip: ${file.bundlePath}`);
    }

    const bytes = new Uint8Array(await response.arrayBuffer());
    zip.file(file.bundlePath, bytes);
  }

  return zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 9 }
  });
}

function buildMarkdownSummaryResponse(skill: {
  name: string;
  version: string;
  categoryLabel: string;
  reliabilityLevel: string;
  riskLevel: string;
  longDescription: string;
  verificationTypes: string[];
  failureModes: string[];
  examples: Array<{ title: string; summary: string }>;
  slug: string;
}) {
  const lines = [
    `# ${skill.name}`,
    "",
    `Version: ${skill.version}`,
    `Category: ${skill.categoryLabel}`,
    `Reliability: ${skill.reliabilityLevel}`,
    `Risk: ${skill.riskLevel}`,
    "",
    "## Summary",
    skill.longDescription,
    "",
    "## Verification Types",
    ...skill.verificationTypes.map((item) => `- ${item}`),
    "",
    "## Failure Modes",
    ...skill.failureModes.map((item) => `- ${item}`),
    "",
    "## Examples",
    ...skill.examples.map((example) => `- ${example.title}: ${example.summary}`),
    ""
  ];

  const body = lines.join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${skill.slug}-bundle.md"`
    }
  });
}

export async function GET(_: Request, { params }: RouteProps) {
  const registryResult = await loadRegistry();
  if (!registryResult.ok) {
    return new NextResponse("Registry unavailable", { status: 503 });
  }

  const { slug } = await params;
  const skill = registryResult.registry.skills.find((entry) => entry.slug === slug);
  if (!skill) {
    return new NextResponse("Skill not found", { status: 404 });
  }

  const gitHubRef = parseGitHubTreeUrl(skill.sourceUrl);
  if (!gitHubRef) {
    if (skill.downloadUrl.includes(`/api/download/${skill.slug}`)) {
      return buildMarkdownSummaryResponse(skill);
    }

    return NextResponse.redirect(skill.downloadUrl, { status: 302 });
  }

  try {
    const zipBytes = await buildSkillZip(gitHubRef);
    const zipBuffer = Buffer.from(zipBytes);
    const zipBlob = new Blob([zipBuffer], { type: "application/zip" });
    return new NextResponse(zipBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${skill.slug}.zip"`
      }
    });
  } catch (error) {
    console.error("Skill zip download failed:", error);
    return new NextResponse("Unable to build skill zip from source repository.", { status: 502 });
  }
}
