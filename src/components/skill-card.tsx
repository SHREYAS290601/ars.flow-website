import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Skill } from "@/lib/registry/schema";
import { getCategoryBadgeClass } from "@/lib/skills/categories";
import { formatDate, formatReliability } from "@/lib/skills/formatters";
import { formatRelativeRisk } from "@/lib/skills/filters";

type SkillCardProps = {
  skill: Skill;
};

export function SkillCard({ skill }: SkillCardProps) {
  const validatedExamples = skill.examples.filter((example) => example.validated).length;

  return (
    <Card className="flex h-full flex-col gap-5 transition duration-300 hover:-translate-y-1 hover:border-primary/70">
      <div className="flex flex-wrap gap-2">
        <Badge className={getCategoryBadgeClass(skill.category)}>{skill.categoryLabel}</Badge>
        <Badge>{formatReliability(skill.reliabilityLevel)}</Badge>
        <Badge>{formatRelativeRisk(skill.riskLevel)}</Badge>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-text">
          <Link href={`/skills/${skill.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {skill.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{skill.shortDescription}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-muted">
        {skill.verificationTypes.slice(0, 3).map((verificationType) => (
          <span key={verificationType} className="rounded-full border border-panelBorder bg-panel/95 px-2 py-1 text-muted">
            {verificationType}
          </span>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-3 text-xs text-muted">
        <div>
          <dt>Updated</dt>
          <dd className="mt-1 font-medium text-text">{formatDate(skill.updatedAt)}</dd>
        </div>
        <div>
          <dt>Verification checks</dt>
          <dd className="mt-1 font-medium text-text">{skill.verificationTypes.length}</dd>
        </div>
        <div>
          <dt>Validated examples</dt>
          <dd className="mt-1 font-medium text-text">{validatedExamples}</dd>
        </div>
        <div>
          <dt>Risk profile</dt>
          <dd className="mt-1 font-medium text-text">{formatRelativeRisk(skill.riskLevel)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap gap-2">
        <Link
          href={`/skills/${skill.slug}`}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
        >
          Open Skill
        </Link>
        <Link
          href={`/skills/${skill.slug}/docs`}
          className="rounded-full border border-panelBorder px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-text transition hover:border-primary"
        >
          Docs
        </Link>
      </div>
    </Card>
  );
}
