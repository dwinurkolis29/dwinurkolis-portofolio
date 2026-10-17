export type TerminalContext = {
  name: string;
  role: string;
  email: string;
  projects: { name: string; slug: string }[];
  research: { title: string; stage: string }[];
  stack: string[];
};

export type CommandResult = { lines: string[]; clear: boolean };

export const COMMANDS = ["help", "whoami", "projects", "research", "stack", "contact", "clear"] as const;
type Command = (typeof COMMANDS)[number];

const DESCRIPTIONS: Record<Command, string> = {
  help: "list available commands",
  whoami: "who I am",
  projects: "selected projects",
  research: "current research",
  stack: "tools I work with",
  contact: "how to reach me",
  clear: "clear the screen",
};

const isCommand = (v: string): v is Command => (COMMANDS as readonly string[]).includes(v);

function output(command: Command, ctx: TerminalContext): string[] {
  switch (command) {
    case "help": {
      const width = Math.max(...COMMANDS.map((c) => c.length));
      return ["available commands:", ...COMMANDS.map((c) => `  ${c.padEnd(width)}  ${DESCRIPTIONS[c]}`)];
    }
    case "whoami":
      return [`${ctx.name} — ${ctx.role}`];
    case "projects":
      return ctx.projects.length
        ? ctx.projects.map((p) => `${p.name}  →  /projects/${p.slug}`)
        : ["no projects yet"];
    case "research":
      return ctx.research.length
        ? ctx.research.map((r) => `${r.title}  [${r.stage}]`)
        : ["no research yet"];
    case "stack":
      return [ctx.stack.join(", ")];
    case "contact":
      return [`email     ${ctx.email}`, `linkedin  ${ctx.name} (link in Contact)`];
    case "clear":
      return [];
  }
}

export function runCommand(input: string, ctx: TerminalContext): CommandResult {
  const normalized = input.trim().replace(/\s+/g, " ").toLowerCase();
  if (!normalized) return { lines: [], clear: false };
  if (!isCommand(normalized)) return { lines: [`command not found: ${normalized} — try help`], clear: false };
  return { lines: output(normalized, ctx), clear: normalized === "clear" };
}
