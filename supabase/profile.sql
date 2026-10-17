-- Konten web profil (dibaca publik, ditulis lewat dashboard/service role)
create table public.profile (
  id int primary key default 1 check (id = 1),
  name text not null, role text not null, status text, summary text,
  location text, email text, linkedin text
);
create table public.experience (
  id serial primary key, sort_order int not null,
  company text not null, place text, title text not null, period text, points text[] not null default '{}'
);
create table public.projects (
  id serial primary key, sort_order int not null,
  year text, name text not null, description text, tags text[] not null default '{}'
);
create table public.skill_groups (
  id serial primary key, sort_order int not null,
  group_name text not null, items text[] not null default '{}'
);
create table public.education (
  id serial primary key, sort_order int not null,
  school text not null, place text, degree text not null, period text, note text
);
create table public.achievements (
  id serial primary key, sort_order int not null, year text, name text not null
);
create table public.retrospective (
  id serial primary key, sort_order int not null, year text not null, title text not null, body text
);

-- Row Level Security: semua orang boleh membaca, tidak ada yang boleh menulis lewat anon key
do $$
declare t text;
begin
  foreach t in array array['profile','experience','projects','skill_groups','education','achievements','retrospective'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('create policy "publik boleh membaca" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
end $$;

insert into public.profile (id,name,role,status,summary,location,email,linkedin) values (1,'M Dwi Nurkolis','Android Engineer','studying_data_science','Android Engineer with 3+ years of experience developing production mobile applications, with a primary focus on Kotlin and native Android development. Experienced in enterprise Android solutions, mobile security assessment, reverse engineering, and Samsung Knox Manage. Also experienced in cross-platform development using Flutter.','Kediri, East Java · studying in Yogyakarta, Indonesia','kolisdestroyer29@gmail.com','https://www.linkedin.com/in/mokhammad-dwi-nurkolis');

insert into public.experience (sort_order,company,place,title,period,points) values (1,'XYBER','Yogyakarta, Indonesia','Middle Mobile Developer','Nov 2023 – Present',array['Develop and maintain native Android applications using Kotlin and Android SDK, focusing on security, performance, and system stability.', 'Implement Samsung Knox Manage for enterprise device security policies, application distribution, and device management.', 'Conduct authorized Android application security assessments and reverse engineering to analyze application behavior, identify potential security weaknesses, and understand application logic.', 'Develop a private enterprise communication application designed to protect user privacy and data integrity.', 'Build a mobile survey and reporting application with centralized data, real-time reporting, and location-based reporting.', 'Develop mobile solutions for vote counting and data aggregation, enabling structured and efficient result processing.', 'Develop an internal HR management and employee monitoring application using Flutter.']);
insert into public.experience (sort_order,company,place,title,period,points) values (2,'PT Days App Development','Kediri, Indonesia','Junior Mobile Developer','Jun 2023 – Sep 2023',array['Developed a mobile cashier application using Flutter and Dart to support client operational workflows.', 'Implemented core application features with a focus on clean code, performance, and application stability.']);

insert into public.projects (sort_order,year,name,description,tags) values (1,'2026','Android Security Research & Reverse Engineering','Authorized Android application security research and reverse engineering to analyze application structure, application logic, data flow, security controls, and potential security weaknesses.',array['Android', 'Security', 'Reverse Engineering']);
insert into public.projects (sort_order,year,name,description,tags) values (2,'2025','BroilerKu','Flutter-based mobile application for broiler farm management, including daily feed recording, livestock monitoring, and automated FCR calculations.',array['Flutter', 'Dart', 'Firebase']);
insert into public.projects (sort_order,year,name,description,tags) values (3,'2024','Fama Agent','Android-based field reporting application for submitting text, image, and location-based reports to a centralized system.',array['Kotlin', 'Android', 'REST API']);

insert into public.skill_groups (sort_order,group_name,items) values (1,'Languages',array['Kotlin', 'Java', 'Dart', 'XML']);
insert into public.skill_groups (sort_order,group_name,items) values (2,'Mobile',array['Android SDK', 'Flutter', 'Android Studio', 'Samsung Knox Manage']);
insert into public.skill_groups (sort_order,group_name,items) values (3,'Architecture',array['MVVM', 'Clean Architecture', 'Clean Code']);
insert into public.skill_groups (sort_order,group_name,items) values (4,'Security',array['Android Security Assessment', 'Reverse Engineering', 'Application Logic Analysis']);
insert into public.skill_groups (sort_order,group_name,items) values (5,'Backend & Tools',array['REST API', 'Firebase Authentication', 'Firestore', 'Firebase Cloud Messaging', 'Git', 'GitHub', 'GitLab']);

insert into public.education (sort_order,school,place,degree,period,note) values (1,'Universitas Islam Indonesia','Yogyakarta, Indonesia','Master of Informatics – Data Science','Sep 2026 – Sep 2028 (Expected)','');
insert into public.education (sort_order,school,place,degree,period,note) values (2,'Universitas Teknologi Digital Indonesia','Yogyakarta, Indonesia','Bachelor of Informatics','Sep 2024 – Feb 2026','GPA 3.76 / 4.00');
insert into public.education (sort_order,school,place,degree,period,note) values (3,'Politeknik Negeri Malang','East Java, Indonesia','Associate Degree in Informatics Management','Aug 2021 – Aug 2023','GPA 3.82 / 4.00');

insert into public.achievements (sort_order,year,name) values (1,'2026','IBM iOS and Android Mobile App Developer');
insert into public.achievements (sort_order,year,name) values (2,'2026','Developing Mobile Apps with Flutter Specialization');
insert into public.achievements (sort_order,year,name) values (3,'2023','Samsung Knox Manage Certificate');
insert into public.achievements (sort_order,year,name) values (4,'2023','Certificate of Competence in Information Technology (BNSP)');

insert into public.retrospective (sort_order,year,title,body) values (1,'2026','Security research & a Data Science master''s','Authorized Android security research and reverse engineering, IBM and Flutter certificates, bachelor''s degree completed (GPA 3.76), and a Master of Informatics (Data Science) at UII starting in September.');
insert into public.retrospective (sort_order,year,title,body) values (2,'2025','BroilerKu','Shipped a Flutter app for broiler farm management with daily feed recording, livestock monitoring, and automated FCR calculations.');
insert into public.retrospective (sort_order,year,title,body) values (3,'2024','Fama Agent & the bachelor''s journey','Built an Android field reporting app with text, image, and location reports, while starting a bachelor''s degree in Informatics.');
insert into public.retrospective (sort_order,year,title,body) values (4,'2023','From junior developer to XYBER','First mobile role building a Flutter cashier app, earned the Samsung Knox Manage and BNSP certificates, then joined XYBER as a Mobile Developer in November.');
insert into public.retrospective (sort_order,year,title,body) values (5,'2021','Where it started','Began an Associate Degree in Informatics Management at Politeknik Negeri Malang (GPA 3.82) and coordinated a 50+ participant recruitment program at UKM MIMPI.');

