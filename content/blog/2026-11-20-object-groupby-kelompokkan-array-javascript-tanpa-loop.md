---
title: "Object.groupBy: Kelompokkan Array JavaScript Tanpa Loop"
date: 2026-11-20
excerpt: "Object.groupBy mengelompokkan array berdasarkan kunci dalam satu baris, tanpa loop manual. Ini cara pakainya, plus kapan sebaiknya tetap memakai reduce."
tags: javascript, tutorial, es2024
image: https://tsi.lv/wp-content/uploads/2020/02/Computer-Sciences-MSc.jpg
---

Mengelompokkan data adalah pekerjaan yang muncul terus di JavaScript. Daftar produk dikelompokkan berdasarkan kategori, daftar siswa berdasarkan kelas, daftar transaksi berdasarkan bulan. Selama ini caranya hampir selalu sama: tulis `reduce`, siapkan objek kosong, cek apakah kuncinya sudah ada, baru masukkan itemnya.

Sejak ES2024, ada cara yang lebih singkat: `Object.groupBy`. Satu baris, tanpa objek penampung manual, dan hasilnya langsung rapi. Kalau kamu masih menulis `reduce` untuk tugas ini, ada baiknya kenal dengan penggantinya.

![Laptop menampilkan kode JavaScript di layar](https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg)

## Cara kerja dasarnya

`Object.groupBy` menerima dua argumen: array yang mau dikelompokkan dan fungsi yang menentukan kunci untuk tiap item. Hasilnya adalah objek biasa, dengan kunci berupa hasil fungsi tersebut dan nilainya berupa array berisi item yang cocok.

```js
const produk = [
  { nama: "Kopi", kategori: "minuman" },
  { nama: "Teh", kategori: "minuman" },
  { nama: "Roti", kategori: "makanan" },
  { nama: "Jus", kategori: "minuman" },
];

const hasil = Object.groupBy(produk, (item) => item.kategori);

console.log(hasil);
// {
//   minuman: [
//     { nama: "Kopi", kategori: "minuman" },
//     { nama: "Teh", kategori: "minuman" },
//     { nama: "Jus", kategori: "minuman" },
//   ],
//   makanan: [{ nama: "Roti", kategori: "makanan" }],
// }
```

Bandingkan dengan cara lama memakai `reduce`:

```js
const hasilLama = produk.reduce((acc, item) => {
  if (!acc[item.kategori]) {
    acc[item.kategori] = [];
  }
  acc[item.kategori].push(item);
  return acc;
}, {});
```

Hasilnya sama persis. Bedanya, versi `groupBy` tidak punya logika penampung yang bisa salah ketik. Tidak ada `if (!acc[...])` yang terlupa, tidak ada `return acc` yang tertinggal.

## Kunci tidak harus dari properti langsung

Fungsi kunci bisa berisi logika apa saja. Misalnya mengelompokkan angka jadi genap dan ganjil:

```js
const angka = [1, 2, 3, 4, 5, 6];

const genapGanjil = Object.groupBy(angka, (n) =>
  n % 2 === 0 ? "genap" : "ganjil"
);
// { ganjil: [1, 3, 5], genap: [2, 4, 6] }
```

Atau mengelompokkan transaksi berdasarkan bulan dari tanggalnya:

```js
const transaksi = [
  { id: 1, tanggal: "2026-11-03", total: 50000 },
  { id: 2, tanggal: "2026-11-18", total: 75000 },
  { id: 3, tanggal: "2026-10-22", total: 30000 },
];

const perBulan = Object.groupBy(transaksi, (t) =>
  t.tanggal.slice(0, 7)
);
// { "2026-11": [transaksi 1, transaksi 2], "2026-10": [transaksi 3] }
```

Kuncinya selalu diubah jadi string, karena memang begitu cara kerja kunci objek di JavaScript. Kalau fungsi kuncimu mengembalikan angka, hasilnya tetap jadi kunci string di objek akhir.

## Map.groupBy untuk kunci yang bukan string

Ada satu batasan `Object.groupBy`: kuncinya harus bisa jadi kunci objek, alias string atau symbol. Kalau kamu butuh kunci berupa objek, tanggal, atau nilai lain, pakai saudaranya, `Map.groupBy`. Hasilnya berupa `Map`, bukan objek biasa.

```js
const tugas = [
  { judul: "Belajar", tenggat: new Date("2026-11-20") },
  { judul: "Belanja", tenggat: new Date("2026-11-20") },
  { judul: "Olahraga", tenggat: new Date("2026-11-21") },
];

const perTenggat = Map.groupBy(tugas, (t) => t.tenggat.getDate());
// Map(2) { 20 => [...], 21 => [...] }
```

Untuk kebanyakan kasus sehari-hari, `Object.groupBy` sudah cukup. `Map.groupBy` baru dibutuhkan saat kuncinya memang harus tetap dalam bentuk aslinya atau saat kamu butuh urutan kunci yang terjaga persis seperti urutan kemunculannya.

## Kapan tetap memakai reduce

`Object.groupBy` memang ringkas, tapi bukan pengganti `reduce` untuk semua hal. Kalau pengelompokanmu butuh agregasi sekaligus, misalnya menjumlahkan total per kategori atau menghitung rata-rata, `reduce` masih lebih pas karena semuanya bisa dilakukan dalam satu putaran.

```js
const totalPerKategori = produk.reduce((acc, item) => {
  acc[item.kategori] = (acc[item.kategori] || 0) + (item.harga || 0);
  return acc;
}, {});
```

Dengan `groupBy`, kamu harus mengelompokkan dulu lalu menghitung lagi dalam putaran kedua. Tidak salah, tapi jadi dua langkah untuk pekerjaan yang bisa selesai dalam satu langkah.

Satu hal lagi yang perlu dicek adalah dukungan environment. `Object.groupBy` tersedia di Chrome 117 ke atas, Firefox 119 ke atas, Safari 17.4 ke atas, dan Node.js 21 ke atas. Kalau proyekmu masih harus jalan di browser lama atau Node versi lama, tetap pakai `reduce` atau tambahkan polyfill. Untuk proyek baru, rasanya sudah aman.

## Penutup

`Object.groupBy` adalah salah satu penambahan kecil di JavaScript yang dampaknya terasa setiap hari. Tugas yang dulu butuh lima baris `reduce` sekarang selesai dalam satu baris yang langsung terbaca maksudnya. Coba ganti satu `reduce` pengelompokan di kodemu dengan `groupBy` dan lihat sendiri apakah kodenya jadi lebih mudah dibaca oleh orang lain.
