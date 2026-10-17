# Interactive Portfolio + Research Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio home page interactive (typing hero, mouse parallax, orbiting icons, typeable `ask_dwi` terminal, scroll-driven topic headline, scroll reveal) and add a Supabase-backed Research section under Projects plus a Google Play link for BroilerKu.

**Architecture:** `src/app/page.tsx` stays a Server Component (`revalidate = 60`). Every interaction is a small `"use client"` component that wraps server-rendered content, so all text is present without JS. Pure logic (research row mapping, stage bar, terminal command resolution) lives in plain TS modules covered by Vitest; UI is verified in the browser.

**Tech Stack:** Next.js 16.3.8 App Router, React 19.2, Tailwind v4, Supabase JS, Vitest (new dev dependency, tests only).

**Spec:** `docs/superpowers/specs/2026-10-17-interactive-portfolio-research-design.md`

## Global Constraints

- Read the relevant guide in `node_modules/next/dist/docs/` before writing Next code (`AGENTS.md`); at least `01-app/01-getting-started/05-server-and-client-components.md`.
- No new runtime dependencies. No three.js, no animation libraries. Vitest (+ nothing else) as a devDependency only.
- Do not copy eltrovert assets, copy or brand (no astronaut, no "TRAVERSING UNKNOWN DOMAIN", no "El").
- Every motion effect is disabled under `prefers-reduced-motion: reduce`; all text is readable with JS disabled.
- Parallax only for `(pointer: fine)`.
- UI copy in English. Colors only from existing tokens in `src/app/globals.css` (`background surface border foreground muted accent accent-2`).
- SQL files are run by the owner by hand: idempotent (`if not exists`, `on conflict do nothing`), RLS public read like `supabase/profile.sql`.
- BroilerKu Play Store URL, exactly: `https://play.google.com/store/apps/details?id=com.chickin.mobile`
- Research stages, in order: `proposal`, `data_collection`, `modeling`, `writing`, `published`.
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. Supabase reachable but `research` tables not migrated yet → home page still shows the local research seed, and everything else still comes from Supabase. (Task 1 test `falls back when rows are null`; Task 2 manual check.)
2. A research row with only `title` and `stage` filled → card shows title + stage bar only, no empty headings/lists. (Task 1 test `empty optional fields`; Task 3 browser check.)
3. Owner pastes bad data into `links` jsonb (an object instead of an array, missing url, `javascript:` url) → bad entries are dropped, page does not crash. (Task 1 test `sanitizes links`.)
4. Terminal input with odd casing/whitespace (`"  HELP "`) or empty input → treated as `help` / produces no output. (Task 4 tests.)
5. Reduced motion or touch device → nothing moves, nothing stays hidden. (Task 5/6 browser checks with emulated reduced motion and mobile preset.)

---

### Task 1: Test setup + research domain module

**Files:**
- Modify: `package.json` (add `vitest` devDependency, script `"test": "vitest run"`)
- Create: `vitest.config.ts` (node environment, alias `@` → `./src`)
- Create: `src/lib/research.ts`
- Test: `src/lib/research.test.ts`

**Interfaces:**
- Produces (all exported from `src/lib/research.ts`, no imports from `@/data`):
  - `type ResearchLink = { label: string; url: string }`
  - `type ResearchUpdate = { date: string; note: string }` (`date` = ISO `YYYY-MM-DD`)
  - `type Research = { slug: string; title: string; summary: string; stage: string; institution: string; supervisor: string; methods: string[]; datasets: string[]; relatedProjectSlug: string; links: ResearchLink[]; updates: ResearchUpdate[] }`
  - `const RESEARCH_STAGES = ["proposal","data_collection","modeling","writing","published"] as const`
  - `stageBar(stage: string): string | null` — `"[■□□□□]"` for proposal … `"[■■■■■]"` for published; unknown → `null`
  - `formatMonth(date: string): string` — `"2026-10-01"` → `"2026-10"`
  - `mapResearch(rows: Record<string, unknown>[] | null, updateRows: Record<string, unknown>[] | null, fallback: Research[]): Research[]`

- [ ] **Step 1: Install Vitest and add config/script**

Run: `npm i -D vitest` then add the script and `vitest.config.ts`.

- [ ] **Step 2: Write failing tests in `src/lib/research.test.ts`**

```ts
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
```

- [ ] **Step 3: Run `npm test` — expect FAIL (module not found)**

- [ ] **Step 4: Implement `src/lib/research.ts`**

Map snake_case columns (`related_project_slug`, `research_slug`) to the camelCase type; rows sorted as given (query already orders by `sort_order`); `updateRows === null` → every `updates: []`; `stage` empty → `"proposal"`; links kept only if `label` is a non-empty string and `url` starts with `http://` or `https://`.

- [ ] **Step 5: Run `npm test` — expect PASS**

- [ ] **Step 6: Commit** — `git add package.json package-lock.json vitest.config.ts src/lib/research.ts src/lib/research.test.ts && git commit -m "feat(research): research domain model and mapping"`

---

### Task 2: Data layer — migration, local seed, loader

**Files:**
- Create: `supabase/research-migration.sql`
- Modify: `src/data/profile.ts` (add `storeUrl` to all 3 projects; add `research` export)
- Modify: `src/lib/profile-data.ts`

**Interfaces:**
- Consumes: `Research`, `mapResearch` from Task 1.
- Produces:
  - `type Project = (typeof local.projects)[number] & { status: string; storeUrl: string }`
  - `ProfileData.research: Research[]`
  - `export const research: Research[]` in `src/data/profile.ts`

- [ ] **Step 1: Write `supabase/research-migration.sql`**

Tables `public.research` and `public.research_updates` exactly as in the spec's "Model data Research" tables (`create table if not exists`; `research_updates.research_slug references public.research(slug) on delete cascade`). RLS enable + `grant select` + policy `"publik boleh membaca"` for both (wrap `create policy` in a `do $$ … if not exists (select 1 from pg_policies …)` guard so re-runs don't fail). `alter table public.projects add column if not exists store_url text;` then `update public.projects set store_url = '<Play Store URL>' where slug = 'broilerku' and store_url is null;`. Seed research row with `on conflict (slug) do nothing`, seed update with `insert … select … where not exists (same slug, date, note)`.

Seed values (same in SQL and local):
- slug `broiler-fcr-prediction`, title `Predicting Feed Conversion Ratio (FCR) in Broiler Farms`, stage `proposal`, institution `Universitas Islam Indonesia – Master of Informatics (Data Science)`, related_project_slug `broilerku`
- summary: `Master's research on predicting broiler feed conversion ratio from farm records, building on the daily feed and flock data I worked with while building BroilerKu.`
- update: date `2026-10-01`, note `Started the master's research; defining the problem and reviewing literature on FCR prediction.`

- [ ] **Step 2: Update `src/data/profile.ts`** — `storeUrl` = Play Store URL on `broilerku`, `""` on the other two; add the `research` export (typed `Research[]` via `import type`).

- [ ] **Step 3: Update `src/lib/profile-data.ts`**

Fallback gets `research: local.research` and projects keep their local `storeUrl`. `mapProjects` reads `storeUrl: str(r.store_url)`. Add `db.from("research").select("*").order("sort_order")` and `db.from("research_updates").select("*")` to the existing `Promise.all`, but **not** to the `failed` check; set `research: mapResearch(res.error ? null : res.data, upd.error ? null : upd.data, local.research)`.

- [ ] **Step 4: Verify** — `npm test && npm run lint && npm run build` all pass. Then `npm run dev`, load `/`: page renders (research not shown yet — that is Task 3) and server log has no errors, with the real `.env.local` (tables not migrated yet → fallback path).

- [ ] **Step 5: Commit** — `feat(research): supabase migration, local seed and loader`

---

### Task 3: Research section UI + Google Play link

**Files:**
- Create: `src/components/store-badge.tsx` — `StoreBadge({ url }: { url: string })`, renders nothing when `url` is empty; an `<a target="_blank" rel="noopener noreferrer">` styled like the existing outline button, text `Get it on Google Play ↗`.
- Create: `src/features/research/research-section.tsx` — `ResearchSection({ research, projects }: { research: Research[]; projects: Project[] })` (server component).
- Modify: `src/app/page.tsx` — nav adds `{ href: "#research", label: "Research" }` after Projects; render `<Section id="research" eyebrow="Research" title="What I'm investigating">` right after Projects, only when `research.length > 0`.
- Modify: `src/features/projects/project-showcase.tsx` — `<StoreBadge url={p.storeUrl} />` next to the View Project button; button label becomes `> View Project_`.
- Modify: `src/app/projects/[slug]/page.tsx` — `<StoreBadge url={project.storeUrl} />` in the header area near the title.

**Interfaces:** Consumes `Research`, `stageBar`, `formatMonth` (Task 1), `Project.storeUrl`, `ProfileData.research` (Task 2).

- [ ] **Step 1: Build `ResearchSection`** per the spec's "Section Research" bullets: window-style card (reuse the look of `Window` in `page.tsx` — move `Window` to `src/components/window.tsx` if you need it in both files); top line institution · stage; stage bar `stageBar(stage)` + stage name (bar omitted when `null`); summary; supervisor; method/dataset tags; links; "Related project: {name} ↗" to `/projects/{slug}` plus `StoreBadge` — only when the related project exists in `projects`; changelog `formatMonth(date) · note`. Any empty field or list renders nothing (no heading either).
- [ ] **Step 2: Wire into page, project card and detail page** as listed above.
- [ ] **Step 3: Verify in browser** (`npm run dev`, built-in browser): Research appears between Projects and Stack with the seed data; stage bar `[■□□□□] proposal`; Related project link goes to `/projects/broilerku`; Play badge on BroilerKu card and detail page opens the Play Store URL; no badge on other projects. Temporarily blank `summary` and `updates` in the local seed to confirm no empty headings appear, then restore. `npm run lint && npm run build` pass.
- [ ] **Step 4: Commit** — `feat(research): research section and Google Play link`

---

### Task 4: `ask_dwi` terminal

**Files:**
- Create: `src/features/terminal/commands.ts`
- Test: `src/features/terminal/commands.test.ts`
- Create: `src/features/terminal/ask-terminal.tsx` (`"use client"`)
- Modify: `src/app/page.tsx` — replace the "ask_ai --about=me / soon" note with `<AskTerminal context={…} />` built from `getProfileData()` data.

**Interfaces:**
- Produces:
  - `type TerminalContext = { name: string; role: string; email: string; linkedin: string; projects: { name: string; slug: string }[]; research: { title: string; stage: string }[]; stack: string[] }`
  - `type CommandResult = { lines: string[]; clear: boolean }`
  - `runCommand(input: string, ctx: TerminalContext): CommandResult`
  - `COMMANDS = ["help","whoami","projects","research","stack","contact","clear"] as const`

- [ ] **Step 1: Write failing tests**

```ts
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
```

- [ ] **Step 2: `npm test` — FAIL**; **Step 3: implement `runCommand`**; **Step 4: `npm test` — PASS**
- [ ] **Step 5: Build `AskTerminal({ context }: { context: TerminalContext })`** — window-styled; history shows the echoed prompt `> {input}` plus result lines, last ~8 entries; `<form>` with a labelled `<input aria-label="Terminal command">` and placeholder `type help`; `clear` empties history; initial server-rendered history is the output of `help` (so no-JS shows it); output region `aria-live="polite"`.
- [ ] **Step 6: Verify in browser** — type `help`, `whoami`, `projects`, `research`, `contact`, `clear`, `foo`; works with keyboard only. Lint + build pass.
- [ ] **Step 7: Commit** — `feat(hero): interactive ask_dwi terminal`

---

### Task 5: Hero motion — typing, parallax, orbit, scroll reveal

**Files:**
- Create: `src/components/motion/use-reduced-motion.ts` — `useReducedMotion(): boolean`
- Create: `src/components/motion/typewriter.tsx` — `Typewriter({ text, className }: { text: string; className?: string })`
- Create: `src/components/motion/parallax.tsx` — `ParallaxGroup({ children, className })` and `ParallaxLayer({ depth, children, className }: { depth: number; … })`
- Create: `src/components/motion/reveal.tsx` — `Reveal({ children, className, delay? }: { …; delay?: number })`
- Create: `src/features/hero/orbit-icons.tsx` — inline SVG icons (Android, Kotlin, Flutter, Python, Firebase) placed on the existing rings.
- Modify: `src/app/globals.css`, `src/app/page.tsx`

**Behavior (decided):**
- `Typewriter` renders the full `text` on the server and on first client render (so no empty flash, and the accessible name is always full via `aria-label`); after mount, unless reduced motion, it resets the visible count to 0 and types ~60 ms/char. Used for `Kolis` in the hero `h1`; the existing `.cursor` stays.
- `ParallaxGroup` listens to `pointermove` only when `matchMedia("(pointer: fine)")` matches and reduced motion is off; it sets CSS vars `--px`/`--py` in [-1, 1] on itself (throttled with `requestAnimationFrame`). `ParallaxLayer` applies `translate: calc(var(--px,0) * depth * 1px) calc(var(--py,0) * depth * 1px)` — the CSS `translate` property, **not** `transform`, so it composes with the existing `.float` keyframes. Pilot image depth 10, windows depths 18–28, orbit icons 14.
- Orbit: a `@keyframes orbit` rotation on a ring wrapper with counter-rotation on each icon so icons stay upright; ~40 s per turn; disabled under reduced motion (add to the existing reduced-motion block).
- `Reveal` renders visible on the server; on mount, if the element is below the viewport and motion is allowed, it sets `data-hidden` and observes with `IntersectionObserver` (threshold 0.15), removing `data-hidden` once seen, then disconnects. CSS: `[data-reveal][data-hidden]{opacity:0;translate:0 24px}` with a 600 ms transition. Wrap each `Section` body and each project/research card.

- [ ] **Step 1: Implement the hook and the four components + CSS**
- [ ] **Step 2: Wire into `page.tsx`** (hero h1, hero visual column, sections, cards).
- [ ] **Step 3: Verify in browser** — mouse moves shift layers; icons orbit; name types once; sections fade in on scroll. Reduced motion cannot be emulated in the browser pane: read the code path instead (every component returns early when `useReducedMotion()` is true, and every new keyframe class is listed in the `@media (prefers-reduced-motion: reduce)` block). Mobile preset (375px): no horizontal scroll, no parallax, all content visible. No-JS: `curl -s localhost:3000 | grep -c "What I&#x27;m investigating\|Kolis"` finds the text in server HTML. Lint + build pass.
- [ ] **Step 4: Commit** — `feat(hero): typing, parallax, orbit and scroll reveal`

---

### Task 6: Scroll-driven topic section

**Files:**
- Create: `src/features/topics/topic-section.tsx` — server component with title copy + 3 cards.
- Create: `src/features/topics/scroll-headline.tsx` — `ScrollHeadline({ text }: { text: string })` (`"use client"`).
- Modify: `src/app/page.tsx` — insert between hero and Experience.

**Behavior (decided):**
- Headline text `FROM MOBILE TO MODELS`, giant mono type (`text-[12vw]`, `overflow-hidden` container so no horizontal page scroll). Progress `p` ∈ [0,1] = how far the section has travelled through the viewport (scroll listener + rAF, passive). Apply `translate: calc((0.5 - p) * 30vw) 0` and opacity `1 - |p - 0.5|`; a faint outlined duplicate behind it moves the opposite way. Reduced motion: static, full opacity.
- Below it a mono tag `[ SYSTEM_LOG: MOBILE_TO_DATA ]` and one sentence: `// How I move from shipping secure Android apps to building models that learn from the data those apps collect.`
- Three cards (`grid sm:grid-cols-3`), each with an inline icon, label, title, one-line description and `> EXPLORE_` link; hover: `border-accent/40` + glow like project cards.
  - Mobile Engineering → `#projects` — "Native Android & Flutter apps in production."
  - Mobile Security → `/projects/android-security-research` — "Reverse engineering and app security assessments."
  - Data Science → `#research` — "Master's research on predicting broiler FCR."

- [ ] **Step 1: Implement both components**
- [ ] **Step 2: Wire into page**
- [ ] **Step 3: Verify in browser** — headline slides/fades while scrolling; links go to the right places; at 375px no horizontal scroll (`document.documentElement.scrollWidth === innerWidth` via `javascript_tool`). Lint + build pass.
- [ ] **Step 4: Commit** — `feat(home): scroll-driven topic section`

---

### Task 7: Final verification

- [ ] **Step 1:** `npm test && npm run lint && npm run build` — all pass.
- [ ] **Step 2:** Browser pass at desktop and `mobile` preset over the whole home page, `/projects`, `/projects/broilerku`: no console errors (`read_console_messages onlyErrors`), no horizontal scroll, every Review Focus item rechecked.
- [ ] **Step 3:** Run once with Supabase env vars unset (`NEXT_PUBLIC_SUPABASE_URL= npm run dev`) → Research still shows from the local seed.
- [ ] **Step 4:** Report to the owner that `supabase/research-migration.sql` must be run in the Supabase SQL editor, and how to add a progress entry (insert a row in `research_updates`).
