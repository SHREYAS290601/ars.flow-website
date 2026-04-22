import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-panelBorder py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>ARS.FLOW · Verification-first AI skills for engineering workflows.</p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-text">
            Trust model
          </Link>
          <Link href="/submit" className="hover:text-text">
            Submit a skill
          </Link>
        </div>
      </div>
    </footer>
  );
}
