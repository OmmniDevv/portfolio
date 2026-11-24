---
title: structuredClone, Salin Objek Bertingkat Tanpa Pusing
date: 2026-11-24
excerpt: JSON.parse(JSON.stringify()) merusak Date dan gagal pada referensi melingkar. structuredClone menyalin objek bertingkat dengan benar, langsung dari JavaScript.
tags: javascript, tutorial, web-development
image: https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg
---

Menyalin objek di JavaScript terlihat gampang sampai kamu menemukan bahwa objek hasil salinan ternyata masih terhubung dengan aslinya. Ubah satu properti di salinan, objek aslinya ikut berubah. Ini masalah klasik, dan hampir semua orang pernah mengalaminya saat pertama kali berurusan dengan objek bertingkat.

Penyebabnya sederhana. Operator assignment dan spread hanya menyalin referensi untuk objek di dalamnya. Kalau objekmu cuma satu lapis, itu tidak masalah. Tapi begitu ada objek di dalam objek, salinan dangkal sudah tidak cukup.

## Trik lama yang punya banyak lubang

Selama bertahun-tahun, jalan pintas yang paling populer adalah kombinasi `JSON.parse` dan `JSON.stringify`.

```js
const asli = { nama: "Kana", dibuat: new Date("2026-11-24") };
const salinan = JSON.parse(JSON.stringify(asli));

console.log(salinan.dibuat); // "2026-11-24T00:00:00.000Z", jadi string
console.log(typeof salinan.dibuat); // "string"
```

Hasilnya memang objek baru yang terpisah, tapi `Date` berubah jadi string. Itu baru satu masalah. Nilai `undefined` dan fungsi di dalam objek akan hilang begitu saja. `Map` dan `Set` berubah menjadi objek kosong. Dan kalau objekmu punya referensi melingkar, misalnya objek yang menunjuk dirinya sendiri, trik ini langsung melempar error.

```js
const melingkar = { nama: "A" };
melingkar.diriku = melingkar;

JSON.parse(JSON.stringify(melingkar)); // TypeError: Converting circular structure to JSON
```

Untuk data sederhana, trik JSON masih bisa dipakai. Tapi untuk data nyata yang isinya macam-macam, ia terlalu rapuh.

## structuredClone hadir sebagai jawaban

JavaScript modern punya fungsi bawaan bernama `structuredClone`. Ia membuat salinan mendalam yang benar-benar terpisah, tanpa perlu trik JSON.

```js
const asli = {
  nama: "Kana",
  dibuat: new Date("2026-11-24"),
  skor: new Map([["coding", 95]]),
  tag: new Set(["ai", "web"]),
};

const salinan = structuredClone(asli);

salinan.skor.set("coding", 10);
salinan.tag.add("baru");

console.log(asli.skor.get("coding")); // 95, tidak ikut berubah
console.log(asli.tag.has("baru")); // false
console.log(salinan.dibuat instanceof Date); // true
```

`Date` tetap `Date`. `Map` tetap `Map`. `Set` tetap `Set`. Dan referensi melingkar bukan masalah lagi.

```js
const melingkar = { nama: "A" };
melingkar.diriku = melingkar;

const hasil = structuredClone(melingkar);
console.log(hasil.diriku === hasil); // true, lingkaran ikut tersalin
```

![Kode JavaScript di layar laptop](https://www.internetacademy.jp/it/images/what-is-javascript.jpg)

## Contoh nyata: state aplikasi

Tempat `structuredClone` paling terasa manfaatnya adalah saat mengelola state. Misalnya kamu menyimpan draf form di aplikasi dan butuh salinan yang aman untuk diedit tanpa merusak data asli.

```js
const stateAwal = {
  pengguna: { nama: "Malik", level: 12 },
  pengaturan: { tema: "gelap", notifikasi: true },
  riwayat: [{ halaman: "/beranda", waktu: new Date() }],
};

function mulaiEdit(state) {
  const draf = structuredClone(state);
  draf.pengguna.level = 13;
  draf.pengaturan.tema = "terang";
  return draf;
}

const draf = mulaiEdit(stateAwal);
console.log(stateAwal.pengguna.level); // 12, aman
console.log(stateAwal.pengaturan.tema); // "gelap", aman
console.log(draf.pengguna.level); // 13
```

Pola ini jauh lebih aman daripada mengandalkan spread bertingkat yang rawan terlewat satu lapis. Kamu cukup menyalin semuanya, ubah yang perlu, lalu putuskan mau menyimpan draf atau membuangnya.

## Batas yang perlu diketahui

`structuredClone` bukan alat ajaib untuk segala jenis nilai. Fungsi dan node DOM tidak bisa disalin, dan mencoba menyalinnya akan melempar `DataCloneError`. Begitu juga dengan beberapa objek khusus seperti `WeakMap` dan `WeakSet`.

```js
const denganFungsi = { halo: () => "hai" };
structuredClone(denganFungsi); // DataCloneError
```

Untuk objek data biasa, yang isinya string, angka, boolean, array, `Date`, `Map`, `Set`, `ArrayBuffer`, dan objek bersarang, `structuredClone` bekerja dengan baik.

Satu catatan lain, `structuredClone` tersedia di semua browser modern dan Node.js versi 17 ke atas. Kalau proyekmu masih harus mendukung lingkungan yang sangat lama, tetap sediakan fallback. Tapi untuk proyek baru, tidak ada alasan untuk kembali ke trik JSON.

Intinya begini. Kalau kamu butuh salinan objek yang benar-benar mandiri, pakai `structuredClone`. Biarkan trik JSON pensiun, ia sudah cukup lama menanggung beban yang bukan tugasnya.
