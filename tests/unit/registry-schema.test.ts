import fs from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SkillsRegistrySchema } from "@/lib/registry/schema";

describe("Skills registry schema", () => {
  it("parses the local registry fixture", async () => {
    const filePath = path.join(process.cwd(), "public/registry/skills.json");
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = SkillsRegistrySchema.parse(JSON.parse(raw));

    expect(parsed.skills.length).toBeGreaterThanOrEqual(8);
    expect(parsed.skills.some((skill) => skill.slug === "json-schema-enforcer")).toBe(true);
  });

  it("fails on malformed registry", () => {
    expect(() =>
      SkillsRegistrySchema.parse({
        generatedAt: "not-a-date",
        skills: []
      })
    ).toThrow();
  });
});
