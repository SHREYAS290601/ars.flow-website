import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-panelBorder bg-panel/70 p-10 text-center">
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-text">Page not found</h1>
      <p className="mt-3 text-sm text-muted">The requested resource does not exist in the current registry view.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
        Return home
      </Link>
    </div>
  );
}
