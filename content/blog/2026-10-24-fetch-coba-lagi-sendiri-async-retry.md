---
title: Bikin Fetch yang Coba Lagi Sendiri Saat Gagal
date: 2026-10-24
excerpt: Fetch gagal sekali bukan berarti server mati. Pelajari pola async retry dengan jeda membesar (exponential backoff) agar aplikasi tetap tangguh tanpa kode berlapis-lapis.
tags: javascript, tutorial, fetch, web
image: https://coursera-course-photos.s3.amazonaws.com/87/e97c52abf942f48dd71992747b5c35/javascript-with-laptop-code.jpg
---

Koneksi internet pengguna tidak pernah sempurna. Server kadang restart, gateway kadang timeout, sinyal HP kadang putus di terowongan. Masalahnya, `fetch()` biasa menyerah terlalu cepat: satu kali gagal, langsung throw error, dan pengguna yang disalahkan ("coba lagi nanti"). Padahal banyak kegagalan itu sesaat dan bisa pulih sendiri dalam hitungan detik.

Solusinya adalah pola retry: coba lagi secara otomatis dengan jeda yang masuk akal. Sekali kamu punya fungsi helper-nya, seluruh aplikasi bisa memakainya tanpa menulis try/catch berlapis di setiap pemanggilan API.

![Contoh tampilan error tracking pada aplikasi web](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fmtua827px6hsf3ryoyaf.jpeg)

## Mulai dari yang paling sederhana

Versi dasarnya adalah loop yang mencoba fetch beberapa kali sebelum menyerah:

```js
async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
```

Ini sudah menyelesaikan setengah masalah. Tapi ada dua kelemahan: retry-nya langsung tanpa jeda (server yang sedang kewalahan justru dibanjiri ulang), dan ia mencoba ulang semua error termasuk yang jelas-jelas permanen.

## Jeda yang membesar: exponential backoff

Server yang baru saja batuk butuh waktu bernapas. Strategi standarnya adalah memperbesar jeda tiap percobaan: 1 detik, lalu 2 detik, lalu 4 detik, dan seterusnya. Tambahkan sedikit jitter (angka acak) supaya banyak klien tidak menyerbu server di detik yang sama persis setelah outage.

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithBackoff(url, attempts = 4) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      // Error 5xx: server bermasalah, layak dicoba lagi
      if (res.status < 500) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (i === attempts - 1) throw err; // percobaan terakhir: menyerah
    }
    const delay = 1000 * 2 ** i + Math.random() * 300;
    await sleep(delay);
  }
}
```

Perhatikan baris `res.status < 500`: error 400, 401, 404 itu permanen. Mencoba ulang sepuluh kali pun hasilnya sama. Hanya kegagalan jaringan (fetch throw) dan error 5xx yang layak di-retry.

## Kapan TIDAK boleh retry

Pola ini bukan untuk semua request. Jangan gunakan retry otomatis pada:

- **Request POST yang mengubah data** (bayar, kirim formulir), kecuali API-nya mendukung idempotency key. Sekali request "lolos" padahal responsnya hilang di jalan, retry buta bisa membuat pembayaran ganda.
- **Request yang dibatalkan sengaja** lewat AbortController, misalnya saat pengguna pindah halaman. Hormati sinyal abort dan berhenti.
- **Error autentikasi (401)**. Token kedaluwarsa tidak akan sembuh dengan dicoba ulang; yang dibutuhkan adalah refresh token dulu.

## Hormati tombol batal pengguna

Satu detail yang sering dilupakan: retry harus bisa dihentikan. Kalau pengguna menutup halaman atau menekan tombol batal, percobaan ulang yang terus jalan di latar hanya membuang sumber daya. Tambahkan dukungan AbortSignal agar helper berhenti total saat dibatalkan:

```js
async function fetchWithBackoff(url, attempts = 4, signal) {
  for (let i = 0; i < attempts; i++) {
    if (signal?.aborted) throw new DOMException("Dibatalkan", "AbortError");
    try {
      const res = await fetch(url, { signal });
      if (res.ok) return res;
      if (res.status < 500) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (err.name === "AbortError" || i === attempts - 1) throw err;
    }
    const delay = 1000 * 2 ** i + Math.random() * 300;
    await sleep(delay);
  }
}

// Pakai bersama AbortController
const ctrl = new AbortController();
fetchWithBackoff("/api/data", 4, ctrl.signal);
// ctrl.abort() kapan pun untuk menghentikan semuanya
```

Sekarang helper-nya lengkap: mencoba lagi saat layak, menyerah saat permanen, dan berhenti saat diminta.

## Contoh pemakaian nyata

```js
const profile = await fetchWithBackoff("/api/profile", 4)
  .then((r) => r.json())
  .catch(() => showOfflineNotice());
```

Satu baris pemanggilan, perilaku yang tangguh. Dengan helper kecil seperti ini, kegagalan sesaat yang dulu memaksa pengguna menekan tombol refresh sekarang diselesaikan aplikasi sendiri dalam diam. Itulah perbedaan antara aplikasi yang terasa "sering error" dan aplikasi yang terasa bisa diandalkan, padahal servernya sama saja.
