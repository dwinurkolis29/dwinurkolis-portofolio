# Desain: Web Portofolio Interaktif + Section Research

Tanggal: 2026-10-17 · Status: disetujui pemilik (hero: ilustrasi + parallax, tanpa three.js)

## Maksud & alasan

Pemilik web (Mokhammad Dwi Nurkolis, Android Engineer, mahasiswa S2 Data Science UII)
ingin web portofolionya terasa **interaktif dan hidup** seperti https://eltrovert.com/,
dan ingin menampilkan **penelitian S2-nya** (prediksi FCR pada peternakan broiler) yang
baru tahap awal dan akan ia perbarui sendiri lewat Supabase.

Web saat ini sudah meniru gaya statis eltrovert (hero terminal, `skills.yml`, jendela
kode melayang, kartu project dengan glow). Yang kurang adalah **interaksi dan gerak**,
serta bagian Research.

## Tujuan

1. Tujuh peningkatan berikut, semuanya disetujui pemilik:
   1. **Hero hidup** – ilustrasi `public/pilot-hero.png` + jendela kode melayang bergerak
      sedikit mengikuti mouse (parallax), ditambah beberapa ikon tech kecil yang mengorbit
      cincin yang sudah ada.
   2. **Efek ketik** – `Hello, I'm Kolis_` muncul huruf per huruf dengan kursor berkedip;
      chip `> status:` (sudah ada, dari `profile.status`) tetap.
   3. **Terminal `ask_dwi` yang bisa diketik** – menggantikan chip "ask_ai … soon".
   4. **Section topik dengan judul raksasa yang bergerak saat scroll** + 3 kartu topik
      (Mobile Engineering, Mobile Security, Data Science) yang menyala saat di-hover.
   5. **Animasi muncul saat scroll** (fade/slide) untuk section dan kartu.
   6. **Kartu project** – sudah kaya; tambahan: tombol Google Play bila project punya link
      toko, plus label tombol bergaya terminal `> View Project_`.
   7. **Section Research baru**, tepat di bawah Projects, datanya dari Supabase.
2. **Link Play Store BroilerKu**:
   `https://play.google.com/store/apps/details?id=com.chickin.mobile`
   (parameter `pcampaignid` dibuang) – tampil di kartu BroilerKu, halaman detail
   BroilerKu, dan sebagai tautan "terkait project" di kartu Research.

## Bukan tujuan

- Tidak menyalin aset, teks, atau merek eltrovert (gambar astronaut, frasa "TRAVERSING
  UNKNOWN DOMAIN", nama "El"). Gayanya diadaptasi, isinya milik pemilik.
- Tidak ada AI/LLM di terminal `ask_dwi` – jawabannya tetap (offline).
- Tidak ada section Posts/blog (eltrovert punya, pemilik tidak meminta).
- Tidak ada CMS/halaman admin – pemilik mengedit langsung di dashboard Supabase.
- Tidak membuat halaman detail `/research/[slug]` untuk sekarang (penelitian masih awal).

## Anti-tujuan (gagal walau "jalan")

- Animasi yang membuat teks sulit dibaca, terasa lambat, atau membuat halaman patah di HP.
- Mengabaikan `prefers-reduced-motion` – semua gerak harus mati bila pengguna memintanya.
- Konten penting yang hanya muncul lewat JavaScript: tanpa JS, semua teks tetap terbaca
  (efek ketik & reveal hanya hiasan di atas teks yang sudah dirender server).
- Section Research tampak "kosong/rusak" karena kolom belum diisi – kolom kosong harus
  disembunyikan dengan rapi.
- Halaman gagal render bila tabel `research` belum dimigrasi atau Supabase mati.

## Batasan

- Next.js **16.3.8** (App Router) – versi ini punya perubahan; baca panduan di
  `node_modules/next/dist/docs/` sebelum menulis kode (lihat `AGENTS.md`).
- React 19, Tailwind v4 (token warna di `src/app/globals.css`: `background`, `surface`,
  `border`, `foreground`, `muted`, `accent`, `accent-2`). Font Geist / Geist Mono.
- `src/app/page.tsx` adalah Server Component dengan `revalidate = 60`. Interaksi masuk
  ke Client Component kecil terpisah (`"use client"`), halaman tetap server.
- Data dibaca lewat `getProfileData()` di `src/lib/profile-data.ts`, dengan fallback ke
  `src/data/profile.ts` bila Supabase tidak tersedia. Research mengikuti pola yang sama.
- SQL migrasi ditulis sebagai file di `supabase/`, **dijalankan sendiri oleh pemilik**
  di SQL editor Supabase. Harus aman dijalankan ulang (pola `if not exists`, seperti
  `supabase/projects-migration.sql`). RLS: baca publik, pola sama dengan
  `supabase/profile.sql` (policy "publik boleh membaca").
- Bahasa UI web: Inggris (seperti sekarang).

## Keputusan pemilik

- Ketujuh saran di atas: **setuju semua**.
- Research: topik **prediksi FCR pada peternakan broiler**, tahap awal; detail akan
  diisi pemilik sendiri di Supabase.
- Research ditaruh **di bawah Projects**, data dari Supabase, kolom kosong disembunyikan,
  ada log progres bertanggal, dan tautan ke project BroilerKu.
- Link Play Store BroilerKu seperti di atas.
- Repo GitHub private **tidak** ditautkan.

## Model data Research

Tabel baru `public.research` (satu baris per penelitian):

| kolom | tipe | catatan |
|---|---|---|
| id | bigint identity PK | |
| sort_order | int, default 0 | |
| slug | text unique | mis. `broiler-fcr-prediction` |
| title | text not null | |
| summary | text | ringkasan 1–3 kalimat |
| stage | text not null default `'proposal'` | `proposal` · `data_collection` · `modeling` · `writing` · `published` |
| institution | text | mis. "Universitas Islam Indonesia – Master of Informatics (Data Science)" |
| supervisor | text | boleh kosong |
| methods | text[] default `{}` | tag metode |
| datasets | text[] default `{}` | tag dataset |
| related_project_slug | text | mis. `broilerku` |
| links | jsonb default `[]` | `[{"label": "...", "url": "..."}]` paper/poster/repo publik |
| published | boolean default true | false = disembunyikan |

Tabel `public.research_updates` (log progres, satu baris per entri – lebih mudah ditambah
dari dashboard daripada mengedit JSON):

| kolom | tipe |
|---|---|
| id | bigint identity PK |
| research_slug | text not null (references research.slug, on delete cascade) |
| date | date not null |
| note | text not null |

Tanggal disimpan sebagai `date` (entri bulanan memakai tanggal 1, mis. `2026-10-01`) dan ditampilkan `YYYY-MM`. Urutan log: `date` menurun, lalu `id` menurun. *(keputusan Claude)*

Kolom baru di `public.projects`: `store_url text` (Google Play). Migrasi mengisi
BroilerKu hanya bila kolomnya masih kosong.

**Data awal** (di SQL dan di fallback lokal `src/data/profile.ts`):
- title: "Predicting Feed Conversion Ratio (FCR) in Broiler Farms"
- summary singkat yang menyebut tujuan prediksi FCR dan kaitannya dengan pengalaman
  membangun BroilerKu
- stage `proposal`, institution UII, related_project_slug `broilerku`
- satu update: `2026-10` – "Started the master's research; defining the problem and
  reviewing literature on FCR prediction."

## Perilaku tiap bagian

**Section Research** (`id="research"`, eyebrow `Research`, judul mis. "What I'm
investigating"; link `Research` ditambahkan di nav setelah Projects):
- Kartu bergaya jendela terminal. Baris atas: institusi + stage.
- **Progress bar stage** bergaya terminal, mis. `[■■□□□] proposal`, dengan 5 tahap di atas.
  Stage tak dikenal → tampilkan teks apa adanya tanpa bar.
- Tag metode/dataset, daftar link, tautan "Related project: BroilerKu ↗" ke
  `/projects/broilerku` plus tombol Google Play bila project itu punya `store_url`.
- Log progres sebagai changelog (`YYYY-MM · catatan`).
- Field/daftar kosong tidak dirender sama sekali.
- Bila tidak ada baris research yang published → section tidak dirender.

**Fallback data:** bila query `research`/`research_updates` gagal (mis. tabel belum ada),
pakai data research lokal **tanpa** membuat seluruh profil jatuh ke fallback. (Saat ini
satu query gagal membuat semua data lokal; research tidak boleh memperburuk itu.)

**Terminal `ask_dwi`:** input teks di hero. Perintah: `help`, `whoami`, `projects`,
`research`, `stack`, `contact`, `clear`; perintah tak dikenal → `command not found, try
help`. Jawaban diambil dari data yang sama dengan halaman (bukan teks hardcode terpisah).
Riwayat beberapa baris terakhir terlihat di atas input. Dapat dipakai dengan keyboard,
punya label aksesibel.

**Section topik bergerak:** judul raksasa (mis. "FROM MOBILE TO MODELS") bergeser
horizontal dan memudar mengikuti posisi scroll; diletakkan antara hero dan Experience.
Tiga kartu topik di bawahnya, masing-masing menautkan ke section relevan
(Mobile → #projects, Security → project security, Data Science → #research).

**Reveal saat scroll:** satu komponen pembungkus berbasis IntersectionObserver;
konten terlihat secara default bila JS mati.

**Gerak umum:** tanpa library animasi baru; CSS + `requestAnimationFrame`. Parallax hero
hanya untuk pointer mouse (tidak di layar sentuh).

**Kasus tepi (keputusan Claude):**
- Hanya `research_updates` yang gagal → kartu tetap tampil tanpa log.
- Project terkait tidak ada/tidak published → tautan terkait disembunyikan.
- Kartu topik Security → `/projects/android-security-research`.
- Efek ketik: teks lengkap dirender server; efek baru jalan setelah JS hidup (tanpa kedip kosong).
- Tanpa JS, `ask_dwi` menampilkan output `help` statis.
- `store_url` juga ada di data fallback lokal project BroilerKu.

## Diserahkan ke pembangun

- Struktur file/komponen persis, nama komponen, tuning durasi/easing animasi.
- Pilihan ikon orbit (SVG inline kecil: Android, Kotlin, Flutter, Python, dsb.).
- Teks final judul raksasa dan deskripsi kartu topik (boleh diusulkan, pemilik bisa ubah).
- Apakah `Window` dan `Section` dipindah ke file komponen bersama.

## Keputusan yang saya ambil (Claude) – mohon dicek

- Tidak menambah library 3D (three.js); "3D" = ilustrasi yang ada + parallax.
- `ask_dwi` offline tanpa AI.
- Log progres di tabel terpisah agar mudah diisi dari dashboard.
- Frasa judul raksasa "FROM MOBILE TO MODELS".
- Data awal research ditulis dalam bahasa Inggris, mengikuti bahasa web.

## Verifikasi

- `npm run lint` dan `npm run build` lulus.
- Dicek di browser: desktop dan lebar HP (375px), dengan dan tanpa Supabase
  (env kosong → fallback lokal tetap menampilkan Research), dan dengan
  `prefers-reduced-motion: reduce`.
