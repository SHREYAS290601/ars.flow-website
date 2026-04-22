import Link from "next/link";
import type { Route } from "next";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/skills", label: "Skills" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "How It Works" },
  { href: "/submit", label: "Submit" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-panelBorder/80 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-text">
          <span className="h-2 w-2 rounded-full bg-highlight" />
          ARS.FLOW
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/skills"
            className="hidden rounded-full border border-panelBorder bg-panel px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-text transition hover:border-primary sm:inline-flex"
          >
            Browse
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
