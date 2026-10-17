import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { StoreBadge } from "@/components/store-badge";
import { Window } from "@/components/window";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/lib/profile-data";
import { formatMonth, stageBar, type Research } from "@/lib/research";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-muted"># {children}</p>;
}

function Tags({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded border border-border bg-background px-2 py-0.5 text-accent-2"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ResearchCard({
  item,
  projects,
  lang,
  t,
  storeLabel,
}: {
  item: Research;
  projects: Project[];
  lang: Locale;
  t: Dictionary["research"];
  storeLabel: string;
}) {
  const bar = stageBar(item.stage);
  const related = item.relatedProjectSlug
    ? projects.find((p) => p.slug === item.relatedProjectSlug)
    : undefined;
  const stageLabel = t.stages[item.stage] ?? item.stage.replace(/_/g, " ");

  return (
    <Window title={`research/${item.slug}.md`}>
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="flex flex-wrap gap-x-2 text-muted">
            {item.institution && (
              <>
                <span className="text-accent-2">{item.institution}</span>
                <span>·</span>
              </>
            )}
            <span>{stageLabel}</span>
          </p>
          {item.title && (
            <h3 className="font-sans text-lg font-semibold leading-snug text-foreground sm:text-xl">
              {item.title}
            </h3>
          )}
          <p>
            {bar && <span className="text-accent">{bar} </span>}
            <span className="text-foreground">{stageLabel}</span>
          </p>
        </div>

        {item.summary && (
          <p className="font-sans text-sm leading-relaxed text-foreground/85">{item.summary}</p>
        )}

        {item.supervisor && (
          <p>
            <span className="text-muted">{t.supervisor} </span>
            <span className="text-foreground">{item.supervisor}</span>
          </p>
        )}

        <Tags label={t.methods} items={item.methods} />
        <Tags label={t.datasets} items={item.datasets} />

        {item.links.length > 0 && (
          <div>
            <Label>{t.links}</Label>
            <ul className="space-y-1">
              {item.links.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-accent hover:underline"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {related && (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={localePath(lang, `/projects/${related.slug}`)}
              className="text-accent hover:underline"
            >
              {t.relatedProject} {related.name} ↗
            </Link>
            <StoreBadge url={related.storeUrl} label={storeLabel} />
          </div>
        )}

        {item.updates.length > 0 && (
          <div>
            <Label>{t.changelog}</Label>
            <ul className="space-y-1.5">
              {item.updates.map((u) => (
                <li key={`${u.date}-${u.note}`} className="flex gap-2">
                  <span className="shrink-0 text-muted">{formatMonth(u.date)} ·</span>
                  <span className="text-foreground/85">{u.note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Window>
  );
}

export function ResearchSection({
  research,
  projects,
  lang,
  t,
  storeLabel,
}: {
  research: Research[];
  projects: Project[];
  lang: Locale;
  t: Dictionary["research"];
  storeLabel: string;
}) {
  return (
    <div className="space-y-6">
      {research.map((item) => (
        <Reveal key={item.slug}>
          <ResearchCard
            item={item}
            projects={projects}
            lang={lang}
            t={t}
            storeLabel={storeLabel}
          />
        </Reveal>
      ))}
    </div>
  );
}
