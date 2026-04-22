import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistryError } from "@/components/registry-error";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { loadRegistry } from "@/lib/registry/load-registry";
import { getCategoryBadgeClass } from "@/lib/skills/categories";
import { formatDate, formatReliability } from "@/lib/skills/formatters";
import { formatRelativeRisk } from "@/lib/skills/filters";

type SkillDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const registryResult = await loadRegistry();

  if (!registryResult.ok) {
    return <RegistryError error={registryResult.error} />;
  }

  const { slug } = await params;
  const skill = registryResult.registry.skills.find((entry) => entry.slug === slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="space-y-4">
        <Link href="/skills" className="text-sm text-primary hover:opacity-80">
          ← Back to skills
        </Link>
        <div className="flex flex-wrap gap-2">
          <Badge className={getCategoryBadgeClass(skill.category)}>{skill.categoryLabel}</Badge>
          <Badge>{formatReliability(skill.reliabilityLevel)}</Badge>
          <Badge>{formatRelativeRisk(skill.riskLevel)}</Badge>
        </div>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-text">{skill.name}</h1>
        <p className="max-w-3xl text-base leading-relaxed text-muted">{skill.longDescription}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-[0.08em] text-muted">Version</p>
          <p className="mt-2 text-sm font-semibold text-text">{skill.version}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.08em] text-muted">Last Updated</p>
          <p className="mt-2 text-sm font-semibold text-text">{formatDate(skill.updatedAt)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.08em] text-muted">Verification Type</p>
          <p className="mt-2 text-sm font-semibold text-text">{skill.verificationTypes.join(", ")}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.08em] text-muted">Downloads</p>
          <p className="mt-2 text-sm font-semibold text-text">{skill.downloads.toLocaleString()}</p>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Required inputs</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {skill.inputs.map((input) => (
              <li key={input.name}>
                <p className="font-medium text-text">
                  {input.name} <span className="text-muted">({input.type})</span>
                </p>
                <p>{input.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Expected outputs</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {skill.outputs.map((output) => (
              <li key={output.name}>
                <p className="font-medium text-text">
                  {output.name} <span className="text-muted">({output.type})</span>
                </p>
                <p>{output.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Included checks and assets</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {skill.includedAssets.map((asset) => (
              <li key={asset.name}>
                <p className="font-medium text-text">
                  {asset.name} <span className="text-muted">({asset.type})</span>
                </p>
                <p>{asset.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Failure modes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {skill.failureModes.map((failureMode) => (
              <li key={failureMode}>{failureMode}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Ideal use cases</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {skill.idealUseCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Example runs</h2>
          <div className="mt-4 space-y-4">
            {skill.examples.map((example, index) => (
              <article key={`${example.title}-${index}`} className="rounded-2xl border border-panelBorder bg-bg/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-text">{example.title}</h3>
                  <span className="text-xs font-medium uppercase tracking-[0.1em] text-accent">
                    {example.validated ? "Validated sample run" : "Example output"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">{example.summary}</p>
                <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                  <div>
                    <p className="mb-1 font-semibold text-text">Input preview</p>
                    <pre className="overflow-x-auto rounded-xl bg-panel p-3 text-muted">{example.inputPreview}</pre>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-text">Output preview</p>
                    <pre className="overflow-x-auto rounded-xl bg-panel p-3 text-muted">{example.outputPreview}</pre>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Changelog summary</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {skill.changelog.map((entry) => (
              <li key={`${entry.version}-${entry.date}`}>
                <p className="font-medium text-text">
                  {entry.version} · {formatDate(entry.date)}
                </p>
                <p>{entry.summary}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Links</h2>
          <p className="mt-3 text-sm text-muted">
            Inspect the source, read authored documentation, or download the published skill bundle.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`/api/download/${skill.slug}`}
              download
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white"
            >
              Download
            </a>
            <Link
              href={`/skills/${skill.slug}/docs#source`}
              className="rounded-full border border-panelBorder px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
            >
              Source
            </Link>
            <Link
              href={`/skills/${skill.slug}/docs`}
              className="rounded-full border border-panelBorder px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
            >
              Docs
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
