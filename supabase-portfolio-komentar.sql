-- ============================================================
-- Portfolio OmniDev: buku tamu + komentar blog
-- Jalankan sekali di SQL Editor (project qgvuyayoiutqvabjqfan)
-- ============================================================

-- 1. Buku tamu (pesan tentang web)
create table if not exists buku_tamu (
  id uuid primary key default gen_random_uuid(),
  nama text not null check (char_length(nama) between 1 and 50),
  pesan text not null check (char_length(pesan) between 1 and 500),
  dibuat timestamptz not null default now()
);

-- 2. Komentar blog (parent_id = balasan, 1 level)
create table if not exists komentar_blog (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  nama text not null check (char_length(nama) between 1 and 50),
  pesan text not null check (char_length(pesan) between 1 and 500),
  parent_id uuid references komentar_blog(id) on delete cascade,
  dibuat timestamptz not null default now()
);
create index if not exists idx_komentar_blog_slug on komentar_blog(slug);
create index if not exists idx_komentar_blog_parent on komentar_blog(parent_id);

-- 3. RLS: publik boleh baca & kirim, tidak boleh ubah/hapus
alter table buku_tamu enable row level security;
alter table komentar_blog enable row level security;

drop policy if exists "publik baca buku tamu" on buku_tamu;
create policy "publik baca buku tamu" on buku_tamu
  for select using (true);

drop policy if exists "publik kirim buku tamu" on buku_tamu;
create policy "publik kirim buku tamu" on buku_tamu
  for insert with check (true);

drop policy if exists "publik baca komentar" on komentar_blog;
create policy "publik baca komentar" on komentar_blog
  for select using (true);

drop policy if exists "publik kirim komentar" on komentar_blog;
create policy "publik kirim komentar" on komentar_blog
  for insert with check (true);
