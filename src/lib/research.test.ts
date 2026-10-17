import { test, expect } from "vitest";
import { stageBar, formatMonth, mapResearch, type Research } from "./research";

const fb: Research[] = [{ slug: "local", title: "Local", summary: "", stage: "proposal", institution: "", supervisor: "", methods: [], datasets: [], relatedProjectSlug: "", links: [], updates: [] }];

test("stageBar", () => {
  expect(stageBar("proposal")).toBe("[■□□□□]");
  expect(stageBar("modeling")).toBe("[■■■□□]");
  expect(stageBar("published")).toBe("[■■■■■]");
  expect(stageBar("something_else")).toBeNull();
});
test("formatMonth", () => expect(formatMonth("2026-10-01")).toBe("2026-10"));
test("falls back when rows are null", () => expect(mapResearch(null, null, fb)).toBe(fb));
test("hides unpublished rows; empty published list returns []", () => {
  expect(mapResearch([{ slug: "a", title: "A", stage: "proposal", published: false }], [], fb)).toEqual([]);
});
test("empty optional fields", () => {
  const [r] = mapResearch([{ slug: "a", title: "A", stage: "proposal" }], null, fb);
  expect(r).toMatchObject({ summary: "", supervisor: "", methods: [], datasets: [], links: [], updates: [], relatedProjectSlug: "" });
});
test("sanitizes links", () => {
  const [r] = mapResearch([{ slug: "a", title: "A", stage: "proposal", links: [
    { label: "Paper", url: "https://x.org/p" }, { label: "Bad", url: "javascript:alert(1)" }, { label: "No url" } ] }], [], fb);
  expect(r.links).toEqual([{ label: "Paper", url: "https://x.org/p" }]);
  const [r2] = mapResearch([{ slug: "a", title: "A", stage: "proposal", links: { label: "x" } }], [], fb);
  expect(r2.links).toEqual([]);
});
test("attaches updates by slug, newest first (date desc, then id desc)", () => {
  const [r] = mapResearch([{ slug: "a", title: "A", stage: "proposal" }], [
    { id: 1, research_slug: "a", date: "2026-10-01", note: "old" },
    { id: 3, research_slug: "a", date: "2026-11-01", note: "new" },
    { id: 2, research_slug: "a", date: "2026-11-01", note: "new-earlier-id" },
    { id: 4, research_slug: "b", date: "2026-12-01", note: "other" },
  ], fb);
  expect(r.updates.map((u) => u.note)).toEqual(["new", "new-earlier-id", "old"]);
});
