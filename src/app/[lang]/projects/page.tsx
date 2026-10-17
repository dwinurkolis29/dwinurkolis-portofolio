import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { hasLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProfileData } from "@/lib/profile-data";
import { ProjectShowcase } from "@/features/projects/project-showcase";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: meta.projectsTitle,
    description: meta.projectsDescription,
    alternates: {
      canonical: `/${lang}/projects`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/projects`])),
    },
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getDictionary(lang);
  const { profile, projects } = await getProfileData(lang);
  return (
    <div className="min-h-screen text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-3 z-20 px-4">
        <nav
          aria-label={t.nav.label}
          className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur"
        >
          <Link href={localePath(lang)} className="shrink-0 font-mono text-sm text-accent">
            nurkolis<span className="text-muted">.dev</span>
          </Link>
          <ul className="flex min-w-0 items-center gap-x-5 overflow-x-auto font-mono text-xs text-muted [scrollbar-width:none] [&>li]:shrink-0">
            <li>
              <Link href={localePath(lang)} className="hover:text-foreground">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/projects")} className="font-semibold text-accent">
                {t.nav.projects}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/#experience")} className="hover:text-foreground">
                {t.nav.experience}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/#stack")} className="hover:text-foreground">
                {t.nav.stack}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/#contact")} className="hover:text-foreground">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
          <LanguageSwitcher lang={lang} label={t.switcher.label} names={t.switcher} />
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-14 sm:pt-20">
        {/* Hero Header matching eltrovert.com/projects */}
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="text-accent">&gt;_</span> {t.projectsPage.title}
            <span className="cursor ml-1 text-accent">_</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-xs text-muted sm:text-sm md:text-base">
            {t.projectsPage.subtitle}
          </p>
        </div>

        <ProjectShowcase
          projects={projects}
          lang={lang}
          t={t.showcase}
          storeLabel={t.store.googlePlay}
          showAllLink={false}
        />
      </main>

      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · {t.footer.page}
      </footer>
    </div>
  );
}
