import type { Dictionary } from "./en";

export const id: Dictionary = {
  meta: {
    title: "M Dwi Nurkolis — Android Engineer",
    description:
      "Profil pribadi M Dwi Nurkolis: Android Engineer (Kotlin, Flutter), keamanan mobile, dan mahasiswa magister Data Science di Universitas Islam Indonesia.",
    projectsTitle: ">_ explored_projects | M Dwi Nurkolis",
    projectsDescription:
      "Catatan lengkap proyek engineering, arsitektur mobile, dan riset keamanan saya.",
  },
  nav: {
    label: "Utama",
    home: "Beranda",
    experience: "Pengalaman",
    projects: "Proyek",
    research: "Riset",
    stack: "Teknologi",
    education: "Pendidikan",
    contact: "Kontak",
  },
  switcher: {
    label: "Bahasa",
    en: "English",
    id: "Bahasa Indonesia",
  },
  statusLabels: {
    studying_data_science: "kuliah_data_science",
  },
  hero: {
    statusPrefix: "> status:",
    greeting: "Halo, saya",
    lead: "dengan pengalaman 3+ tahun di Android native, Flutter, dan keamanan mobile. {name} membangun aplikasi aman berkelas produksi dan kini menempuh studi Data Science.",
    expertise: "keahlian:",
    connect: "./hubungi",
    pilotAlt: "Ilustrasi karakter pilot 3D",
  },
  sections: {
    experience: { eyebrow: "Pengalaman", title: "Tempat saya berkarya" },
    projects: { eyebrow: "Sorotan Engineering", title: "Proyek pilihan" },
    research: { eyebrow: "Riset", title: "Yang sedang saya teliti" },
    stack: { eyebrow: "Teknologi", title: "Alat yang saya gunakan" },
    education: {
      eyebrow: "Pendidikan",
      title: "Belajar, secara formal",
      certifications: "Sertifikasi & pencapaian",
      organisational: "Pengalaman organisasi",
    },
    contact: {
      eyebrow: "Terhubung",
      title: "Mari berbincang",
      intro:
        "Terbuka untuk berdiskusi tentang pengembangan mobile, keamanan aplikasi, dan data science.",
      email: "email",
      linkedin: "linkedin",
    },
  },
  footer: {
    home: "dibangun dengan Next.js, dideploy di Vercel",
    page: "dibangun dengan Next.js",
  },
  topics: {
    ariaLabel: "Bidang fokus",
    headline: "DARI MOBILE KE MODEL",
    log: "[ SYSTEM_LOG: MOBILE_TO_DATA ]",
    intro:
      "// Perjalanan saya dari merilis aplikasi Android yang aman hingga membangun model yang belajar dari data yang dikumpulkan aplikasi tersebut.",
    explore: "> JELAJAHI_",
    exploreAria: "Jelajahi {title}",
    items: [
      {
        label: "01 / MOBILE",
        title: "Rekayasa Mobile",
        description: "Aplikasi Android native & Flutter di tahap produksi.",
      },
      {
        label: "02 / KEAMANAN",
        title: "Keamanan Mobile",
        description: "Reverse engineering dan asesmen keamanan aplikasi.",
      },
      {
        label: "03 / DATA",
        title: "Data Science",
        description: "Riset magister tentang prediksi FCR broiler.",
      },
    ],
  },
  projectsPage: {
    title: "explored_projects",
    subtitle: "// Catatan lengkap eksplorasi saya di setiap bidang pengetahuan.",
  },
  showcase: {
    viewProject: "> Lihat Proyek_",
    viewAll: "./lihat_semua_proyek",
    viewAria: "Lihat {name}",
  },
  detail: {
    back: "../kembali_ke_proyek",
    badge: "Proyek {year}",
    figure: "Gambar 1.0 — Arsitektur end-to-end dan alur data untuk {name}",
    toc: {
      overview: "Gambaran Perjalanan",
      architecture: "Fase 1: Arsitektur Sistem",
      decisions: "Fase 2: Engineering & Kode",
      workflow: "Fase 3: Eksekusi & Tangkapan Layar",
    },
    overview: {
      title: "Gambaran Perjalanan",
      problem: "Titik Awal (Masalah)",
      outcome: "Mengapa Ini Penting (Hasil & Dampak)",
    },
    architecture: {
      title: "Fase 1: Arsitektur Sistem & Pipeline",
      intro:
        "Arsitektur sistem dirancang secara modular agar setiap lapisan memiliki tanggung jawab yang terisolasi dengan jelas:",
      stage: "TAHAP",
      deliverables: "Hasil Teknis Utama",
    },
    decisions: {
      title: "Fase 2: Keputusan Engineering & Implementasi",
      decision: "Keputusan",
    },
    workflow: {
      title: "Fase 3: Layar Aplikasi & Alur Operasional",
    },
    sidebar: {
      techStack: "Teknologi",
      year: "Tahun",
      focus: "Fokus",
      toc: "Daftar Isi",
    },
  },
  research: {
    relatedProject: "Proyek terkait:",
    supervisor: "pembimbing:",
    methods: "metode",
    datasets: "dataset",
    links: "tautan",
    changelog: "catatan perkembangan",
    stages: {
      proposal: "proposal",
      data_collection: "pengumpulan data",
      modeling: "pemodelan",
      writing: "penulisan",
      published: "terbit",
    },
  },
  store: {
    googlePlay: "Dapatkan di Google Play ↗",
  },
  terminal: {
    windowTitle: "ask_dwi",
    inputLabel: "Perintah terminal",
    placeholder: "ketik help",
    available: "perintah yang tersedia:",
    descriptions: {
      help: "daftar perintah yang tersedia",
      whoami: "siapa saya",
      projects: "proyek pilihan",
      research: "riset saat ini",
      stack: "alat yang saya gunakan",
      contact: "cara menghubungi saya",
      clear: "bersihkan layar",
    },
    noProjects: "belum ada proyek",
    noResearch: "belum ada riset",
    linkedinNote: "tautan ada di Kontak",
    unknown: "perintah tidak ditemukan: {command} — coba help",
  },
};
