import * as local from "@/data/profile";
import { idTranslation } from "@/data/profile.id";
import type { Locale } from "@/i18n/config";
import type { Project, ProfileData } from "@/lib/profile-data";
import type { Research } from "@/lib/research";

// Teks yang berbeda per bahasa. Field netral (nama, tahun, tag, kode, URL, status)
// tetap berasal dari sumber data utama (Supabase atau data lokal).
export type ProjectText = Pick<
  Project,
  | "headlineTitle"
  | "category"
  | "impact"
  | "description"
  | "laymanSummary"
  | "problem"
  | "outcome"
  | "highlights"
  | "architecture"
  | "decisions"
  | "screens"
>;
type ExperienceText = Pick<ProfileData["experience"][number], "title" | "place" | "period" | "points">;
type EducationText = Pick<ProfileData["education"][number], "degree" | "place" | "period" | "note">;
type ResearchText = Pick<Research, "title" | "summary" | "institution"> & {
  updates: Record<string, string>; // tanggal → catatan
};

export type Translation = {
  profile: Partial<Pick<ProfileData["profile"], "location" | "summary" | "headline" | "currently">>;
  experience: Record<string, ExperienceText>; // kunci: company
  projects: Record<string, ProjectText>; // kunci: slug
  skillGroups: Record<string, string>; // nama grup asli → terjemahan
  education: Record<string, EducationText>; // kunci: school
  retrospective: Record<string, { title: string; text: string }>; // kunci: year
  research: Record<string, ResearchText>; // kunci: slug
  organisation: { role: string; place: string; points: string[] };
  yamlSkills: string[];
};

const pick = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> =>
  Object.fromEntries(keys.map((k) => [k, obj[k]])) as Pick<T, K>;

const byKey = <T, V>(items: T[], key: (item: T) => string, value: (item: T) => V): Record<string, V> =>
  Object.fromEntries(items.map((item) => [key(item), value(item)]));

// Teks Inggris tetap bersumber dari data utama (Supabase/lokal). Satu pengecualian: teks
// studi kasus project yang aslinya berbahasa Indonesia, diganti dengan versi Inggris dari data lokal.
const enTranslation: Translation = {
  profile: {},
  experience: {},
  projects: byKey(local.projects, (p) => p.slug, (p) =>
    pick(p, [
      "headlineTitle",
      "category",
      "impact",
      "description",
      "laymanSummary",
      "problem",
      "outcome",
      "highlights",
      "architecture",
      "decisions",
      "screens",
    ]),
  ),
  skillGroups: {},
  education: {},
  retrospective: {},
  research: {},
  organisation: pick(local.organisation, ["role", "place", "points"]),
  yamlSkills: local.yamlSkills,
};

const translations: Record<Locale, Translation> = { en: enTranslation, id: idTranslation };

export function getStaticContent(lang: Locale) {
  const t = translations[lang];
  return {
    organisation: { name: local.organisation.name, ...t.organisation },
    yamlSkills: t.yamlSkills,
  };
}

// Entri yang tidak punya terjemahan lokal (mis. baru ditambah di Supabase) ditampilkan apa adanya.
export function localizeProfileData(data: ProfileData, lang: Locale): ProfileData {
  const t = translations[lang];
  return {
    ...data,
    profile: { ...data.profile, ...t.profile },
    experience: data.experience.map((e) => ({ ...e, ...t.experience[e.company] })),
    projects: data.projects.map((p) => ({ ...p, ...t.projects[p.slug] })),
    skills: data.skills.map((g) => ({ ...g, group: t.skillGroups[g.group] ?? g.group })),
    education: data.education.map((e) => ({ ...e, ...t.education[e.school] })),
    retrospective: data.retrospective.map((r) => ({ ...r, ...t.retrospective[r.year] })),
    research: data.research.map((r) => {
      const tr = t.research[r.slug];
      if (!tr) return r;
      const { updates, ...text } = tr;
      return {
        ...r,
        ...text,
        updates: r.updates.map((u) => ({ ...u, note: updates[u.date] ?? u.note })),
      };
    }),
  };
}
