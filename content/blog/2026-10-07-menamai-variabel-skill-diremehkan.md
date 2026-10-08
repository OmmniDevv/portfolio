---
title: "Menamai Variabel: Skill Coding yang Paling Diremehkan"
date: 2026-10-07
excerpt: "Bug bisa di-debug, tapi nama variabel yang buruk membuat setiap baris kode jadi teka-teki. Panduan praktis memberi nama yang jelas tanpa berlebihan."
tags: tips, coding, clean-code, pemula
image: "https://mindsers.blog/content/images/size/w1000/2021/12/IMG_1670-2.jpg"
---

Programmer pemula biasanya menghabiskan energi untuk memilih framework atau menghafal sintaks. Padahal ada satu skill yang dipakai di setiap baris kode yang ditulis, tapi jarang dibahas serius: memberi nama. Nama variabel, fungsi, dan file yang buruk tidak menyebabkan error, tapi membuat kode sulit dibaca, dan kode yang sulit dibaca adalah tempat bug bersembunyi.

## Nama yang baik itu jujur

Aturan pertamanya sederhana: nama harus menggambarkan isi, bukan menebak. Bandingkan dua potong kode ini:

```js
// Tebak-tebakan
const d = 7;
const arr = ["Senin", "Selasa"];
process(d, arr);
```

```js
// Jujur
const hariLiburDalamSeminggu = 7;
const namaHari = ["Senin", "Selasa"];
jadwalkanShift(hariLiburDalamSeminggu, namaHari);
```

Versi kedua lebih panjang, tapi kamu tidak perlu scroll ke atas untuk tahu `d` itu apa. Kejelasan hampir selalu menang atas keringkasan. Pengecualiannya cuma variabel super lokal seperti `i` di loop, yang konteksnya sudah jelas dalam tiga baris.

Singkatan adalah jebakan favorit. `usr`, `tmp`, `btn`, `cfg` memang menghemat ketikan, tapi editor modern punya autocomplete. Tulis saja `user`, `temporary`, `button`, `config`. Jari yang sedikit lebih capek hari ini menghemat otakmu (dan otak orang lain) berminggu-minggu ke depan.

## Panjang nama mengikuti luas jangkauan

Variabel yang hidup hanya dalam satu fungsi kecil boleh bernama pendek. Variabel yang dipakai di banyak file harus deskriptif. Ini soal proporsi:

```js
// OK: konteksnya sempit dan jelas
for (const p of products) {
  total += p.price;
}

// Buruk: dipakai di banyak tempat tapi namanya samar
let data; // data apa? dari mana? bentuknya seperti apa?
```

Kalau kamu harus menulis komentar untuk menjelaskan isi sebuah variabel, itu tanda namanya perlu diperbaiki. Nama yang baik membuat komentar semacam itu tidak perlu.

## Fungsi adalah kata kerja, boolean adalah pertanyaan

Fungsi melakukan sesuatu, jadi namanya harus diawali kata kerja: `hitungTotal()`, `kirimEmail()`, `validasiForm()`. Kalau nama fungsimu berupa kata benda (`dataUser()`), pembaca tidak tahu apakah fungsi itu mengambil, mengubah, atau menghapus.

Untuk boolean, pakai awalan yang membentuk pertanyaan ya/tidak: `isAktif`, `hasAkses`, `canEdit`, `sudahBayar`. Kode seperti `if (isAktif)` terbaca seperti kalimat bahasa manusia. Bandingkan dengan `if (flag)` yang tidak memberi informasi apa pun.

## Waspadai nama yang terlalu pintar

Ada godaan untuk memberi nama yang keren atau lucu: `ninjaMode`, `magicNumber`, `doTheThing()`. Terdengar seru saat ditulis tengah malam, tapi enam bulan kemudian bahkan kamu sendiri tidak ingat `doTheThing` itu melakukan apa. Nama yang baik itu membosankan. `hitungDiskonMember()` tidak akan memenangkan lomba kreativitas, tapi semua orang langsung paham.

Hal yang sama berlaku untuk penamaan file dan folder. Struktur seperti `utils/helpers/misc/final2-revisi.js` adalah mimpi buruk arsip. Nama file harus menjawab satu pertanyaan: isinya apa. `format-tanggal.js` atau `validasi-email.js` sudah cukup.

![Dua developer mendiskusikan kode bersama](https://www.makersquad.fr/web/image/12883-9f1b0d19/Pair-programming.webp)

## Konsisten lebih penting dari sempurna

Tidak ada standar penamaan yang objektif benar. Yang penting: pilih satu konvensi dan patuhi di seluruh proyek. Kalau proyekmu memakai camelCase (`namaPengguna`), jangan tiba-tiba muncul snake_case (`nama_pengguna`) di file lain. Inkonsistensi memaksa pembaca menebak dua kali.

Satu kebiasaan yang membantu: saat code review (atau saat membaca kodemu sendiri seminggu kemudian), baca nama-namanya keras-keras. Kalau terdengar aneh diucapkan, kemungkinan besar memang aneh.

## Latihan kecil mulai hari ini

Buka satu file lamamu, cari tiga nama variabel terburuk, dan ganti. Rasakan bedanya saat membacanya ulang. Kalau kamu kerja dalam tim, usulkan satu halaman panduan penamaan di README proyek: konvensi casing, awalan boolean yang dipakai, dan contoh yang disepakati. Satu halaman itu mencegah ratusan perdebatan kecil di pull request.

Memberi nama yang baik bukan bakat, melainkan kebiasaan yang dilatih setiap kali kamu menekan tombol keyboard. Mulai dari hal sekecil ini, kualitas kodemu naik tanpa perlu belajar framework baru.
