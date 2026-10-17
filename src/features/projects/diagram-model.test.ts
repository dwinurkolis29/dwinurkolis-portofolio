import { expect, test } from "vitest";
import { buildDiagram } from "./diagram-model";

const arch = [
  { step: "A", detail: "a" },
  { step: "B", detail: "b" },
  { step: "C", detail: "c" },
  { step: "D", detail: "d" },
];

test("uses the project's own steps", () => {
  expect(buildDiagram(arch, 0).steps.map((s) => s.step)).toEqual(["A", "B", "C", "D"]);
});

test("adjacent projects get different layouts and themes", () => {
  const [a, b, c] = [0, 1, 2].map((i) => buildDiagram(arch, i));
  expect(new Set([a.layout, b.layout, c.layout]).size).toBe(3);
  expect(new Set([a.theme, b.theme, c.theme]).size).toBe(3);
});

test("drops malformed steps and caps the count", () => {
  const messy = [{ step: "  X ", detail: 1 }, { detail: "no step" }, null, "str", ...arch, ...arch];
  const d = buildDiagram(messy, 0);
  expect(d.steps[0]).toEqual({ step: "X", detail: "" });
  expect(d.steps).toHaveLength(6);
});

test("non-array or short architecture falls back to the stack layout", () => {
  expect(buildDiagram({ step: "A" }, 1)).toMatchObject({ layout: "stack", steps: [] });
  expect(buildDiagram(arch.slice(0, 2), 1).layout).toBe("stack");
  expect(buildDiagram(arch, -3).layout).toBe("stack");
});
