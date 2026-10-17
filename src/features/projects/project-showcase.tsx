import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { StoreBadge } from "@/components/store-badge";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { ProjectDiagramWindow } from "./project-diagram";
import type { Project } from "@/lib/profile-data";

export type ProjectItem = Project;

function CubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 shrink-0 text-accent"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function ProjectShowcase({
  projects,
  lang,
  t,
  storeLabel,
  showAllLink = true,
}: {
  projects: ProjectItem[];
  lang: Locale;
  t: Dictionary["showcase"];
  storeLabel: string;
  showAllLink?: boolean;
}) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {projects.map((p, idx) => {
        const reverse = idx % 2 === 1;
        return (
          <Reveal key={p.slug}>
            <article
              className="group relative rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-md transition-all duration-500 hover:border-accent/40 sm:p-7 lg:p-8"
            >
              {/* Subtle hover glow matching eltrovert.com */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-accent/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2">
                {/* Text Column */}
                <div className={`space-y-4 sm:space-y-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="text-accent">{p.name}</span>
                      <span className="text-muted">·</span>
                      <span className="text-muted">{p.year}</span>
                      <span className="text-muted">·</span>
                      <span className="text-accent-2">{p.category}</span>
                    </div>

                    <Link
                      href={localePath(lang, `/projects/${p.slug}`)}
                      className="block font-mono text-xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl"
                    >
                      {p.headlineTitle}
                    </Link>

                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {p.description}
                    </p>
                  </div>

                  {/* Tech Stack Badges with Cube Icon */}
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded border border-border bg-background/80 px-2.5 py-1 font-mono text-xs text-foreground/85"
                      >
                        <CubeIcon />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
                    <Link
                      href={localePath(lang, `/projects/${p.slug}`)}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-[#0b0f14] px-5 py-3 font-medium text-foreground transition-all hover:border-accent hover:bg-surface hover:text-accent"
                    >
                      <span>{t.viewProject}</span>
                    </Link>
                    <StoreBadge url={p.storeUrl} label={storeLabel} />
                  </div>
                </div>

                {/* Visual Diagram Window Column */}
                <div className={`relative group/image ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                  <Link
                    href={localePath(lang, `/projects/${p.slug}`)}
                    className="block"
                    aria-label={format(t.viewAria, { name: p.name })}
                  >
                    <ProjectDiagramWindow title={p.name} architecture={p.architecture} index={idx} />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}

      {showAllLink && (
        <div className="flex justify-center pt-4">
          <Link
            href={localePath(lang, "/projects")}
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <span>{t.viewAll}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
