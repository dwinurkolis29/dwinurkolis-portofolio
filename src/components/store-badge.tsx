export function StoreBadge({ url, label }: { url: string; label: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}
