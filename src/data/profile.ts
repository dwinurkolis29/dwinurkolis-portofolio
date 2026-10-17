import type { Research } from "@/lib/research";

export const profile = {
  name: "M Dwi Nurkolis",
  role: "Android Engineer",
  location: "Kediri, East Java · studying in Yogyakarta, Indonesia",
  email: "kolisdestroyer29@gmail.com",
  linkedin: "https://www.linkedin.com/in/mokhammad-dwi-nurkolis",
  summary:
    "Android Engineer with 3+ years of experience developing production mobile applications, with a primary focus on Kotlin and native Android development. Experienced in enterprise Android solutions, mobile security assessment, reverse engineering, and Samsung Knox Manage. Also experienced in cross-platform development using Flutter.",
  status: "studying_data_science",
  headline: "Android Engineer building secure, production-grade mobile apps.",
  currently:
    "Middle Mobile Developer at XYBER · Master of Informatics (Data Science) student at Universitas Islam Indonesia",
};

export const stats = [
  { value: "3+", label: "years building mobile apps" },
  { value: "3.76", label: "bachelor GPA (of 4.00)" },
  { value: "4", label: "certifications" },
];

export const experience = [
  {
    company: "XYBER",
    place: "Yogyakarta, Indonesia",
    title: "Middle Mobile Developer",
    period: "Nov 2023 – Present",
    points: [
      "Develop and maintain native Android applications using Kotlin and Android SDK, focusing on security, performance, and system stability.",
      "Implement Samsung Knox Manage for enterprise device security policies, application distribution, and device management.",
      "Conduct authorized Android application security assessments and reverse engineering to analyze application behavior, identify potential security weaknesses, and understand application logic.",
      "Develop a private enterprise communication application designed to protect user privacy and data integrity.",
      "Build a mobile survey and reporting application with centralized data, real-time reporting, and location-based reporting.",
      "Develop mobile solutions for vote counting and data aggregation, enabling structured and efficient result processing.",
      "Develop an internal HR management and employee monitoring application using Flutter.",
    ],
  },
  {
    company: "PT Days App Development",
    place: "Kediri, Indonesia",
    title: "Junior Mobile Developer",
    period: "Jun 2023 – Sep 2023",
    points: [
      "Developed a mobile cashier application using Flutter and Dart to support client operational workflows.",
      "Implemented core application features with a focus on clean code, performance, and application stability.",
    ],
  },
];

export const projects = [
  {
    slug: "android-security-research",
    storeUrl: "",
    year: "2026",
    name: "Android Security Research & Reverse Engineering",
    headlineTitle:
      "How I Reverse-Engineered Production Android Apps to Uncover Auth & TLS Pinning Flaws",
    category: "Mobile AppSec & Binary Analysis",
    impact: "Identified critical auth & pinning flaws",
    description:
      "Authorized Android application security research and reverse engineering: decompiling DEX bytecode with JADX, runtime hooking via Frida, bypassing SSL pinning & root detection, and auditing API traffic against OWASP MASVS.",
    laymanSummary:
      "Audit keamanan menyeluruh pada aplikasi Android produksi untuk menemukan celah kebocoran data sebelum disalahgunakan pihak luar.",
    problem:
      "Aplikasi mobile sering menyimpan logika bisnis sensitif, kunci API, atau token sesi di sisi klien yang rentan dibongkar oleh penyerang.",
    outcome:
      "Memetakan alur data sensitif, membuktikan risiko bypass proteksi aplikasi (SSL Pinning & Root Detection), dan menyusun rekomendasi perbaikan berstandar OWASP MASVS.",
    tags: ["Android", "Security", "Reverse Engineering", "Frida", "JADX", "OWASP MASVS"],
    highlights: [
      "Dekompilasi APK/DEX ke Java & Smali untuk membedah logika autentikasi",
      "Dynamic instrumentation saat runtime untuk menguji ketahanan SSL Pinning",
      "Analisis trafik REST API terenkripsi & audit penyimpanan lokal (Keystore/SharedPrefs)",
    ],
    architecture: [
      { step: "APK / DEX Binary", detail: "Static unpacking & manifest inspection" },
      { step: "JADX & Smali", detail: "Control-flow & crypto key analysis" },
      { step: "Frida Runtime Hook", detail: "Bypass root & TLS pinning checks" },
      { step: "Mitmproxy / Burp", detail: "API payload & token vulnerability audit" },
    ],
    decisions: [
      "Mengombinasikan static analysis (JADX) dan dynamic hooking (Frida) agar validasi keamanan tidak hanya berbasis tebakan kode statis.",
      "Menggunakan skrip injeksi Javascript pada Frida untuk mengintersepsi fungsi Cipher dan OkHttp CertificatePinner secara real-time tanpa memodifikasi signature APK.",
      "Menyusun laporan temuan dengan bukti reproduksi langkah-demi-langkah agar tim developer bisa langsung menambal celah (remediation).",
    ],
    codeTitle: "frida-pinning-audit.js",
    codeSnippet: [
      "Java.perform(() => {",
      '  const Pinner = Java.use("okhttp3.CertificatePinner");',
      '  Pinner.check.overload("java.lang.String", "java.util.List")',
      "    .implementation = function (hostname) {",
      '      console.log("[audit] TLS check intercepted for: " + hostname);',
      "      return; // Verify server-side token validation resilience",
      "    };",
      "});",
    ],
    screens: [
      {
        label: "1. Static Decompilation",
        caption: "Memetakan struktur package, exported activity, dan hardcoded secret pada DEX bytecode.",
      },
      {
        label: "2. Runtime Hooking",
        caption: "Menguji ketahanan root detection & certificate pinning pada perangkat uji menggunakan Frida.",
      },
      {
        label: "3. Traffic & Storage Audit",
        caption: "Memverifikasi enkripsi payload API dan keamanan penyimpanan token di local storage.",
      },
    ],
  },
  {
    slug: "broilerku",
    storeUrl: "https://play.google.com/store/apps/details?id=com.chickin.mobile",
    year: "2025",
    name: "BroilerKu",
    headlineTitle:
      "How I Automated Broiler Farm FCR Calculations and Replaced Paper Logs with Real-Time Telemetry",
    category: "AgriTech Mobile Application",
    impact: "Automated FCR & daily flock telemetry",
    description:
      "Building a production Flutter management system for broiler farms: daily feed recording, depletion tracking, automated Feed Conversion Ratio (FCR) & Performance Index engines, and real-time multi-shed sync on Firebase.",
    laymanSummary:
      "Aplikasi manajemen kandang ayam broiler yang menggantikan pencatatan kertas dengan perhitungan efisiensi pakan (FCR) otomatis.",
    problem:
      "Peternak mencatat pakan, kematian ayam, dan bobot harian di kertas atau chat manual sehingga perhitungan FCR (Feed Conversion Ratio) lambat dan rawan salah hitung.",
    outcome:
      "Memangkas waktu rekap harian kandang dan memberikan indikator performa panen (FCR & Indeks Performa) secara instan di HP peternak.",
    tags: ["Flutter", "Dart", "Firebase", "Clean Architecture", "Firestore"],
    highlights: [
      "Pencatatan pakan harian, deplesi (kematian), dan sampling bobot ayam per kandang",
      "Kalkulasi otomatis FCR (Feed Conversion Ratio) & estimasi panen secara real-time",
      "Sinkronisasi data multi-kandang berbasis Cloud Firestore & Firebase Auth",
    ],
    architecture: [
      { step: "Flutter UI Layer", detail: "Reactive forms & FCR dashboard cards" },
      { step: "Domain / FCR Engine", detail: "Automated FCR, depletion & IP calculation" },
      { step: "Repository Layer", detail: "State sync & validation rules" },
      { step: "Firebase / Firestore", detail: "Real-time cloud persistence & auth" },
    ],
    decisions: [
      "Memisahkan logika perhitungan peternakan (FCR, tingkat deplesi, rata-rata bobot) ke domain layer murni agar hasil kalkulasi konsisten dan mudah diuji.",
      "Menggunakan struktur koleksi hierarkis di Firestore (Farms -> Cycles -> DailyLogs) untuk mempercepat query rekap per periode panen.",
      "Mendesain form input harian dengan validasi batas wajar agar petugas kandang tidak salah memasukkan satuan kilogram vs sak pakan.",
    ],
    codeTitle: "fcr_calculator.dart",
    codeSnippet: [
      "class FcrCalculator {",
      "  static double compute({",
      "    required double totalFeedKg,",
      "    required int livePopulation,",
      "    required double avgWeightKg,",
      "  }) {",
      "    final totalBiomassKg = livePopulation * avgWeightKg;",
      "    if (totalBiomassKg <= 0) return 0.0;",
      "    return double.parse((totalFeedKg / totalBiomassKg).toStringAsFixed(2));",
      "  }",
      "}",
    ],
    screens: [
      {
        label: "1. Dashboard Kandang",
        caption: "Ringkasan metrik utama: skor FCR saat ini, populasi hidup, dan grafik konsumsi pakan.",
      },
      {
        label: "2. Input Harian Cepat",
        caption: "Form pencatatan jumlah pakan masuk, angka kematian harian, dan hasil timbang sampel.",
      },
      {
        label: "3. Analitik Siklus Panen",
        caption: "Evaluasi performa kandang dari hari ke-1 (DOC) hingga panen untuk membandingkan efisiensi.",
      },
    ],
  },
  {
    slug: "fama-agent",
    storeUrl: "",
    year: "2024",
    name: "Fama Agent",
    headlineTitle:
      "How I Built a Resilient Geo-Tagged Field Reporting App for Low-Signal Operations",
    category: "Enterprise Field Operations",
    impact: "Real-time GPS & media field reporting",
    description:
      "Native Android field reporting application built with Kotlin and MVVM: high-precision GPS coordinate locking, background image compression (3.8MB to ~400KB), and multipart REST API synchronization.",
    laymanSummary:
      "Aplikasi pelaporan petugas lapangan berbasis Android untuk mengirim bukti foto, titik lokasi GPS akurat, dan laporan aktivitas langsung ke kantor pusat.",
    problem:
      "Pelaporan tim lapangan lewat grup pesan tidak terstruktur, sulit diverifikasi titik lokasinya, dan foto sering gagal terkirim saat sinyal seluler lemah.",
    outcome:
      "Menyediakan sistem pelaporan terpusat dengan bukti koordinat GPS tervalidasi dan kompresi foto otomatis yang hemat kuota serta stabil di jaringan lapangan.",
    tags: ["Kotlin", "Android", "REST API", "MVVM", "Location Services"],
    highlights: [
      "Pengambilan laporan lapangan lengkap dengan teks, foto kamera, dan titik koordinat GPS",
      "Kompresi gambar otomatis di sisi perangkat sebelum dikirim ke REST API pusat",
      "Arsitektur MVVM dengan penanganan state loading, error, dan retry yang stabil",
    ],
    architecture: [
      { step: "Camera & FusedGPS", detail: "Capture photo & high-accuracy coordinates" },
      { step: "Media Compressor", detail: "Downscale & EXIF/Geo metadata binding" },
      { step: "Kotlin ViewModel", detail: "MVVM state management & retry queue" },
      { step: "Central REST API", detail: "Multipart upload & token authentication" },
    ],
    decisions: [
      "Menerapkan kompresi bitmap di background thread sebelum multipart upload untuk mencegah OutOfMemoryError dan mempercepat pengiriman di jaringan 3G/4G lemah.",
      "Menggunakan FusedLocationProviderClient dengan validasi akurasi radius agar titik koordinat laporan benar-benar presisi saat dikirim.",
      "Memisahkan UI Activity/Fragment dari logika jaringan menggunakan arsitektur MVVM agar pengiriman data tidak batal saat rotasi layar.",
    ],
    codeTitle: "ReportViewModel.kt",
    codeSnippet: [
      "fun submitFieldReport(note: String, photo: File, loc: Location) {",
      "  viewModelScope.launch {",
      "    _uiState.value = ReportUiState.Uploading",
      "    val compressed = imageCompressor.compressToMaxKb(photo, maxKb = 450)",
      "    repository.uploadMultipart(note, compressed, loc.latitude, loc.longitude)",
      "      .onSuccess { _uiState.value = ReportUiState.Success(it.reportId) }",
      "      .onFailure { _uiState.value = ReportUiState.Error(it.message) }",
      "  }",
      "}",
    ],
    screens: [
      {
        label: "1. Capture & Geo-Tagging",
        caption: "Pengambilan foto bukti langsung dari kamera disertai penguncian koordinat GPS otomatis.",
      },
      {
        label: "2. Smart Upload Queue",
        caption: "Kompresi ukuran gambar otomatis dan indikator status pengiriman ke server pusat.",
      },
      {
        label: "3. Riwayat & Status Laporan",
        caption: "Daftar laporan yang sudah terkirim beserta waktu, lokasi, dan status verifikasi.",
      },
    ],
  },
];

export const research: Research[] = [
  {
    slug: "broiler-fcr-prediction",
    title: "Predicting Feed Conversion Ratio (FCR) in Broiler Farms",
    summary:
      "Master's research on predicting broiler feed conversion ratio from farm records, building on the daily feed and flock data I worked with while building BroilerKu.",
    stage: "proposal",
    institution: "Universitas Islam Indonesia – Master of Informatics (Data Science)",
    supervisor: "",
    methods: [],
    datasets: [],
    relatedProjectSlug: "broilerku",
    links: [],
    updates: [
      {
        date: "2026-10-01",
        note: "Started the master's research; defining the problem and reviewing literature on FCR prediction.",
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Kotlin", "Java", "Dart", "XML"] },
  { group: "Mobile", items: ["Android SDK", "Flutter", "Android Studio", "Samsung Knox Manage"] },
  { group: "Architecture", items: ["MVVM", "Clean Architecture", "Clean Code"] },
  {
    group: "Security",
    items: ["Android Security Assessment", "Reverse Engineering", "Application Logic Analysis"],
  },
  {
    group: "Backend & Tools",
    items: [
      "REST API",
      "Firebase Authentication",
      "Firestore",
      "Firebase Cloud Messaging",
      "Git",
      "GitHub",
      "GitLab",
    ],
  },
];

export const education = [
  {
    school: "Universitas Islam Indonesia",
    place: "Yogyakarta, Indonesia",
    degree: "Master of Informatics – Data Science",
    period: "Sep 2026 – Sep 2028 (Expected)",
    note: "",
  },
  {
    school: "Universitas Teknologi Digital Indonesia",
    place: "Yogyakarta, Indonesia",
    degree: "Bachelor of Informatics",
    period: "Sep 2024 – Feb 2026",
    note: "GPA 3.76 / 4.00",
  },
  {
    school: "Politeknik Negeri Malang",
    place: "East Java, Indonesia",
    degree: "Associate Degree in Informatics Management",
    period: "Aug 2021 – Aug 2023",
    note: "GPA 3.82 / 4.00",
  },
];

export const achievements = [
  { year: "2026", name: "IBM iOS and Android Mobile App Developer" },
  { year: "2026", name: "Developing Mobile Apps with Flutter Specialization" },
  { year: "2023", name: "Samsung Knox Manage Certificate" },
  { year: "2023", name: "Certificate of Competence in Information Technology (BNSP)" },
];

export const organisation = {
  name: "UKM MIMPI Polinema",
  place: "Kediri, East Java",
  role: "Event Coordinator",
  points: [
    "Led an organizational recruitment program involving 50+ participants, managing planning, execution, and budget.",
    "Increased new member recruitment by 10% compared with the previous year.",
  ],
};

export const yamlSkills = [
  "Kotlin & native Android",
  "Flutter & Dart",
  "Mobile security assessment",
  "Samsung Knox Manage",
  "MVVM & Clean Architecture",
  "Firebase & REST API",
];

export const retrospective = [
  {
    year: "2026",
    title: "Security research & a Data Science master's",
    text: "Authorized Android security research and reverse engineering, IBM and Flutter certificates, bachelor's degree completed (GPA 3.76), and a Master of Informatics (Data Science) at UII starting in September.",
  },
  {
    year: "2025",
    title: "BroilerKu",
    text: "Shipped a Flutter app for broiler farm management with daily feed recording, livestock monitoring, and automated FCR calculations.",
  },
  {
    year: "2024",
    title: "Fama Agent & the bachelor's journey",
    text: "Built an Android field reporting app with text, image, and location reports, while starting a bachelor's degree in Informatics.",
  },
  {
    year: "2023",
    title: "From junior developer to XYBER",
    text: "First mobile role building a Flutter cashier app, earned the Samsung Knox Manage and BNSP certificates, then joined XYBER as a Mobile Developer in November.",
  },
  {
    year: "2021",
    title: "Where it started",
    text: "Began an Associate Degree in Informatics Management at Politeknik Negeri Malang (GPA 3.82) and coordinated a 50+ participant recruitment program at UKM MIMPI.",
  },
];
