---
title: "Operator ?? di JavaScript: Nilai Cadangan Tanpa Bug Falsy"
date: 2026-11-10
excerpt: "Operator ?? memberi nilai cadangan hanya saat data null atau undefined. Beda dengan || yang ikut menelan angka 0 dan string kosong. Ini contohnya."
tags: javascript, tutorial, coding, web
image: https://kryptomagazin.cz/cdn-cgi/image/quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/code-gea7ca4ca5_1280.jpg
---

Ada satu pola yang hampir semua programmer JavaScript pernah tulis: memberi nilai cadangan saat data tidak ada. Caranya yang paling tua adalah operator `||`. Kelihatannya aman, sampai suatu hari angka 0 atau string kosong ikut tertelan dan berubah jadi nilai cadangan. Di situlah operator `??` masuk. Ia punya satu tugas saja, dan ia mengerjakannya dengan teliti.

## Masalahnya ada di falsy

JavaScript punya konsep falsy, yaitu nilai yang dianggap salah dalam kondisi boolean. Daftarnya pendek: `false`, `0`, `""` (string kosong), `null`, `undefined`, dan `NaN`. Operator `||` memperlakukan semua anggota daftar ini dengan cara yang sama, yaitu menggantinya dengan nilai di sebelah kanan.

Contohnya gampang. Misalkan ada form harga produk, dan pengguna sengaja mengisi harga 0 karena produknya gratis.

```js
const hargaInput = 0;
const harga = hargaInput || 10000;
console.log(harga); // 10000, padahal pengguna mengisi 0
```

Harga 0 itu data yang sah, bukan data yang hilang. Tapi `||` tidak bisa membedakannya dari `null` atau `undefined`. Akibatnya, produk gratis tiba-tiba berharga sepuluh ribu. Bug seperti ini sulit ketahuan karena kodenya terlihat benar, dan baru muncul saat ada pengguna yang memasukkan nilai yang memang falsy.

Kasus lain yang sama seringnya adalah nama pengguna. String kosong bisa berarti pengguna memang belum mengisi nama, atau bisa berarti ia sengaja mengosongkannya. Kalau kodenya memakai `||`, dua keadaan itu diperlakukan sama.

```js
const nama = inputNama || "Tamu";
```

Kalau `inputNama` berisi string kosong, hasilnya jadi "Tamu". Kadang itu yang diinginkan, kadang bukan. Masalahnya, `||` tidak memberi pilihan.

## `??` hanya peduli null dan undefined

Operator nullish coalescing, ditulis `??`, menyelesaikan tepat masalah itu. Ia hanya memberi nilai cadangan kalau nilai di sebelah kiri adalah `null` atau `undefined`. Nilai falsy lain seperti `0`, `""`, dan `false` dibiarkan lewat apa adanya.

```js
const hargaInput = 0;
const harga = hargaInput ?? 10000;
console.log(harga); // 0, tetap seperti yang diisi pengguna

const nama = undefined ?? "Tamu";
console.log(nama); // "Tamu", karena datanya memang tidak ada

const jumlah = null ?? 5;
console.log(jumlah); // 5
```

Perbedaan ini kecil di permukaan, tapi besar dampaknya di data nyata. Harga, jumlah stok, diskon, dan skor adalah angka yang sah bernilai 0. String kosong bisa jadi jawaban yang valid di form. Boolean `false` bisa jadi pilihan yang disengaja, misalnya pengguna mematikan sebuah pengaturan. Dengan `??`, semua nilai itu dihormati, dan hanya ketiadaan data yang diganti.

Aturan praktisnya sederhana. Kalau nilai cadangan itu pengganti untuk "data tidak ada", pakai `??`. Kalau nilai cadangan itu pengganti untuk "nilai apa pun yang dianggap kosong", baru pertimbangkan `||`. Dalam kebanyakan kasus data dari API atau form, yang pertama lebih tepat.

## Dua temannya: `??=` dan `?.`

Operator `??` punya saudara yang bernama `??=`, nullish assignment. Ia mengisi variabel hanya kalau variabel itu sedang `null` atau `undefined`.

```js
let pengaturan = null;
pengaturan ??= { tema: "gelap" };
console.log(pengaturan); // { tema: "gelap" }

let skor = 0;
skor ??= 100;
console.log(skor); // 0, tidak diganti karena 0 bukan null
```

Pola ini berguna untuk nilai default pada objek konfigurasi. Baris `pengaturan ??= {...}` jauh lebih pendek daripada menulis `if` lengkap, dan maknanya tetap jelas.

Teman satunya lagi adalah optional chaining `?.`, yang sering dipakai berdampingan dengan `??`. Keduanya menjawab dua pertanyaan berbeda yang sering muncul bersamaan: apakah propertinya ada, dan kalau tidak ada, pakai apa sebagai ganti.

```js
const pengguna = { profil: { nama: "Raka" } };
const nama = pengguna.profil?.nama ?? "Tamu";
console.log(nama); // "Raka"

const anonim = {};
const namaAnonim = anonim.profil?.nama ?? "Tamu";
console.log(namaAnonim); // "Tamu"
```

Baris kedua tidak akan error walau `profil` tidak ada, karena `?.` berhenti dengan aman dan mengembalikan `undefined`, lalu `??` menggantinya dengan "Tamu". Kombinasi ini muncul di mana-mana dalam kode yang membaca data API, karena bentuk data dari server sering tidak bisa ditebak seluruhnya.

![Kode JavaScript di layar laptop dengan tema gelap](https://tsi.lv/wp-content/uploads/2020/02/Computer-Sciences-MSc.jpg)

## Jebakan yang sering ketemu

Ada satu aturan sintaks yang perlu diingat: `??` tidak boleh dicampur langsung dengan `&&` atau `||` tanpa tanda kurung. Kode seperti ini akan ditolak mesin JavaScript.

```js
// Salah, akan error
const hasil = a ?? b || c;
```

Mesin tidak bisa menebak mana yang harus dihitung dulu, jadi ia menolak sama sekali. Solusinya adalah memberi kurung secara eksplisit.

```js
// Benar, maksudnya jelas
const hasil = (a ?? b) || c;
const hasil2 = a ?? (b || c);
```

Dua baris itu punya arti yang berbeda, dan kurunglah yang membuatnya jelas. Aturan ini memang agak merepotkan di awal, tapi ia mencegah salah tafsir yang jauh lebih mahal di kemudian hari.

Jebakan kedua adalah mengira `??` bisa menggantikan semua pemakaian `||`. Tidak bisa. Ada keadaan di mana string kosong atau `false` memang harus diganti, misalnya validasi form yang menganggap input kosong sebagai belum diisi. Di situ `||` tetap alat yang benar. Kuncinya adalah tahu apa yang sebenarnya sedang diperiksa: ketiadaan data, atau nilai yang dianggap tidak valid.

Jebakan ketiga muncul saat rantai `??` dipakai berlapis tanpa memperhatikan urutan.

```js
const nilai = a ?? b ?? "kosong";
```

Baris ini sah, dan dibaca dari kiri ke kanan. Kalau `a` ada, pakai `a`. Kalau tidak, cek `b`. Kalau `b` juga tidak ada, pakai "kosong". Rantai seperti ini berguna untuk fallback berlapis, misalnya mengambil pengaturan dari pengguna, lalu dari tim, lalu dari bawaan sistem.

## Kapan pakai, kapan tidak

Pakai `??` saat membaca data yang mungkin belum ada: hasil fetch API, nilai dari form, argumen fungsi yang opsional, dan properti objek yang tidak dijamin ada. Di tempat-tempat itu, membedakan 0 dan string kosong dari data yang hilang adalah hal yang penting.

Tetap pakai `||` saat memang semua nilai falsy harus diganti, misalnya menampilkan placeholder saat input kosong, atau saat nilai `false` dan `0` sama-sama berarti "belum diisi" dalam konteks itu.

Perubahan dari `||` ke `??` di tempat yang tepat biasanya cuma satu karakter, tapi ia menghilangkan satu kelas bug yang diam-diam. Kode yang tadinya bergantung pada kebetulan jadi bergantung pada aturan yang jelas: hanya ketiadaan data yang diganti, sisanya dibiarkan seperti apa adanya.
