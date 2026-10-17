import Image from "next/image";
import { Window } from "@/components/window";
import { ParallaxGroup, ParallaxLayer } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "@/components/motion/typewriter";
import { OrbitIcons } from "@/features/hero/orbit-icons";
import { ProjectShowcase } from "@/features/projects/project-showcase";
import { ResearchSection } from "@/features/research/research-section";
import { TopicSection } from "@/features/topics/topic-section";
import { AskTerminal } from "@/features/terminal/ask-terminal";
import { LanguageSwitcher } from "@/components/language-switcher";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { getStaticContent } from "@/lib/localize";
import { getProfileData } from "@/lib/profile-data";
import { notFound } from "next/navigation";

export const revalidate = 60;

const navItems = [
  { href: "#experience", key: "experience" },
  { href: "#projects", key: "projects" },
  { href: "#research", key: "research" },
  { href: "#stack", key: "stack" },
  { href: "#education", key: "education" },
  { href: "#contact", key: "contact" },
] as const;

function Section({
  id,
  eyebrow,
  title,
  reveal = true,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">[ {eyebrow} ]</p>
      <h2 className="mt-2 mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {reveal ? <Reveal>{children}</Reveal> : children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-background px-2 py-0.5 font-mono text-xs text-accent-2">
      {children}
    </span>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getDictionary(lang);
  const { organisation, yamlSkills } = getStaticContent(lang);
  const { profile, experience, projects, research, skills, education, achievements } =
    await getProfileData(lang);
  return (
    <>
      <header className="sticky top-3 z-20 px-4">
        <nav
          aria-label={t.nav.label}
          className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur"
        >
          <a href="#top" className="shrink-0 font-mono text-sm text-accent">
            nurkolis<span className="text-muted">.dev</span>
          </a>
          <ul className="flex min-w-0 flex-1 justify-end gap-x-4 overflow-x-auto font-mono text-xs text-muted [scrollbar-width:none]">
            {navItems
              .filter((item) => item.href !== "#research" || research.length > 0)
              .map((item) => (
                <li key={item.href} className="shrink-0">
                  <a href={item.href} className="hover:text-foreground">
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
          </ul>
          <LanguageSwitcher lang={lang} label={t.switcher.label} names={t.switcher} />
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-5">
        <section className="relative grid items-center gap-12 pb-10 pt-14 lg:grid-cols-2 lg:pt-20">
          <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              <span>{t.hero.statusPrefix}</span>
              <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 text-accent">
                {t.statusLabels[profile.status] ?? profile.status}
              </span>
            </p>
            <h1 className="mt-5 font-mono text-4xl font-bold leading-tight tracking-tight text-foreground sm:whitespace-nowrap sm:text-5xl lg:text-[2.5rem] xl:text-[2.6rem]">
              {t.hero.greeting} <br className="sm:hidden" />
              <Typewriter text="Nurkolis" className="text-accent" />
              <span className="cursor text-accent">_</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              <span className="rounded bg-surface px-2 py-0.5 font-mono text-sm text-foreground">
                {profile.role}
              </span>{" "}
              {format(t.hero.lead, { name: profile.name })}
            </p>

            <Window title="skills.yml" className="mt-8 max-w-md">
              <p className="text-violet-300">{t.hero.expertise}</p>
              {yamlSkills.map((s) => (
                <p key={s} className="pl-3">
                  <span className="text-muted">- </span>
                  <span className="text-accent">&quot;{s}&quot;</span>
                </p>
              ))}
            </Window>

            <AskTerminal
              context={{
                name: profile.name,
                role: profile.role,
                email: profile.email,
                projects: projects.map((p) => ({ name: p.name, slug: p.slug })),
                research: research.map((r) => ({ title: r.title, stage: r.stage })),
                stack: skills.flatMap((g) => g.items),
              }}
              strings={t.terminal}
              lang={lang}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-md bg-accent px-4 py-2 font-mono text-sm font-medium text-background hover:opacity-90"
              >
                {t.hero.connect}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground hover:border-accent hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto h-[440px] w-full max-w-lg sm:h-[520px]">
            <ParallaxGroup className="absolute inset-0 flex items-center justify-center">
              {/* Background glow and orbital rings; the outer ring carries the orbit icons */}
              <div className="glow absolute inset-0" />
              <ParallaxLayer depth={14} className="absolute inset-0 flex items-center justify-center">
                <OrbitIcons />
                <div className="pointer-events-none absolute h-64 w-64 rounded-full border border-accent-2/10 sm:h-72 sm:w-72" />
              </ParallaxLayer>

              {/* 3D Human Pilot Illustration */}
              <ParallaxLayer depth={10} className="relative z-10 flex h-full w-full items-center justify-center">
                <div className="float flex h-full w-full items-center justify-center [--rot:0deg]">
                  <Image
                    src="/pilot-hero.png"
                    alt={t.hero.pilotAlt}
                    width={420}
                    height={560}
                    priority
                    className="h-[380px] w-auto object-contain mix-blend-lighten drop-shadow-[0_20px_40px_rgba(74,222,128,0.18)] sm:h-[470px]"
                  />
                </div>
              </ParallaxLayer>

              {/* Floating Code Windows around the Pilot */}
              <ParallaxLayer depth={22} className="absolute -left-2 top-4 z-20 hidden w-56 sm:block">
                <Window title="ProfileViewModel.kt" className="float [--rot:-3deg]">
                  <p><span className="text-violet-300">class</span> PilotVM : ViewModel() {"{"}</p>
                  <p className="pl-3"><span className="text-violet-300">val</span> stack = listOf(</p>
                  <p className="pl-6 text-accent">&quot;Kotlin&quot;, &quot;Flutter&quot;</p>
                  <p className="pl-3">)</p>
                  <p>{"}"}</p>
                </Window>
              </ParallaxLayer>
              <ParallaxLayer depth={28} className="absolute -right-2 bottom-20 z-20 hidden w-52 sm:block">
                <Window title="knox-policy.json" className="float [--rot:2deg] [animation-delay:-2s]">
                  <p>{"{"}</p>
                  <p className="pl-3"><span className="text-accent-2">&quot;device&quot;</span>: <span className="text-accent">&quot;managed&quot;</span>,</p>
                  <p className="pl-3"><span className="text-accent-2">&quot;encrypted&quot;</span>: <span className="text-amber-300">true</span></p>
                  <p>{"}"}</p>
                </Window>
              </ParallaxLayer>
              <ParallaxLayer depth={18} className="absolute bottom-2 left-0 z-20 hidden w-60 sm:block">
                <Window title="build.log" className="float [--rot:-1deg] [animation-delay:-4s]">
                  <p className="text-muted">&gt; flutter build apk --release</p>
                  <p className="text-accent">✓ Built app-release.apk</p>
                </Window>
              </ParallaxLayer>
            </ParallaxGroup>
          </div>
        </section>

        <TopicSection hasResearch={research.length > 0} lang={lang} t={t.topics} />

        <Section
          id="experience"
          eyebrow={t.sections.experience.eyebrow}
          title={t.sections.experience.title}
        >
          <ol className="relative space-y-10 border-l border-border pl-6">
            {experience.map((job) => (
              <li key={job.company} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.title} <span className="text-accent-2">@ {job.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </div>
                <p className="text-sm text-muted">{job.place}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/85 marker:text-muted">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="projects"
          eyebrow={t.sections.projects.eyebrow}
          title={t.sections.projects.title}
          reveal={false}
        >
          <ProjectShowcase
            projects={projects}
            lang={lang}
            t={t.showcase}
            storeLabel={t.store.googlePlay}
          />
        </Section>

        {research.length > 0 && (
          <Section
            id="research"
            eyebrow={t.sections.research.eyebrow}
            title={t.sections.research.title}
            reveal={false}
          >
            <ResearchSection
              research={research}
              projects={projects}
              lang={lang}
              t={t.research}
              storeLabel={t.store.googlePlay}
            />
          </Section>
        )}

        <Section id="stack" eyebrow={t.sections.stack.eyebrow} title={t.sections.stack.title}>
          <div className="space-y-5">
            {skills.map((g) => (
              <div key={g.group} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <h3 className="font-mono text-sm text-muted">{g.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="education"
          eyebrow={t.sections.education.eyebrow}
          title={t.sections.education.title}
        >
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold text-foreground">{e.degree}</h3>
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                </div>
                <p className="text-sm text-accent-2">{e.school}</p>
                <p className="text-sm text-muted">
                  {e.place}
                  {e.note ? ` · ${e.note}` : ""}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-12 font-mono text-sm text-muted">{t.sections.education.certifications}</h3>
          <ul className="space-y-2 text-sm">
            {achievements.map((a) => (
              <li key={a.name} className="flex gap-3">
                <span className="font-mono text-xs text-muted">{a.year}</span>
                <span className="text-foreground/90">{a.name}</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 mt-12 font-mono text-sm text-muted">{t.sections.education.organisational}</h3>
          <p className="font-semibold text-foreground">
            {organisation.role} <span className="text-accent-2">· {organisation.name}</span>
          </p>
          <p className="text-sm text-muted">{organisation.place}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/85 marker:text-muted">
            {organisation.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Section>

        <Section id="contact" eyebrow={t.sections.contact.eyebrow} title={t.sections.contact.title}>
          <p className="max-w-xl text-foreground/90">
            {t.sections.contact.intro}
          </p>
          <ul className="mt-5 space-y-2 font-mono text-sm">
            <li>
              <span className="text-muted">{t.sections.contact.email} </span>
              <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                {profile.email}
              </a>
            </li>
            <li>
              <span className="text-muted">{t.sections.contact.linkedin} </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                M Dwi Nurkolis
              </a>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="mt-10 border-t border-border py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · {t.footer.home}
      </footer>
    </>
  );
}
