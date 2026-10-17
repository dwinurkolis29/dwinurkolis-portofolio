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
      "A thorough security audit of production Android apps to find data-leak weaknesses before outsiders can exploit them.",
    problem:
      "Mobile apps often keep sensitive business logic, API keys, or session tokens on the client, where attackers can pull them apart.",
    outcome:
      "Mapped sensitive data flows, proved the risk of bypassing app protections (SSL pinning & root detection), and wrote remediation recommendations based on OWASP MASVS.",
    tags: ["Android", "Security", "Reverse Engineering", "Frida", "JADX", "OWASP MASVS"],
    highlights: [
      "Decompiling APK/DEX to Java & Smali to dissect authentication logic",
      "Runtime dynamic instrumentation to test SSL pinning resilience",
      "Encrypted REST API traffic analysis & local storage audit (Keystore/SharedPrefs)",
    ],
    architecture: [
      { step: "APK / DEX Binary", detail: "Static unpacking & manifest inspection" },
      { step: "JADX & Smali", detail: "Control-flow & crypto key analysis" },
      { step: "Frida Runtime Hook", detail: "Bypass root & TLS pinning checks" },
      { step: "Mitmproxy / Burp", detail: "API payload & token vulnerability audit" },
    ],
    decisions: [
      "Combined static analysis (JADX) with dynamic hooking (Frida) so security validation does not rest on guesses from static code alone.",
      "Used JavaScript injection scripts in Frida to intercept Cipher and OkHttp CertificatePinner calls in real time without modifying the APK signature.",
      "Wrote findings with step-by-step reproduction evidence so the developer team can patch the weaknesses right away.",
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
        caption: "Mapping the package structure, exported activities, and hardcoded secrets in DEX bytecode.",
      },
      {
        label: "2. Runtime Hooking",
        caption: "Testing root detection & certificate pinning resilience on a test device using Frida.",
      },
      {
        label: "3. Traffic & Storage Audit",
        caption: "Verifying API payload encryption and the security of tokens kept in local storage.",
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
      "A broiler coop management app that replaces paper records with automatic feed efficiency (FCR) calculation.",
    problem:
      "Farmers logged feed, mortality, and daily weight on paper or in chat messages, so Feed Conversion Ratio (FCR) calculation was slow and error-prone.",
    outcome:
      "Cut the time spent on daily coop summaries and put harvest performance indicators (FCR & Performance Index) instantly on the farmer's phone.",
    tags: ["Flutter", "Dart", "Firebase", "Clean Architecture", "Firestore"],
    highlights: [
      "Daily feed, depletion (mortality), and weight sampling records per coop",
      "Automatic FCR (Feed Conversion Ratio) calculation & real-time harvest estimates",
      "Multi-coop data sync built on Cloud Firestore & Firebase Auth",
    ],
    architecture: [
      { step: "Flutter UI Layer", detail: "Reactive forms & FCR dashboard cards" },
      { step: "Domain / FCR Engine", detail: "Automated FCR, depletion & IP calculation" },
      { step: "Repository Layer", detail: "State sync & validation rules" },
      { step: "Firebase / Firestore", detail: "Real-time cloud persistence & auth" },
    ],
    decisions: [
      "Kept the farming calculations (FCR, depletion rate, average weight) in a pure domain layer so results stay consistent and easy to test.",
      "Used a hierarchical collection structure in Firestore (Farms -> Cycles -> DailyLogs) to speed up per-harvest-period summary queries.",
      "Designed the daily input form with sanity-range validation so coop staff do not mix up kilograms and feed sacks.",
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
        label: "1. Coop Dashboard",
        caption: "Key metrics at a glance: current FCR score, live population, and a feed consumption chart.",
      },
      {
        label: "2. Quick Daily Input",
        caption: "A form to record incoming feed, daily mortality, and sample weighing results.",
      },
      {
        label: "3. Harvest Cycle Analytics",
        caption: "Coop performance review from day 1 (DOC) to harvest to compare efficiency.",
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
      "An Android field-officer reporting app that sends photo evidence, accurate GPS locations, and activity reports straight to head office.",
    problem:
      "Field teams reported through chat groups: unstructured, hard to verify by location, and photos often failed to send on weak mobile signal.",
    outcome:
      "Provided a centralized reporting system with validated GPS coordinate evidence and automatic photo compression that saves data and stays stable on field networks.",
    tags: ["Kotlin", "Android", "REST API", "MVVM", "Location Services"],
    highlights: [
      "Field reports captured with text, camera photos, and GPS coordinates",
      "Automatic on-device image compression before sending to the central REST API",
      "MVVM architecture with solid loading, error, and retry state handling",
    ],
    architecture: [
      { step: "Camera & FusedGPS", detail: "Capture photo & high-accuracy coordinates" },
      { step: "Media Compressor", detail: "Downscale & EXIF/Geo metadata binding" },
      { step: "Kotlin ViewModel", detail: "MVVM state management & retry queue" },
      { step: "Central REST API", detail: "Multipart upload & token authentication" },
    ],
    decisions: [
      "Compressed bitmaps on a background thread before the multipart upload to prevent OutOfMemoryError and speed up delivery on weak 3G/4G networks.",
      "Used FusedLocationProviderClient with accuracy-radius validation so report coordinates are genuinely precise when submitted.",
      "Separated Activity/Fragment UI from networking logic with MVVM so uploads are not cancelled when the screen rotates.",
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
        caption: "Evidence photos taken straight from the camera with automatic GPS coordinate locking.",
      },
      {
        label: "2. Smart Upload Queue",
        caption: "Automatic image size compression and an upload status indicator for the central server.",
      },
      {
        label: "3. Report History & Status",
        caption: "A list of submitted reports with time, location, and verification status.",
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
