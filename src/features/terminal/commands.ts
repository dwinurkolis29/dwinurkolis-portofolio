import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";

export type TerminalContext = {
  name: string;
  role: string;
  email: string;
  projects: { name: string; slug: string }[];
  research: { title: string; stage: string }[];
  stack: string[];
};

export type TerminalStrings = Dictionary["terminal"];
export type CommandResult = { lines: string[]; clear: boolean };

// Nama perintah tetap sama di semua bahasa; hanya deskripsi dan pesan yang diterjemahkan.
export const COMMANDS = ["help", "whoami", "projects", "research", "stack", "contact", "clear"] as const;
type Command = (typeof COMMANDS)[number];

const isCommand = (v: string): v is Command => (COMMANDS as readonly string[]).includes(v);

function output(command: Command, ctx: TerminalContext, t: TerminalStrings, lang: string): string[] {
  switch (command) {
    case "help": {
      const width = Math.max(...COMMANDS.map((c) => c.length));
      return [t.available, ...COMMANDS.map((c) => `  ${c.padEnd(width)}  ${t.descriptions[c]}`)];
    }
    case "whoami":
      return [`${ctx.name} — ${ctx.role}`];
    case "projects":
      return ctx.projects.length
        ? ctx.projects.map((p) => `${p.name}  →  /${lang}/projects/${p.slug}`)
        : [t.noProjects];
    case "research":
      return ctx.research.length
        ? ctx.research.map((r) => `${r.title}  [${r.stage}]`)
        : [t.noResearch];
    case "stack":
      return [ctx.stack.join(", ")];
    case "contact":
      return [`email     ${ctx.email}`, `linkedin  ${ctx.name} (${t.linkedinNote})`];
    case "clear":
      return [];
  }
}

export function runCommand(
  input: string,
  ctx: TerminalContext,
  t: TerminalStrings,
  lang = "en",
): CommandResult {
  const normalized = input.trim().replace(/\s+/g, " ").toLowerCase();
  if (!normalized) return { lines: [], clear: false };
  if (!isCommand(normalized)) {
    return { lines: [format(t.unknown, { command: normalized })], clear: false };
  }
  return { lines: output(normalized, ctx, t, lang), clear: normalized === "clear" };
}
