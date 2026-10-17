// Kamus teks antarmuka. Hanya berisi string (tanpa fungsi) agar aman dikirim ke Client Component.
// Placeholder memakai {nama}, diisi lewat `format()` di src/i18n/format.ts.
export const en = {
  meta: {
    title: "M Dwi Nurkolis — Android Engineer",
    description:
      "Personal profile of M Dwi Nurkolis: Android Engineer (Kotlin, Flutter), mobile security, and Data Science master's student at Universitas Islam Indonesia.",
    projectsTitle: ">_ explored_projects | M Dwi Nurkolis",
    projectsDescription:
      "A complete journal log of my engineering projects, mobile architecture, and security research.",
  },
  nav: {
    label: "Primary",
    home: "Home",
    experience: "Experience",
    projects: "Projects",
    research: "Research",
    stack: "Stack",
    education: "Education",
    contact: "Contact",
  },
  switcher: {
    label: "Language",
    en: "English",
    id: "Bahasa Indonesia",
  },
  statusLabels: {
    studying_data_science: "studying_data_science",
  } as Record<string, string>,
  hero: {
    statusPrefix: "> status:",
    greeting: "Hello, I'm",
    lead: "with 3+ years of experience in native Android, Flutter, and mobile security. {name} builds secure, production-grade apps and is now studying Data Science.",
    expertise: "expertise:",
    connect: "./connect",
    pilotAlt: "3D Pilot Character Illustration",
  },
  sections: {
    experience: { eyebrow: "Experience", title: "Where I've been building" },
    projects: { eyebrow: "Engineering Spotlight", title: "Selected projects" },
    research: { eyebrow: "Research", title: "What I'm investigating" },
    stack: { eyebrow: "Stack", title: "Tools I work with" },
    education: {
      eyebrow: "Education",
      title: "Learning, formally",
      certifications: "Certifications & achievements",
      organisational: "Organisational experience",
    },
    contact: {
      eyebrow: "Connect",
      title: "Let's talk",
      intro: "Open to conversations about mobile development, application security, and data science.",
      email: "email",
      linkedin: "linkedin",
    },
  },
  footer: {
    home: "built with Next.js, deployed on Vercel",
    page: "built with Next.js",
  },
  topics: {
    ariaLabel: "Focus areas",
    headline: "FROM MOBILE TO MODELS",
    log: "[ SYSTEM_LOG: MOBILE_TO_DATA ]",
    intro:
      "// How I move from shipping secure Android apps to building models that learn from the data those apps collect.",
    explore: "> EXPLORE_",
    exploreAria: "Explore {title}",
    items: [
      {
        label: "01 / MOBILE",
        title: "Mobile Engineering",
        description: "Native Android & Flutter apps in production.",
      },
      {
        label: "02 / SECURITY",
        title: "Mobile Security",
        description: "Reverse engineering and app security assessments.",
      },
      {
        label: "03 / DATA",
        title: "Data Science",
        description: "Master's research on predicting broiler FCR.",
      },
    ],
  },
  projectsPage: {
    title: "explored_projects",
    subtitle: "// A complete journal logs of my exploration on each domain knowledge.",
  },
  showcase: {
    viewProject: "> View Project_",
    viewAll: "./view_all_explored_projects",
    viewAria: "View {name}",
  },
  detail: {
    back: "../back_to_projects",
    badge: "{year} Project",
    figure: "Figure 1.0 — End-to-end architecture and data flow for {name}",
    toc: {
      overview: "The Journey Overview",
      architecture: "Phase 1: System Architecture",
      decisions: "Phase 2: Engineering & Code",
      workflow: "Phase 3: Execution & Screenshots",
    },
    overview: {
      title: "The Journey Overview",
      problem: "The Starting Point (Problem)",
      outcome: "Why This Matters (Outcome & Impact)",
    },
    architecture: {
      title: "Phase 1: System Architecture & Pipeline",
      intro:
        "The system architecture is designed to be modular so each layer has a clearly isolated responsibility:",
      stage: "STAGE",
      deliverables: "Core Technical Deliverables",
    },
    decisions: {
      title: "Phase 2: Engineering Decisions & Implementation",
      decision: "Decision",
    },
    workflow: {
      title: "Phase 3: Application Screens & Operational Workflow",
    },
    sidebar: {
      techStack: "Tech Stack",
      year: "Year",
      focus: "Focus",
      toc: "Table of Contents",
    },
  },
  research: {
    relatedProject: "Related project:",
    supervisor: "supervisor:",
    methods: "methods",
    datasets: "datasets",
    links: "links",
    changelog: "changelog",
    stages: {
      proposal: "proposal",
      data_collection: "data collection",
      modeling: "modeling",
      writing: "writing",
      published: "published",
    } as Record<string, string>,
  },
  store: {
    googlePlay: "Get it on Google Play ↗",
  },
  terminal: {
    windowTitle: "ask_dwi",
    inputLabel: "Terminal command",
    placeholder: "type help",
    available: "available commands:",
    descriptions: {
      help: "list available commands",
      whoami: "who I am",
      projects: "selected projects",
      research: "current research",
      stack: "tools I work with",
      contact: "how to reach me",
      clear: "clear the screen",
    },
    noProjects: "no projects yet",
    noResearch: "no research yet",
    linkedinNote: "link in Contact",
    unknown: "command not found: {command} — try help",
  },
};

export type Dictionary = typeof en;
