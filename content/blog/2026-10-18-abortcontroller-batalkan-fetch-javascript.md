---
title: "AbortController: Cara Membatalkan Fetch di JavaScript"
date: 2026-10-18
excerpt: "Fetch yang sudah jalan tidak bisa dibatalkan begitu saja, dan itu bikin bug aneh. AbortController menyelesaikan masalah ini dengan rapi. Ini cara pakainya."
tags: javascript, tutorial, fetch, web
image: "https://images.pexels.com/photos/31177212/pexels-photo-31177212/free-photo-of-colorful-javascript-code-on-a-computer-screen.jpeg?cs=tinysrgb&dpr=1&w=500"
---

Bayangkan kamu bikin kolom pencarian yang otomatis mencari tiap kali user mengetik. User mengetik "ka", request meluncur. User lanjut mengetik "kana", request kedua meluncur. Masalahnya, request pertama lebih lambat dan datang belakangan. Hasil untuk "ka" menimpa hasil untuk "kana" di layar. User bingung, kamu bingung.

Ini namanya race condition, dan penyebabnya sederhana: `fetch` yang sudah dikirim tidak bisa dibatalkan. Atau lebih tepatnya, dulu tidak bisa. Sekarang ada `AbortController`, API bawaan browser yang menyelesaikan masalah ini dengan bersih.

## Cara kerja dasarnya

`AbortController` punya dua bagian: controller-nya dan `signal`-nya. Kamu pasang signal ke fetch, lalu panggil `abort()` kapan pun kamu mau membatalkan.

```js
const controller = new AbortController();

fetch("https://api.example.com/data", { signal: controller.signal })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Fetch dibatalkan, santai saja");
    } else {
      console.error("Error beneran:", err);
    }
  });

// Di tempat lain, misalnya user menekan tombol batal:
controller.abort();
```

Saat `abort()` dipanggil, promise dari fetch langsung ditolak dengan error bernama `AbortError`. Itu sebabnya blok catch perlu membedakan: error karena dibatalkan itu normal, bukan bug.

## Contoh nyata: kolom pencarian

Kembali ke kasus kolom pencarian tadi. Polanya begini: setiap kali ada input baru, batalkan request sebelumnya dulu, baru kirim yang baru.

```js
let controller = null;

async function cari(query) {
  // Batalkan request yang masih jalan
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  try {
    const res = await fetch(
      `https://api.example.com/search?q=${query}`,
      { signal: controller.signal }
    );
    const data = await res.json();
    tampilkanHasil(data);
  } catch (err) {
    if (err.name !== "AbortError") {
      tampilkanError(err);
    }
    // Kalau AbortError, diamkan saja. Request baru sudah jalan.
  }
}

input.addEventListener("input", (e) => cari(e.target.value));
```

Sederhana, tapi efeknya besar. Tidak ada lagi hasil basi yang menimpa hasil terbaru. Server juga tidak dibebani request yang hasilnya sudah tidak dibutuhkan.

![Kode JavaScript di layar editor](https://esoc.princeton.edu/sites/g/files/toruqf241/files/styles/3x4_750w_1000h/public/2020-04/markus-spiske-466ENaLuhLY-unsplash.jpg?itok=jNaQmTFz)

## Kasus lain: timeout otomatis

Fetch tidak punya opsi timeout bawaan. Kalau server ngadat, request bisa menggantung selamanya. Dengan AbortController, kamu bisa bikin timeout sendiri dalam beberapa baris.

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
```

Blok `finally` penting. Tanpa `clearTimeout`, timer tetap jalan walau request sudah selesai. Kebocoran kecil seperti ini menumpuk di aplikasi yang sering fetch.

## Tiga jebakan yang sering kena

Satu controller cuma bisa dipakai sekali. Setelah `abort()` dipanggil, signal-nya mati permanen. Kalau butuh membatalkan lagi, bikin controller baru. Ini alasan contoh kolom pencarian di atas membuat `new AbortController()` setiap kali fungsi dipanggil.

Jebakan kedua: lupa menangani AbortError. Error yang tidak tertangani muncul sebagai unhandled rejection di console dan bikin bingung saat debugging. Selalu cek `err.name === "AbortError"` di catch.

Jebakan ketiga: mengira abort menghentikan server. Tidak. `abort()` cuma menghentikan sisi klien menunggu respons. Kalau request sudah sampai server dan server sedang memproses, proses di server tetap jalan. Jadi jangan pakai ini untuk membatalkan pembayaran atau operasi penting di server. Untuk itu butuh mekanisme idempotency di backend, topik yang lain.

## Kapan memakainya

Pakai AbortController setiap kali ada kemungkinan request menjadi tidak relevan sebelum selesai: pencarian live, autocomplete, navigasi antar halaman di SPA (batalkan fetch halaman lama saat user pindah), dan polling berkala. Browser modern semuanya mendukung, jadi tidak perlu library tambahan.

Ini salah satu API kecil yang kalau sudah terbiasa dipakai, kamu heran kenapa dulu ngoding tanpa itu.

Oh ya, kalau kamu pakai axios, tidak perlu cari cara lain. Axios mendukung `signal` sejak versi 0.22, jadi pola yang sama langsung bisa dipakai: `axios.get(url, { signal: controller.signal })`. Token pembatalan lama milik axios (CancelToken) sudah deprecated, jadi pakai signal saja. Satu API untuk fetch bawaan dan axios, rapi.
