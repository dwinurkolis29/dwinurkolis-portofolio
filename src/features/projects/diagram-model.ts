export type DiagramStep = { step: string; detail: string };

export const DIAGRAM_LAYOUTS = ["stack", "pipeline", "hub"] as const;
export type DiagramLayout = (typeof DIAGRAM_LAYOUTS)[number];

export const DIAGRAM_THEMES = ["violet", "emerald", "sky", "amber"] as const;
export type DiagramTheme = (typeof DIAGRAM_THEMES)[number];

export type Diagram = {
  layout: DiagramLayout;
  theme: DiagramTheme;
  steps: DiagramStep[];
};

const MAX_STEPS = 6;

// Bentuk dan warna diagram dipilih dari urutan project, sehingga project yang
// berdampingan selalu tampil berbeda; isinya dari kolom `architecture`.
export function buildDiagram(architecture: unknown, index: number): Diagram {
  const steps = (Array.isArray(architecture) ? architecture : [])
    .map((n) => ({
      step: typeof n?.step === "string" ? n.step.trim() : "",
      detail: typeof n?.detail === "string" ? n.detail.trim() : "",
    }))
    .filter((n) => n.step)
    .slice(0, MAX_STEPS);
  const i = Number.isInteger(index) && index >= 0 ? index : 0;
  return {
    layout: steps.length < 3 ? "stack" : DIAGRAM_LAYOUTS[i % DIAGRAM_LAYOUTS.length],
    theme: DIAGRAM_THEMES[i % DIAGRAM_THEMES.length],
    steps,
  };
}
