export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

// Memilih bahasa dari header Accept-Language, diurutkan menurut nilai q.
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((l) => l.tag && l.tag !== "*" && l.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (hasLocale(primary)) return primary;
  }
  return defaultLocale;
}

// "/id/projects/x" → "/en/projects/x"; path tanpa prefix bahasa ikut diberi prefix.
export function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (hasLocale(segments[0])) segments.shift();
  return `/${[next, ...segments].join("/")}`;
}

export function localePath(lang: Locale, path = "/"): string {
  const hashIndex = path.search(/[#?]/);
  const pathname = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const suffix = hashIndex === -1 ? "" : path.slice(hashIndex);
  return `/${lang}${pathname === "/" ? "" : pathname}${suffix}`;
}
