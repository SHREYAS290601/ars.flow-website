import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SkillQuery } from "@/lib/skills/filters";

type SkillsFilterFormProps = {
  query: SkillQuery;
  options: {
    categories: Array<{ value: string; label: string }>;
    languages: string[];
    frameworks: string[];
    verificationTypes: string[];
  };
};

export function SkillsFilterForm({ query, options }: SkillsFilterFormProps) {
  return (
    <form
      method="get"
      className="grid gap-4 rounded-3xl border border-panelBorder bg-panel/70 p-5 md:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0"
    >
      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Search
        <input
          name="q"
          defaultValue={query.q ?? ""}
          placeholder="Find skills"
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        />
      </label>

      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Category
        <select
          name="category"
          defaultValue={query.category ?? ""}
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        >
          <option value="">All categories</option>
          {options.categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Language
        <select
          name="language"
          defaultValue={query.language ?? ""}
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        >
          <option value="">All languages</option>
          {options.languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>

      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Framework
        <select
          name="framework"
          defaultValue={query.framework ?? ""}
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        >
          <option value="">All frameworks</option>
          {options.frameworks.map((framework) => (
            <option key={framework} value={framework}>
              {framework}
            </option>
          ))}
        </select>
      </label>

      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Reliability
        <select
          name="reliability"
          defaultValue={query.reliability ?? ""}
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        >
          <option value="">All levels</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>

      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Verification
        <select
          name="verification"
          defaultValue={query.verification ?? ""}
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        >
          <option value="">All methods</option>
          {options.verificationTypes.map((verificationType) => (
            <option key={verificationType} value={verificationType}>
              {verificationType}
            </option>
          ))}
        </select>
      </label>

      <label className="grid min-w-0 gap-2 text-xs uppercase tracking-[0.1em] text-muted">
        Sort by
        <select
          name="sort"
          defaultValue={query.sort ?? "newest"}
          className="w-full min-w-0 rounded-xl border border-panelBorder bg-bg px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
        >
          <option value="newest">Newest</option>
          <option value="mostVerified">Most verified</option>
          <option value="mostDownloaded">Most downloaded</option>
        </select>
      </label>

      <div className="flex min-w-0 items-end gap-2 lg:col-span-1">
        <Button type="submit" className="w-full">
          Apply filters
        </Button>
        <Link
          href="/skills"
          className="inline-flex h-[42px] items-center justify-center rounded-full border border-panelBorder px-4 text-xs font-semibold uppercase tracking-[0.08em] text-text transition hover:border-primary"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
