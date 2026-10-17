import { createClient } from "@supabase/supabase-js";
import * as local from "@/data/profile";
import { defaultLocale, type Locale } from "@/i18n/config";
import { localizeProfileData } from "@/lib/localize";
import { mapResearch, type Research } from "@/lib/research";

export type Project = (typeof local.projects)[number] & { status: string; storeUrl: string };

export type ProfileData = {
  profile: typeof local.profile;
  experience: typeof local.experience;
  projects: Project[];
  skills: typeof local.skills;
  education: typeof local.education;
  achievements: typeof local.achievements;
  retrospective: typeof local.retrospective;
  research: Research[];
  source: "supabase" | "local";
};

const fallback: ProfileData = {
  profile: local.profile,
  experience: local.experience,
  projects: local.projects.map((p) => ({ ...p, status: "completed" })),
  skills: local.skills,
  education: local.education,
  achievements: local.achievements,
  retrospective: local.retrospective,
  research: local.research,
  source: "local",
};

type Row = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v : "");
const strList = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
const slugify = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Semua isi project dibaca dari Supabase. Jika kolom baru belum dimigrasi
// (supabase/projects-migration.sql), pakai data lokal agar halaman tetap jalan.
function mapProjects(rows: Row[]): Project[] {
  if (!rows.some((r) => r.slug)) return fallback.projects;
  return rows
    .filter((r) => r.published !== false)
    .map((r) => ({
      slug: str(r.slug) || slugify(str(r.name)),
      year: str(r.year),
      name: str(r.name),
      headlineTitle: str(r.headline_title) || str(r.name),
      category: str(r.category),
      impact: str(r.impact),
      description: str(r.description),
      laymanSummary: str(r.layman_summary),
      problem: str(r.problem),
      outcome: str(r.outcome),
      tags: strList(r.tags),
      highlights: strList(r.highlights),
      architecture: (Array.isArray(r.architecture) ? r.architecture : []) as Project["architecture"],
      decisions: strList(r.decisions),
      codeTitle: str(r.code_title),
      codeSnippet: strList(r.code_snippet),
      screens: (Array.isArray(r.screens) ? r.screens : []) as Project["screens"],
      status: str(r.status) || "completed",
      storeUrl: str(r.store_url),
    }));
}

const CACHE_TTL_MS = 60_000;
let cachedResult: { data: ProfileData; expiresAt: number } | null = null;

export async function getProfileData(lang: Locale = defaultLocale): Promise<ProfileData> {
  return localizeProfileData(await getBaseProfileData(), lang);
}

async function getBaseProfileData(): Promise<ProfileData> {
  if (cachedResult && Date.now() < cachedResult.expiresAt) {
    return cachedResult.data;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallback;

  try {
    const db = createClient(url, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            signal: AbortSignal.timeout(1500),
          }),
      },
    });
    const [profile, experience, projects, skills, education, achievements, retro, res, upd] =
      await Promise.all([
        db.from("profile").select("*").eq("id", 1).single(),
        db.from("experience").select("*").order("sort_order"),
        db.from("projects").select("*").order("sort_order"),
        db.from("skill_groups").select("*").order("sort_order"),
        db.from("education").select("*").order("sort_order"),
        db.from("achievements").select("*").order("sort_order"),
        db.from("retrospective").select("*").order("sort_order"),
        db.from("research").select("*").order("sort_order"),
        db.from("research_updates").select("*"),
      ]);

    const failed = [profile, experience, projects, skills, education, achievements, retro].find(
      (r) => r.error || !r.data,
    );
    if (failed) {
      cachedResult = { data: fallback, expiresAt: Date.now() + CACHE_TTL_MS };
      return fallback;
    }

    const p = profile.data!;
    const result: ProfileData = {
      profile: {
        ...local.profile,
        name: p.name,
        role: p.role,
        status: p.status ?? local.profile.status,
        summary: p.summary ?? local.profile.summary,
        location: p.location ?? local.profile.location,
        email: p.email ?? local.profile.email,
        linkedin: p.linkedin ?? local.profile.linkedin,
      },
      experience: experience.data!.map((e) => ({
        company: e.company,
        place: e.place ?? "",
        title: e.title,
        period: e.period ?? "",
        points: e.points ?? [],
      })),
      projects: mapProjects(projects.data!),
      skills: skills.data!.map((e) => ({ group: e.group_name, items: e.items ?? [] })),
      education: education.data!.map((e) => ({
        school: e.school,
        place: e.place ?? "",
        degree: e.degree,
        period: e.period ?? "",
        note: e.note ?? "",
      })),
      achievements: achievements.data!.map((e) => ({ year: e.year ?? "", name: e.name })),
      retrospective: retro.data!.map((e) => ({
        year: e.year,
        title: e.title,
        text: e.body ?? "",
      })),
      research: mapResearch(res.error ? null : res.data, upd.error ? null : upd.data, local.research),
      source: "supabase",
    };

    cachedResult = { data: result, expiresAt: Date.now() + CACHE_TTL_MS };
    return result;
  } catch {
    cachedResult = { data: fallback, expiresAt: Date.now() + CACHE_TTL_MS };
    return fallback;
  }
}
