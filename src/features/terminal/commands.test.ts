import { test, expect } from "vitest";
import { COMMANDS, runCommand, type TerminalContext } from "./commands";

const ctx: TerminalContext = { name: "Dwi", role: "Android Engineer", email: "a@b.c", linkedin: "https://l.in/x",
  projects: [{ name: "BroilerKu", slug: "broilerku" }], research: [{ title: "FCR", stage: "proposal" }], stack: ["Kotlin"] };
test("help lists every command", () => { const out = runCommand("help", ctx).lines.join("\n"); for (const c of COMMANDS) expect(out).toContain(c); });
test("normalizes case and whitespace", () => expect(runCommand("  HELP ", ctx)).toEqual(runCommand("help", ctx)));
test("empty input yields nothing", () => expect(runCommand("   ", ctx)).toEqual({ lines: [], clear: false }));
test("whoami uses context", () => expect(runCommand("whoami", ctx).lines.join(" ")).toContain("Android Engineer"));
test("projects lists names and paths", () => expect(runCommand("projects", ctx).lines.join(" ")).toContain("/projects/broilerku"));
test("research shows title and stage", () => expect(runCommand("research", ctx).lines.join(" ")).toMatch(/FCR.*proposal/));
test("contact shows email", () => expect(runCommand("contact", ctx).lines.join(" ")).toContain("a@b.c"));
test("clear", () => expect(runCommand("clear", ctx)).toEqual({ lines: [], clear: true }));
test("unknown", () => expect(runCommand("sudo rm", ctx).lines).toEqual(["command not found: sudo rm — try help"]));
