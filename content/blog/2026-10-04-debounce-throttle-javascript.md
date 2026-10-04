---
title: "Debounce dan Throttle: Hentikan Fungsi yang Dipanggil Terus"
date: 2026-10-04
excerpt: "Kolom pencarian yang memanggil API tiap ketikan dan scroll yang bikin browser ngelag, dua-duanya sembuh dengan debounce dan throttle. Ini cara pakainya."
tags: javascript, tutorial, pemula
image: "https://images.pexels.com/photos/31177212/pexels-photo-31177212/free-photo-of-colorful-javascript-code-on-a-computer-screen.jpeg?cs=tinysrgb&dpr=1&w=500"
---

Pernah bikin kolom pencarian yang manggil API setiap huruf diketik? Atau animasi scroll yang bikin halaman ngelag? Masalahnya sama: fungsi kamu dipanggil terlalu sering. Obatnya dua, dan sering ketuker: debounce dan throttle.

## Masalahnya dulu

Bayangin input pencarian. User ngetik "sepatu", itu 6 huruf. Tanpa pengaman, browser kamu menembak 6 request API: "s", "se", "sep", "sepa", "sepat", "sepatu". Lima request pertama sampah, karena yang dibutuhkan cuma hasil dari kata lengkapnya.

Atau event scroll. Dalam satu geseran jari, browser bisa memicu puluhan event scroll per detik. Kalau tiap event menjalankan perhitungan berat, halamanmu macet.

## Debounce: tunggu sampai user berhenti

Debounce bilang: "Jangan jalan dulu. Kalau dalam X milidetik tidak ada panggilan baru, baru jalan." Cocok untuk pencarian, validasi form, dan auto-save.

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer); // batalkan panggilan sebelumnya
    timer = setTimeout(() => fn(...args), delay);
  };
}

const cariProduk = debounce((kata) => {
  fetch(`/api/produk?q=${kata}`)
    .then((res) => res.json())
    .then(console.log);
}, 400);

input.addEventListener("input", (e) => cariProduk(e.target.value));
```

User ngetik "sepatu" dalam 300ms? Timer terus di-reset, dan cuma satu request yang keluar 400ms setelah ketikan terakhir. Enam request jadi satu.

![Kode di layar laptop](https://images.pexels.com/photos/34803994/pexels-photo-34803994/free-photo-of-modern-laptop-on-wooden-desk-with-code-displayed.jpeg?w=600)

## Throttle: jalan, tapi maksimal sekian kali per detik

Throttle bilang: "Boleh jalan, tapi paling sering sekali tiap X milidetik." Cocok untuk scroll, resize window, dan drag.

```js
function throttle(fn, limit) {
  let sedangJeda = false;
  return (...args) => {
    if (sedangJeda) return; // lewati kalau masih dalam jeda
    fn(...args);
    sedangJeda = true;
    setTimeout(() => (sedangJeda = false), limit);
  };
}

const saatScroll = throttle(() => {
  console.log("posisi scroll:", window.scrollY);
}, 200);

window.addEventListener("scroll", saatScroll);
```

Scroll 5 detik penuh? Dengan limit 200ms, fungsimu jalan sekitar 25 kali, bukan ratusan kali. Halaman tetap responsif.

## Jebakan yang sering kena: request yang datang terlambat

Debounce menyelesaikan jumlah request, tapi ada satu masalah tersisa. Misal request untuk kata "sepatu" ternyata lebih lambat dari request "sepatu lari" (yang diketik setelahnya, setelah debounce). Hasil yang tampil bisa jadi hasil lama yang menimpa hasil baru. Solusinya: batalkan request lama dengan AbortController.

```js
let controller;

const cariProduk = debounce(async (kata) => {
  controller?.abort(); // batalkan request sebelumnya
  controller = new AbortController();

  try {
    const res = await fetch(`/api/produk?q=${kata}`, {
      signal: controller.signal,
    });
    console.log(await res.json());
  } catch (err) {
    if (err.name !== "AbortError") throw err; // abort itu normal, abaikan
  }
}, 400);
```

Pola debounce + AbortController ini standar di kolom pencarian production. Tanpa ini, user mengetik cepat bisa melihat hasil yang kedip-kedip berganti sendiri.

Satu varian lain yang perlu kamu tahu: debounce punya dua mode. Yang kita pakai di atas namanya trailing, fungsi jalan setelah user berhenti. Ada juga leading, fungsi jalan langsung di panggilan pertama lalu mengabaikan sisanya sampai jeda selesai. Leading cocok untuk tombol "kirim" yang tidak boleh diklik dua kali. Kebanyakan implementasi debounce mendukung opsi ini, jadi cek dokumentasi util yang kamu pakai.

## Cara ingatnya

Debounce itu kayak lift: pintunya tidak nutup selama masih ada orang masuk. Begitu tidak ada yang masuk selama beberapa detik, pintu nutup dan lift jalan. Throttle itu kayak keran air yang dibuka seperempat: air tetap ngalir terus, tapi debitnya dibatasi.

Satu catatan: dua-duanya mengembalikan fungsi baru. Jadi simpan hasilnya di variabel (seperti `cariProduk` dan `saatScroll` di atas), jangan panggil `debounce(...)` langsung di dalam `addEventListener`, karena itu bikin timer baru tiap event dan pengamannya tidak berfungsi.

## Kapan pakai yang mana

Pencarian, auto-save, validasi saat mengetik: debounce. Scroll, resize, mousemove, drag: throttle. Kalau bingung, tanya ke diri sendiri: "Aku butuh hasil terakhir setelah user berhenti?" Itu debounce. "Aku butuh update berkala selama user beraktivitas?" Itu throttle.

Dua fungsi kecil ini menyelamatkan performa lebih banyak aplikasi web daripada kebanyakan library fancy. Taruh di util project kamu dan pakai terus.
