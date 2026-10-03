---
title: Tiga Array Method JavaScript: map, filter, reduce
date: 2026-10-03
excerpt: map, filter, dan reduce mengubah cara kamu mengolah array di JavaScript. Panduan praktis dengan contoh nyata: keranjang belanja, diskon, dan total harga.
tags: javascript, tutorial, pemula
image: https://images.pexels.com/photos/31343632/pexels-photo-31343632.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200
---

Kode pemula JavaScript punya ciri khas: `for` loop di mana-mana, array kosong penampung, lalu `push` satu per satu. Cara itu tidak salah, tapi ada tiga method bawaan array yang membuat kode jauh lebih bersih dan gampang dibaca: `map`, `filter`, dan `reduce`. Sekali paham ketiganya, kamu akan jarang menulis loop manual lagi.

Kita pakai satu contoh nyata dari awal sampai akhir: data keranjang belanja.

```js
const keranjang = [
  { nama: "Kopi susu", harga: 18000, stok: 12 },
  { nama: "Roti bakar", harga: 12000, stok: 0 },
  { nama: "Mie goreng", harga: 15000, stok: 5 },
];
```

## map: ubah setiap elemen

`map` mengambil tiap elemen array, menjalankan fungsi padanya, dan mengembalikan array baru berisi hasilnya. Array aslinya tidak diubah. Cocok untuk transformasi, misalnya menerapkan diskon 10% ke semua harga:

```js
const hargaDiskon = keranjang.map((item) => {
  return { ...item, harga: item.harga * 0.9 };
});
// hargaDiskon: harga tiap item sudah dikali 0.9
// keranjang: tetap seperti semula
```

Pola pikirnya: satu masuk, satu keluar. Jumlah elemen sebelum dan sesudah `map` selalu sama, yang berubah cuma isinya.

![Kode JavaScript di layar editor](https://talent500.com/blog/wp-content/uploads/sites/42/2024/02/JavaScript-58acbb8a3df78c345bad32c2-768x512.jpg)

## filter: saring yang tidak lolos

`filter` juga mengembalikan array baru, tapi isinya hanya elemen yang lolos tes. Fungsi yang kamu berikan harus mengembalikan `true` atau `false` untuk tiap elemen. Contoh: tampilkan hanya barang yang masih ada stoknya.

```js
const tersedia = keranjang.filter((item) => item.stok > 0);
// tersedia berisi Kopi susu dan Mie goreng saja
// Roti bakar (stok 0) tersaring keluar
```

Kalau `map` itu soal mengubah, `filter` soal memilih. Jumlah elemen sesudah `filter` bisa berkurang, tapi elemennya sendiri tidak diubah.

## reduce: rangkum jadi satu nilai

Ini yang paling bikin pemula mengernyit, padahal idenya sederhana. `reduce` "melipat" seluruh array menjadi satu nilai: total harga, string gabungan, objek hitungan, apa pun. Ia butuh dua hal: fungsi pelipat dan nilai awal.

```js
const total = keranjang.reduce((jumlah, item) => {
  return jumlah + item.harga;
}, 0);
// langkah 1: jumlah=0,        item=Kopi susu  -> 0 + 18000 = 18000
// langkah 2: jumlah=18000,    item=Roti bakar -> 18000 + 12000 = 30000
// langkah 3: jumlah=30000,    item=Mie goreng -> 30000 + 15000 = 45000
// total = 45000
```

Parameter pertama (`jumlah`) adalah akumulator: hasil sementara yang dibawa dari langkah ke langkah. Parameter kedua adalah elemen saat ini. Angka `0` di ujung adalah nilai awal akumulator. Lupa nilai awal adalah bug paling umum di `reduce`, jadi biasakan selalu menulisnya.

## Gabungkan ketiganya: chaining

Kekuatan sebenarnya muncul saat ketiganya dirangkai. Contoh alur nyata: dari keranjang, ambil barang yang ada stoknya, beri diskon 10%, lalu hitung total bayar.

```js
const totalBayar = keranjang
  .filter((item) => item.stok > 0)
  .map((item) => item.harga * 0.9)
  .reduce((jumlah, harga) => jumlah + harga, 0);

console.log(totalBayar); // 29700
```

Baca dari atas ke bawah seperti kalimat: saring yang tersedia, ubah harganya, jumlahkan. Bandingkan dengan versi `for` loop yang butuh array penampung, kondisi `if`, dan variabel akumulator manual. Hasilnya sama, tapi versi chaining menceritakan niatnya dengan lebih jelas.

## Jebakan umum pemula

Tiga kesalahan yang paling sering muncul. Pertama, lupa `return` saat pakai kurung kurawal di `map`: `map((x) => { x * 2 })` mengembalikan `undefined` untuk semua elemen karena tidak ada return. Pakai kurung biasa `map((x) => x * 2)` atau tulis return-nya eksplisit. Kedua, lupa nilai awal di `reduce`, yang membuat elemen pertama dipakai sebagai akumulator dan sering menghasilkan bug aneh pada array kosong. Ketiga, mengubah array asli di dalam `map`. Method ini dirancang untuk menghasilkan array baru; kalau kamu butuh efek samping, `forEach` adalah alat yang tepat.

Kapan tetap pakai `for` biasa? Saat kamu butuh `break` atau `continue` di tengah jalan, atau saat performanya benar-benar kritis dan diukur (bukan ditebak). Di luar itu, `map`, `filter`, dan `reduce` adalah pilihan default yang lebih aman: tidak ada indeks yang salah ketik, tidak ada array penampung yang lupa diisi, dan tidak ada efek samping ke array asli.

Latihan kecil biar nempel: ambil array angka `[3, 7, 2, 9, 4]`, saring yang genap, kalikan dua, lalu jumlahkan. Kalau hasilnya 12, berarti kamu sudah paham.
