-- Migrasi: lengkapi tabel projects agar seluruh konten studi kasus bisa diubah dari Supabase.
-- Aman dijalankan ulang. Nilai yang sudah Anda ubah di Supabase tidak ditimpa.

alter table public.projects
  add column if not exists slug text,
  add column if not exists headline_title text,
  add column if not exists category text,
  add column if not exists impact text,
  add column if not exists layman_summary text,
  add column if not exists problem text,
  add column if not exists outcome text,
  add column if not exists highlights text[] not null default '{}',
  add column if not exists architecture jsonb not null default '[]',   -- [{"step": "...", "detail": "..."}]
  add column if not exists decisions text[] not null default '{}',
  add column if not exists code_title text,
  add column if not exists code_snippet text[] not null default '{}',
  add column if not exists screens jsonb not null default '[]',        -- [{"label": "...", "caption": "..."}]
  add column if not exists status text not null default 'completed',   -- mis. completed | in_progress | archived
  add column if not exists published boolean not null default true;    -- false = disembunyikan dari web

create unique index if not exists projects_slug_key on public.projects (slug);

-- Hubungkan baris lama (tanpa slug) dengan slug berdasarkan nama
update public.projects set slug = 'android-security-research' where slug is null and lower(name) = lower('Android Security Research & Reverse Engineering');
update public.projects set slug = 'broilerku' where slug is null and lower(name) = lower('BroilerKu');
update public.projects set slug = 'fama-agent' where slug is null and lower(name) = lower('Fama Agent');

-- Isi kolom baru; project yang belum ada dibuat, yang sudah ada hanya dilengkapi kolom kosongnya
insert into public.projects (sort_order, slug, year, name, description, tags, headline_title, category, impact, layman_summary, problem, outcome, highlights, architecture, decisions, code_title, code_snippet, screens) values (
  1,
  'android-security-research',
  '2026',
  'Android Security Research & Reverse Engineering',
  'Authorized Android application security research and reverse engineering: decompiling DEX bytecode with JADX, runtime hooking via Frida, bypassing SSL pinning & root detection, and auditing API traffic against OWASP MASVS.',
  array['Android', 'Security', 'Reverse Engineering', 'Frida', 'JADX', 'OWASP MASVS']::text[],
  'How I Reverse-Engineered Production Android Apps to Uncover Auth & TLS Pinning Flaws',
  'Mobile AppSec & Binary Analysis',
  'Identified critical auth & pinning flaws',
  'Audit keamanan menyeluruh pada aplikasi Android produksi untuk menemukan celah kebocoran data sebelum disalahgunakan pihak luar.',
  'Aplikasi mobile sering menyimpan logika bisnis sensitif, kunci API, atau token sesi di sisi klien yang rentan dibongkar oleh penyerang.',
  'Memetakan alur data sensitif, membuktikan risiko bypass proteksi aplikasi (SSL Pinning & Root Detection), dan menyusun rekomendasi perbaikan berstandar OWASP MASVS.',
  array['Dekompilasi APK/DEX ke Java & Smali untuk membedah logika autentikasi', 'Dynamic instrumentation saat runtime untuk menguji ketahanan SSL Pinning', 'Analisis trafik REST API terenkripsi & audit penyimpanan lokal (Keystore/SharedPrefs)']::text[],
  '[{"step":"APK / DEX Binary","detail":"Static unpacking & manifest inspection"},{"step":"JADX & Smali","detail":"Control-flow & crypto key analysis"},{"step":"Frida Runtime Hook","detail":"Bypass root & TLS pinning checks"},{"step":"Mitmproxy / Burp","detail":"API payload & token vulnerability audit"}]'::jsonb,
  array['Mengombinasikan static analysis (JADX) dan dynamic hooking (Frida) agar validasi keamanan tidak hanya berbasis tebakan kode statis.', 'Menggunakan skrip injeksi Javascript pada Frida untuk mengintersepsi fungsi Cipher dan OkHttp CertificatePinner secara real-time tanpa memodifikasi signature APK.', 'Menyusun laporan temuan dengan bukti reproduksi langkah-demi-langkah agar tim developer bisa langsung menambal celah (remediation).']::text[],
  'frida-pinning-audit.js',
  array['Java.perform(() => {', '  const Pinner = Java.use("okhttp3.CertificatePinner");', '  Pinner.check.overload("java.lang.String", "java.util.List")', '    .implementation = function (hostname) {', '      console.log("[audit] TLS check intercepted for: " + hostname);', '      return; // Verify server-side token validation resilience', '    };', '});']::text[],
  '[{"label":"1. Static Decompilation","caption":"Memetakan struktur package, exported activity, dan hardcoded secret pada DEX bytecode."},{"label":"2. Runtime Hooking","caption":"Menguji ketahanan root detection & certificate pinning pada perangkat uji menggunakan Frida."},{"label":"3. Traffic & Storage Audit","caption":"Memverifikasi enkripsi payload API dan keamanan penyimpanan token di local storage."}]'::jsonb
)
on conflict (slug) do update set
  headline_title = case when projects.headline_title is null then excluded.headline_title else projects.headline_title end,
  category = case when projects.category is null then excluded.category else projects.category end,
  impact = case when projects.impact is null then excluded.impact else projects.impact end,
  layman_summary = case when projects.layman_summary is null then excluded.layman_summary else projects.layman_summary end,
  problem = case when projects.problem is null then excluded.problem else projects.problem end,
  outcome = case when projects.outcome is null then excluded.outcome else projects.outcome end,
  highlights = case when cardinality(projects.highlights) = 0 then excluded.highlights else projects.highlights end,
  architecture = case when projects.architecture = '[]'::jsonb then excluded.architecture else projects.architecture end,
  decisions = case when cardinality(projects.decisions) = 0 then excluded.decisions else projects.decisions end,
  code_title = case when projects.code_title is null then excluded.code_title else projects.code_title end,
  code_snippet = case when cardinality(projects.code_snippet) = 0 then excluded.code_snippet else projects.code_snippet end,
  screens = case when projects.screens = '[]'::jsonb then excluded.screens else projects.screens end;

insert into public.projects (sort_order, slug, year, name, description, tags, headline_title, category, impact, layman_summary, problem, outcome, highlights, architecture, decisions, code_title, code_snippet, screens) values (
  2,
  'broilerku',
  '2025',
  'BroilerKu',
  'Building a production Flutter management system for broiler farms: daily feed recording, depletion tracking, automated Feed Conversion Ratio (FCR) & Performance Index engines, and real-time multi-shed sync on Firebase.',
  array['Flutter', 'Dart', 'Firebase', 'Clean Architecture', 'Firestore']::text[],
  'How I Automated Broiler Farm FCR Calculations and Replaced Paper Logs with Real-Time Telemetry',
  'AgriTech Mobile Application',
  'Automated FCR & daily flock telemetry',
  'Aplikasi manajemen kandang ayam broiler yang menggantikan pencatatan kertas dengan perhitungan efisiensi pakan (FCR) otomatis.',
  'Peternak mencatat pakan, kematian ayam, dan bobot harian di kertas atau chat manual sehingga perhitungan FCR (Feed Conversion Ratio) lambat dan rawan salah hitung.',
  'Memangkas waktu rekap harian kandang dan memberikan indikator performa panen (FCR & Indeks Performa) secara instan di HP peternak.',
  array['Pencatatan pakan harian, deplesi (kematian), dan sampling bobot ayam per kandang', 'Kalkulasi otomatis FCR (Feed Conversion Ratio) & estimasi panen secara real-time', 'Sinkronisasi data multi-kandang berbasis Cloud Firestore & Firebase Auth']::text[],
  '[{"step":"Flutter UI Layer","detail":"Reactive forms & FCR dashboard cards"},{"step":"Domain / FCR Engine","detail":"Automated FCR, depletion & IP calculation"},{"step":"Repository Layer","detail":"State sync & validation rules"},{"step":"Firebase / Firestore","detail":"Real-time cloud persistence & auth"}]'::jsonb,
  array['Memisahkan logika perhitungan peternakan (FCR, tingkat deplesi, rata-rata bobot) ke domain layer murni agar hasil kalkulasi konsisten dan mudah diuji.', 'Menggunakan struktur koleksi hierarkis di Firestore (Farms -> Cycles -> DailyLogs) untuk mempercepat query rekap per periode panen.', 'Mendesain form input harian dengan validasi batas wajar agar petugas kandang tidak salah memasukkan satuan kilogram vs sak pakan.']::text[],
  'fcr_calculator.dart',
  array['class FcrCalculator {', '  static double compute({', '    required double totalFeedKg,', '    required int livePopulation,', '    required double avgWeightKg,', '  }) {', '    final totalBiomassKg = livePopulation * avgWeightKg;', '    if (totalBiomassKg <= 0) return 0.0;', '    return double.parse((totalFeedKg / totalBiomassKg).toStringAsFixed(2));', '  }', '}']::text[],
  '[{"label":"1. Dashboard Kandang","caption":"Ringkasan metrik utama: skor FCR saat ini, populasi hidup, dan grafik konsumsi pakan."},{"label":"2. Input Harian Cepat","caption":"Form pencatatan jumlah pakan masuk, angka kematian harian, dan hasil timbang sampel."},{"label":"3. Analitik Siklus Panen","caption":"Evaluasi performa kandang dari hari ke-1 (DOC) hingga panen untuk membandingkan efisiensi."}]'::jsonb
)
on conflict (slug) do update set
  headline_title = case when projects.headline_title is null then excluded.headline_title else projects.headline_title end,
  category = case when projects.category is null then excluded.category else projects.category end,
  impact = case when projects.impact is null then excluded.impact else projects.impact end,
  layman_summary = case when projects.layman_summary is null then excluded.layman_summary else projects.layman_summary end,
  problem = case when projects.problem is null then excluded.problem else projects.problem end,
  outcome = case when projects.outcome is null then excluded.outcome else projects.outcome end,
  highlights = case when cardinality(projects.highlights) = 0 then excluded.highlights else projects.highlights end,
  architecture = case when projects.architecture = '[]'::jsonb then excluded.architecture else projects.architecture end,
  decisions = case when cardinality(projects.decisions) = 0 then excluded.decisions else projects.decisions end,
  code_title = case when projects.code_title is null then excluded.code_title else projects.code_title end,
  code_snippet = case when cardinality(projects.code_snippet) = 0 then excluded.code_snippet else projects.code_snippet end,
  screens = case when projects.screens = '[]'::jsonb then excluded.screens else projects.screens end;

insert into public.projects (sort_order, slug, year, name, description, tags, headline_title, category, impact, layman_summary, problem, outcome, highlights, architecture, decisions, code_title, code_snippet, screens) values (
  3,
  'fama-agent',
  '2024',
  'Fama Agent',
  'Native Android field reporting application built with Kotlin and MVVM: high-precision GPS coordinate locking, background image compression (3.8MB to ~400KB), and multipart REST API synchronization.',
  array['Kotlin', 'Android', 'REST API', 'MVVM', 'Location Services']::text[],
  'How I Built a Resilient Geo-Tagged Field Reporting App for Low-Signal Operations',
  'Enterprise Field Operations',
  'Real-time GPS & media field reporting',
  'Aplikasi pelaporan petugas lapangan berbasis Android untuk mengirim bukti foto, titik lokasi GPS akurat, dan laporan aktivitas langsung ke kantor pusat.',
  'Pelaporan tim lapangan lewat grup pesan tidak terstruktur, sulit diverifikasi titik lokasinya, dan foto sering gagal terkirim saat sinyal seluler lemah.',
  'Menyediakan sistem pelaporan terpusat dengan bukti koordinat GPS tervalidasi dan kompresi foto otomatis yang hemat kuota serta stabil di jaringan lapangan.',
  array['Pengambilan laporan lapangan lengkap dengan teks, foto kamera, dan titik koordinat GPS', 'Kompresi gambar otomatis di sisi perangkat sebelum dikirim ke REST API pusat', 'Arsitektur MVVM dengan penanganan state loading, error, dan retry yang stabil']::text[],
  '[{"step":"Camera & FusedGPS","detail":"Capture photo & high-accuracy coordinates"},{"step":"Media Compressor","detail":"Downscale & EXIF/Geo metadata binding"},{"step":"Kotlin ViewModel","detail":"MVVM state management & retry queue"},{"step":"Central REST API","detail":"Multipart upload & token authentication"}]'::jsonb,
  array['Menerapkan kompresi bitmap di background thread sebelum multipart upload untuk mencegah OutOfMemoryError dan mempercepat pengiriman di jaringan 3G/4G lemah.', 'Menggunakan FusedLocationProviderClient dengan validasi akurasi radius agar titik koordinat laporan benar-benar presisi saat dikirim.', 'Memisahkan UI Activity/Fragment dari logika jaringan menggunakan arsitektur MVVM agar pengiriman data tidak batal saat rotasi layar.']::text[],
  'ReportViewModel.kt',
  array['fun submitFieldReport(note: String, photo: File, loc: Location) {', '  viewModelScope.launch {', '    _uiState.value = ReportUiState.Uploading', '    val compressed = imageCompressor.compressToMaxKb(photo, maxKb = 450)', '    repository.uploadMultipart(note, compressed, loc.latitude, loc.longitude)', '      .onSuccess { _uiState.value = ReportUiState.Success(it.reportId) }', '      .onFailure { _uiState.value = ReportUiState.Error(it.message) }', '  }', '}']::text[],
  '[{"label":"1. Capture & Geo-Tagging","caption":"Pengambilan foto bukti langsung dari kamera disertai penguncian koordinat GPS otomatis."},{"label":"2. Smart Upload Queue","caption":"Kompresi ukuran gambar otomatis dan indikator status pengiriman ke server pusat."},{"label":"3. Riwayat & Status Laporan","caption":"Daftar laporan yang sudah terkirim beserta waktu, lokasi, dan status verifikasi."}]'::jsonb
)
on conflict (slug) do update set
  headline_title = case when projects.headline_title is null then excluded.headline_title else projects.headline_title end,
  category = case when projects.category is null then excluded.category else projects.category end,
  impact = case when projects.impact is null then excluded.impact else projects.impact end,
  layman_summary = case when projects.layman_summary is null then excluded.layman_summary else projects.layman_summary end,
  problem = case when projects.problem is null then excluded.problem else projects.problem end,
  outcome = case when projects.outcome is null then excluded.outcome else projects.outcome end,
  highlights = case when cardinality(projects.highlights) = 0 then excluded.highlights else projects.highlights end,
  architecture = case when projects.architecture = '[]'::jsonb then excluded.architecture else projects.architecture end,
  decisions = case when cardinality(projects.decisions) = 0 then excluded.decisions else projects.decisions end,
  code_title = case when projects.code_title is null then excluded.code_title else projects.code_title end,
  code_snippet = case when cardinality(projects.code_snippet) = 0 then excluded.code_snippet else projects.code_snippet end,
  screens = case when projects.screens = '[]'::jsonb then excluded.screens else projects.screens end;


