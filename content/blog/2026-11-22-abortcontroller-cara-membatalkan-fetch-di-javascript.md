---
title: AbortController, Cara Membatalkan Fetch di JavaScript
date: 2026-11-22
excerpt: Fetch yang sudah jalan tidak bisa dibatalkan begitu saja. AbortController memberi tombol stop untuk request itu, lengkap dengan timeout dan pembatalan.
tags: javascript, tutorial, fetch, web
image: https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg
---

Pernah menekan tombol cari dua kali karena hasil pertama terasa lama, lalu hasil yang muncul justru dari pencarian pertama? Atau halaman sudah pindah tapi request lama masih jalan di belakang layar? Dua masalah ini punya akar yang sama: `fetch` yang sudah dikirim tidak bisa dihentikan. Di sinilah `AbortController` bekerja.

`AbortController` adalah API bawaan browser dan Node.js yang memberi sinyal pembatalan ke operasi asinkron. Cara pakainya singkat, tapi dampaknya besar untuk aplikasi yang banyak berinteraksi dengan API.

## Cara kerja dasarnya

Pola dasarnya hanya tiga langkah. Buat controller, kirim sinyalnya lewat opsi `fetch`, lalu panggil `abort()` saat request perlu dihentikan.

```js
const controller = new AbortController();

fetch("https://api.example.com/data", {
  signal: controller.signal,
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Request dibatalkan");
    } else {
      console.error(err);
    }
  });

// Di tempat lain, misalnya saat pengguna menekan tombol batal:
controller.abort();
```

Begitu `abort()` dipanggil, promise dari `fetch` langsung ditolak dengan error bernama `AbortError`. Kode di atas membedakan error ini dari error lain, supaya pembatalan yang disengaja tidak tercatat sebagai kegagalan di log.

Satu controller hanya bisa dipakai untuk satu kali pembatalan. Setelah `abort()` dipanggil, sinyalnya tetap dalam keadaan aborted selamanya. Kalau butuh membatalkan request lain, buat controller baru.

## Memberi batas waktu ke fetch

`fetch` tidak punya opsi timeout bawaan. Request bisa menggantung lama kalau server lambat merespons. Menggabungkan `AbortController` dengan `setTimeout` adalah cara paling umum untuk mengatasi ini.

```js
async function fetchDenganTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

fetchDenganTimeout("https://api.example.com/data", 5000)
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Request kehabisan waktu 5 detik");
    }
  });
```

Perhatikan `clearTimeout` di blok `finally`. Tanpa itu, timer tetap jalan walau request sudah selesai, dan itu buang-buang sumber daya. Pola ini juga bisa dibungkus jadi helper yang dipakai di seluruh aplikasi, jadi setiap request API otomatis punya batas waktu yang sama.

Sejak beberapa versi terakhir, ada jalan yang lebih singkat. `AbortSignal.timeout()` membuat sinyal yang otomatis abort setelah sekian milidetik, tanpa perlu membuat controller dan timer sendiri.

```js
const res = await fetch("https://api.example.com/data", {
  signal: AbortSignal.timeout(5000),
});
```

Hasilnya sama, kodenya lebih pendek. Kekurangannya, sinyal ini tidak bisa dibatalkan secara manual. Kalau butuh tombol batal dari pengguna sekaligus timeout, tetap pakai controller dan gabungkan dua sinyal dengan `AbortSignal.any()`.

## Kasus nyata: kolom pencarian

Contoh paling sering ditemui adalah kolom pencarian yang memanggil API setiap kali pengguna mengetik. Tanpa pembatalan, setiap ketikan mengirim request baru, dan hasilnya bisa datang tidak berurutan. Request untuk kata "ja" bisa sampai setelah request untuk "jav", dan tampilan akhirnya malah menunjukkan hasil yang salah.

```js
let controller;

async function cari(query) {
  controller?.abort();
  controller = new AbortController();

  try {
    const res = await fetch(`/api/cari?q=${query}`, {
      signal: controller.signal,
    });
    const hasil = await res.json();
    tampilkanHasil(hasil);
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Pencarian gagal:", err);
    }
  }
}
```

Setiap kali `cari()` dipanggil, controller lama dibatalkan dulu sebelum request baru dibuat. Hanya hasil dari ketikan terakhir yang sampai ke layar. Pola yang sama berlaku untuk autocomplete, filter tabel, dan peta yang memuat data saat pengguna menggeser tampilan.

![Seseorang mengetik kode JavaScript di laptop](https://www.internetacademy.jp/it/images/what-is-javascript.jpg)

## Membatalkan saat komponen dilepas

Di React, Vue, atau framework lain, komponen sering dilepas sebelum request selesai. Pengguna pindah halaman, modal ditutup, tab diganti. Request yang tertinggal bisa memicu peringatan karena mencoba mengubah state komponen yang sudah tidak ada.

Solusinya, panggil `abort()` saat komponen dibersihkan. Di React, itu berarti di fungsi cleanup dari `useEffect`:

```js
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/profil", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setProfil(data))
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort();
}, []);
```

Dengan cleanup ini, tidak ada lagi request yatim yang berjalan tanpa pemilik. Aplikasi jadi lebih hemat bandwidth dan log error lebih bersih, karena `AbortError` yang disengaja sudah disaring.

## Bukan hanya untuk fetch

Sinyal dari `AbortController` juga bisa dipakai di luar `fetch`. `addEventListener` menerima opsi `signal`, jadi listener bisa dilepas ramai-ramai dengan satu kali `abort()`. Beberapa API lain seperti stream dan `ReadableStream` juga mengenal sinyal ini. Sekali paham polanya, controller yang sama bisa mengatur banyak hal sekaligus.

## Penutup

`AbortController` menyelesaikan masalah yang sering dianggap sepele sampai aplikasi mulai terasa lambat atau menampilkan data yang salah. Tiga pola di atas sudah menutup sebagian besar kebutuhan: batalkan request lama sebelum mengirim yang baru, beri batas waktu ke setiap request, dan bersihkan request saat komponen dilepas. Kodenya tidak panjang, tapi aplikasi yang menerapkannya terasa jauh lebih rapi.
