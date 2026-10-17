import { test, expect } from "vitest";
import { COMMANDS, runCommand as run, type TerminalContext } from "./commands";
import { en } from "@/i18n/dictionaries/en";
import { id } from "@/i18n/dictionaries/id";

const runCommand = (input: string, c: TerminalContext) => run(input, c, en.terminal);

const ctx: TerminalContext = { name: "Dwi", role: "Android Engineer", email: "a@b.c",
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

test("contact names LinkedIn without exposing the profile URL", () => {
  const out = runCommand("contact", ctx).lines.join(" ");
  expect(out).toContain("linkedin  Dwi");
  expect(out).not.toContain("http");
});

test("projects link to the active language", () =>
  expect(run("projects", ctx, id.terminal, "id").lines.join(" ")).toContain("/id/projects/broilerku"));

test("help is translated but keeps the command names", () => {
  const out = run("help", ctx, id.terminal, "id").lines.join("\n");
  expect(out).toContain(id.terminal.available);
  for (const c of COMMANDS) expect(out).toContain(c);
});

test("unknown command message is translated", () =>
  expect(run("sudo", ctx, id.terminal, "id").lines).toEqual(["perintah tidak ditemukan: sudo — coba help"]));
