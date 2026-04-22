import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { SkillsRegistrySchema, type SkillsRegistry } from "@/lib/registry/schema";

const LOCAL_REGISTRY_PATH = path.join(process.cwd(), "public/registry/skills.json");

export type RegistryLoadResult =
  | { ok: true; registry: SkillsRegistry; source: "local" | "remote" }
  | { ok: false; error: string };

async function fetchRemoteRegistry(url: string): Promise<unknown> {
  const response = await fetch(url, {
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Remote registry request failed with status ${response.status}`);
  }

  return response.json();
}

async function readLocalRegistry(): Promise<unknown> {
  const file = await fs.readFile(LOCAL_REGISTRY_PATH, "utf8");
  return JSON.parse(file);
}

export const loadRegistry = cache(async (): Promise<RegistryLoadResult> => {
  try {
    const remoteUrl = process.env.SKILLS_REGISTRY_URL;
    const rawData = remoteUrl ? await fetchRemoteRegistry(remoteUrl) : await readLocalRegistry();
    const registry = SkillsRegistrySchema.parse(rawData);

    return {
      ok: true,
      registry,
      source: remoteUrl ? "remote" : "local"
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown registry load failure";
    return {
      ok: false,
      error: `Unable to load skills registry. ${message}`
    };
  }
});
