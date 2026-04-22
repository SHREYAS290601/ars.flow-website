import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistryError } from "@/components/registry-error";
import { Card } from "@/components/ui/card";
import { loadRegistry } from "@/lib/registry/load-registry";
import { formatDate } from "@/lib/skills/formatters";

type SkillDocsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SkillDocsPage({ params }: SkillDocsPageProps) {
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
      <section className="space-y-3">
        <Link href={`/skills/${skill.slug}`} className="text-sm text-primary hover:opacity-80">
          ← Back to {skill.name}
        </Link>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-text">{skill.name} Documentation</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Runtime-generated docs from the validated registry. Use this page as the in-app skill reference while external
          source repositories are still being finalized.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Workflow summary</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{skill.longDescription}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted">
            <div>
              <dt>Version</dt>
              <dd className="mt-1 font-medium text-text">{skill.version}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd className="mt-1 font-medium text-text">{formatDate(skill.updatedAt)}</dd>
            </div>
            <div>
              <dt>Reliability</dt>
              <dd className="mt-1 font-medium capitalize text-text">{skill.reliabilityLevel}</dd>
            </div>
            <div>
              <dt>Risk</dt>
              <dd className="mt-1 font-medium capitalize text-text">{skill.riskLevel}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Verification and assets</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {skill.verificationTypes.map((verificationType) => (
              <li key={verificationType}>{verificationType}</li>
            ))}
          </ul>
          <h3 className="mt-5 text-sm font-semibold text-text">Included files</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
            {skill.includedAssets.map((asset) => (
              <li key={asset.name}>
                <span className="font-medium text-text">{asset.name}</span> ({asset.type}) - {asset.description}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Inputs</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {skill.inputs.map((input) => (
              <li key={input.name}>
                <span className="font-medium text-text">{input.name}</span> ({input.type}) - {input.description}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">Outputs</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {skill.outputs.map((output) => (
              <li key={output.name}>
                <span className="font-medium text-text">{output.name}</span> ({output.type}) - {output.description}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card>
        <h2 id="source" className="font-[var(--font-heading)] text-xl font-semibold text-text">
          Source metadata
        </h2>
        <p className="mt-2 text-sm text-muted">Declared source URL in registry:</p>
        <p className="mt-2 break-all rounded-xl border border-panelBorder bg-bg/60 px-3 py-2 text-xs text-text">{skill.sourceUrl}</p>
      </Card>
    </div>
  );
}
