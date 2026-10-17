-- Ganti nama lengkap menjadi "M Dwi Nurkolis" pada data yang tampil di web.
-- Aman dijalankan ulang. Jalankan di SQL editor Supabase.

update public.profile
set name = replace(name, 'Mokhammad Dwi Nurkolis', 'M Dwi Nurkolis'),
    summary = replace(summary, 'Mokhammad Dwi Nurkolis', 'M Dwi Nurkolis')
where name ilike '%mokhammad%' or summary ilike '%mokhammad%';

-- Cek sisa: setiap tabel harus 0. (Kolom profile.linkedin sengaja tidak dicek:
-- URL LinkedIn hanya berubah jika custom URL di LinkedIn diganti.)
select 'profile' as tabel, count(*) from public.profile where concat_ws(' ', name, summary, location) ilike '%mokhammad%'
union all select 'experience', count(*) from public.experience where row(experience.*)::text ilike '%mokhammad%'
union all select 'projects', count(*) from public.projects where row(projects.*)::text ilike '%mokhammad%'
union all select 'education', count(*) from public.education where row(education.*)::text ilike '%mokhammad%'
union all select 'achievements', count(*) from public.achievements where row(achievements.*)::text ilike '%mokhammad%'
union all select 'retrospective', count(*) from public.retrospective where row(retrospective.*)::text ilike '%mokhammad%';
