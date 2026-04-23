import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { VantaDotsHero } from "@/components/vanta-dots-hero";

export const metadata: Metadata = {
  title: "ARS.FLOW | Verification-First AI Skills",
  description: "Discover reusable AI-agent skills with explicit checks, reliability notes, and validated sample runs.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://arsflow.vercel.app"),
  openGraph: {
    title: "ARS.FLOW | Verification-First AI Skills",
    description: "Discover reusable AI-agent skills with explicit checks, reliability notes, and validated sample runs.",
    url: "/",
    siteName: "ARS.FLOW",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ARS.FLOW"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ARS.FLOW | Verification-First AI Skills",
    description: "Discover reusable AI-agent skills with explicit checks, reliability notes, and validated sample runs.",
    images: ["/twitter-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-[var(--font-body)] antialiased">
        <ThemeProvider>
          <div className="relative isolate min-h-screen overflow-x-clip">
            <VantaDotsHero className="pointer-events-none fixed inset-0 -z-30 opacity-95" />
            <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(1000px_500px_at_15%_10%,rgba(255,255,255,0.34),transparent_70%),radial-gradient(1100px_580px_at_85%_95%,rgba(66,98,149,0.13),transparent_72%)] dark:bg-[radial-gradient(1000px_500px_at_15%_10%,rgba(84,132,214,0.14),transparent_70%),radial-gradient(1100px_580px_at_85%_95%,rgba(0,0,0,0.32),transparent_72%)]" />

            <div className="relative z-10 min-h-screen">
              <SiteHeader />
              <main className="mx-auto w-full max-w-7xl px-6 pt-12">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
