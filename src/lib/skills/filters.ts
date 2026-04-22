import type { Skill } from "@/lib/registry/schema";

export type SkillSort = "newest" | "mostVerified" | "mostDownloaded";

export type SkillQuery = {
  q?: string;
  category?: string;
  language?: string;
  framework?: string;
  reliability?: string;
  verification?: string;
  sort?: SkillSort;
};

export function parseSingleParam(value?: string | string[]): string | undefined {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
}

export function parseSkillQuery(
  searchParams: Record<string, string | string[] | undefined>
): SkillQuery {
  const sort = parseSingleParam(searchParams.sort);

  return {
    q: parseSingleParam(searchParams.q)?.trim(),
    category: parseSingleParam(searchParams.category),
    language: parseSingleParam(searchParams.language),
    framework: parseSingleParam(searchParams.framework),
    reliability: parseSingleParam(searchParams.reliability),
    verification: parseSingleParam(searchParams.verification),
    sort: isSort(sort) ? sort : "newest"
  };
}

function isSort(value?: string): value is SkillSort {
  return value === "newest" || value === "mostVerified" || value === "mostDownloaded";
}

function searchableText(skill: Skill): string {
  return [
    skill.name,
    skill.shortDescription,
    skill.longDescription,
    skill.tags.join(" "),
    skill.verificationTypes.join(" "),
    skill.categoryLabel
  ]
    .join(" ")
    .toLowerCase();
}

function verificationScore(skill: Skill): number {
  const reliabilityWeight =
    skill.reliabilityLevel === "high" ? 30 : skill.reliabilityLevel === "medium" ? 20 : 10;

  return reliabilityWeight + skill.verificationTypes.length * 3;
}

export function filterSkills(skills: Skill[], query: SkillQuery): Skill[] {
  return skills.filter((skill) => {
    if (query.q && !searchableText(skill).includes(query.q.toLowerCase())) {
      return false;
    }

    if (query.category && skill.category !== query.category) {
      return false;
    }

    if (query.language && !skill.languages.includes(query.language)) {
      return false;
    }

    if (query.framework && !skill.frameworks.includes(query.framework)) {
      return false;
    }

    if (query.reliability && skill.reliabilityLevel !== query.reliability) {
      return false;
    }

    if (query.verification && !skill.verificationTypes.includes(query.verification)) {
      return false;
    }

    return true;
  });
}

export function sortSkills(skills: Skill[], sort: SkillSort = "newest"): Skill[] {
  const sorted = [...skills];

  sorted.sort((left, right) => {
    if (sort === "mostDownloaded") {
      return right.downloads - left.downloads;
    }

    if (sort === "mostVerified") {
      return verificationScore(right) - verificationScore(left);
    }

    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });

  return sorted;
}

export function deriveFilterOptions(skills: Skill[]) {
  const categories = new Map<string, string>();
  const languages = new Set<string>();
  const frameworks = new Set<string>();
  const verificationTypes = new Set<string>();

  for (const skill of skills) {
    categories.set(skill.category, skill.categoryLabel);

    for (const language of skill.languages) {
      languages.add(language);
    }

    for (const framework of skill.frameworks) {
      frameworks.add(framework);
    }

    for (const verificationType of skill.verificationTypes) {
      verificationTypes.add(verificationType);
    }
  }

  return {
    categories: [...categories.entries()].map(([value, label]) => ({ value, label })),
    languages: [...languages].sort(),
    frameworks: [...frameworks].sort(),
    verificationTypes: [...verificationTypes].sort()
  };
}

export function formatRelativeRisk(risk: Skill["riskLevel"]): string {
  if (risk === "high") {
    return "High-Risk Workflow";
  }

  if (risk === "medium") {
    return "Moderate-Risk Workflow";
  }

  return "Low-Risk Workflow";
}
