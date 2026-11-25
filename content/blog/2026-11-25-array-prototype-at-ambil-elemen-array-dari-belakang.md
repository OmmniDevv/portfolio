---
title: Array.prototype.at(), Ambil Elemen Array dari Belakang
date: 2026-11-25
excerpt: Mengambil elemen terakhir array biasanya butuh arr[arr.length - 1] yang rawan salah ketik. Method at() membuat kode lebih pendek dan bisa membaca dari belakang.
tags: javascript, tutorial, array, web-development
image: https://www.internetacademy.jp/it/images/what-is-javascript.jpg
---

Ada satu baris kode JavaScript yang hampir semua orang pernah tulis, dan hampir semua orang pernah salah menuliskannya:

```js
const terakhir = arr[arr.length - 1];
```

Satu karakter meleset, misalnya lupa menulis `- 1`, dan kamu malah mendapat `undefined`. Method `at()` hadir untuk membereskan masalah kecil tapi menyebalkan ini. Ia sudah tersedia di semua browser modern dan Node.js versi 16.6 ke atas, jadi tidak ada alasan lagi untuk menghindarinya.

## Cara pakai yang paling dasar

`at()` menerima satu angka, yaitu indeks elemen yang mau diambil. Bedanya dengan akses kurung siku biasa, angka negatif dihitung dari belakang.

```js
const buah = ["apel", "mangga", "pisang", "anggur"];

buah.at(0);   // "apel"
buah.at(2);   // "pisang"
buah.at(-1);  // "anggur"
buah.at(-2);  // "pisang"
```

`at(-1)` selalu berarti elemen terakhir, `at(-2)` berarti satu sebelum terakhir, dan seterusnya. Tidak ada lagi `length - 1` yang harus dihitung manual. Kalau indeksnya di luar jangkauan, hasilnya `undefined`, sama seperti akses kurung siku biasa. Tidak ada error yang dilempar.

## Di mana ini benar-benar membantu

Kasus paling sering muncul saat kamu mengolah data dari API. Misalnya, mengambil pesan terakhir dari sebuah percakapan atau log terbaru dari daftar kejadian:

```js
const pesan = await ambilPesan(chatId);
const balasanTerakhir = pesan.at(-1);

if (balasanTerakhir) {
  tampilkanPratinjau(balasanTerakhir.teks);
}
```

Tanpa `at()`, kamu harus mengecek dulu apakah array kosong atau tidak, lalu menghitung indeks terakhir. Dengan `at()`, pengecekan `if (balasanTerakhir)` sudah cukup karena array kosong akan menghasilkan `undefined`.

Pola ini juga rapi untuk mengambil beberapa elemen terakhir sekaligus. Gabungkan `at()` dengan `slice()` kalau kamu butuh tiga item terakhir, atau pakai `at(-1)` saja kalau cuma butuh satu.

![Laptop menampilkan kode JavaScript di editor](https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg)

## Bukan cuma array

Satu hal yang sering terlewat, `at()` juga ada di string dan typed array. Jadi pola yang sama bisa dipakai di mana-mana:

```js
const kata = "belajar";
kata.at(-1);  // "r"

const angka = new Uint8Array([10, 20, 30]);
angka.at(-1); // 30
```

Untuk string, ini jauh lebih enak dibanding `kata[kata.length - 1]` atau `kata.slice(-1)`, yang mengembalikan string kosong kalau stringnya kosong, bukan `undefined`. Konsistensi ini membuat kode lebih mudah ditebak perilakunya.

## Kapan tetap pakai kurung siku

`at()` bukan pengganti total untuk akses indeks biasa. Kalau kamu mengakses indeks positif yang sudah jelas, misalnya `buah[0]` atau `buah[1]`, kurung siku tetap lebih singkat. `at()` bersinar saat indeksnya negatif atau saat indeksnya berasal dari perhitungan, seperti `arr.at(i - n)` yang lebih mudah dibaca daripada `arr[i - n]` yang rawan ambigu.

Ada satu catatan penting. `at()` hanya membaca, tidak mengubah array. Kalau kamu butuh menghapus elemen terakhir, tetap pakai `pop()`. Kalau butuh mengubah nilai, tetap pakai assignment biasa seperti `buah[buah.length - 1] = "melon"`.

Satu jebakan kecil yang perlu diingat, `at()` menerima angka pecahan dengan cara membulatkannya ke bawah lewat konversi ke integer, tapi sebaiknya jangan mengandalkan perilaku itu. Selalu kirim bilangan bulat supaya maksudmu jelas. Selain itu, hati-hati saat memakai `at()` di dalam loop yang mengubah panjang array. Indeks negatif dihitung dari panjang array saat itu juga, jadi kalau array memendek di tengah loop, `at(-1)` akan menunjuk elemen yang berbeda dari yang kamu kira. Simpan dulu panjangnya di variabel kalau logikamu bergantung pada posisi yang tetap.

Kalau kamu bekerja di codebase lama, ada kemungkinan `at()` belum dipakai sama sekali dan pola `length - 1` tersebar di mana-mana. Tidak perlu mengganti semuanya sekaligus. Mulai dari kode baru dan dari tempat yang paling rawan salah, misalnya fungsi yang mengolah data dari API atau daftar yang panjangnya tidak pasti. Lama-lama, pola baru ini akan terasa alami.

Jadi, mulai hari ini, setiap kali jarimu mengetik `arr[arr.length - 1]`, berhenti sebentar dan ganti dengan `arr.at(-1)`. Kodenya lebih pendek, niatnya lebih jelas, dan satu sumber bug klasik hilang dari codebase kamu.
