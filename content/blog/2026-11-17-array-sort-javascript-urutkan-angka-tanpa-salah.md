---
title: "Array sort di JavaScript: Urutkan Angka Tanpa Salah"
date: 2026-11-17
excerpt: "sort() di JavaScript mengurutkan angka seperti teks kalau tidak diberi fungsi pembanding. Pelajari cara mengurutkan angka, string, dan objek dengan benar."
tags: javascript, tutorial, coding, array
image: https://miro.medium.com/v2/resize:fit:1358/1*OyyX3J87mCQqt4_pNBzd1A.jpeg
---

Coba jalankan kode ini di console browser dan lihat hasilnya:

```js
[10, 9, 80].sort();
console.log([10, 9, 80].sort()); // [10, 80, 9]
```

Angka 80 muncul sebelum 9. Bukan bug, bukan console yang rusak. Ini memang cara kerja `sort()` kalau dipanggil tanpa argumen: ia mengubah setiap elemen jadi string dulu, lalu mengurutkannya berdasarkan urutan karakter. "10" memang lebih kecil dari "80", dan "80" lebih kecil dari "9", karena perbandingan dimulai dari karakter pertama. Sekali paham aturan ini, perilaku aneh `sort()` langsung masuk akal.

![Laptop menampilkan kode JavaScript di editor](https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg)

## Fungsi pembanding adalah kuncinya

`sort()` menerima satu argumen opsional, yaitu fungsi pembanding. Fungsi ini menerima dua elemen, sebut saja `a` dan `b`, dan harus mengembalikan angka. Kalau hasilnya negatif, `a` ditaruh sebelum `b`. Kalau positif, `b` ditaruh sebelum `a`. Kalau nol, urutannya dibiarkan.

Untuk angka, pola paling singkat adalah `a - b`:

```js
const harga = [10000, 500, 2500, 90000];

harga.sort((a, b) => a - b);
console.log(harga); // [500, 2500, 10000, 90000]

harga.sort((a, b) => b - a);
console.log(harga); // [90000, 10000, 2500, 500]
```

Pola ini bekerja karena `a - b` negatif kalau `a` lebih kecil, positif kalau `a` lebih besar, dan nol kalau sama. Tiga kemungkinan itu persis yang dibutuhkan `sort()`. Buat mengurutkan menurun, tinggal dibalik jadi `b - a`. Tidak perlu menulis `if` sama sekali.

## Mengurutkan array berisi objek

Di aplikasi nyata, yang diurutkan jarang angka polos. Biasanya array berisi objek, misalnya daftar produk atau daftar siswa. Caranya sama, hanya saja fungsi pembanding mengakses properti objeknya:

```js
const produk = [
  { nama: "Mouse", harga: 150000 },
  { nama: "Keyboard", harga: 350000 },
  { nama: "Kabel USB", harga: 25000 },
];

produk.sort((a, b) => a.harga - b.harga);
console.log(produk.map((p) => p.nama));
// ["Kabel USB", "Mouse", "Keyboard"]
```

Kalau propertinya berupa string, pengurangan tidak bisa dipakai. Di sinilah `localeCompare` membantu. Metode ini membandingkan dua string dengan aturan bahasa, jadi huruf besar dan kecil serta karakter khusus ditangani dengan benar:

```js
const nama = ["Budi", "ani", "Citra", "agus"];

nama.sort((a, b) => a.localeCompare(b, "id"));
console.log(nama); // ["agus", "ani", "Budi", "Citra"]
```

Argumen `"id"` di sana memberi tahu JavaScript untuk memakai aturan bahasa Indonesia. Tanpa `localeCompare`, string diurutkan berdasarkan kode karakter Unicode, dan hasilnya sering mengejutkan: semua huruf besar akan muncul sebelum huruf kecil, jadi "Budi" dan "Citra" muncul sebelum "agus".

## Mengurutkan berdasarkan lebih dari satu kriteria

Kadang satu kriteria tidak cukup. Misalnya daftar tugas diurutkan berdasarkan prioritas, dan kalau prioritasnya sama, diurutkan berdasarkan tenggat. Fungsi pembanding bisa menangani ini dengan mengecek kriteria pertama dulu, lalu lanjut ke kriteria berikutnya kalau hasilnya nol:

```js
const tugas = [
  { judul: "Bayar listrik", prioritas: 2, tenggat: "2026-11-18" },
  { judul: "Beli beras", prioritas: 1, tenggat: "2026-11-17" },
  { judul: "Cuci motor", prioritas: 1, tenggat: "2026-11-19" },
];

tugas.sort((a, b) => {
  if (a.prioritas !== b.prioritas) return a.prioritas - b.prioritas;
  return a.tenggat.localeCompare(b.tenggat);
});

console.log(tugas.map((t) => t.judul));
// ["Beli beras", "Cuci motor", "Bayar listrik"]
```

Pola ini mudah diperpanjang. Tambah satu `if` lagi untuk kriteria ketiga, dan seterusnya. Kuncinya adalah mengembalikan perbandingan kriteria berikutnya hanya saat kriteria sebelumnya seri.

## Jangan lupa sort mengubah array aslinya

Satu hal yang sering bikin bug diam-diam: `sort()` mengubah array yang dipanggil, bukan membuat array baru. Kalau array yang sama dipakai di tempat lain, urutannya ikut berubah tanpa peringatan:

```js
const nilai = [3, 1, 2];
const terurut = nilai.sort((a, b) => a - b);

console.log(nilai); // [1, 2, 3], array asli ikut berubah
```

Kalau array aslinya harus tetap utuh, salin dulu sebelum mengurutkan. Cara paling singkat adalah memakai `toSorted()`, yang tersedia di browser dan Node.js modern. Metode ini mengembalikan array baru dan membiarkan array lama apa adanya:

```js
const nilai = [3, 1, 2];
const terurut = nilai.toSorted((a, b) => a - b);

console.log(nilai);   // [3, 1, 2], tetap seperti semula
console.log(terurut); // [1, 2, 3]
```

Kalau `toSorted()` belum tersedia di lingkunganmu, `[...nilai].sort(...)` menghasilkan efek yang sama. Spread operator membuat salinan, lalu `sort()` bekerja di salinan itu.

Satu kabar baik: sejak ES2019, `sort()` dijamin stabil. Artinya elemen yang dianggap sama oleh fungsi pembanding akan mempertahankan urutan aslinya. Dulu ini tidak dijamin, dan hasil pengurutan bisa berbeda antar browser. Sekarang kamu bisa mengandalkan perilaku ini, misalnya saat mengurutkan daftar yang sebagian kuncinya sama.

Intinya, `sort()` hanya butuh satu kebiasaan: selalu beri fungsi pembanding. Tanpa itu, angka diperlakukan seperti teks dan hasilnya pasti membingungkan. Dengan fungsi pembanding yang tepat, mengurutkan angka, string, objek, sampai banyak kriteria sekaligus jadi pekerjaan yang bisa ditebak hasilnya.
