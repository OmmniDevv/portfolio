---
title: "Optional Chaining: Akses Data Bersarang Tanpa Error"
date: 2026-11-19
excerpt: "Data dari API sering punya properti yang hilang di tengah jalan. Optional chaining (?.) membuat JavaScript berhenti dengan rapi alih-alih melempar TypeError."
tags: javascript, tutorial, coding, web
image: https://miro.medium.com/v2/resize:fit:1358/1*OyyX3J87mCQqt4_pNBzd1A.jpeg
---

Pernah dapat error ini di console?

```js
TypeError: Cannot read properties of undefined (reading 'name')
```

Error ini muncul saat kode mencoba membaca properti dari sesuatu yang ternyata `undefined` atau `null`. Penyebab paling umum adalah data dari API yang strukturnya tidak selalu lengkap. Misalnya, profil pengguna kadang punya alamat, kadang tidak. Kode yang mengakses `user.address.city` akan meledak kalau `address` tidak ada.

Solusi klasiknya adalah menulis pengecekan berlapis. Tapi ada cara yang jauh lebih singkat: optional chaining, ditulis dengan tanda `?.`.

![Kode JavaScript di layar laptop](https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg)

## Masalah yang diselesaikan `?.`

Bayangkan data pengguna seperti ini:

```js
const user = {
  name: "Malik",
  address: {
    city: "Bandung",
    zip: "40115",
  },
};
```

Mengakses `user.address.city` aman. Tapi bagaimana kalau respons API-nya seperti ini?

```js
const user = {
  name: "Malik",
};
```

Sekarang `user.address` bernilai `undefined`, dan `user.address.city` langsung melempar TypeError. Aplikasi berhenti di baris itu. Kalau kode ini ada di tengah proses render halaman, seluruh halaman bisa ikut gagal tampil.

Cara lama mengatasinya adalah pengecekan manual:

```js
const city = user.address && user.address.city
  ? user.address.city
  : "Tidak diketahui";
```

Kode ini benar, tapi makin dalam strukturnya, makin panjang pengecekannya. Tiga tingkat bersarang saja sudah membuat kode sulit dibaca.

## Cara kerja optional chaining

Dengan optional chaining, kode di atas menjadi satu baris:

```js
const city = user.address?.city ?? "Tidak diketahui";
```

Tanda `?.` setelah `address` berarti: kalau `address` bernilai `null` atau `undefined`, berhenti di sini dan hasilkan `undefined`. Tidak ada error. Tidak ada baris tambahan. Operator `??` di belakangnya lalu mengganti `undefined` itu dengan teks pengganti.

Pola ini bisa dirangkai untuk struktur yang lebih dalam:

```js
const country = user.address?.geo?.country ?? "Tidak diketahui";
```

Kalau `address` tidak ada, rantai berhenti di situ. Kalau `address` ada tapi `geo` tidak ada, rantai berhenti di `geo`. Hasil akhirnya tetap `undefined`, bukan error.

## Bukan hanya properti

Optional chaining juga bisa dipakai untuk memanggil fungsi yang mungkin tidak ada, dan untuk mengakses elemen array:

```js
// Panggil fungsi hanya kalau memang ada
user.sendEmail?.("Halo, selamat datang!");

// Akses elemen array yang mungkin kosong
const firstTag = post.tags?.[0] ?? "tanpa tag";
```

Perhatikan bentuknya: `?.()` untuk memanggil fungsi, `?.[]` untuk mengakses indeks array. Keduanya mengikuti aturan yang sama. Kalau bagian sebelum tanda tanya bernilai `null` atau `undefined`, seluruh ekspresi menghasilkan `undefined`.

Satu hal yang perlu diingat: optional chaining hanya berhenti pada `null` dan `undefined`. Nilai lain seperti `0`, `false`, atau string kosong tetap dianggap ada, dan rantai akan lanjut. Ini perilaku yang tepat, karena `0` dan `false` adalah nilai yang sah, bukan tanda data hilang.

## Kapan sebaiknya tidak dipakai

Optional chaining memang nyaman, tapi jangan dipakai sebagai pengganti validasi data. Kalau struktur data seharusnya selalu punya `address`, dan ternyata tidak ada, itu adalah bug di sisi API atau di logika program. Menutupinya dengan `?.` hanya menyembunyikan masalahnya.

Gunakan `?.` untuk data yang memang boleh tidak ada. Contohnya: profil pengguna yang boleh tidak mengisi alamat, pengaturan opsional, atau respons API dari pihak ketiga yang strukturnya tidak bisa kamu kendalikan. Untuk data internal yang kamu buat sendiri, lebih baik pastikan strukturnya benar sejak awal.

Ada juga satu batasan teknis: optional chaining tidak bisa dipakai di sisi kiri assignment. Kode seperti `user.address?.city = "Jakarta"` tidak valid, karena tidak jelas apa yang harus terjadi kalau `address` tidak ada. JavaScript melarangnya sekalian.

## Kombinasi dengan nullish coalescing

Pasangan paling umum untuk `?.` adalah `??`, operator nullish coalescing. Keduanya sama-sama lahir untuk menangani nilai yang hilang, dan bekerja bagus bersama:

```js
const displayName = user.profile?.nickname ?? user.name ?? "Pengguna";
```

Baris ini membaca: ambil nickname kalau ada, kalau tidak ada ambil nama, kalau tidak ada juga pakai teks "Pengguna". Tanpa kedua operator ini, logika yang sama butuh beberapa baris `if` dan variabel sementara.

Dua operator ini didukung semua browser modern dan Node.js versi 14 ke atas. Kalau proyekmu masih harus mendukung browser yang sangat lama, alat build seperti Babel atau esbuild bisa mengubahnya menjadi kode lama secara otomatis.

## Penutup

Optional chaining adalah fitur kecil yang menghemat banyak baris pengecekan. Ia tidak mengubah logika program, hanya membuat kode yang berurusan dengan data yang tidak lengkap jadi lebih pendek dan lebih mudah dibaca. Lain kali kamu menulis `&&` berlapis hanya untuk membaca satu nilai di dalam objek, coba ganti dengan `?.`. Kemungkinan besar kode itu jadi separuh panjangnya.
