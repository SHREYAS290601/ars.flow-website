import Link from "next/link";
import { RegistryError } from "@/components/registry-error";
import { SkillCard } from "@/components/skill-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { loadRegistry } from "@/lib/registry/load-registry";
import { buildCategorySummaries } from "@/lib/skills/categories";
import { sortSkills } from "@/lib/skills/filters";

const pillars = [
  {
    title: "Technology",
    body: "Model guidance plus deterministic checks, with clear validation outputs for every skill run."
  },
  {
    title: "Efficiency",
    body: "Reusable workflows reduce re-prompting, context drift, and review overhead for recurring tasks."
  },
  {
    title: "Reliability",
    body: "Risk levels, verification methods, failure modes, and examples are explicit on every skill card."
  }
];

export default async function HomePage() {
  const registryResult = await loadRegistry();

  if (!registryResult.ok) {
    return <RegistryError error={registryResult.error} />;
  }

  const { skills } = registryResult.registry;
  const newest = sortSkills(skills, "newest").slice(0, 6);
  const categories = buildCategorySummaries(skills).slice(0, 6);

  return (
    <div className="space-y-24 pb-8">
      <section
        id="hero"
        className="relative overflow-hidden rounded-[2rem] border border-panelBorder bg-white/62 px-8 py-14 backdrop-blur-[2px] md:px-12 md:py-20 dark:bg-[#060b14]/58"
      >
        <div className="relative grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <Badge className="border-panelBorder bg-panel/95 text-text dark:text-white">Verification-first skill infrastructure</Badge>
            <h1 className="mt-5 max-w-3xl font-[var(--font-heading)] text-4xl font-semibold leading-[1.05] text-text md:text-6xl dark:text-white">
              <span className="block">ARS.FLOW</span>
              <span className="mt-2 block text-balance text-3xl md:text-5xl">for repeatable AI engineering workflows.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg dark:text-[#d2dde7]">
              Inspired by industrial product storytelling: precise system messaging, high-contrast visuals, and clear trust
              signals. ARS.FLOW makes skills inspectable and production-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/skills"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
              >
                Explore skills
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-panelBorder bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-text transition hover:border-accent dark:bg-black/30 dark:text-white"
              >
                Trust model
              </Link>
            </div>
          </div>

          <Card className="bg-white/70 backdrop-blur-md dark:bg-black/35">
            <p className="text-xs uppercase tracking-[0.1em] text-muted dark:text-[#b8c6d6]">Registry snapshot</p>
            <dl className="mt-5 grid grid-cols-2 gap-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted dark:text-[#9fb1c4]">Published skills</dt>
                <dd className="mt-2 text-3xl font-semibold text-text dark:text-white">{skills.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted dark:text-[#9fb1c4]">Categories</dt>
                <dd className="mt-2 text-3xl font-semibold text-text dark:text-white">{categories.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted dark:text-[#9fb1c4]">High reliability</dt>
                <dd className="mt-2 text-3xl font-semibold text-text dark:text-white">{skills.filter((s) => s.reliabilityLevel === "high").length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted dark:text-[#9fb1c4]">Validated examples</dt>
                <dd className="mt-2 text-3xl font-semibold text-text dark:text-white">
                  {skills.reduce((count, s) => count + s.examples.filter((e) => e.validated).length, 0)}
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </section>

      <section id="pillars" className="space-y-6">
        <div>
          <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-text md:text-4xl">Built like a systems product, not a prompt gallery</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="bg-panel/75">
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-text">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="newest" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-text">Latest skills</h2>
            <p className="mt-2 text-sm text-muted">Newly updated entries from the validated registry.</p>
          </div>
          <Link href="/skills?sort=newest" className="text-sm font-medium text-primary transition hover:opacity-80">
            Sort by newest
          </Link>
        </div>

        <div className="latest-skills-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {newest.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      <section id="categories" className="space-y-6">
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-text">Categories built for repeatable execution</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.slug} className="transition hover:-translate-y-0.5 hover:border-primary">
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-text">
                <Link href={`/categories/${category.slug}`}>{category.name}</Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{category.count} skills currently published in this category.</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-[#93aab8] bg-[#f3f8fb] p-8 shadow-sm dark:border-[#31465d] dark:bg-[#101a2a] md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-muted">Trust model</p>
          <p className="mt-2 text-sm leading-relaxed text-text">Every skill exposes checks, risk level, and failure modes.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-muted">Preview model</p>
          <p className="mt-2 text-sm leading-relaxed text-text">v1 runs static validated examples without arbitrary code execution.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-muted">Source model</p>
          <p className="mt-2 text-sm leading-relaxed text-text">Skill metadata is read from a generated registry, not hardcoded pages.</p>
        </div>
      </section>
    </div>
  );
}
