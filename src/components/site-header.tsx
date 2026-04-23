"use client";

import Link from "next/link";
import type { Route } from "next";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/skills", label: "Skills" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "How It Works" },
  { href: "/submit", label: "Submit" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-panelBorder/80 bg-bg/85 backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center text-sm font-semibold tracking-[0.18em] text-text">
          <span>ARS.FLOW</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/skills"
            className="hidden rounded-full border border-panelBorder bg-panel px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-text transition hover:border-primary sm:inline-flex"
          >
            Browse
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-panelBorder bg-panel text-text transition hover:border-primary md:hidden"
            aria-label={menuOpen ? "Close menu" : "Toggle menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-main-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <ThemeToggle />
        </div>

        {menuOpen ? (
          <div
            id="mobile-main-nav"
            className="absolute left-6 right-6 top-[calc(100%+8px)] z-50 rounded-2xl border border-panelBorder bg-bg p-4 shadow-xl md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-text transition hover:bg-bg"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/skills"
                className="mt-1 inline-flex h-10 items-center justify-center rounded-full border border-panelBorder px-4 text-xs font-semibold uppercase tracking-[0.08em] text-text transition hover:border-primary"
                onClick={() => setMenuOpen(false)}
              >
                Browse skills
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
