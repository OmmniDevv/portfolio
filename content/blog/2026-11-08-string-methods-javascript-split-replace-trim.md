---
title: "String Methods JavaScript: split, replace, trim, dan Lainnya"
date: 2026-11-08
excerpt: "String di JavaScript punya banyak method bawaan yang menghemat puluhan baris kode. Ini cara pakai split, replace, trim, dan includes dengan contoh nyata."
tags: javascript, tutorial, coding, web
image: https://www.decosystems.ru/wp-content/uploads/2025/06/komp-uternyi-inzener-nabiraet-na-klaviature-kod-dla-sozdania-brandmauera-2048x1365.jpg
---

Hampir semua program JavaScript berurusan dengan teks. Nama pengguna, alamat email, isi form, potongan URL, semuanya string. Kabar baiknya, string di JavaScript sudah dibekali banyak method bawaan. Kalau kamu masih menulis loop manual untuk memotong teks atau mengganti satu kata, kemungkinan besar ada method yang bisa menggantikan pekerjaan itu dalam satu baris.

Satu hal yang perlu diingat dulu: string di JavaScript itu immutable. Method seperti `replace` atau `toUpperCase` tidak mengubah string aslinya, mereka mengembalikan string baru. Jadi selalu simpan hasilnya ke variabel.

## split: memotong string jadi array

`split` memotong string berdasarkan pemisah yang kamu tentukan, lalu mengembalikan array.

```js
const kalimat = "apel,jeruk,mangga,pisang";
const buah = kalimat.split(",");
console.log(buah);
// ["apel", "jeruk", "mangga", "pisang"]

const nama = "Abdul Malik Rizky";
const kata = nama.split(" ");
console.log(kata[0]); // "Abdul"
```

Pola ini sering dipakai untuk membaca data CSV sederhana atau memecah nama lengkap jadi bagian-bagiannya. Kebalikannya adalah `join`, yang menggabungkan array kembali jadi string.

```js
const buah = ["apel", "jeruk", "mangga"];
console.log(buah.join(" dan "));
// "apel dan jeruk dan mangga"
```

## replace dan replaceAll: mengganti isi teks

`replace` mengganti kemunculan pertama dari pola yang dicari. Kalau mau mengganti semuanya, pakai `replaceAll`.

```js
const teks = "kopi susu, kopi hitam, kopi tubruk";
console.log(teks.replace("kopi", "teh"));
// "teh susu, kopi hitam, kopi tubruk"

console.log(teks.replaceAll("kopi", "teh"));
// "teh susu, teh hitam, teh tubruk"
```

Keduanya juga menerima regex. Misalnya, mengganti semua angka dalam satu kalimat:

```js
const pesan = "Harga 15000, diskon 2000, ongkir 5000";
console.log(pesan.replaceAll(/\d+/g, "Rp"));
// "Harga Rp, diskon Rp, ongkir Rp"
```

Kesalahan yang paling sering terjadi di sini adalah memakai `replace` lalu heran kenapa hanya kemunculan pertama yang berubah. Kalau targetnya semua kemunculan, `replaceAll` jawabannya.

## trim: membersihkan spasi liar

Input dari form hampir selalu membawa spasi ekstra di depan atau belakang. `trim` membuang spasi, tab, dan baris baru di kedua ujung string.

```js
const input = "   kana@contoh.com   ";
console.log(input.trim());
// "kana@contoh.com"

const nama = "  Rizky  ";
if (nama.trim() === "") {
  console.log("Nama tidak boleh kosong");
}
```

Ada juga `trimStart` dan `trimEnd` kalau kamu hanya mau membersihkan satu sisi. Pola sederhana seperti ini mencegah bug yang sulit dilacak, misalnya login gagal hanya karena pengguna tidak sengaja menekan spasi setelah mengetik email.

![Kode JavaScript di layar editor](https://media2.dev.to/dynamic/image/width=1200,height=627,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F1xm7i7g805rdjgy54yli.png)

## includes, startsWith, dan endsWith: cek isi string

Tiga method ini mengembalikan boolean, jadi cocok dipakai di dalam `if`.

```js
const url = "https://contoh.com/blog/artikel-baru";

console.log(url.includes("blog"));      // true
console.log(url.startsWith("https"));   // true
console.log(url.endsWith("baru"));      // true
```

Dulu orang memakai `indexOf` untuk keperluan seperti ini, lalu membandingkan hasilnya dengan -1. Cara baru ini jauh lebih gampang dibaca. `includes` juga menerima posisi awal pencarian sebagai argumen kedua, berguna kalau kamu mau mengecek dari tengah string.

## slice dan substring: mengambil potongan

`slice` mengambil sebagian string berdasarkan indeks awal dan akhir. Indeks akhir tidak ikut terambil, dan indeks negatif dihitung dari belakang.

```js
const kode = "ORD-2026-1108-0042";
console.log(kode.slice(4, 8));   // "2026"
console.log(kode.slice(-4));     // "0042"
console.log(kode.slice(0, 3));   // "ORD"
```

`substring` mirip, tapi tidak menerima indeks negatif. Untuk kebanyakan kasus, `slice` lebih fleksibel dan jadi pilihan yang aman.

## toUpperCase, toLowerCase, dan perbandingan yang adil

Untuk membandingkan input pengguna tanpa peduli huruf besar atau kecil, ubah dulu keduanya ke bentuk yang sama.

```js
const jawaban = "Ya";
if (jawaban.toLowerCase() === "ya") {
  console.log("Jawaban diterima");
}

const kodeKupon = "diskon50";
console.log(kodeKupon.toUpperCase()); // "DISKON50"
```

Untuk teks berbahasa Indonesia, `toLowerCase` dan `toUpperCase` sudah cukup. Kalau berurusan dengan bahasa yang punya aturan huruf khusus, ada `toLocaleLowerCase` yang memperhatikan locale.

## Contoh gabungan: membersihkan input form

Semua method di atas sering dipakai bersamaan. Ini contoh kecil yang merapikan data sebelum dikirim:

```js
function bersihkanNama(input) {
  return input
    .trim()
    .replaceAll(/\s+/g, " ")
    .split(" ")
    .map((kata) => kata[0].toUpperCase() + kata.slice(1).toLowerCase())
    .join(" ");
}

console.log(bersihkanNama("   abdul   MALIK rizky  "));
// "Abdul Malik Rizky"
```

Fungsi itu membuang spasi berlebih, memecah nama per kata, lalu mengatur huruf besar di awal tiap kata. Tanpa method bawaan, kode yang sama bisa jadi tiga kali lebih panjang.

String methods memang terlihat sepele satu per satu. Tapi di kode nyata, merekalah yang paling sering dipanggil. Hafalkan lima atau enam yang paling sering dipakai, dan sisanya tinggal dicari saat dibutuhkan. Dokumentasi MDN selalu jadi tempat rujukan yang paling bisa diandalkan untuk daftar lengkapnya.
