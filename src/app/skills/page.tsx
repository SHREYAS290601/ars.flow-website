import { RegistryError } from "@/components/registry-error";
import { SkillCard } from "@/components/skill-card";
import { SkillsFilterForm } from "@/components/skills-filter-form";
import { loadRegistry } from "@/lib/registry/load-registry";
import { deriveFilterOptions, filterSkills, parseSkillQuery, sortSkills } from "@/lib/skills/filters";

type SkillsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  const registryResult = await loadRegistry();

  if (!registryResult.ok) {
    return <RegistryError error={registryResult.error} />;
  }

  const params = await searchParams;
  const query = parseSkillQuery(params);
  const options = deriveFilterOptions(registryResult.registry.skills);
  const filtered = filterSkills(registryResult.registry.skills, query);
  const sorted = sortSkills(filtered, query.sort);

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-text">Skills Directory</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Filter by workflow category, stack context, reliability level, and verification method. URL params are shareable
          so teams can align on vetted subsets.
        </p>
      </section>

      <SkillsFilterForm query={query} options={options} />

      <section>
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-text">{sorted.length}</span> skills
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {sorted.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-panelBorder bg-panel p-6 text-sm text-muted">
            No skills match this filter set. Try removing one or more filters.
          </div>
        ) : null}
      </section>
    </div>
  );
}
