import Link from "next/link";
import type { projects as localProjects } from "@/data/profile";

export type ProjectItem = (typeof localProjects)[number];

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

export function ProjectDiagramWindow({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-lg border border-border border-b-4 border-r-4 bg-[#0d1219] shadow-2xl overflow-hidden transition-transform duration-500 group-hover/image:-translate-y-1.5">
      {/* Top Window Bar (macOS / Terminal dots like eltrovert.com) */}
      <div className="flex h-6 items-center justify-between border-b border-border bg-[#17202b] px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <span className="truncate font-mono text-[10px] text-muted">{title} — architecture.flow</span>
        <span className="w-8" />
      </div>

      {/* Flowchart Canvas */}
      <div className="relative flex h-[calc(100%-1.5rem)] w-full flex-col items-center justify-between bg-[#f8fafc] p-3 text-[#0f172a] sm:p-4">
        {slug === "android-security-research" && (
          <div className="flex h-full w-full flex-col items-center justify-between font-mono text-[10px] sm:text-[11px]">
            {/* Top Node */}
            <div className="rounded-full border border-violet-400 bg-violet-100 px-3.5 py-1 font-semibold text-violet-900 shadow-xs">
              Target Production APK (DEX / Native Libs)
            </div>

            <div className="h-2.5 w-px bg-slate-400" />

            {/* Middle Layer Node */}
            <div className="rounded border border-slate-400 bg-slate-600 px-4 py-1.5 text-center text-white shadow-xs">
              <div className="font-bold">JADX &amp; Smali Static Decompiler</div>
              <div className="text-[9px] text-slate-200">Manifest, Crypto &amp; Auth Flow Mapping</div>
            </div>

            <div className="h-2.5 w-px bg-slate-400" />

            {/* Central Hub Node */}
            <div className="rounded border border-amber-600 bg-amber-500 px-4 py-1.5 text-center text-white shadow-sm">
              <div className="font-bold">Frida Runtime Instrumentation Server</div>
              <div className="text-[9px] text-amber-50">Dynamic API Hooking &amp; Memory Inspection</div>
            </div>

            {/* Branch Lines */}
            <div className="relative flex w-full items-center justify-center py-1">
              <div className="h-px w-3/4 bg-slate-400" />
            </div>

            {/* Bottom 3 Leaf Nodes */}
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="rounded border border-emerald-700 bg-emerald-600 p-1.5 text-center text-white shadow-xs">
                <div className="font-bold">SSL Pinning Bypass</div>
                <div className="text-[8px] text-emerald-100">OkHttp / TrustManager</div>
              </div>
              <div className="rounded border border-sky-700 bg-sky-600 p-1.5 text-center text-white shadow-xs">
                <div className="font-bold">Burp / Mitmproxy</div>
                <div className="text-[8px] text-sky-100">TLS Payload Audit</div>
              </div>
              <div className="rounded border border-purple-400 bg-purple-100 p-1.5 text-center text-purple-950 shadow-xs">
                <div className="font-bold">OWASP MASVS</div>
                <div className="text-[8px] text-purple-700">Remediation Report</div>
              </div>
            </div>
          </div>
        )}

        {slug === "broilerku" && (
          <div className="flex h-full w-full flex-col items-center justify-between font-mono text-[10px] sm:text-[11px]">
            {/* Top Node */}
            <div className="rounded-full border border-violet-400 bg-violet-100 px-3.5 py-1 font-semibold text-violet-900 shadow-xs">
              Peternak / Field Operator (Mobile Input)
            </div>

            <div className="h-2.5 w-px bg-slate-400" />

            {/* Middle Layer Node */}
            <div className="rounded border border-slate-400 bg-slate-600 px-4 py-1.5 text-center text-white shadow-xs">
              <div className="font-bold">Flutter Presentation &amp; State Layer</div>
              <div className="text-[9px] text-slate-200">Daily Feed, Mortality &amp; Flock Weight Form</div>
            </div>

            <div className="h-2.5 w-px bg-slate-400" />

            {/* Central Engine Node */}
            <div className="rounded border border-amber-600 bg-amber-500 px-4 py-1.5 text-center text-white shadow-sm">
              <div className="font-bold">Automated FCR &amp; IP Calculation Engine</div>
              <div className="text-[9px] text-amber-50">Biomass Ratio &amp; Depletion Threshold Logic</div>
            </div>

            {/* Branch Lines */}
            <div className="relative flex w-full items-center justify-center py-1">
              <div className="h-px w-3/4 bg-slate-400" />
            </div>

            {/* Bottom 3 Leaf Nodes */}
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="rounded border border-emerald-700 bg-emerald-600 p-1.5 text-center text-white shadow-xs">
                <div className="font-bold">Kandang A-01</div>
                <div className="text-[8px] text-emerald-100">FCR: 1.48 · IP: 382</div>
              </div>
              <div className="rounded border border-sky-700 bg-sky-600 p-1.5 text-center text-white shadow-xs">
                <div className="font-bold">Cloud Firestore</div>
                <div className="text-[8px] text-sky-100">Real-Time Cycle Sync</div>
              </div>
              <div className="rounded border border-purple-400 bg-purple-100 p-1.5 text-center text-purple-950 shadow-xs">
                <div className="font-bold">Harvest Analytics</div>
                <div className="text-[8px] text-purple-700">Growth Curve &amp; Export</div>
              </div>
            </div>
          </div>
        )}

        {slug !== "android-security-research" && slug !== "broilerku" && (
          <div className="flex h-full w-full flex-col items-center justify-between font-mono text-[10px] sm:text-[11px]">
            {/* Top Node */}
            <div className="rounded-full border border-violet-400 bg-violet-100 px-3.5 py-1 font-semibold text-violet-900 shadow-xs">
              Field Agent Device (Camera + FusedGPS)
            </div>

            <div className="h-2.5 w-px bg-slate-400" />

            {/* Middle Layer Node */}
            <div className="rounded border border-slate-400 bg-slate-600 px-4 py-1.5 text-center text-white shadow-xs">
              <div className="font-bold">Media Compressor &amp; Geo-Validator</div>
              <div className="text-[9px] text-slate-200">3.8MB → 410KB Bitmap + Radius Lock (±3.2m)</div>
            </div>

            <div className="h-2.5 w-px bg-slate-400" />

            {/* Central Hub Node */}
            <div className="rounded border border-amber-600 bg-amber-500 px-4 py-1.5 text-center text-white shadow-sm">
              <div className="font-bold">Kotlin MVVM Repository &amp; Retry Queue</div>
              <div className="text-[9px] text-amber-50">Coroutine Multipart Dispatcher</div>
            </div>

            {/* Branch Lines */}
            <div className="relative flex w-full items-center justify-center py-1">
              <div className="h-px w-3/4 bg-slate-400" />
            </div>

            {/* Bottom 3 Leaf Nodes */}
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="rounded border border-emerald-700 bg-emerald-600 p-1.5 text-center text-white shadow-xs">
                <div className="font-bold">REST API Gateway</div>
                <div className="text-[8px] text-emerald-100">Bearer JWT Verified</div>
              </div>
              <div className="rounded border border-sky-700 bg-sky-600 p-1.5 text-center text-white shadow-xs">
                <div className="font-bold">Central Storage</div>
                <div className="text-[8px] text-sky-100">Geo-Tagged Evidence</div>
              </div>
              <div className="rounded border border-purple-400 bg-purple-100 p-1.5 text-center text-purple-950 shadow-xs">
                <div className="font-bold">HQ Dashboard</div>
                <div className="text-[8px] text-purple-700">Live Field Monitoring</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectShowcase({
  projects,
  showAllLink = true,
}: {
  projects: ProjectItem[];
  showAllLink?: boolean;
}) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {projects.map((p, idx) => {
        const reverse = idx % 2 === 1;
        return (
          <article
            key={p.slug}
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
                    href={`/projects/${p.slug}`}
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
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-[#0b0f14] px-5 py-3 font-medium text-foreground transition-all hover:border-accent hover:bg-surface hover:text-accent"
                  >
                    <span>View Project</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>

              {/* Visual Diagram Window Column */}
              <div className={`relative group/image ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                <Link href={`/projects/${p.slug}`} className="block" aria-label={`View ${p.name}`}>
                  <ProjectDiagramWindow slug={p.slug} title={p.name} />
                </Link>
              </div>
            </div>
          </article>
        );
      })}

      {showAllLink && (
        <div className="flex justify-center pt-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <span>./view_all_explored_projects</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
