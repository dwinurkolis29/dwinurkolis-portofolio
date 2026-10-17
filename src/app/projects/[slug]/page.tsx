import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreBadge } from "@/components/store-badge";
import { getProfileData } from "@/lib/profile-data";
import { ProjectDiagramWindow } from "@/features/projects/project-diagram";

export const revalidate = 60;

export async function generateStaticParams() {
  const { projects } = await getProfileData();
  return projects.map((p) => ({ slug: p.slug }));
}

function findScreenshot(slug: string, indexOneBased: number): string | null {
  const candidates = [
    `${indexOneBased}.png`,
    `${indexOneBased}.jpg`,
    `${indexOneBased}.jpeg`,
    `${indexOneBased}.webp`,
    `screen-${indexOneBased}.png`,
    `screen-${indexOneBased}.jpg`,
  ];
  for (const filename of candidates) {
    const rel = `/projects/${slug}/${filename}`;
    const abs = path.join(process.cwd(), "public", rel);
    if (fs.existsSync(abs)) {
      return rel;
    }
  }
  return null;
}

const toc = [
  { id: "overview", label: "The Journey Overview" },
  { id: "architecture", label: "Phase 1: System Architecture" },
  { id: "decisions", label: "Phase 2: Engineering & Code" },
  { id: "workflow", label: "Phase 3: Execution & Screenshots" },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { profile, projects } = await getProfileData();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-3 z-20 px-4">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur"
        >
          <Link href="/" className="shrink-0 font-mono text-sm text-accent">
            nurkolis<span className="text-muted">.dev</span>
          </Link>
          <ul className="flex items-center gap-x-5 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="font-semibold text-accent">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#experience" className="hover:text-foreground">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:pt-16">
        {/* Back button matching eltrovert.com */}
        <Link
          href="/projects"
          className="group mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>../back_to_projects</span>
        </Link>

        {/* Project Case Study Header */}
        <header className="mb-10 border-b border-border pb-10 sm:mb-12 sm:pb-12">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-xs border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent">
              <span>⚡ {project.year} Project</span>
              <span>·</span>
              <span>{project.status.replace(/_/g, " ")}</span>
              <span>·</span>
              <span>{project.category}</span>
            </div>

            <h1 className="font-mono text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              <span className="text-accent">&gt;_</span> {project.headlineTitle}
            </h1>

            <p className="text-base leading-relaxed text-muted sm:text-xl">
              {project.description}
            </p>

            <StoreBadge url={project.storeUrl} />
          </div>
        </header>

        {/* 12-Column Content + Sticky Sidebar matching eltrovert.com/projects/:slug */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main Case Study Column (8 cols) */}
          <div className="space-y-14 lg:col-span-8">
            {/* Hero Architecture Flowchart Window */}
            <div>
              <ProjectDiagramWindow
                title={project.name}
                architecture={project.architecture}
                index={projects.indexOf(project)}
              />
              <p className="mt-2.5 text-center font-mono text-xs text-muted">
                Figure 1.0 — End-to-end architecture and data flow for {project.name}
              </p>
            </div>

            {/* Section 1: The Journey Overview (For Everyone / Layman + HR) */}
            <section id="overview" className="scroll-mt-24 space-y-5">
              <h2 className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                <span className="text-accent">#</span> The Journey Overview
              </h2>
              <p className="leading-relaxed text-foreground/90">
                {project.laymanSummary}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                    The Starting Point (Masalah)
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {project.problem}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                    Why This Matters (Hasil &amp; Dampak)
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Phase 1 - System Architecture */}
            <section id="architecture" className="scroll-mt-24 space-y-5">
              <h2 className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                <span className="text-accent">#</span> Phase 1: System Architecture &amp; Pipeline
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                Arsitektur sistem dirancang secara modular agar setiap lapisan memiliki tanggung jawab yang terisolasi dengan jelas:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {project.architecture.map((node, idx) => (
                  <div
                    key={node.step}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <span className="font-mono text-xs text-accent">STAGE 0{idx + 1}</span>
                    <h3 className="mt-1 font-mono text-base font-semibold text-foreground">
                      {node.step}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{node.detail}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-surface/60 p-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-2">
                  Core Technical Deliverables
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-accent">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3: Phase 2 - Engineering Decisions & Code */}
            <section id="decisions" className="scroll-mt-24 space-y-5">
              <h2 className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                <span className="text-accent">#</span> Phase 2: Engineering Decisions &amp; Implementation
              </h2>

              <div className="space-y-3">
                {project.decisions.map((decision, idx) => (
                  <div
                    key={decision}
                    className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/90"
                  >
                    <span className="mr-2 font-mono text-xs font-bold text-accent">
                      [Decision 0{idx + 1}]
                    </span>
                    {decision}
                  </div>
                ))}
              </div>

              {/* Code Window */}
              <div className="overflow-hidden rounded-xl border border-border bg-[#080b10] shadow-xl">
                <div className="flex items-center gap-2 border-b border-border bg-[#121923] px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-muted">
                    {project.codeTitle}
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-foreground/90">
                  <code>{project.codeSnippet.join("\n")}</code>
                </pre>
              </div>
            </section>

            {/* Section 4: Phase 3 - Execution Stages & Screenshots */}
            <section id="workflow" className="scroll-mt-24 space-y-5">
              <h2 className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                <span className="text-accent">#</span> Phase 3: Application Screens &amp; Operational Workflow
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {project.screens.map((scr, idx) => {
                  const screenshotSrc = findScreenshot(project.slug, idx + 1);
                  return (
                    <div
                      key={scr.label}
                      className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
                    >
                      {screenshotSrc && (
                        <div className="relative aspect-[9/16] w-full overflow-hidden border-b border-border bg-[#080b10]">
                          <Image
                            src={screenshotSrc}
                            alt={`${project.name} - ${scr.label}`}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-mono text-sm font-semibold text-accent">
                          {scr.label}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-foreground/85">
                          {scr.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Column (4 cols) matching eltrovert.com */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-5 font-mono text-base font-bold text-foreground">
                Tech Stack
              </h3>
              <div className="space-y-3">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-3 border-b border-border/60 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="rounded bg-background px-2 py-1 font-mono text-xs text-accent">
                      &lt;/&gt;
                    </span>
                    <span className="font-mono text-sm text-foreground/90">{tag}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-6 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted">Year</span>
                  <span className="text-foreground">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Focus</span>
                  <span className="text-accent">{project.impact}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  Table of Contents
                </h4>
                <nav className="space-y-1 font-mono">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-background hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · built with Next.js
      </footer>
    </div>
  );
}
