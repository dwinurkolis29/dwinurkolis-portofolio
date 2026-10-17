-- Migrasi: tabel research + log progres, dan kolom store_url di projects.
-- Aman dijalankan ulang. Nilai yang sudah Anda ubah di Supabase tidak ditimpa.

create table if not exists public.research (
  id bigint generated always as identity primary key,
  sort_order int not null default 0,
  slug text unique,
  title text not null,
  summary text,
  stage text not null default 'proposal',   -- proposal | data_collection | modeling | writing | published
  institution text,
  supervisor text,
  methods text[] not null default '{}',
  datasets text[] not null default '{}',
  related_project_slug text,                -- mis. broilerku
  links jsonb not null default '[]',        -- [{"label": "...", "url": "..."}]
  published boolean not null default true   -- false = disembunyikan dari web
);

create table if not exists public.research_updates (
  id bigint generated always as identity primary key,
  research_slug text not null references public.research (slug) on update cascade on delete cascade,
  date date not null,                       -- entri bulanan memakai tanggal 1, mis. 2026-10-01
  note text not null
);

-- Row Level Security: semua orang boleh membaca, tidak ada yang boleh menulis lewat anon key
do $$
declare t text;
begin
  foreach t in array array['research','research_updates'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = 'publik boleh membaca'
    ) then
      execute format('create policy "publik boleh membaca" on public.%I for select to anon, authenticated using (true)', t);
    end if;
  end loop;
end $$;

-- Link Google Play; BroilerKu hanya diisi bila kolomnya masih kosong
alter table public.projects add column if not exists store_url text;

update public.projects
  set store_url = 'https://play.google.com/store/apps/details?id=com.chickin.mobile'
  where slug = 'broilerku' and store_url is null;

-- Data awal
-- Catatan: bila slug data awal ini diganti atau dihapus, menjalankan ulang file ini akan memasukkan data awal lagi.
insert into public.research (sort_order, slug, title, summary, stage, institution, related_project_slug) values (
  1,
  'broiler-fcr-prediction',
  'Predicting Feed Conversion Ratio (FCR) in Broiler Farms',
  'Master''s research on predicting broiler feed conversion ratio from farm records, building on the daily feed and flock data I worked with while building BroilerKu.',
  'proposal',
  'Universitas Islam Indonesia – Master of Informatics (Data Science)',
  'broilerku'
)
on conflict (slug) do nothing;

insert into public.research_updates (research_slug, date, note)
select
  'broiler-fcr-prediction',
  date '2026-10-01',
  'Started the master''s research; defining the problem and reviewing literature on FCR prediction.'
where not exists (
  select 1 from public.research_updates
  where research_slug = 'broiler-fcr-prediction'
    and date = date '2026-10-01'
    and note = 'Started the master''s research; defining the problem and reviewing literature on FCR prediction.'
);
