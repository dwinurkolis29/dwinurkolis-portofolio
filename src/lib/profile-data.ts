import { createClient } from "@supabase/supabase-js";
import * as local from "@/data/profile";

export type ProfileData = {
  profile: typeof local.profile;
  experience: typeof local.experience;
  projects: typeof local.projects;
  skills: typeof local.skills;
  education: typeof local.education;
  achievements: typeof local.achievements;
  retrospective: typeof local.retrospective;
  source: "supabase" | "local";
};

const fallback: ProfileData = {
  profile: local.profile,
  experience: local.experience,
  projects: local.projects,
  skills: local.skills,
  education: local.education,
  achievements: local.achievements,
  retrospective: local.retrospective,
  source: "local",
};

const CACHE_TTL_MS = 60_000;
let cachedResult: { data: ProfileData; expiresAt: number } | null = null;

export async function getProfileData(): Promise<ProfileData> {
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
    const [profile, experience, projects, skills, education, achievements, retro] =
      await Promise.all([
        db.from("profile").select("*").eq("id", 1).single(),
        db.from("experience").select("*").order("sort_order"),
        db.from("projects").select("*").order("sort_order"),
        db.from("skill_groups").select("*").order("sort_order"),
        db.from("education").select("*").order("sort_order"),
        db.from("achievements").select("*").order("sort_order"),
        db.from("retrospective").select("*").order("sort_order"),
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
      projects: projects.data!.map((e, idx) => {
        const matched =
          local.projects.find((lp) => lp.name.toLowerCase() === String(e.name).toLowerCase()) ??
          local.projects[idx] ??
          local.projects[0];
        return {
          ...matched,
          year: e.year ?? matched.year,
          name: e.name ?? matched.name,
          description: e.description ?? matched.description,
          tags: Array.isArray(e.tags) && e.tags.length > 0 ? e.tags : matched.tags,
        };
      }),
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
      source: "supabase",
    };

    cachedResult = { data: result, expiresAt: Date.now() + CACHE_TTL_MS };
    return result;
  } catch {
    cachedResult = { data: fallback, expiresAt: Date.now() + CACHE_TTL_MS };
    return fallback;
  }
}
