---
title: Destructuring JavaScript: Ambil Data Objek dan Array
date: 2026-11-21
excerpt: Destructuring bikin kode JavaScript lebih pendek dan gampang dibaca. Pelajari cara ambil data dari objek dan array, plus nilai default dan rename.
tags: javascript, tutorial, coding
image: https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg
---

Pernah menulis kode seperti ini? `const nama = user.nama; const umur = user.umur; const kota = user.kota;` Tiga baris untuk tiga properti, padahal yang dibutuhkan cuma nilainya. Destructuring menyelesaikan masalah itu dalam satu baris, dan setelah terbiasa, kamu bakal sulit kembali ke cara lama.

![Laptop menampilkan kode JavaScript di editor](https://www.internetacademy.jp/it/images/what-is-javascript.jpg)

## Destructuring objek, yang paling sering dipakai

Bentuk paling umum adalah mengambil properti dari objek langsung ke variabel. Nama variabel harus sama dengan nama properti, kecuali kamu mengganti namanya secara eksplisit.

```js
const user = {
  nama: "Malik",
  umur: 18,
  kota: "Bandung",
  jurusan: "PPLG"
};

const { nama, umur, kota } = user;

console.log(nama);  // "Malik"
console.log(umur);  // 18
console.log(kota);  // "Bandung"
```

Perhatikan, `jurusan` tidak diambil karena memang tidak ditulis di sisi kiri. Destructuring tidak mengubah objek aslinya, dia cuma menyalin nilai yang diminta ke variabel baru. Objek `user` tetap utuh setelah baris itu dieksekusi.

## Destructuring array, berdasarkan posisi

Kalau objek memakai nama properti, array memakai urutan. Elemen pertama masuk ke variabel pertama, elemen kedua ke variabel kedua, dan seterusnya. Karena itu, urutan penulisan harus diperhatikan.

```js
const warna = ["merah", "hijau", "biru"];

const [pertama, kedua] = warna;

console.log(pertama); // "merah"
console.log(kedua);   // "hijau"
```

Elemen yang tidak dibutuhkan bisa dilewati dengan koma kosong. Pola ini sering muncul saat bekerja dengan hasil fungsi yang mengembalikan array, misalnya `const [data, error] = hasil;` yang lazim di banyak library.

```js
const skor = [90, 85, 78, 92];

const [tertinggi, , , terendah] = skor;

console.log(tertinggi); // 90
console.log(terendah);  // 92
```

Hati-hati dengan koma kosong yang terlalu banyak, karena kode jadi sulit dibaca. Kalau yang dilewati lebih dari satu elemen, lebih baik ambil dengan indeks biasa atau pikirkan ulang struktur datanya.

## Nilai default dan ganti nama

Dua trik ini yang membuat destructuring terasa lengkap. Nilai default menjaga kode dari `undefined` ketika properti tidak ada, sementara rename berguna saat nama properti bentrok dengan variabel yang sudah ada.

```js
const produk = {
  namaProduk: "Keyboard Mechanical",
  harga: 450000
};

const { namaProduk: nama, harga, stok = 0 } = produk;

console.log(nama);  // "Keyboard Mechanical"
console.log(harga); // 450000
console.log(stok);  // 0, karena properti stok tidak ada di objek
```

Nilai default hanya dipakai saat properti bernilai `undefined`. Kalau propertinya ada tapi berisi `null`, nilai yang dipakai tetap `null`. Detail kecil ini sering menimbulkan bug, jadi layak diingat.

## Destructuring di parameter fungsi

Tempat destructuring paling bersinar adalah parameter fungsi. Daripada menerima satu objek lalu mengakses propertinya satu per satu di dalam badan fungsi, destructure langsung di tanda kurung. Panggilan fungsi tetap memakai objek seperti biasa, dan isi fungsi jadi lebih bersih.

```js
function tampilkanProfil({ nama, umur, kota = "Tidak diketahui" }) {
  return `${nama} (${umur} tahun) tinggal di ${kota}.`;
}

console.log(tampilkanProfil({ nama: "Malik", umur: 18 }));
// "Malik (18 tahun) tinggal di Tidak diketahui."
```

Pola ini juga berlaku untuk array dan bisa dipadukan dengan rest parameter. Misalnya `const [kepala, ...sisanya] = antrean;` akan menaruh elemen pertama di `kepala` dan sisanya di array baru bernama `sisanya`.

## Destructuring bertingkat, pakai secukupnya

Objek di dalam objek bisa di-destructure dalam satu langkah, tapi jangan berlebihan. Satu tingkat masih nyaman dibaca, dua tingkat mulai butuh perhatian, tiga tingkat hampir selalu lebih baik dipecah jadi beberapa baris.

```js
const respons = {
  data: {
    pengguna: { nama: "Malik", level: 12 }
  }
};

const { data: { pengguna: { nama } } } = respons;

console.log(nama); // "Malik"
```

Kalau struktur datanya dalam dan sering dipakai, pertimbangkan untuk menormalisasi datanya lebih dulu atau menulis helper kecil. Kode yang pendek tapi membingungkan bukan kode yang bagus.

## Kapan sebaiknya tidak dipakai

Destructuring bukan jawaban untuk semua situasi. Kalau hanya butuh satu properti dan objeknya dipakai berkali-kali di tempat lain, `user.nama` kadang lebih jelas karena pembaca langsung tahu sumber datanya. Di dalam loop yang sangat panas dan dieksekusi jutaan kali, akses properti langsung juga bisa sedikit lebih cepat, meski selisihnya jarang terasa di aplikasi biasa.

Aturan praktisnya sederhana. Pakai destructuring saat kamu mengambil beberapa nilai sekaligus, saat menulis parameter fungsi, atau saat nama variabel yang pendek membuat kode lebih mudah dibaca. Sisanya, biarkan akses properti biasa bekerja.

Destructuring adalah salah satu fitur kecil JavaScript yang dampaknya besar. Dia tidak mengubah cara program berjalan, tapi mengubah cara kode dibaca. Dan kode yang gampang dibaca adalah kode yang gampang diperbaiki. Mulai dari fungsi yang kamu tulis hari ini, coba ganti akses properti berulang dengan satu baris destructuring, lalu rasakan bedanya.
