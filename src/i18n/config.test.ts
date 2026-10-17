import { expect, test } from "vitest";
import { getDictionary } from "./dictionaries";
import { hasLocale, localePath, negotiateLocale, swapLocale } from "./config";
import { format } from "./format";

test("negotiateLocale falls back to English", () => {
  expect(negotiateLocale(null)).toBe("en");
  expect(negotiateLocale("fr-FR,de;q=0.8")).toBe("en");
});

test("negotiateLocale respects order and q-values", () => {
  expect(negotiateLocale("id-ID,id;q=0.9,en;q=0.8")).toBe("id");
  expect(negotiateLocale("en-US,en;q=0.9,id;q=0.8")).toBe("en");
  expect(negotiateLocale("en;q=0.4,id;q=0.9")).toBe("id");
});

test("hasLocale only accepts supported locales", () => {
  expect(hasLocale("id")).toBe(true);
  expect(hasLocale("fr")).toBe(false);
  expect(hasLocale(undefined)).toBe(false);
});

test("swapLocale replaces or adds the prefix", () => {
  expect(swapLocale("/en", "id")).toBe("/id");
  expect(swapLocale("/id/projects/broilerku", "en")).toBe("/en/projects/broilerku");
  expect(swapLocale("/projects", "id")).toBe("/id/projects");
  expect(swapLocale("/", "en")).toBe("/en");
});

test("localePath prefixes paths and keeps hashes", () => {
  expect(localePath("id")).toBe("/id");
  expect(localePath("id", "/projects")).toBe("/id/projects");
  expect(localePath("en", "/#contact")).toBe("/en#contact");
  expect(localePath("en", "/projects/x")).toBe("/en/projects/x");
});

test("format fills placeholders and leaves unknown ones", () => {
  expect(format("Hi {name} {x}", { name: "Kolis" })).toBe("Hi Kolis {x}");
});

test("every dictionary key exists in both languages", () => {
  const keys = (o: unknown, prefix = ""): string[] =>
    o && typeof o === "object"
      ? Object.entries(o).flatMap(([k, v]) => keys(v, `${prefix}${k}.`))
      : [prefix];
  const stages = (l: "en" | "id") => Object.keys(getDictionary(l).research.stages).sort();
  expect(keys(getDictionary("id"))).toEqual(keys(getDictionary("en")));
  expect(stages("id")).toEqual(stages("en"));
});
