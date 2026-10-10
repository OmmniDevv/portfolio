---
title: "Flexbox dalam 20 Menit: Bikin Layout Rapi Tanpa Pusing"
date: 2026-10-10
excerpt: "Flexbox terlihat menakutkan sampai kamu paham dua konsep intinya: container dan item. Tutorial praktis bikin navbar, kartu, dan layout tengah dalam 20 menit."
tags: css, tutorial, web, frontend
image: "https://designshack.net/wp-content/uploads/css.jpg"
---

Dulu bikin layout web itu menyiksa. Float ke kiri, float ke kanan, clearfix sana-sini, dan satu div nakal bisa merusak semuanya. Flexbox datang dan menyederhanakan hampir semua kasus layout satu dimensi: baris atau kolom. Kabar baiknya, kamu cuma perlu paham dua peran: siapa yang jadi container, dan siapa yang jadi item di dalamnya.

## Konsep inti: container vs item

Container adalah elemen yang diberi `display: flex`. Semua anak langsungnya otomatis jadi item dan diatur oleh container. Dua properti yang paling sering dipakai:

- `justify-content`: mengatur posisi item sepanjang sumbu utama (kiri-kanan kalau baris, atas-bawah kalau kolom).
- `align-items`: mengatur posisi item sepanjang sumbu silang (kebalikannya).

Itu saja fondasinya. Sisanya tinggal latihan.

## Contoh 1: teks tepat di tengah layar

Kasus klasik yang dulu butuh trik aneh-aneh. Dengan flexbox cuma begini:

```css
.hero {
  display: flex;
  justify-content: center; /* tengah horizontal */
  align-items: center;     /* tengah vertikal */
  height: 100vh;
}
```

Selesai. Teks di dalam `.hero` akan duduk manis tepat di tengah viewport, mau layarnya HP atau monitor ultrawide.

## Contoh 2: navbar sederhana

Navbar itu pada dasarnya satu baris berisi logo di kiri dan menu di kanan. Pakai `justify-content: space-between`:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
```

`gap` memberi jarak antar item tanpa margin manual. Jauh lebih bersih daripada memberi margin ke setiap link lalu menghapus margin yang terakhir.

## Contoh 3: kartu yang rapi dan responsif

Untuk deretan kartu produk atau galeri, bungkus dengan container yang boleh membungkus baris baru:

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 250px; /* tumbuh, menyusut, lebar dasar 250px */
}
```

`flex-wrap: wrap` membuat item turun ke baris baru kalau tidak muat. `flex: 1 1 250px` artinya tiap kartu boleh melebar mengisi ruang, boleh menyusut, dengan lebar awal 250px. Hasilnya grid kartu yang responsif tanpa media query sama sekali untuk kasus sederhana.

![Contoh visual properti flexbox](https://davidwalsh.name/demo/flexbox-twelve/codepen2.png)

## Kolom? Tinggal putar sumbunya

Semua contoh di atas berjalan horizontal. Kalau mau vertikal, tambah satu baris:

```css
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
```

Sekarang `justify-content` mengatur atas-bawah dan `align-items` mengatur kiri-kanan. Sumbunya berputar mengikuti `flex-direction`. Ini bagian yang paling sering bikin bingung pemula, jadi ingat baik-baik: sumbu utama selalu mengikuti arah `flex-direction`.

## Kapan tidak pakai flexbox

Flexbox juara untuk layout satu dimensi. Kalau kamu butuh grid dua dimensi yang kompleks, misalnya dashboard dengan area header, sidebar, konten, dan footer yang saling terkait, CSS Grid lebih cocok. Keduanya bisa digabung: Grid untuk kerangka besar, Flexbox untuk isi di dalamnya.

Latihan terbaik: buka satu halaman web favoritmu, tiru navbar dan susunan kartunya pakai flexbox dari nol. Dua puluh menit cukup untuk tiga contoh di atas, dan setelah itu layout tidak akan terasa menakutkan lagi.

## Nilai-nilai justify-content yang wajib dihafal

Ada enam nilai `justify-content` yang akan kamu pakai berulang-ulang. Daripada menghafal definisi, bayangkan barisan orang antre:

- `flex-start`: semua mepet ke awal (kiri, untuk baris).
- `flex-end`: semua mepet ke akhir (kanan).
- `center`: berkumpul di tengah.
- `space-between`: item pertama di ujung kiri, terakhir di ujung kanan, sisanya dibagi rata. Ini favorit untuk navbar dan header.
- `space-around`: tiap item dapat ruang sama di kiri-kanannya, jadi jarak tepi setengah dari jarak antar item.
- `space-evenly`: semua jarak benar-benar sama, termasuk ke tepi.

Satu trik tambahan: kalau cuma satu item yang bandel dan tidak mau ikut aturan `align-items`, beri dia `align-self`. Misalnya dalam baris yang rata tengah, satu tombol ingin nempel ke bawah:

```css
.tombol-bandel {
  align-self: flex-end;
}
```

Itu saja. Flexbox memang tidak serumit kelihatannya, yang bikin pusing biasanya cuma lupa siapa container dan siapa item.
