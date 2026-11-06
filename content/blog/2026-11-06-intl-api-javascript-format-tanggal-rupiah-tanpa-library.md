---
title: "Intl API JavaScript: Format Tanggal dan Rupiah Tanpa Library"
date: 2026-11-06
excerpt: "Format tanggal Indonesia, angka ribuan, dan rupiah bisa dikerjakan JavaScript bawaan lewat Intl API. Tidak perlu install library apa pun untuk tiga tugas ini."
tags: javascript, tutorial, coding, web
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80
---

Hampir semua proyek JavaScript cepat atau lambat butuh memformat tanggal dan angka. Tanggal lahir harus tampil sebagai "6 November 2026", bukan "2026-11-06". Harga harus tampil "Rp150.000", bukan "150000". Biasanya jawaban pertama yang muncul adalah install library: satu untuk tanggal, satu lagi untuk format angka. Padahal browser dan Node.js sudah menyediakan Intl API, sebuah API bawaan yang menangani format sesuai locale, lengkap dengan aturan bahasa Indonesia.

Intl sudah tersedia di semua browser modern dan Node.js. Tidak ada dependensi, tidak ada ukuran bundle tambahan, dan perilakunya mengikuti standar ICU yang sama dengan yang dipakai sistem operasi.

## Tanggal yang langsung bisa dibaca

`Intl.DateTimeFormat` adalah titik masuknya. Kamu beri tahu locale yang diinginkan dan bagian apa saja yang ditampilkan, lalu panggil `format()` dengan objek Date.

```js
const tanggal = new Date("2026-11-06");

const panjang = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(tanggal);

console.log(panjang);
// Jumat, 6 November 2026
```

Ganti locale ke `en-US` dan hasilnya berubah mengikuti konvensi bahasa Inggris, tanpa kamu menulis logika pemetaan nama bulan sendiri. Untuk tanggal pendek seperti di tabel atau kartu, cukup ubah opsinya:

```js
const pendek = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(tanggal);

console.log(pendek);
// 06 Nov 2026
```

Satu detail yang sering bikin bingung adalah zona waktu. Secara default, hasil format mengikuti zona waktu perangkat yang menjalankan kode. Kalau datanya berasal dari server dan harus tampil dalam WIB, tambahkan `timeZone: "Asia/Jakarta"` di opsi. Tanpa itu, tanggal yang disimpan sebagai UTC tengah malam bisa tampil sebagai hari sebelumnya di layar pengguna.

![Kode JavaScript di layar laptop](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80)

## Angka ribuan dan mata uang rupiah

`Intl.NumberFormat` menangani sisi angka. Locale `id-ID` memakai titik sebagai pemisah ribuan dan koma sebagai pemisah desimal, persis seperti yang dipakai sehari-hari di Indonesia.

```js
const ribuan = new Intl.NumberFormat("id-ID").format(1500000);
console.log(ribuan);
// 1.500.000
```

Untuk harga, tambahkan `style: "currency"` dan `currency: "IDR"`. Hasilnya memakai simbol Rp dan membulatkan ke bilangan bulat, karena rupiah tidak memakai sen dalam tampilan umum.

```js
const harga = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
}).format(150000);

console.log(harga);
// Rp150.000
```

Perlu diperhatikan, `maximumFractionDigits` bisa dipakai kalau kamu memang butuh menampilkan desimal, misalnya untuk harga per gram atau nilai tukar. Tanpa pengaturan itu, Intl sudah memilih jumlah digit desimal yang wajar untuk mata uang yang dipilih.

## Relative time dan perbandingan yang enak dibaca

Satu anggota keluarga Intl yang jarang dipakai adalah `Intl.RelativeTimeFormat`. Ia mengubah selisih waktu menjadi frasa seperti "3 hari lalu" atau "dalam 2 jam", yang jauh lebih manusiawi daripada menampilkan tanggal mentah di daftar notifikasi.

```js
const relatif = new Intl.RelativeTimeFormat("id-ID", {
  numeric: "auto",
});

console.log(relatif.format(-3, "day"));
// 3 hari lalu

console.log(relatif.format(2, "hour"));
// dalam 2 jam
```

Opsi `numeric: "auto"` membuat hasilnya memakai kata seperti "kemarin" atau "besok" saat nilainya pas satu hari. Kamu tetap harus menghitung selisihnya sendiri, misalnya dengan mengurangi dua timestamp lalu membaginya ke satuan hari atau jam, tapi bagian merangkai kalimatnya sudah diurus Intl.

## Kapan tetap butuh library

Intl bukan pengganti semua library tanggal. Kalau kamu butuh operasi seperti menambah 14 hari kerja, menghitung selisih dalam bulan kalender, atau parsing string tanggal dari format yang aneh, library seperti date-fns atau dayjs masih lebih praktis. Intl fokus pada satu pekerjaan: menampilkan nilai yang sudah benar dalam bentuk yang sesuai bahasa dan wilayah pengguna.

Untuk kebutuhan yang paling sering muncul di aplikasi nyata, yaitu menampilkan tanggal, memformat harga, dan menulis waktu relatif, Intl sudah cukup. Coba ganti satu pemformatan manual di proyekmu dengan `Intl.DateTimeFormat` atau `Intl.NumberFormat`. Kemungkinan besar kode yang kamu hapus lebih panjang daripada kode penggantinya, dan hasilnya lebih benar untuk pengguna di luar locale yang kamu pakai sehari-hari.
