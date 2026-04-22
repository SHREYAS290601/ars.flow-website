export default function SubmitPage() {
  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-text">Submit or Join Waitlist</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Submit candidate skills for review. v1 intake is manual while we establish a quality baseline for scope,
          validation, and failure-mode documentation.
        </p>
      </section>

      <form className="grid gap-4 rounded-3xl border border-panelBorder bg-panel/70 p-6 md:grid-cols-2" aria-label="Submit skill form">
        <label className="grid gap-2 text-sm text-muted">
          Name
          <input className="rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Work email
          <input className="rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text" placeholder="you@company.com" />
        </label>
        <label className="grid gap-2 text-sm text-muted md:col-span-2">
          Skill idea
          <textarea
            className="min-h-32 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text"
            placeholder="Describe workflow scope, checks, and expected outputs"
          />
        </label>
        <div className="md:col-span-2">
          <button
            type="button"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white"
          >
            Request invite
          </button>
        </div>
      </form>
    </div>
  );
}
