---
title: "Regex 20 Menit: Validasi Form Tanpa Pusing"
date: 2026-10-17
excerpt: "Regex terlihat seperti hieroglif, tapi 20 menit cukup untuk menguasainya. Pelajari pola dasar, validasi email dan nomor HP Indonesia, plus tiga jebakan umum."
tags: javascript, regex, tutorial
image: "https://blazemedia.co.uk/wp-content/uploads/2023/11/regex-feature-image.jpg"
---

`^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$`. Kalau kamu pernah melihat deretan simbol seperti ini di kode orang lalu pura-pura paham, artikel ini buat kamu. Itu namanya regex, singkatan dari regular expression: pola mini untuk mencocokkan teks. Dipakai untuk validasi form, mencari pola di string, sampai membersihkan data.

Kabar baiknya, kamu tidak perlu menghafal semuanya. Sekitar 80 persen kebutuhan sehari-hari cuma memakai segelintir pola dasar. Dua puluh menit dari sekarang, pola di atas akan terbaca jelas.

## Pola paling dasar: teks persis

Regex paling sederhana adalah teks itu sendiri. Pola `kopi` akan cocok dengan kata "kopi" di dalam string apa pun. Di JavaScript, cara termudah mencobanya:

```js
/kopi/.test("saya suka kopi tubruk"); // true
/kopi/.test("saya suka teh");         // false
```

Metode `.test()` mengembalikan true atau false. Simpel. Masalahnya, teks persis jarang cukup. Kamu butuh pola yang fleksibel.

## Kelas karakter: \d, \w, \s, dan titik

Daripada menulis 0123456789, pakai `\d` yang artinya "satu digit angka". Beberapa pintasan penting:

- `\d` : satu digit (0-9)
- `\w` : satu karakter kata (huruf, angka, underscore)
- `\s` : satu spasi atau whitespace
- `.`  : satu karakter apa pun

Jadi `\d\d\d` cocok dengan tiga digit berurutan, misalnya "081". Sudah mulai terasa gunanya.

## Quantifier: *, +, ?, dan {n,m}

Quantifier mengatur berapa kali pola sebelumnya boleh muncul:

- `*` : nol atau lebih
- `+` : satu atau lebih
- `?` : nol atau satu (opsional)
- `{3}` : tepat 3 kali
- `{2,4}` : antara 2 sampai 4 kali

Contoh: `\d{10,13}` artinya 10 sampai 13 digit berurutan. Pola `https?` cocok dengan "http" maupun "https" karena huruf s-nya opsional.

## Anchor: ^ dan $

Tanpa anchor, regex mencari kecocokan di mana saja dalam string. Kadang itu bukan yang kamu mau. `^` artinya "awal string", `$` artinya "akhir string".

```js
/^\d{3}$/.test("081");    // true, tepat 3 digit
/^\d{3}$/.test("08123");  // false, kepanjangan
/\d{3}/.test("abc08123"); // true, karena tanpa anchor
```

Untuk validasi form, hampir selalu pakai kedua anchor sekaligus supaya seluruh input harus cocok, bukan cuma sebagian.

## Grup dan alternasi

Tanda kurung `()` mengelompokkan pola, dan `|` artinya "atau". Pola `^(kopi|teh)$` cocok dengan "kopi" atau "teh", tidak yang lain.

Grup juga berguna dengan quantifier. `(ab)+` cocok dengan "ab", "abab", "ababab". Tanpa kurung, `ab+` artinya huruf a diikuti satu atau lebih huruf b, beda total.

![Contoh visual pola regex untuk validasi teks](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fogjj5ptux2hgid50lwu0.png)

## Contoh nyata 1: validasi email sederhana

Validasi email yang sempurna menurut standar RFC itu monster sepanjang ratusan karakter. Untuk form biasa, versi sederhana sudah cukup:

```js
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailRe.test("kana@omnidevv.biz.id"); // true
emailRe.test("kana@");                // false
emailRe.test("bukan email");          // false
```

Cara bacanya: satu atau lebih karakter yang bukan spasi atau @, lalu @, lalu satu atau lebih karakter yang bukan spasi atau @, lalu titik, lalu sisanya. Tanda `[^...]` artinya "karakter apa pun SELAIN yang di dalam kurung". Cara paling jujur memvalidasi email tetap mengirim email konfirmasi, tapi pola ini menyaring 99 persen kesalahan ketik.

## Contoh nyata 2: nomor HP Indonesia

Nomor HP Indonesia diawali 08 dan totalnya 10 sampai 13 digit:

```js
const hpRe = /^08\d{8,11}$/;

hpRe.test("085869074622"); // true
hpRe.test("0812345");      // false, terlalu pendek
hpRe.test("+6285869074622"); // false, format beda
```

Kalau form-mu juga menerima format +62, tambahkan alternasi: `/^(\+62|08)\d{8,11}$/`. Lihat, grup dan `|` langsung kepakai.

## Contoh nyata 3: ambil semua angka dari teks

Kadang bukan validasi, tapi ekstraksi. `.match()` dengan flag `g` (global) mengambil semua kecocokan:

```js
"Order 3 kopi dan 12 donat".match(/\d+/g); // ["3", "12"]
```

Flag `i` bikin pencocokan tidak peduli huruf besar kecil: `/kopi/i` cocok dengan "KOPI" juga.

## Tiga jebakan yang wajib dihindari

Jebakan pertama: lupa meng-escape titik. Di regex, `.` artinya "karakter apa pun". Pola `file.txt` juga cocok dengan "fileXtxt". Kalau maksudmu titik beneran, tulis `file\.txt`.

Jebakan kedua: quantifier yang rakus. Pola `<.+>` pada string `<b>tebal</b>` akan melahap semuanya sampai tanda `>` terakhir, bukan berhenti di `>` pertama. Tambahkan `?` untuk versi malasnya: `<.+?>`.

Jebakan ketiga: memakai flag `g` bersama `.test()` dalam loop. Regex dengan flag global menyimpan posisi terakhir (lastIndex), sehingga hasil `.test()` bisa bergantian true dan false untuk input yang sama. Kalau cuma butuh true/false, jangan pakai flag `g`.

## Penutup

Itu dia fondasinya: kelas karakter, quantifier, anchor, grup, dan tiga contoh nyata. Pola seram di awal artikel sekarang bisa dibaca: minimal 8 karakter, harus ada huruf besar dan angka. Latihan terbaik adalah membuka form di project-mu sendiri dan mengganti validasi manual yang panjang dengan satu baris regex. Dua puluh menit teori, selebihnya jam terbang.
