import { buildDiagram, type DiagramStep, type DiagramTheme } from "./diagram-model";

// Kelas ditulis utuh agar Tailwind bisa memindainya.
const themes: Record<
  DiagramTheme,
  { source: string; node: string; core: string; detail: string; line: string; num: string }
> = {
  violet: {
    source: "border-violet-400 bg-violet-100 text-violet-900",
    node: "border-slate-400 bg-slate-600 text-white",
    core: "border-violet-700 bg-violet-600 text-white",
    detail: "text-white/75",
    line: "text-violet-500",
    num: "text-violet-600",
  },
  emerald: {
    source: "border-emerald-400 bg-emerald-50 text-emerald-900",
    node: "border-emerald-700 bg-emerald-600 text-white",
    core: "border-amber-600 bg-amber-500 text-white",
    detail: "text-white/80",
    line: "text-emerald-600",
    num: "text-emerald-700",
  },
  sky: {
    source: "border-sky-400 bg-sky-50 text-sky-900",
    node: "border-sky-700 bg-sky-600 text-white",
    core: "border-slate-700 bg-slate-800 text-white",
    detail: "text-white/75",
    line: "text-sky-600",
    num: "text-sky-700",
  },
  amber: {
    source: "border-amber-400 bg-amber-50 text-amber-900",
    node: "border-amber-600 bg-amber-500 text-white",
    core: "border-violet-700 bg-violet-600 text-white",
    detail: "text-white/80",
    line: "text-amber-600",
    num: "text-amber-700",
  },
};

type Theme = (typeof themes)[DiagramTheme];

function Node({
  step,
  className,
  detailClass,
  number,
  numberClass,
}: {
  step: DiagramStep;
  className: string;
  detailClass?: string;
  number?: number;
  numberClass?: string;
}) {
  return (
    <div
      className={`rounded border px-3 py-1.5 text-center shadow-xs transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className="font-bold leading-tight">
        {number !== undefined && (
          <span className={`mr-1.5 ${numberClass ?? ""}`}>{String(number).padStart(2, "0")}</span>
        )}
        {step.step}
      </div>
      {step.detail && <div className={`mt-0.5 text-[9px] leading-snug ${detailClass ?? ""}`}>{step.detail}</div>}
    </div>
  );
}

function VLine({ theme }: { theme: Theme }) {
  return <div className={`flow-line-v h-4 w-0.5 shrink-0 ${theme.line}`} />;
}

// Garis hub: vertikal saat bertumpuk di HP, horizontal di layar lebar.
function HubLine({ theme }: { theme: Theme }) {
  return (
    <>
      <div className={`flow-line-v h-4 w-0.5 sm:hidden ${theme.line}`} />
      <div className={`flow-line-h hidden h-0.5 w-8 sm:block ${theme.line}`} />
    </>
  );
}

// Rantai vertikal: sumber → langkah-langkah → inti.
function StackLayout({ steps, theme }: { steps: DiagramStep[]; theme: Theme }) {
  return (
    <div className="flex w-full flex-col items-center">
      {steps.map((s, i) => {
        const cls =
          i === 0
            ? `rounded-full ${theme.source}`
            : i === steps.length - 1
              ? theme.core
              : theme.node;
        return (
          <div key={`${s.step}-${i}`} className="flex flex-col items-center">
            {i > 0 && <VLine theme={theme} />}
            <Node step={s} className={cls} detailClass={i === 0 ? "opacity-70" : theme.detail} />
          </div>
        );
      })}
    </div>
  );
}

// Pipeline bernomor: mengalir ke kanan di layar lebar, ke bawah di HP.
function PipelineLayout({ steps, theme }: { steps: DiagramStep[]; theme: Theme }) {
  return (
    <ol className="flex w-full flex-col items-stretch sm:flex-row sm:items-center">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={`${s.step}-${i}`} className="flex min-w-0 flex-1 flex-col items-center sm:flex-row">
            <Node
              step={s}
              number={i + 1}
              numberClass={last ? "opacity-70" : theme.num}
              className={`w-full min-w-0 ${last ? theme.core : "border-slate-300 bg-white text-slate-900"}`}
              detailClass={last ? theme.detail : "text-slate-500"}
            />
            {!last && (
              <>
                <div className={`flow-line-v h-3 w-0.5 shrink-0 sm:hidden ${theme.line}`} />
                <div className={`flow-line-h hidden h-0.5 w-3 shrink-0 sm:block ${theme.line}`} />
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// Hub: langkah awal sebagai masukan, satu inti di tengah, sisanya keluaran.
function HubLayout({ steps, theme }: { steps: DiagramStep[]; theme: Theme }) {
  const coreIndex = Math.floor((steps.length - 1) / 2);
  const inputs = steps.slice(0, coreIndex);
  const core = steps[coreIndex];
  const outputs = steps.slice(coreIndex + 1);
  return (
    <div className="flex w-full flex-col items-center sm:grid sm:grid-cols-[1fr_auto_1.2fr_auto_1fr] sm:items-center">
      <div className="flex w-full flex-col gap-2">
        {inputs.map((s, i) => (
          <Node key={`${s.step}-${i}`} step={s} className={`rounded-full ${theme.source}`} detailClass="opacity-70" />
        ))}
      </div>
      <HubLine theme={theme} />
      <div className="flex w-full flex-col items-center gap-1">
        <span className={`text-[9px] uppercase tracking-widest ${theme.num}`}>core</span>
        <Node step={core} className={`w-full py-3 ${theme.core}`} detailClass={theme.detail} />
      </div>
      <HubLine theme={theme} />
      <div className="flex w-full flex-col gap-2">
        {outputs.map((s, i) => (
          <Node key={`${s.step}-${i}`} step={s} className={theme.node} detailClass={theme.detail} />
        ))}
      </div>
    </div>
  );
}

export function ProjectDiagramWindow({
  title,
  architecture,
  index,
}: {
  title: string;
  architecture: unknown;
  index: number;
}) {
  const diagram = buildDiagram(architecture, index);
  const theme = themes[diagram.theme];
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-b-4 border-r-4 border-border bg-[#0d1219] shadow-2xl transition-transform duration-500 group-hover/image:-translate-y-1.5">
      <div className="flex h-6 items-center justify-between border-b border-border bg-[#17202b] px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <span className="truncate font-mono text-[10px] text-muted">
          {title} — architecture.{diagram.layout}
        </span>
        <span className="w-8" />
      </div>

      <div className="flex min-h-[15rem] w-full items-center justify-center bg-[#f8fafc] p-3 font-mono text-[10px] text-[#0f172a] sm:min-h-[17rem] sm:p-5 sm:text-[11px]">
        {diagram.steps.length === 0 ? (
          <p className="text-slate-500">{title}</p>
        ) : diagram.layout === "pipeline" ? (
          <PipelineLayout steps={diagram.steps} theme={theme} />
        ) : diagram.layout === "hub" ? (
          <HubLayout steps={diagram.steps} theme={theme} />
        ) : (
          <StackLayout steps={diagram.steps} theme={theme} />
        )}
      </div>
    </div>
  );
}
