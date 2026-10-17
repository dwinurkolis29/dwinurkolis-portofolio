export type ResearchLink = { label: string; url: string };
export type ResearchUpdate = { date: string; note: string };
export type Research = {
  slug: string;
  title: string;
  summary: string;
  stage: string;
  institution: string;
  supervisor: string;
  methods: string[];
  datasets: string[];
  relatedProjectSlug: string;
  links: ResearchLink[];
  updates: ResearchUpdate[];
};

export const RESEARCH_STAGES = [
  "proposal",
  "data_collection",
  "modeling",
  "writing",
  "published",
] as const;

export function stageBar(stage: string): string | null {
  const i = (RESEARCH_STAGES as readonly string[]).indexOf(stage);
  if (i < 0) return null;
  return `[${"■".repeat(i + 1)}${"□".repeat(RESEARCH_STAGES.length - i - 1)}]`;
}

export function formatMonth(date: string): string {
  return date.slice(0, 7);
}

type Row = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

function mapLinks(v: unknown): ResearchLink[] {
  if (!Array.isArray(v)) return [];
  const out: ResearchLink[] = [];
  for (const l of v) {
    if (!l || typeof l !== "object") continue;
    const { label, url } = l as Row;
    if (
      typeof label === "string" &&
      label !== "" &&
      typeof url === "string" &&
      /^https?:\/\//.test(url)
    ) {
      out.push({ label, url });
    }
  }
  return out;
}

function numId(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function mapUpdates(slug: string, updateRows: Row[] | null): ResearchUpdate[] {
  if (!updateRows) return [];
  return updateRows
    .filter((u) => u.research_slug === slug && str(u.note) !== "")
    .sort((a, b) => {
      const d = str(b.date).localeCompare(str(a.date));
      if (d !== 0) return d;
      return numId(b.id) - numId(a.id);
    })
    .map((u) => ({ date: str(u.date), note: str(u.note) }));
}

export function mapResearch(
  rows: Row[] | null,
  updateRows: Row[] | null,
  fallback: Research[],
): Research[] {
  if (rows === null) return fallback;
  return rows
    .filter((r) => r.published !== false && str(r.slug) !== "" && str(r.title) !== "")
    .map((r) => {
      const slug = str(r.slug);
      return {
        slug,
        title: str(r.title),
        summary: str(r.summary),
        stage: str(r.stage) || "proposal",
        institution: str(r.institution),
        supervisor: str(r.supervisor),
        methods: strArr(r.methods),
        datasets: strArr(r.datasets),
        relatedProjectSlug: str(r.related_project_slug),
        links: mapLinks(r.links),
        updates: mapUpdates(slug, updateRows),
      };
    });
}
