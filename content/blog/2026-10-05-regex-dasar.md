---
title: "Regex Dasar: Cara Baca Pola Pencarian Teks Tanpa Pusing"
date: 2026-10-05
excerpt: "Regex terlihat seperti kode alien, padahal cuma gabungan simbol sederhana. Panduan ini mengajari 15 pola paling sering dipakai, lengkap dengan contoh JavaScript."
tags: regex, javascript, tutorial
image: "https://images.viblo.asia/7dc1fc62-7434-4d07-b49a-eab970bf1f8f.png"
---

Kalau kamu pernah melihat pola seperti `/^(\+62|0)8\d{9,12}$/` dan langsung menutup tab, kamu tidak sendirian. Regex memang terlihat seperti kucing berjalan di atas keyboard. Tapi setelah paham logikanya, regex berubah dari momok jadi alat paling praktis buat urusan teks.

Inti regex cuma satu: pola yang menjelaskan bentuk teks yang kamu cari. Sisanya tinggal kombinasi.

## Simbol yang wajib dikenal duluan

Kamu tidak perlu hafal semuanya. Mulai dari yang paling sering muncul.

Titik (`.`) berarti karakter apa saja. Pola `a.c` cocok dengan "abc" atau "aXc", tapi tidak dengan "ac". Bintang (`*`) berarti nol atau lebih dari pola sebelumnya. `ab*c` cocok dengan "ac", "abc", sampai "abbbbc". Tanda plus (`+`) berarti satu atau lebih. `ab+c` cocok dengan "abc" tapi tidak dengan "ac".

Tanda tanya (`?`) berarti opsional, nol atau satu kemunculan. `colou?r` cocok dengan "color" dan "colour", trik klasik buat beda ejaan Amerika dan Inggris.

Kurung siku (`[]`) berarti salah satu dari karakter di dalamnya. `[aeiou]` cocok dengan satu huruf vokal. Rentang bisa ditulis ringkas: `[a-z]`, `[0-9]`, atau `[A-Z]`.

Terus ada shortcut yang bikin hidup gampang. `\d` sama dengan `[0-9]`, digit apa saja. `\w` sama dengan `[A-Za-z0-9_]`, karakter kata. `\s` cocok dengan spasi, tab, atau baris baru.

Tiga simbol posisi: `^` berarti awal string, `$` berarti akhir string, dan `|` berarti atau. Kurung kurawal (`{}`) mengatur jumlah kemunculan. `\d{3}` berarti tepat tiga digit, `\d{3,5}` berarti tiga sampai lima digit, `\d{2,}` berarti minimal dua digit.

Terakhir, kurung biasa (`()`) mengelompokkan sekaligus menangkap hasil. `(\d{4})-(\d{2})` menangkap tahun dan bulan dari teks "2026-10".

Satu jebakan umum: simbol seperti `.`, `*`, `+`, dan `?` punya arti khusus, jadi kalau kamu memang mencari titik secara harfiah, harus di-escape jadi `\.`. Pola `/\d+\.\d+/` cocok dengan "3.14" tapi tidak dengan "314". Kebalikannya, kalau lupa escape, pola `/3.14/` malah cocok juga dengan "3x14" karena titik berarti karakter apa saja. Aturan praktisnya: kalau simbolnya ada di daftar arti khusus, beri backslash saat kamu bermaksud hurufnya secara harfiah.

## Contoh nyata biar nempel

Validasi nomor HP Indonesia. Nomor lokal mulai 08, nomor internasional mulai +62, sisanya digit dengan total 9 sampai 12 angka setelah awalan.

```js
const polaHP = /^(\+62|0)8\d{9,12}$/;

polaHP.test("081234567890");   // true
polaHP.test("+6281234567890"); // true
polaHP.test("021234567");      // false
```

Baca pelan-pelan: `^` awal string, `(\+62|0)` grup berisi "+62" atau "0" (tanda plus harus di-escape jadi `\+` karena plus punya arti khusus), `8` literal angka 8, `\d{9,12}` sembilan sampai dua belas digit, `$` akhir string.

Contoh lain yang sering dipakai: ambil semua hashtag dari sebuah caption.

```js
const caption = "Belajar #regex itu #seru banget";
const tags = caption.match(/#\w+/g);
console.log(tags); // ["#regex", "#seru"]
```

Tanda `#` literal pagar, `\w+` satu atau lebih karakter kata, dan flag `g` berarti cari semua kemunculan, bukan berhenti di yang pertama.

Catatan kecil soal flag: selain `g`, ada `i` yang bikin pencocokan tidak peduli huruf besar kecil. Pola `/jakarta/i` cocok dengan "Jakarta", "JAKARTA", sampai "jAkArTa". Flag juga bisa digabung. Pola `/#\w+/gi` mencari semua hashtag tanpa peduli kapitalisasi.

Satu lagi: ubah format tanggal dari DD-MM-YYYY jadi YYYY-MM-DD.

```js
const tanggal = "05-10-2026";
const hasil = tanggal.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
console.log(hasil); // "2026-10-05"
```

Tiga grup menangkap hari, bulan, dan tahun, lalu `$1`, `$2`, `$3` menyusun ulang urutannya.

![Contoh pola regex yang sedang dibahas di forum](https://us1.discourse-cdn.com/bubble/original/3X/4/c/4c5136fffa97e4467ec1a6e72cde749ff88c37d4.png)

## Cara latihan yang tidak bikin stres

Jangan dihafal, tapi dicoba. Buka regex101.com, tempel teks contoh, lalu ketik polamu dan lihat bagian teks yang ikut tersorot secara langsung. Situs itu juga menjelaskan tiap simbol polamu dalam bahasa manusia di panel kanan. Jauh lebih cepat daripada menebak-nebak di kepala.

Dua peringatan sebelum kamu terlalu semangat. Jangan pakai regex untuk membaca HTML atau JSON yang strukturnya bersarang. Itu pekerjaan parser, bukan pola teks, dan regex akan kalah telak. Dan jangan bikin regex yang terlalu pintar sampai susah dibaca. Kalau polamu butuh tiga baris komentar buat dijelaskan, mungkin teksnya lebih baik diproses dengan beberapa langkah sederhana.

Mulai dari pola kecil seperti validasi nomor HP di atas. Lama-lama, `/^(\+62|0)8\d{9,12}$/` tidak akan terlihat seperti kucing berjalan di keyboard lagi. Itu akan terlihat seperti kalimat biasa yang kebetulan ditulis dengan simbol.
