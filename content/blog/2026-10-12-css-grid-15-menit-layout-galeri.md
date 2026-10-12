---
title: "CSS Grid 15 Menit: Bikin Layout Galeri yang Rapi"
date: 2026-10-12
excerpt: "Flexbox cocok untuk satu dimensi, Grid untuk dua dimensi. Tutorial 15 menit: grid-template-columns, gap, auto-fill, dan layout responsif tanpa framework."
tags: css, tutorial, webdev
image: "https://www.elegantthemes.com/blog/wp-content/uploads/2025/10/define-grid-1536x663.jpg"
---

Kalau Flexbox bikin elemen berbaris rapi, Grid bikin mereka menempati peta. Dua dimensi sekaligus: baris dan kolom. Untuk layout seperti galeri foto, dashboard, atau kartu produk, Grid menghemat puluhan baris trik yang dulu kamu lakukan dengan float atau Flexbox plus margin manual.

Bagian terbaiknya: kamu tidak butuh framework apa pun. Semua yang dibahas di sini murni CSS bawaan browser.

## Konsep dasar dalam 30 detik

Ada wadah (container) dan item di dalamnya. Satu properti di container mengubah semuanya:

```html
<div class="galeri">
  <img src="a.jpg" alt="Foto satu">
  <img src="b.jpg" alt="Foto dua">
  <img src="c.jpg" alt="Foto tiga">
</div>
```

```css
.galeri {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

`1fr` artinya satu bagian dari ruang yang tersedia. Tiga kolom masing-masing `1fr` berarti tiga kolom sama lebar. `gap` memberi jarak antar item secara merata, tanpa margin negatif, tanpa trik `:nth-child` yang bikin pusing.

Beda dengan Flexbox yang mengatur aliran satu arah, Grid langsung memikirkan kisi dua dimensi. Kamu bilang "saya mau tiga kolom", browser yang mengatur sisanya.

## Responsif tanpa media query

Ini trik yang paling sering saya pakai sehari-hari: `auto-fill` dikombinasikan dengan `minmax`.

```css
.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
```

Browser menghitung sendiri berapa kolom yang muat di layar. Layar laptop lebar: bisa lima kolom. Layar HP: otomatis jadi satu kolom. Kamu tidak menulis satu pun media query. `minmax(220px, 1fr)` artinya tiap kolom minimal 220 piksel, maksimal mengisi ruang sisa yang tersedia.

Teknik ini cocok untuk hampir semua daftar kartu: produk toko online, thumbnail video, daftar blog. Satu pola CSS, selesai untuk semua ukuran layar.

## Membuat item yang lebih menonjol

Kadang satu item ingin tampil lebih besar dari yang lain, misalnya foto unggulan di galeri. Pakai `span`:

```css
.galeri img.unggulan {
  grid-column: span 2;
  grid-row: span 2;
}
```

Item itu sekarang melebar dua kolom dan meninggi dua baris. Satu hal yang perlu diperhatikan: item yang melebar bisa meninggalkan celah kosong di layout. Tambahkan `grid-auto-flow: dense` di container supaya item berikutnya otomatis mengisi celah yang tersisa. Hasilnya galeri ala Pinterest, tanpa satu baris JavaScript pun.

![Contoh visual baris dan kolom pada CSS Grid](https://velog.velcdn.com/images%2Fangel_eugnen%2Fpost%2F381eb3f4-e7bb-4cf0-bbce-7b635ba29597%2Fimage.png)

## Merapikan posisi item di dalam selnya

Dua properti yang sering bikin bingung pemula:

- `justify-items` mengatur posisi item di dalam kolomnya: kiri, tengah, atau kanan.
- `align-items` mengatur posisi item di dalam barisnya: atas, tengah, atau bawah.

Contoh kasus nyata: galeri kartu dengan caption yang panjangnya beda-beda. Tanpa pengaturan, kartu yang captionnya pendek akan meregang mengikuti kartu tertinggi. Solusinya:

```css
.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  align-items: start;
}
```

`align-items: start` membuat tiap kartu mulai dari atas selnya masing-masing. Tidak ada lagi kartu yang meregang aneh hanya karena tetangganya lebih tinggi.

## Kapan pakai Grid, kapan Flexbox

Aturan praktis yang saya pakai di proyek nyata:

- Butuh satu baris atau satu kolom saja: Flexbox. Contohnya navbar, deretan tombol, atau form inline.
- Butuh baris DAN kolom sekaligus: Grid. Contohnya galeri, kartu produk, atau kerangka layout halaman.
- Keduanya bisa digabung: Grid untuk kerangka besar halaman, Flexbox untuk mengatur isi di dalam tiap kartu.

Tidak ada yang harus menang. Mereka alat berbeda untuk masalah berbeda, dan proyek yang sehat biasanya memakai keduanya.

## Contoh lengkap: galeri foto responsif

Gabungkan semuanya jadi satu pola yang bisa langsung dipakai:

```html
<section class="galeri">
  <figure>
    <img src="gunung.jpg" alt="Gunung pagi hari">
    <figcaption>Puncak saat matahari terbit</figcaption>
  </figure>
  <figure>
    <img src="pantai.jpg" alt="Pantai sore hari">
    <figcaption>Ombak sore yang tenang</figcaption>
  </figure>
</section>
```

```css
.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  align-items: start;
}

.galeri figure {
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #f4f4f5;
}

.galeri img {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.galeri figcaption {
  padding: 8px 12px;
  font-size: 14px;
}
```

Dua properti terakhir patut diperhatikan. `aspect-ratio: 4 / 3` membuat semua gambar punya proporsi sama tanpa kamu crop manual satu per satu. `object-fit: cover` memastikan gambar mengisi bingkainya tanpa gepeng atau melar.

## Penutup

Grid terlihat menakutkan karena daftar propertinya panjang, tapi 80 persen kebutuhan sehari-hari cukup dengan empat baris: `display: grid`, `grid-template-columns`, `gap`, dan kombinasi `auto-fill` plus `minmax`. Coba di proyek berikutnya, misalnya halaman portofolio atau katalog sederhana. Begitu terbiasa, kamu akan heran kenapa dulu layout galeri terasa butuh framework.
