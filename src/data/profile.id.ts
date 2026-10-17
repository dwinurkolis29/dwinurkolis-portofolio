import type { Translation } from "@/lib/localize";

// Terjemahan Bahasa Indonesia. Kuncinya sama dengan data utama di profile.ts
// (company, slug, school, year) agar bisa dipasangkan dengan data dari Supabase.
export const idTranslation: Translation = {
  profile: {
    location: "Kediri, Jawa Timur · berkuliah di Yogyakarta, Indonesia",
    summary:
      "Android Engineer dengan pengalaman 3+ tahun mengembangkan aplikasi mobile produksi, berfokus pada Kotlin dan pengembangan Android native. Berpengalaman di solusi Android enterprise, asesmen keamanan mobile, reverse engineering, dan Samsung Knox Manage. Juga berpengalaman dalam pengembangan lintas platform dengan Flutter.",
    headline: "Android Engineer yang membangun aplikasi mobile aman berkelas produksi.",
    currently:
      "Middle Mobile Developer di XYBER · mahasiswa Magister Informatika (Data Science) di Universitas Islam Indonesia",
  },

  experience: {
    XYBER: {
      title: "Middle Mobile Developer",
      place: "Yogyakarta, Indonesia",
      period: "Nov 2023 – Sekarang",
      points: [
        "Mengembangkan dan memelihara aplikasi Android native dengan Kotlin dan Android SDK, berfokus pada keamanan, performa, dan stabilitas sistem.",
        "Menerapkan Samsung Knox Manage untuk kebijakan keamanan perangkat enterprise, distribusi aplikasi, dan manajemen perangkat.",
        "Melakukan asesmen keamanan aplikasi Android yang berizin serta reverse engineering untuk menganalisis perilaku aplikasi, menemukan potensi kelemahan keamanan, dan memahami logika aplikasi.",
        "Mengembangkan aplikasi komunikasi enterprise privat yang dirancang untuk melindungi privasi pengguna dan integritas data.",
        "Membangun aplikasi survei dan pelaporan mobile dengan data terpusat, pelaporan real-time, dan pelaporan berbasis lokasi.",
        "Mengembangkan solusi mobile untuk penghitungan suara dan agregasi data agar pengolahan hasil lebih terstruktur dan efisien.",
        "Mengembangkan aplikasi internal manajemen SDM dan pemantauan karyawan menggunakan Flutter.",
      ],
    },
    "PT Days App Development": {
      title: "Junior Mobile Developer",
      place: "Kediri, Indonesia",
      period: "Jun 2023 – Sep 2023",
      points: [
        "Mengembangkan aplikasi kasir mobile dengan Flutter dan Dart untuk mendukung alur operasional klien.",
        "Menerapkan fitur inti aplikasi dengan fokus pada kode yang bersih, performa, dan stabilitas aplikasi.",
      ],
    },
  },

  projects: {
    "android-security-research": {
      headlineTitle:
        "Bagaimana Saya Membongkar Aplikasi Android Produksi untuk Menemukan Celah Autentikasi & TLS Pinning",
      category: "AppSec Mobile & Analisis Biner",
      impact: "Menemukan celah autentikasi & pinning yang kritis",
      description:
        "Riset keamanan dan reverse engineering aplikasi Android yang berizin: dekompilasi bytecode DEX dengan JADX, runtime hooking lewat Frida, bypass SSL pinning & root detection, serta audit trafik API terhadap OWASP MASVS.",
      laymanSummary:
        "Audit keamanan menyeluruh pada aplikasi Android produksi untuk menemukan celah kebocoran data sebelum disalahgunakan pihak luar.",
      problem:
        "Aplikasi mobile sering menyimpan logika bisnis sensitif, kunci API, atau token sesi di sisi klien yang rentan dibongkar oleh penyerang.",
      outcome:
        "Memetakan alur data sensitif, membuktikan risiko bypass proteksi aplikasi (SSL Pinning & Root Detection), dan menyusun rekomendasi perbaikan berstandar OWASP MASVS.",
      highlights: [
        "Dekompilasi APK/DEX ke Java & Smali untuk membedah logika autentikasi",
        "Dynamic instrumentation saat runtime untuk menguji ketahanan SSL Pinning",
        "Analisis trafik REST API terenkripsi & audit penyimpanan lokal (Keystore/SharedPrefs)",
      ],
      architecture: [
        { step: "APK / DEX Binary", detail: "Unpacking statis & inspeksi manifest" },
        { step: "JADX & Smali", detail: "Analisis control-flow & kunci kripto" },
        { step: "Frida Runtime Hook", detail: "Bypass pengecekan root & TLS pinning" },
        { step: "Mitmproxy / Burp", detail: "Audit payload API & kerentanan token" },
      ],
      decisions: [
        "Mengombinasikan static analysis (JADX) dan dynamic hooking (Frida) agar validasi keamanan tidak hanya berbasis tebakan kode statis.",
        "Menggunakan skrip injeksi Javascript pada Frida untuk mengintersepsi fungsi Cipher dan OkHttp CertificatePinner secara real-time tanpa memodifikasi signature APK.",
        "Menyusun laporan temuan dengan bukti reproduksi langkah-demi-langkah agar tim developer bisa langsung menambal celah (remediation).",
      ],
      screens: [
        {
          label: "1. Dekompilasi Statis",
          caption: "Memetakan struktur package, exported activity, dan hardcoded secret pada DEX bytecode.",
        },
        {
          label: "2. Runtime Hooking",
          caption: "Menguji ketahanan root detection & certificate pinning pada perangkat uji menggunakan Frida.",
        },
        {
          label: "3. Audit Trafik & Penyimpanan",
          caption: "Memverifikasi enkripsi payload API dan keamanan penyimpanan token di local storage.",
        },
      ],
    },
    broilerku: {
      headlineTitle:
        "Bagaimana Saya Mengotomatiskan Perhitungan FCR Kandang Broiler dan Mengganti Catatan Kertas dengan Telemetri Real-Time",
      category: "Aplikasi Mobile AgriTech",
      impact: "FCR otomatis & telemetri harian flok",
      description:
        "Membangun sistem manajemen kandang broiler berbasis Flutter untuk produksi: pencatatan pakan harian, pelacakan deplesi, mesin hitung Feed Conversion Ratio (FCR) & Indeks Performa otomatis, serta sinkronisasi multi-kandang real-time di Firebase.",
      laymanSummary:
        "Aplikasi manajemen kandang ayam broiler yang menggantikan pencatatan kertas dengan perhitungan efisiensi pakan (FCR) otomatis.",
      problem:
        "Peternak mencatat pakan, kematian ayam, dan bobot harian di kertas atau chat manual sehingga perhitungan FCR (Feed Conversion Ratio) lambat dan rawan salah hitung.",
      outcome:
        "Memangkas waktu rekap harian kandang dan memberikan indikator performa panen (FCR & Indeks Performa) secara instan di HP peternak.",
      highlights: [
        "Pencatatan pakan harian, deplesi (kematian), dan sampling bobot ayam per kandang",
        "Kalkulasi otomatis FCR (Feed Conversion Ratio) & estimasi panen secara real-time",
        "Sinkronisasi data multi-kandang berbasis Cloud Firestore & Firebase Auth",
      ],
      architecture: [
        { step: "Flutter UI Layer", detail: "Form reaktif & kartu dashboard FCR" },
        { step: "Domain / FCR Engine", detail: "Kalkulasi otomatis FCR, deplesi & IP" },
        { step: "Repository Layer", detail: "Sinkronisasi state & aturan validasi" },
        { step: "Firebase / Firestore", detail: "Persistensi cloud real-time & autentikasi" },
      ],
      decisions: [
        "Memisahkan logika perhitungan peternakan (FCR, tingkat deplesi, rata-rata bobot) ke domain layer murni agar hasil kalkulasi konsisten dan mudah diuji.",
        "Menggunakan struktur koleksi hierarkis di Firestore (Farms -> Cycles -> DailyLogs) untuk mempercepat query rekap per periode panen.",
        "Mendesain form input harian dengan validasi batas wajar agar petugas kandang tidak salah memasukkan satuan kilogram vs sak pakan.",
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
    "fama-agent": {
      headlineTitle:
        "Bagaimana Saya Membangun Aplikasi Pelaporan Lapangan Bertag Lokasi yang Tangguh untuk Operasi di Sinyal Lemah",
      category: "Operasional Lapangan Enterprise",
      impact: "Pelaporan GPS & media lapangan secara real-time",
      description:
        "Aplikasi pelaporan lapangan Android native dengan Kotlin dan MVVM: penguncian koordinat GPS presisi tinggi, kompresi gambar di background (3,8MB menjadi ~400KB), dan sinkronisasi multipart REST API.",
      laymanSummary:
        "Aplikasi pelaporan petugas lapangan berbasis Android untuk mengirim bukti foto, titik lokasi GPS akurat, dan laporan aktivitas langsung ke kantor pusat.",
      problem:
        "Pelaporan tim lapangan lewat grup pesan tidak terstruktur, sulit diverifikasi titik lokasinya, dan foto sering gagal terkirim saat sinyal seluler lemah.",
      outcome:
        "Menyediakan sistem pelaporan terpusat dengan bukti koordinat GPS tervalidasi dan kompresi foto otomatis yang hemat kuota serta stabil di jaringan lapangan.",
      highlights: [
        "Pengambilan laporan lapangan lengkap dengan teks, foto kamera, dan titik koordinat GPS",
        "Kompresi gambar otomatis di sisi perangkat sebelum dikirim ke REST API pusat",
        "Arsitektur MVVM dengan penanganan state loading, error, dan retry yang stabil",
      ],
      architecture: [
        { step: "Camera & FusedGPS", detail: "Ambil foto & koordinat akurasi tinggi" },
        { step: "Media Compressor", detail: "Downscale & penyematan metadata EXIF/Geo" },
        { step: "Kotlin ViewModel", detail: "Manajemen state MVVM & antrean retry" },
        { step: "Central REST API", detail: "Upload multipart & autentikasi token" },
      ],
      decisions: [
        "Menerapkan kompresi bitmap di background thread sebelum multipart upload untuk mencegah OutOfMemoryError dan mempercepat pengiriman di jaringan 3G/4G lemah.",
        "Menggunakan FusedLocationProviderClient dengan validasi akurasi radius agar titik koordinat laporan benar-benar presisi saat dikirim.",
        "Memisahkan UI Activity/Fragment dari logika jaringan menggunakan arsitektur MVVM agar pengiriman data tidak batal saat rotasi layar.",
      ],
      screens: [
        {
          label: "1. Capture & Geo-Tagging",
          caption: "Pengambilan foto bukti langsung dari kamera disertai penguncian koordinat GPS otomatis.",
        },
        {
          label: "2. Antrean Upload Pintar",
          caption: "Kompresi ukuran gambar otomatis dan indikator status pengiriman ke server pusat.",
        },
        {
          label: "3. Riwayat & Status Laporan",
          caption: "Daftar laporan yang sudah terkirim beserta waktu, lokasi, dan status verifikasi.",
        },
      ],
    },
  },

  skillGroups: {
    Languages: "Bahasa Pemrograman",
    Mobile: "Mobile",
    Architecture: "Arsitektur",
    Security: "Keamanan",
    "Backend & Tools": "Backend & Alat",
  },

  education: {
    "Universitas Islam Indonesia": {
      degree: "Magister Informatika – Data Science",
      place: "Yogyakarta, Indonesia",
      period: "Sep 2026 – Sep 2028 (Rencana)",
      note: "",
    },
    "Universitas Teknologi Digital Indonesia": {
      degree: "Sarjana Informatika",
      place: "Yogyakarta, Indonesia",
      period: "Sep 2024 – Feb 2026",
      note: "IPK 3,76 / 4,00",
    },
    "Politeknik Negeri Malang": {
      degree: "Diploma Manajemen Informatika",
      place: "Jawa Timur, Indonesia",
      period: "Agu 2021 – Agu 2023",
      note: "IPK 3,82 / 4,00",
    },
  },

  retrospective: {
    "2026": {
      title: "Riset keamanan & magister Data Science",
      text: "Riset keamanan dan reverse engineering Android yang berizin, sertifikat IBM dan Flutter, gelar sarjana selesai (IPK 3,76), dan Magister Informatika (Data Science) di UII yang dimulai September.",
    },
    "2025": {
      title: "BroilerKu",
      text: "Merilis aplikasi Flutter untuk manajemen kandang broiler dengan pencatatan pakan harian, pemantauan ternak, dan perhitungan FCR otomatis.",
    },
    "2024": {
      title: "Fama Agent & perjalanan kuliah sarjana",
      text: "Membangun aplikasi pelaporan lapangan Android dengan laporan teks, gambar, dan lokasi, sembari memulai kuliah sarjana Informatika.",
    },
    "2023": {
      title: "Dari junior developer ke XYBER",
      text: "Pekerjaan mobile pertama membangun aplikasi kasir Flutter, meraih sertifikat Samsung Knox Manage dan BNSP, lalu bergabung dengan XYBER sebagai Mobile Developer pada bulan November.",
    },
    "2021": {
      title: "Awal mula",
      text: "Memulai Diploma Manajemen Informatika di Politeknik Negeri Malang (IPK 3,82) dan mengoordinasi program rekrutmen dengan 50+ peserta di UKM MIMPI.",
    },
  },

  research: {
    "broiler-fcr-prediction": {
      title: "Memprediksi Feed Conversion Ratio (FCR) pada Peternakan Broiler",
      summary:
        "Riset magister tentang prediksi feed conversion ratio broiler dari catatan peternakan, melanjutkan data pakan harian dan flok yang saya olah saat membangun BroilerKu.",
      institution: "Universitas Islam Indonesia – Magister Informatika (Data Science)",
      updates: {
        "2026-10-01":
          "Memulai riset magister; merumuskan masalah dan menelaah literatur tentang prediksi FCR.",
      },
    },
  },

  organisation: {
    role: "Koordinator Acara",
    place: "Kediri, Jawa Timur",
    points: [
      "Memimpin program rekrutmen organisasi dengan 50+ peserta, mengelola perencanaan, pelaksanaan, dan anggaran.",
      "Meningkatkan rekrutmen anggota baru sebesar 10% dibandingkan tahun sebelumnya.",
    ],
  },

  yamlSkills: [
    "Kotlin & Android native",
    "Flutter & Dart",
    "Asesmen keamanan mobile",
    "Samsung Knox Manage",
    "MVVM & Clean Architecture",
    "Firebase & REST API",
  ],
};
