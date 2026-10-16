import Link from "next/link";
import { profile, projects } from "@/data/profile";
import { ProjectShowcase } from "@/features/projects/project-showcase";

export const metadata = {
  title: ">_ explored_projects | Mokhammad Dwi Nurkolis",
  description: "A complete journal log of my engineering projects, mobile architecture, and security research.",
};

export default function ProjectsPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-3 z-20 px-4">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur"
        >
          <Link href="/" className="shrink-0 font-mono text-sm text-accent">
            nurkolis<span className="text-muted">.dev</span>
          </Link>
          <ul className="flex items-center gap-x-5 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="font-semibold text-accent">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#experience" className="hover:text-foreground">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/#stack" className="hover:text-foreground">
                Stack
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-14 sm:pt-20">
        {/* Hero Header matching eltrovert.com/projects */}
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="text-accent">&gt;_</span> explored_projects
            <span className="cursor ml-1 text-accent">_</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-xs text-muted sm:text-sm md:text-base">
            {"// A complete journal logs of my exploration on each domain knowledge."}
          </p>
        </div>

        <ProjectShowcase projects={projects} showAllLink={false} />
      </main>

      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · built with Next.js
      </footer>
    </div>
  );
}
