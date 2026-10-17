import { expect, test } from "vitest";
import * as local from "@/data/profile";
import { getStaticContent, localizeProfileData } from "./localize";
import type { ProfileData } from "./profile-data";

const base: ProfileData = {
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

test("Indonesian overlays translatable text but keeps neutral fields", () => {
  const out = localizeProfileData(base, "id");
  const p = out.projects.find((x) => x.slug === "broilerku")!;
  expect(p.category).toBe("Aplikasi Mobile AgriTech");
  expect(p.name).toBe("BroilerKu");
  expect(p.tags).toEqual(base.projects.find((x) => x.slug === "broilerku")!.tags);
  expect(out.profile.email).toBe(base.profile.email);
  expect(out.skills[0].group).toBe("Bahasa Pemrograman");
  expect(out.research[0].updates[0].date).toBe("2026-10-01");
  expect(out.research[0].updates[0].note).toMatch(/riset magister/);
});

test("entries without a translation are shown as-is", () => {
  const extra = { ...base.projects[0], slug: "new-one", headlineTitle: "Original" };
  const out = localizeProfileData({ ...base, projects: [extra] }, "id");
  expect(out.projects[0].headlineTitle).toBe("Original");
});

test("English replaces Indonesian-written case study text, leaves the rest", () => {
  const sb: ProfileData = {
    ...base,
    experience: [{ ...base.experience[0], title: "Edited in Supabase" }],
    projects: [{ ...base.projects[1], problem: "Masalah dari Supabase" }],
  };
  const out = localizeProfileData(sb, "en");
  expect(out.projects[0].problem).toMatch(/^Farmers logged feed/);
  expect(out.experience[0].title).toBe("Edited in Supabase");
});

test("every local project and research entry has an Indonesian translation", () => {
  const out = localizeProfileData(base, "id");
  out.projects.forEach((p, i) => expect(p.problem).not.toBe(base.projects[i].problem));
  expect(getStaticContent("id").yamlSkills).toHaveLength(local.yamlSkills.length);
  expect(getStaticContent("id").organisation.points).toHaveLength(local.organisation.points.length);
});
