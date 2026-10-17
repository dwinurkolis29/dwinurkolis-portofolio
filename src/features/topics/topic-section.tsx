import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { ScrollHeadline } from "./scroll-headline";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6 text-accent",
  "aria-hidden": true,
} as const;

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg {...iconProps}>
      <line x1="3" y1="21" x2="21" y2="21" />
      <polyline points="4 16 9 11 13 14 20 6" />
      <polyline points="15 6 20 6 20 11" />
    </svg>
  );
}

// Urutan sama dengan `topics.items` pada kamus.
const topicTargets = [
  { href: "#projects", Icon: PhoneIcon },
  { href: "/projects/android-security-research", Icon: ShieldIcon },
  { href: "#research", Icon: ChartIcon },
];

export function TopicSection({
  hasResearch,
  lang,
  t,
}: {
  hasResearch: boolean;
  lang: Locale;
  t: Dictionary["topics"];
}) {
  const topics = t.items.map((item, i) => ({ ...item, ...topicTargets[i] }));
  return (
    <section aria-label={t.ariaLabel} className="py-16">
      <ScrollHeadline text={t.headline} />

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">
        {t.log}
      </p>
      <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-muted">
        {t.intro}
      </p>

      <Reveal className="mt-10">
        <ul className="grid gap-4 sm:grid-cols-3">
          {topics.map(({ label, title, description, href: topicHref, Icon }) => {
            const href = topicHref === "#research" && !hasResearch ? "#projects" : topicHref;
            const linkClass =
              "font-mono text-xs text-accent after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:underline";
            return (
              <li
                key={title}
                className="group relative isolate rounded-xl border border-border bg-surface/80 p-5 transition-all duration-500 hover:border-accent/40"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-accent/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="space-y-3">
                  <Icon />
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
                  <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
                  {href.startsWith("#") ? (
                    <a href={href} aria-label={format(t.exploreAria, { title })} className={linkClass}>
                      {t.explore}
                    </a>
                  ) : (
                    <Link href={localePath(lang, href)} aria-label={format(t.exploreAria, { title })} className={linkClass}>
                      {t.explore}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
