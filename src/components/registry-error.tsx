type RegistryErrorProps = {
  error: string;
};

export function RegistryError({ error }: RegistryErrorProps) {
  return (
    <section className="rounded-3xl border border-danger/50 bg-danger/10 p-8 text-sm text-danger">
      <h2 className="text-base font-semibold">Registry Load Failed</h2>
      <p className="mt-2 leading-relaxed">{error}</p>
      <p className="mt-4 text-xs text-muted">
        Check `SKILLS_REGISTRY_URL` or verify `public/registry/skills.json` is valid against the runtime schema.
      </p>
    </section>
  );
}
