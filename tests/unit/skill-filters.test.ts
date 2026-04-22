import { describe, expect, it } from "vitest";
import { filterSkills, parseSkillQuery, sortSkills } from "@/lib/skills/filters";
import type { Skill } from "@/lib/registry/schema";

const skills: Skill[] = [
  {
    id: "1",
    slug: "a",
    name: "Schema Guard",
    shortDescription: "strict schema checks",
    longDescription: "long",
    category: "structured-output",
    categoryLabel: "Structured Output",
    tags: ["json"],
    languages: ["TypeScript"],
    frameworks: ["Zod"],
    reliabilityLevel: "high",
    verificationTypes: ["schema validation", "unit tests"],
    riskLevel: "low",
    version: "1.0.0",
    author: "a",
    sourceUrl: "https://example.com/source",
    downloadUrl: "https://example.com/download",
    docsUrl: "https://example.com/docs",
    inputs: [],
    outputs: [],
    includedAssets: [],
    idealUseCases: [],
    failureModes: [],
    examples: [],
    changelog: [],
    downloads: 10,
    updatedAt: "2026-04-20T00:00:00.000Z"
  },
  {
    id: "2",
    slug: "b",
    name: "Incident Triage",
    shortDescription: "log triage",
    longDescription: "long",
    category: "debug-triage",
    categoryLabel: "Debugging",
    tags: ["incident"],
    languages: ["Python"],
    frameworks: ["Kubernetes"],
    reliabilityLevel: "medium",
    verificationTypes: ["manual review required"],
    riskLevel: "high",
    version: "1.0.0",
    author: "b",
    sourceUrl: "https://example.com/source2",
    downloadUrl: "https://example.com/download2",
    docsUrl: "https://example.com/docs2",
    inputs: [],
    outputs: [],
    includedAssets: [],
    idealUseCases: [],
    failureModes: [],
    examples: [],
    changelog: [],
    downloads: 30,
    updatedAt: "2026-03-20T00:00:00.000Z"
  }
];

describe("skill filters", () => {
  it("parses query params with default sort", () => {
    const query = parseSkillQuery({ q: "schema", category: "structured-output" });

    expect(query.sort).toBe("newest");
    expect(query.q).toBe("schema");
  });

  it("filters by query and category", () => {
    const filtered = filterSkills(skills, {
      q: "schema",
      category: "structured-output"
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.slug).toBe("a");
  });

  it("sorts by downloads", () => {
    const sorted = sortSkills(skills, "mostDownloaded");

    expect(sorted[0]?.slug).toBe("b");
  });
});
