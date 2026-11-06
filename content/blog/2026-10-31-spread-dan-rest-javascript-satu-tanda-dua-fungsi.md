---
title: "Spread dan Rest di JavaScript: Satu Tanda, Dua Fungsi"
date: 2026-10-31
excerpt: "Tiga titik di JavaScript bisa menyalin array, menggabung objek, atau menampung sisa argumen. Bunyinya sama, fungsinya beda, dan salah pakai bisa merusak data."
tags: javascript, tutorial, pemrograman, webdev
image: https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg
---

Tiga titik di JavaScript, `...`, punya dua pekerjaan yang berbeda. Di satu tempat ia membongkar isi array atau objek. Di tempat lain ia menampung sisa yang tidak terpakai. Keduanya ditulis sama, tapi dibaca dengan cara yang berlawanan. Kalau kamu hafal bentuknya tanpa paham posisinya, kode tetap jalan dan bugnya muncul belakangan, di tempat yang jauh dari penyebabnya.

Aturan singkatnya begini. Spread dipakai saat kamu sudah punya nilai dan ingin membongkarnya. Rest dipakai saat kamu menerima nilai dan ingin mengumpulkan sisanya. Posisinya yang menentukan, bukan bentuknya.

## Spread: membongkar isi yang sudah ada

Kasus paling sering adalah menyalin array tanpa mengubah array asli. Cara lama memakai `slice()` atau loop manual. Dengan spread, salinannya dibuat dalam satu baris.

```js
const nilai = [70, 85, 90];
const salinan = [...nilai];

salinan.push(100);
console.log(nilai); // [70, 85, 90], tidak ikut berubah
console.log(salinan); // [70, 85, 90, 100]
```

Tanpa spread, `const salinan = nilai` hanya menyalin rujukannya. Mengubah salinan berarti mengubah array asli juga, karena keduanya menunjuk ke tempat yang sama di memori. Ini sumber bug klasik di React dan di kode yang mengolah daftar: state berubah padahal tidak ada yang memanggil fungsi pengubahnya.

Spread juga enak untuk menggabung array dan untuk melempar isi array sebagai argumen fungsi.

```js
const pagi = ["Rani", "Budi"];
const sore = ["Sari", "Dodi"];
const semua = [...pagi, ...sore];
// ["Rani", "Budi", "Sari", "Dodi"]

const angka = [4, 9, 2];
console.log(Math.max(...angka)); // 9
```

Pada objek, spread bekerja dengan cara yang mirip, tapi ada satu perilaku yang wajib diingat: kunci yang sama akan ditimpa oleh yang ditulis belakangan.

```js
const bawaan = { tema: "terang", bahasa: "id", ukuran: 14 };
const ubahan = { ...bawaan, tema: "gelap" };
// { tema: "gelap", bahasa: "id", ukuran: 14 }

const salah = { tema: "gelap", ...bawaan };
// { tema: "terang", ... } karena bawaan menimpa tema
```

Pola pertama dipakai di mana-mana untuk memperbarui pengaturan atau state tanpa merusak nilai lama. Pola kedua adalah bug yang sering tidak disadari, karena kodenya terlihat benar dan tidak ada pesan error sama sekali.

![Kode program di layar laptop saat belajar JavaScript](https://uchis-online.ru/storage/image-cache/6d6651c45e66bd8de80cbe8f2ee0d204_1970x600.jpg)

## Rest: menampung sisa yang belum bernama

Rest muncul di sisi penerima: parameter fungsi dan destructuring. Fungsinya mengumpulkan sisa nilai ke dalam satu array atau satu objek.

```js
function total(...angka) {
  return angka.reduce((jumlah, n) => jumlah + n, 0);
}

console.log(total(1, 2, 3)); // 6
console.log(total(10, 20)); // 30
```

Di sini `...angka` bukan membongkar apa-apa. Ia justru membungkus semua argumen yang masuk menjadi satu array bernama `angka`. Karena itu fungsi `total` bisa menerima berapa pun jumlah argumen tanpa daftar parameter yang panjang.

Di destructuring, rest mengambil sisanya setelah beberapa nilai dikeluarkan.

```js
const [juara, ...pesertaLain] = ["Rani", "Budi", "Sari", "Dodi"];
// juara = "Rani"
// pesertaLain = ["Budi", "Sari", "Dodi"]

const { sandi, ...profilAman } = {
  nama: "Rani",
  email: "rani@example.com",
  sandi: "rahasia",
};
// profilAman tidak berisi sandi
```

Pola kedua ini praktis untuk memisahkan field sensitif sebelum data dikirim ke tempat lain. Kamu tidak perlu menulis satu per satu field yang boleh ikut, cukup keluarkan yang tidak boleh ikut dan sisanya terbawa otomatis.

## Jebakan yang paling sering kejadian

Jebakan terbesar spread adalah salinan dangkal. Spread menyalin satu lapis saja. Kalau di dalam array ada objek, objek di dalamnya masih berbagi rujukan dengan yang asli.

```js
const tim = [{ nama: "Rani", tugas: 3 }];
const timBaru = [...tim];

timBaru[0].tugas = 5;
console.log(tim[0].tugas); // 5, ikut berubah
```

Array luarnya beda, tapi objek di dalamnya masih sama. Untuk kasus seperti ini kamu perlu menyalin objek di dalamnya juga, misalnya dengan memetakan array dan menyebarkan tiap objeknya. Kalau datanya bertingkat dalam, pakai `structuredClone` yang tersedia di browser dan Node modern, dan ingat bahwa fungsi di dalam objek tidak ikut tersalin dengan cara itu.

Jebakan berikutnya adalah posisi rest. Rest harus selalu terakhir, karena ia menampung semua sisa. Menulis parameter setelah rest adalah kesalahan sintaks, dan JavaScript akan menolak file itu. Alasannya masuk akal: kalau rest sudah mengambil semua sisa, tidak ada lagi yang bisa diterima parameter sesudahnya.

Jebakan ketiga adalah mengira spread selalu lebih cepat atau lebih hemat. Untuk array kecil, bedanya tidak terasa. Untuk array yang sangat besar dan sering disalin di dalam loop, salinan berulang bisa membebani memori. Di situ lebih baik ubah data di tempat dengan sadar, atau pikirkan ulang struktur datanya, daripada menyalin berkali-kali demi gaya penulisan yang ringkas.

## Cara mengingatnya tanpa menghafal

Bayangkan spread sebagai membuka bungkus. Kamu punya sekotak nilai, kamu buka, isinya tersebar ke tempat baru. Bayangkan rest sebagai mengumpulkan sisa. Kamu sudah mengambil beberapa nilai, sisanya dikumpulkan ke satu wadah.

Latihan kecil yang layak dicoba: tulis fungsi yang menerima daftar belanja dan mengembalikan daftar baru dengan satu barang tambahan, tanpa mengubah daftar asli. Lalu tulis fungsi lain yang menerima nama depan plus sejumlah hobi, dan mencetak kalimat perkenalan. Dua fungsi itu saja sudah memaksa kamu memakai spread dan rest di posisi yang benar, dan kesalahan yang muncul langsung kelihatan hasilnya.

Tiga titik yang sama, dua arah yang berlawanan. Begitu posisinya dipahami, banyak kode yang tadinya butuh loop dan variabel sementara jadi satu baris yang mudah dibaca.
