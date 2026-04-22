import Link from "next/link";
import { RegistryError } from "@/components/registry-error";
import { Card } from "@/components/ui/card";
import { loadRegistry } from "@/lib/registry/load-registry";
import { buildCategorySummaries } from "@/lib/skills/categories";

export default async function CategoriesPage() {
  const registryResult = await loadRegistry();

  if (!registryResult.ok) {
    return <RegistryError error={registryResult.error} />;
  }

  const categories = buildCategorySummaries(registryResult.registry.skills);

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-text">Skill Categories</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Categories represent repeatable workflow classes where deterministic checks improve reliability over plain prompts.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.slug} className="transition hover:-translate-y-0.5 hover:border-primary">
            <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">
              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            </h2>
            <p className="mt-3 text-sm text-muted">{category.count} published skills</p>
            <Link href={`/categories/${category.slug}`} className="mt-4 inline-flex text-sm font-medium text-primary hover:opacity-80">
              Explore category
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
