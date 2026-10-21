---
title: "Destructuring di JavaScript: Bongkar Objek dan Array"
date: 2026-10-21
excerpt: "Destructuring membongkar isi objek dan array langsung ke variabel dalam satu baris. Pelajari sintaks dasar, rename, default value, dan pola yang sering dipakai."
tags: javascript, tutorial, web, frontend
image: "https://images.ctfassets.net/z2i4e5quuqk1/4CMt5igcbTtdCCwthZnYUV/e38b82fe92bf3198d75b8b028a606548/eyecatch__7_.jpg"
---

Lihat kode ini:

```js
const user = response.data.user;
const nama = user.nama;
const email = user.email;
const umur = user.umur;
```

Tiga baris cuma untuk mengambil tiga properti dari satu objek. Repetitif dan membosankan. JavaScript punya sintaks yang memangkas semua itu jadi satu baris. Namanya destructuring: membongkar isi objek atau array langsung ke variabel.

## Bongkar objek

```js
const user = { nama: "Rina", email: "rina@mail.com", umur: 20 };

const { nama, email, umur } = user;

console.log(nama);  // "Rina"
console.log(email); // "rina@mail.com"
```

Kurung kurawal di kiri artinya "ambil properti dari objek di kanan". Nama variabel harus sama dengan nama propertinya. Satu baris menggantikan tiga baris versi lama.

Ini paling terasa manfaatnya saat menerima data dari API atau dari parameter fungsi:

```js
function tampilkanProfil({ nama, umur }) {
  console.log(`${nama} berumur ${umur} tahun`);
}

tampilkanProfil({ nama: "Budi", umur: 25, kota: "Bandung" });
// "Budi berumur 25 tahun"
```

Fungsi di atas cuma peduli dua properti, jadi langsung dibongkar di parameternya. Properti `kota` diabaikan tanpa perlu ditulis.

## Ganti nama variabel

Kadang nama properti tidak cocok dipakai sebagai nama variabel, misalnya terlalu panjang atau bentrok dengan variabel lain. Tambahkan titik dua untuk rename:

```js
const { nama: namaLengkap, umur: usia } = user;

console.log(namaLengkap); // "Rina"
console.log(usia);         // 20
```

Pola `nama: namaLengkap` dibaca "ambil properti `nama`, simpan ke variabel `namaLengkap`".

## Nilai default

Kalau propertinya mungkin tidak ada, kasih nilai cadangan supaya tidak jadi `undefined`:

```js
const { nama, kota = "Jakarta" } = user;

console.log(kota); // "Jakarta" kalau user.kota tidak ada
```

Ini berguna banget untuk objek konfigurasi atau opsi fungsi, di mana user boleh mengisi sebagian saja.

![Contoh kode JavaScript di editor](https://miro.medium.com/v2/resize:fit:786/0*hrl1C6-fqPJDMpqM)

## Bongkar array

Untuk array, pakai kurung siku. Bedanya dengan objek: yang diambil berdasarkan posisi, bukan nama.

```js
const warna = ["merah", "hijau", "biru"];

const [pertama, kedua] = warna;

console.log(pertama); // "merah"
console.log(kedua);   // "hijau"
```

Mau lewati elemen? Kosongkan posisinya dengan koma:

```js
const [pertama, , ketiga] = warna;

console.log(ketiga); // "biru"
```

Pola array ini sering muncul di React (ingat `useState`?) dan saat menukar dua variabel tanpa variabel sementara:

```js
let a = 1, b = 2;
[a, b] = [b, a];
// a = 2, b = 1
```

## Gabungkan semuanya

Destructuring bisa bersarang untuk struktur data yang dalam:

```js
const data = {
  user: { nama: "Siti", alamat: { kota: "Surabaya" } },
  total: 3
};

const { user: { nama, alamat: { kota } }, total } = data;

console.log(nama);  // "Siti"
console.log(kota);  // "Surabaya"
console.log(total); // 3
```

Hati-hati satu hal: kalau objeknya `null` atau `undefined`, destructuring akan error. Pastikan datanya ada dulu, atau kasih default untuk objeknya sendiri:

```js
const { nama } = data.user ?? {};
```

## Bonus: destructuring juga ada di import

Kalau kamu pernah menulis `import { useState } from "react"`, itu juga destructuring, versi modul. Kamu membongkar ekspor bernama dari sebuah modul, sama seperti membongkar properti dari objek:

```js
import { formatTanggal, hitungDiskon } from "./utils.js";
```

Aturannya sama persis: nama harus cocok dengan yang diekspor. Dan kamu bisa rename dengan `as`:

```js
import { hitungDiskon as diskon } from "./utils.js";
```

Begitu kamu paham pola "bongkar berdasarkan nama", sintaks import yang tadinya terlihat magis jadi masuk akal.

## Kapan memakainya

Aturan praktisnya sederhana. Ambil lebih dari satu properti dari objek yang sama? Destructuring. Parameter fungsi berupa objek dengan banyak opsi? Destructuring di parameter. Cuma butuh satu properti dan dipakai sekali? Akses langsung dengan titik juga tidak apa-apa, tidak perlu dipaksakan.

Destructuring bukan sekadar gula sintaks biar kode terlihat keren. Kode yang lebih pendek di sini berarti lebih sedikit tempat untuk salah ketik nama properti, dan niat kodenya lebih jelas: "saya butuh tiga nilai ini dari objek itu". Coba refactor satu file lamamu yang penuh `objek.properti` berulang, dan rasakan bedanya.
