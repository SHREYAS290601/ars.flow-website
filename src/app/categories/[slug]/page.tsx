import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistryError } from "@/components/registry-error";
import { SkillCard } from "@/components/skill-card";
import { loadRegistry } from "@/lib/registry/load-registry";

type CategoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const registryResult = await loadRegistry();

  if (!registryResult.ok) {
    return <RegistryError error={registryResult.error} />;
  }

  const { slug } = await params;
  const skills = registryResult.registry.skills.filter((skill) => skill.category === slug);

  if (skills.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-10">
      <section>
        <Link href="/categories" className="text-sm text-primary hover:opacity-80">
          ← Back to categories
        </Link>
        <h1 className="mt-3 font-[var(--font-heading)] text-4xl font-semibold text-text">{skills[0].categoryLabel}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Skills in this category focus on {skills[0].categoryLabel.toLowerCase()} workflows with explicit verification and
          risk surfacing.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </section>
    </div>
  );
}
