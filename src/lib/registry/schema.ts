import { z } from "zod";

export const ReliabilityLevelSchema = z.enum(["high", "medium", "low"]);
export const RiskLevelSchema = z.enum(["low", "medium", "high"]);

export const SkillFieldSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  required: z.boolean().default(false)
});

export const IncludedAssetSchema = z.object({
  type: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1)
});

export const ExampleRunSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  inputPreview: z.string().min(1),
  outputPreview: z.string().min(1),
  validated: z.boolean()
});

export const ChangelogEntrySchema = z.object({
  version: z.string().min(1),
  date: z.string().datetime(),
  summary: z.string().min(1)
});

export const SkillSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  category: z.string().min(1),
  categoryLabel: z.string().min(1),
  tags: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  reliabilityLevel: ReliabilityLevelSchema,
  verificationTypes: z.array(z.string().min(1)).min(1),
  riskLevel: RiskLevelSchema,
  version: z.string().min(1),
  author: z.string().min(1),
  sourceUrl: z.string().url(),
  downloadUrl: z.string().url(),
  docsUrl: z.string().url(),
  inputs: z.array(SkillFieldSchema).default([]),
  outputs: z.array(SkillFieldSchema).default([]),
  includedAssets: z.array(IncludedAssetSchema).default([]),
  idealUseCases: z.array(z.string()).default([]),
  failureModes: z.array(z.string()).default([]),
  examples: z.array(ExampleRunSchema).default([]),
  changelog: z.array(ChangelogEntrySchema).default([]),
  downloads: z.number().int().nonnegative().default(0),
  updatedAt: z.string().datetime()
});

export const SkillsRegistrySchema = z.object({
  generatedAt: z.string().datetime(),
  skills: z.array(SkillSchema)
});

export type Skill = z.infer<typeof SkillSchema>;
export type SkillsRegistry = z.infer<typeof SkillsRegistrySchema>;
