---
title: "AbortController: Cara Membatalkan Fetch di JavaScript"
date: 2026-10-30
excerpt: "Kolom pencarian menembak request berkali-kali dan hasilnya tertukar? AbortController membatalkan request lama sebelum yang baru dikirim. Ini cara pakainya."
tags: javascript, tutorial, fetch, webdev, pemrograman
image: https://jobs.sahla-dz.com/wp-content/uploads/2025/08/featured-2288-1024x683.jpeg
---

Ada bug klasik di kolom pencarian yang menembak API setiap kali pengguna mengetik. Pengguna mengetik "kucing", lalu cepat-cepat mengubahnya menjadi "kucing anggora". Dua request meluncur ke server. Masalahnya, request pertama bisa saja pulang belakangan dan menimpa hasil request kedua. Di layar, pengguna melihat hasil untuk "kucing" padahal ia sudah mencari "kucing anggora". Bug ini punya nama: race condition. Dan obatnya sudah tersedia di browser: `AbortController`.

## Kenalan dengan AbortController

`AbortController` adalah objek bawaan browser dan Node.js modern yang tugasnya satu: memberi sinyal pembatalan ke proses yang sedang berjalan. Ia bekerja berpasangan dengan `AbortSignal`, dan `fetch` sudah mendukung sinyal ini secara native. Polanya begini: buat controller, kirim sinyalnya ke `fetch`, lalu panggil `abort()` kapan pun kamu mau menghentikan request itu.

```js
const controller = new AbortController();

fetch("https://api.example.com/search?q=kucing", {
  signal: controller.signal,
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Request dibatalkan, ini normal");
    } else {
      console.error("Error beneran:", err);
    }
  });

// Di tempat lain, saat request sudah tidak dibutuhkan lagi:
controller.abort();
```

Satu hal yang wajib diingat: `fetch` yang dibatalkan akan melempar error bernama `AbortError`. Ini bukan error beneran, melainkan tanda bahwa pembatalan berjalan sesuai rencana. Jadi di blok `catch`, pisahkan `AbortError` dari error lain seperti koneksi putus atau server bermasalah. Kalau tidak dipisahkan, log errormu akan penuh dengan "error" palsu setiap kali pengguna mengetik cepat.

## Memperbaiki kolom pencarian

Sekarang terapkan pola ini ke kasus kolom pencarian. Kuncinya: simpan controller dalam variabel di luar fungsi, dan batalkan controller lama setiap kali pencarian baru dimulai.

```js
let controller;

async function cari(query) {
  // Batalkan request sebelumnya kalau masih jalan
  controller?.abort();

  controller = new AbortController();

  try {
    const res = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(query)}`,
      { signal: controller.signal }
    );
    const data = await res.json();
    tampilkanHasil(data);
  } catch (err) {
    if (err.name !== "AbortError") {
      tampilkanPesanError();
    }
    // AbortError sengaja diabaikan: itu request lama yang memang dibatalkan
  }
}

inputPencarian.addEventListener("input", (e) => {
  cari(e.target.value);
});
```

Dengan pola ini, hanya request terbaru yang diizinkan selesai. Request lama yang masih tertahan di jaringan akan dibatalkan begitu pengguna mengetik huruf berikutnya. Hasil di layar pun selalu cocok dengan kata kunci terakhir, bukan kata kunci yang sudah ditinggalkan.

![Suasana menulis kode di depan laptop](https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg)

## Dipakai di React dan di tempat lain

Di React, pola yang sama dipasang di dalam `useEffect` dengan fungsi cleanup. Saat komponen berpindah halaman atau kata kunci berubah, cleanup berjalan dan membatalkan request yang sudah tidak relevan. Ini juga mencegah peringatan klasik "state diupdate setelah komponen dilepas", karena request yang dibatalkan tidak akan memanggil `setState` lagi.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then((res) => res.json())
    .then(setHasil)
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort(); // cleanup: batalkan saat query berubah
}, [query]);
```

`AbortController` juga tidak terbatas pada `fetch`. Kamu bisa memakainya untuk membatalkan banyak hal sekaligus dengan satu sinyal yang sama, misalnya menghentikan beberapa request paralel dalam satu aksi pengguna. Bahkan `addEventListener` mendukung opsi `signal`, sehingga listener bisa dilepas otomatis saat sinyal dibatalkan, tanpa perlu memanggil `removeEventListener` manual.

## Kapan tidak perlu memakainya

Tidak semua request butuh dibatalkan. Request sekali jalan seperti mengirim formulir atau memproses pembayaran justru berbahaya kalau dibatalkan sembarangan, karena server mungkin sudah memprosesnya. Pembatalan di sisi klien tidak otomatis membatalkan pekerjaan di sisi server. Jadi pakai `AbortController` untuk request yang aman diulang dan hasilnya bisa digantikan: pencarian, autocomplete, filter, dan pengambilan data untuk tampilan.

Intinya, `AbortController` adalah perkakas kecil yang menyelesaikan satu masalah nyata: request lama yang menimpa hasil baru. Ia tidak butuh library tambahan, tersedia di semua browser modern, dan polanya hanya tiga baris: buat controller, kirim sinyalnya, batalkan saat sudah tidak dibutuhkan. Kalau aplikasimu punya kolom pencarian atau filter yang menembak API, ini perbaikan yang layak masuk ke daftar berikutnya.
