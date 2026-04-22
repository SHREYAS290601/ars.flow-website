import { Card } from "@/components/ui/card";

const anatomy = [
  {
    title: "SKILL.md",
    detail: "Defines scope, workflow steps, required context, and what success looks like."
  },
  {
    title: "Examples",
    detail: "Shows realistic invocations and expected outputs so teams can inspect fit quickly."
  },
  {
    title: "Scripts / Checks",
    detail: "Encodes deterministic validation for risky steps where pure prompting is fragile."
  },
  {
    title: "Failure Modes",
    detail: "Documents known edge cases and when human review remains required."
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-10 pb-10">
      <section className="space-y-4">
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-text">How ARS.FLOW Works</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          ARS.FLOW separates skill authoring from website delivery. `skills-catalog/` is the source of truth, generates a
          machine-readable registry, and the website consumes only that validated registry.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {anatomy.map((item) => (
          <Card key={item.title}>
            <h2 className="font-[var(--font-heading)] text-xl font-semibold text-text">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.detail}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 rounded-3xl border border-[#93aab8] bg-[#f3f8fb] p-8 shadow-sm dark:border-[#31465d] dark:bg-[#101a2a] md:grid-cols-3">
        <div>
          <h2 className="font-[var(--font-heading)] text-base font-semibold text-text">Registry Flow</h2>
          <p className="mt-2 text-sm text-muted">Validate skills → generate registry JSON → publish artifacts → website renders.</p>
        </div>
        <div>
          <h2 className="font-[var(--font-heading)] text-base font-semibold text-text">Trust Model</h2>
          <p className="mt-2 text-sm text-muted">Verification methods and risk levels are first-class page elements, not hidden metadata.</p>
        </div>
        <div>
          <h2 className="font-[var(--font-heading)] text-base font-semibold text-text">Preview Model</h2>
          <p className="mt-2 text-sm text-muted">v1 shows static validated sample runs only. No arbitrary user code execution.</p>
        </div>
      </section>
    </div>
  );
}
