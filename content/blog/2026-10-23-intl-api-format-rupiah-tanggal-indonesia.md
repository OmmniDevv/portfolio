---
title: Format Rupiah dan Tanggal Indonesia Pakai Intl API
date: 2026-10-23
excerpt: Tampilkan Rp 1.500.000 atau Jumat, 23 Oktober 2026 tanpa library. Intl.NumberFormat dan Intl.DateTimeFormat bawaan browser sudah cukup, begini contohnya.
tags: javascript, tutorial, web, intl
image: https://assets.entrepreneur.com/images/misc/1542746199_Ent-JavaScript.jpeg
---

Setiap aplikasi buatan Indonesia pada akhirnya butuh dua hal: menampilkan harga dalam Rupiah dan tanggal dalam Bahasa Indonesia. Refleks banyak developer adalah langsung install library. Padahal browser sudah menyediakan solusinya sejak lama lewat Intl API. Nol dependensi, nol bundle tambahan, dan formatnya mengikuti standar locale yang benar tanpa perlu diatur manual.

## Format mata uang dengan Intl.NumberFormat

Kasus paling umum: mengubah angka 1500000 menjadi "Rp 1.500.000". Begini caranya:

```js
const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

formatRupiah(1500000); // "Rp 1.500.000"
formatRupiah(25000);    // "Rp 25.000"
formatRupiah(999);      // "Rp 999"
```

Opsi `minimumFractionDigits: 0` penting supaya tidak muncul ",00" di belakang. Kalau aplikasimu butuh menampilkan sen, hapus saja opsi itu. Pemisah ribuan berupa titik dan pemisah desimal berupa koma mengikuti konvensi Indonesia secara otomatis, jadi tidak perlu lagi trik regex replace yang rawan salah kalau angkanya punya desimal.

Satu kebiasaan baik: buat formatter-nya sekali di luar fungsi, lalu pakai ulang. Membuat objek Intl itu operasinya agak berat, jadi jangan panggil `new Intl.NumberFormat` di dalam loop render atau di dalam komponen yang sering di-render ulang.

## Format tanggal dengan Intl.DateTimeFormat

Untuk tanggal, polanya mirip:

```js
const formatTanggalPanjang = (d) =>
  new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

formatTanggalPanjang(new Date(2026, 9, 23));
// "Jumat, 23 Oktober 2026"
```

Nama hari dan bulan keluar dalam Bahasa Indonesia tanpa kamus manual. Untuk tampilan yang lebih ringkas, misalnya di kolom tabel, tinggal ubah opsinya:

```js
new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(new Date(2026, 9, 23));
// "23/10/2026"
```

Butuh jam juga? Tambahkan `hour: "2-digit"` dan `minute: "2-digit"`, hasilnya mengikuti format 24 jam yang umum dipakai di Indonesia.

![Kode program tampil di layar monitor](https://cdn.givingcompass.org/wp-content/uploads/2018/04/06142217/shutterstock_255742975.jpg)

## Angka biasa dan notasi ringkas

Di luar mata uang, `Intl.NumberFormat` juga berguna untuk angka biasa:

```js
new Intl.NumberFormat("id-ID").format(1234567.89);
// "1.234.567,89"
```

Dan ada trik yang jarang dipakai padahal berguna untuk dashboard: notasi compact.

```js
const ringkas = new Intl.NumberFormat("id-ID", { notation: "compact" });
ringkas.format(1500000);  // "1,5 jt"
ringkas.format(25000);    // "25 rb"
```

"1,5 jt pengguna" jauh lebih enak dibaca di kartu statistik daripada deretan angka penuh. Locale id-ID menerjemahkan compact-nya dengan benar menjadi "rb" dan "jt", bukan "K" dan "M" ala Inggris.

## Waktu relatif: "3 jam yang lalu"

Untuk notifikasi, feed, atau komentar, format waktu relatif terasa lebih manusiawi daripada tanggal mentah. `Intl.RelativeTimeFormat` menanganinya:

```js
const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

rtf.format(-3, "hour"); // "3 jam yang lalu"
rtf.format(-1, "day");  // "kemarin"
rtf.format(2, "day");   // "lusa"
```

Opsi `numeric: "auto"` membuat hasilnya lebih natural. Tanpa opsi itu kamu dapat "1 hari yang lalu", dengan opsi itu kamu dapat "kemarin". Sentuhan kecil, tapi bikin aplikasi terasa benar-benar lokal. Kamu tetap perlu menghitung selisih waktunya sendiri dari timestamp, API ini hanya mengurus bagian bahasanya.

## Daftar rapi dengan Intl.ListFormat

Bonus kecil yang jarang diketahui: menggabungkan daftar kata dengan konjungsi yang benar.

```js
new Intl.ListFormat("id-ID", { style: "long", type: "conjunction" })
  .format(["apel", "jeruk", "mangga"]);
// "apel, jeruk, dan mangga"
```

Berguna untuk menampilkan daftar tag, bahan resep, atau nama peserta. Tanpa ini kamu harus menulis logika koma dan kata "dan" sendiri, yang gampang salah di ujung daftar kalau jumlah itemnya dinamis.

## Kapan tetap butuh library

Jujur saja, Intl API bukan pengganti segalanya. Kalau butuh manipulasi tanggal yang kompleks seperti tambah-kurang hari kerja, parsing format aneh dari API pihak ketiga, atau zona waktu yang rumit, library khusus masih lebih nyaman. Tapi untuk kebutuhan format tampilan yang umum di aplikasi Indonesia, yaitu Rupiah, tanggal Bahasa Indonesia, angka ringkas, dan waktu relatif, API bawaan ini sudah lebih dari cukup.

Dukungannya juga luas: semua browser modern dan Node.js versi baru sudah menyertakannya. Jadi sebelum menambah satu dependensi lagi ke package.json, cek dulu apa yang sudah tersedia gratis di runtime. Seringkali jawabannya: sudah cukup.
