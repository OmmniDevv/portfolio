---
title: AbortController, Batalkan Fetch yang Tak Lagi Dibutuhkan
date: 2026-11-11
excerpt: Fetch yang dibiarkan jalan setelah halaman pindah bisa menimpa data baru dengan data lama. AbortController memberi cara bersih untuk menghentikannya.
tags: javascript, tutorial, fetch, web, programming
image: https://idctop.com/wp-content/uploads/2026/06/jimeng_20260604192520_7b13309c-480x300.webp
---

Pernah mengetik di kolom pencarian, lalu hasilnya yang muncul justru dari kata kunci lama? Atau pindah halaman, tapi request dari halaman sebelumnya tetap jalan dan menimpa state? Dua masalah ini punya akar yang sama: request fetch yang tidak pernah dibatalkan.

JavaScript punya alat bawaan untuk ini, namanya AbortController. Alat ini sudah tersedia di semua browser modern dan di Node.js 15 ke atas, jadi tidak perlu library tambahan.

## Cara kerja yang paling sederhana

AbortController menghasilkan sebuah sinyal. Sinyal itu dipasang ke fetch lewat opsi `signal`. Saat `abort()` dipanggil, fetch yang sedang berjalan langsung berhenti dan melempar error bernama `AbortError`.

```js
const controller = new AbortController();

fetch("https://api.example.com/data", {
  signal: controller.signal,
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Request dibatalkan, ini normal");
    } else {
      console.error("Error lain:", err);
    }
  });

// Di tempat lain, misalnya saat pengguna menekan tombol batal:
controller.abort();
```

Satu controller hanya bisa dipakai sekali. Setelah `abort()` dipanggil, sinyalnya terkunci dalam keadaan dibatalkan. Kalau butuh membatalkan request lain, buat controller baru.

## Kasus nyata: kolom pencarian

Ini tempat AbortController paling terasa manfaatnya. Setiap huruf yang diketik memicu request baru. Tanpa pembatalan, request untuk kata "ja" bisa selesai setelah request untuk "javascript", dan hasilnya menimpa hasil yang benar.

```js
let controller;

async function cari(kataKunci) {
  // Batalkan request sebelumnya, kalau masih jalan
  controller?.abort();
  controller = new AbortController();

  try {
    const res = await fetch(
      `/api/cari?q=${encodeURIComponent(kataKunci)}`,
      { signal: controller.signal }
    );
    const hasil = await res.json();
    tampilkanHasil(hasil);
  } catch (err) {
    // AbortError diabaikan, karena memang disengaja
    if (err.name !== "AbortError") {
      tampilkanError(err);
    }
  }
}
```

Pola ini pendek dan menyelesaikan masalah balapan antar request tanpa state tambahan. Tiap kali `cari()` dipanggil, request lama mati sebelum request baru dikirim.

![Kode JavaScript di layar laptop](https://showportal.fidion.de/storage/image/6/8/6/4/4686_teaser-small-1280w_1zRXwQ_4JcyXH.jpg)

## Membatasi waktu request dengan timeout

Fetch bawaan tidak punya opsi timeout. Kalau server diam, request bisa menggantung lama. `AbortSignal.timeout()` menyelesaikan ini dalam satu baris.

```js
try {
  const res = await fetch("https://api.example.com/lambat", {
    signal: AbortSignal.timeout(5000), // batal otomatis setelah 5 detik
  });
  const data = await res.json();
  console.log(data);
} catch (err) {
  if (err.name === "TimeoutError") {
    console.log("Server kelamaan merespons");
  }
}
```

Perlu diingat, error dari timeout bernama `TimeoutError`, bukan `AbortError`. Bedakan keduanya di blok catch kalau pesan error yang ditampilkan ke pengguna harus akurat.

## Menggabungkan beberapa sinyal

Kadang satu request perlu dibatalkan dari dua pemicu, misalnya tombol batal dari pengguna dan batas waktu. `AbortSignal.any()` menggabungkan beberapa sinyal menjadi satu. Request batal begitu salah satu sinyalnya aktif.

```js
const controller = new AbortController();
const gabungan = AbortSignal.any([
  controller.signal,
  AbortSignal.timeout(8000),
]);

fetch("https://api.example.com/data", { signal: gabungan });
```

## Di React: bersihkan saat komponen dilepas

Di React, tempat yang tepat untuk `abort()` adalah fungsi cleanup di `useEffect`. Saat komponen dilepas atau dependensi berubah, request yang masih jalan ikut dibatalkan.

```js
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/pengguna/${idPengguna}`, {
    signal: controller.signal,
  })
    .then((res) => res.json())
    .then(setPengguna)
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort();
}, [idPengguna]);
```

Tanpa cleanup ini, React akan memberi peringatan tentang state yang di-set pada komponen yang sudah dilepas. Lebih parah lagi, data dari pengguna lama bisa tampil sekilas sebelum diganti data pengguna baru.

## Hal kecil yang sering terlewat

AbortController membatalkan request di sisi klien. Server mungkin tetap memproses request yang sudah terlanjur diterima, terutama kalau prosesnya sudah berjalan. Jadi jangan mengandalkan abort untuk menghentikan pekerjaan berat di server, misalnya query database yang lama. Untuk itu tetap butuh mekanisme di sisi server.

Selain fetch, sinyal abort juga bisa dipakai di banyak API lain, seperti `addEventListener` dengan opsi `signal` untuk melepas listener secara otomatis. Sekali paham polanya, alat ini berguna di banyak tempat.

Intinya sederhana: tiap kali ada request yang hasilnya bisa jadi tidak relevan lagi, pasang sinyal abort sejak awal. Kode yang membatalkan request yang tidak dibutuhkan adalah kode yang lebih hemat bandwidth, lebih sedikit bug balapan, dan lebih enak dipakai.
