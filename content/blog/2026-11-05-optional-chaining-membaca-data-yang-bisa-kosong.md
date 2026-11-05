---
title: "Optional Chaining: Membaca Data yang Bisa Saja Kosong"
date: 2026-11-05
excerpt: "Data dari API jarang serapi tutorial. Optional chaining (?.) membuat JavaScript berhenti aman saat menemukan nilai kosong, tanpa rantai if berlapis."
tags: javascript, tutorial, coding, web
image: https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg
---

Data dari API jarang serapi contoh di tutorial. Kadang objek pengguna punya alamat, kadang tidak. Kadang sebuah array ada, kadang responsnya hanya berisi pesan galat. Kode yang mengasumsikan semua properti selalu ada akan runtuh di titik yang paling tidak terduga, biasanya dengan pesan galat yang sudah sangat dikenal: Cannot read properties of undefined.

Sebelum ada sintaks khusus, cara mengatasinya adalah menulis penjaga berlapis. Setiap level dicek satu per satu, dan kode yang sebenarnya cuma satu baris berubah menjadi lima baris pertahanan. Hasilnya mudah dibaca di awal, tapi cepat membosankan begitu rantai propertinya memanjang.

JavaScript modern punya jawaban yang jauh lebih ringkas: optional chaining, yang ditulis dengan tanda `?.`. Operator ini bertanya satu hal sederhana sebelum melanjutkan: apakah nilai di sebelah kiri ada? Kalau tidak ada, seluruh rantai berhenti dan menghasilkan `undefined`, tanpa melempar galat.

```js
const kota = pengguna?.alamat?.kota;
```

Satu baris itu menggantikan tiga pengecekan. Kalau `pengguna` bernilai `undefined` atau `null`, hasilnya `undefined`. Kalau `pengguna` ada tapi `alamat` tidak ada, hasilnya tetap `undefined`. Baru kalau semua level ada, kamu mendapat nama kotanya.

![Ilustrasi kode di layar laptop](https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1663324239089%2FcVPG2V1ef.jpg%3Fw%3D800%26h%3D420%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1080&q=75)

## Tidak cuma untuk properti objek

Optional chaining juga bekerja untuk mengakses elemen array dan memanggil fungsi yang mungkin tidak ada. Polanya sama: letakkan `?.` tepat sebelum bagian yang berisiko kosong.

```js
const pertama = daftar?.[0];
const nama = pengguna.getNama?.();
```

Contoh kedua menarik karena sering muncul di kode nyata. Kamu menerima objek dari library atau plugin, dan tidak semua versi objek itu punya metode yang sama. Tanpa `?.`, memanggil metode yang tidak ada langsung melempar galat. Dengan `?.`, panggilan itu dilewati dan hasilnya `undefined`. Ini berguna saat kamu menulis kode yang harus bertahan di berbagai versi data.

Rantai `?.` juga bisa dicampur dengan akses biasa. Bagian yang sudah pasti ada tidak perlu diberi tanda, cukup bagian yang memang bisa kosong. Kebiasaan ini membuat kode lebih jujur: tanda `?.` menjadi penanda visual bahwa di titik itulah ketidakpastian bermula.

```js
const kota = data.pengguna?.alamat?.kota ?? "Kota tidak diketahui";
```

## Pasangannya yang sering tertukar: nullish coalescing

Di contoh terakhir muncul operator kedua, `??`, yang disebut nullish coalescing. Operator ini sering dipakai bersama `?.`, tapi tugasnya berbeda. Kalau `?.` menjaga akses, `??` menyediakan nilai cadangan saat hasilnya `null` atau `undefined`.

Bedanya dengan operator `||` terasa pada nilai yang sah tapi falsy. Angka nol dan string kosong adalah nilai yang valid, tapi `||` akan menggantinya karena keduanya dianggap falsy. Operator `??` hanya bereaksi pada `null` dan `undefined`, sehingga nol tetap nol dan string kosong tetap string kosong.

```js
const stok = produk.stok ?? 0;      // 0 tetap 0
const label = produk.label || "Tanpa label"; // "" akan diganti
```

Memahami beda ini mencegah bug yang diam-diam. Stok yang sebenarnya nol tiba-tiba tampil sebagai tidak diketahui, atau nama yang sengaja dikosongkan tiba-tiba terisi teks cadangan. Keduanya terlihat sepele sampai muncul di laporan pengguna.

## Kapan tidak memakainya

Optional chaining bukan obat untuk semua masalah. Kalau sebuah nilai seharusnya selalu ada dan ternyata kosong, menutupinya dengan `?.` hanya menyembunyikan bug. Misalnya, kalau profil pengguna yang sedang login tidak boleh kosong, hasil `undefined` yang diam-diam justru membuat galatnya muncul belakangan, di tempat yang lebih sulit dilacak. Di situasi seperti itu, validasi eksplisit dan pesan galat yang jelas lebih baik daripada rantai yang diam.

Ada juga batasan sintaks yang perlu diingat. Optional chaining tidak bisa dipakai di sisi kiri penugasan. Kamu tidak bisa menulis `pengguna?.nama = "Budi"` dan berharap ia bekerja, karena JavaScript menolak pola itu. Untuk mengubah nilai, tetap periksa keberadaannya dulu dengan cara biasa.

Satu lagi jebakan yang umum: `?.` hanya berhenti pada `null` dan `undefined`. Kalau nilainya berupa angka atau string, mengakses properti di bawahnya tetap bisa melempar galat, karena operator ini bukan pemeriksaan tipe. Ia hanya menjawab satu pertanyaan, apakah nilainya kosong, dan selebihnya terserah kamu.

Dipakai dengan sadar, `?.` membuat kode yang berurusan dengan data dunia nyata terasa jauh lebih tenang. Rantai panjang berubah menjadi satu baris yang jujur soal ketidakpastiannya, nilai cadangan ditangani `??` tanpa mengorbankan nol dan string kosong, dan bug yang memang harus terlihat tetap dibiarkan terlihat. Itu kombinasi yang cukup untuk membuat banyak kode defensif lama terasa seperti peninggalan masa lalu.
