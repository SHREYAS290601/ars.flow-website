import type { Skill } from "@/lib/registry/schema";

export type CategorySummary = {
  slug: string;
  name: string;
  count: number;
};

export function buildCategorySummaries(skills: Skill[]): CategorySummary[] {
  const counts = new Map<string, CategorySummary>();

  for (const skill of skills) {
    const existing = counts.get(skill.category);

    if (existing) {
      existing.count += 1;
      continue;
    }

    counts.set(skill.category, {
      slug: skill.category,
      name: skill.categoryLabel,
      count: 1
    });
  }

  return [...counts.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
}

const categoryBadgeClassMap: Record<string, string> = {
  "test-first": "border-[#62c68c] bg-[#62c68c]/16 dark:border-[#79dca1] dark:bg-[#79dca1]/14",
  migrations: "border-[#52b3a6] bg-[#52b3a6]/16 dark:border-[#67cabc] dark:bg-[#67cabc]/14",
  "pr-risk": "border-[#d3a15a] bg-[#d3a15a]/16 dark:border-[#e3b878] dark:bg-[#e3b878]/14",
  "debug-triage": "border-[#5ea4d4] bg-[#5ea4d4]/16 dark:border-[#79bce9] dark:bg-[#79bce9]/14",
  "etl-validation": "border-[#7f90d6] bg-[#7f90d6]/16 dark:border-[#97a7ea] dark:bg-[#97a7ea]/14",
  "repo-workflows": "border-[#8fa7b7] bg-[#8fa7b7]/16 dark:border-[#a6bfce] dark:bg-[#a6bfce]/14",
  "security-review": "border-[#d06c7f] bg-[#d06c7f]/16 dark:border-[#e48ba0] dark:bg-[#e48ba0]/14",
  "structured-output": "border-[#58b8cb] bg-[#58b8cb]/16 dark:border-[#72cee0] dark:bg-[#72cee0]/14"
};

export function getCategoryBadgeClass(category: string): string {
  return categoryBadgeClassMap[category] ?? "border-[#62c68c] bg-[#62c68c]/16 dark:border-[#79dca1] dark:bg-[#79dca1]/14";
}
