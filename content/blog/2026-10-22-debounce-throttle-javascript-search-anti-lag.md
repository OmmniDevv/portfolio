---
title: Debounce vs Throttle, Bikin Search Bar Anti Lag
date: 2026-10-22
excerpt: Setiap ketikan memicu request ke server itu pemborosan. Pelajari debounce dan throttle di JavaScript dengan contoh kode yang langsung bisa dipakai.
tags: tutorial, javascript, frontend, webdev
image: https://talent500.com/blog/wp-content/uploads/sites/42/2024/10/Introduction-to-Javascript.webp
---

Pernah bikin kolom pencarian yang setiap huruf yang diketik langsung menembak request ke API? Kalau iya, kamu tahu rasanya: server kebanjiran request, UI tersendat, dan sebagian besar responsnya terbuang karena pengguna belum selesai mengetik. Solusinya ada dua pola klasik: debounce dan throttle. Keduanya mengatur seberapa sering sebuah fungsi boleh dijalankan, tapi dengan cara yang berbeda.

## Debounce: tunggu sampai pengguna berhenti

Debounce menunda eksekusi fungsi sampai tidak ada lagi pemanggilan baru dalam jangka waktu tertentu. Ketik "kopi" dalam waktu setengah detik? Hanya satu request yang jalan, setelah kamu berhenti mengetik.

```js
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const cariProduk = debounce((keyword) => {
  fetch(`/api/produk?q=${keyword}`).then(/* render hasil */);
}, 300);

inputSearch.addEventListener("input", (e) => cariProduk(e.target.value));
```

Setiap event `input` menghapus timer sebelumnya dan membuat timer baru. Fungsi asli hanya jalan kalau sudah 300 milidetik berlalu tanpa ketikan baru. Satu hal yang perlu diingat: fungsi yang di-debounce tidak langsung mengembalikan hasil, jadi pola ini cocok untuk efek samping (request, autosave) bukan untuk komputasi yang butuh nilai balik seketika.

![Contoh kode JavaScript di editor](https://www.in2code.de/fileadmin/_processed_/0/b/csm_code_javascript_d426436a2d.webp)

## Throttle: batasi, jangan tunda

Throttle memastikan fungsi jalan paling banyak sekali dalam setiap interval waktu. Beda dengan debounce, pemanggilan pertama langsung dieksekusi, lalu pemanggilan berikutnya ditahan sampai intervalnya habis. Ini pas untuk event yang sifatnya kontinu: scroll, resize, gerakan mouse.

```js
function throttle(fn, interval) {
  let terakhirJalan = 0;
  return function (...args) {
    const sekarang = Date.now();
    if (sekarang - terakhirJalan >= interval) {
      terakhirJalan = sekarang;
      fn.apply(this, args);
    }
  };
}

const laporkanScroll = throttle(() => {
  console.log("posisi scroll:", window.scrollY);
}, 200);

window.addEventListener("scroll", laporkanScroll);
```

Dengan interval 200 milidetik, fungsi tetap jalan maksimal 5 kali per detik walau event scroll memicu puluhan kali dalam rentang yang sama. Animasi dan tracking tetap responsif tanpa menghajar CPU.

## Kapan pakai yang mana

Aturannya praktis, bukan dogma. Debounce untuk aksi yang harus menunggu pengguna selesai: search-as-you-type, autosave form, validasi input. Throttle untuk aksi yang harus tetap berjalan tapi dikendalikan frekuensinya: infinite scroll, lazy load gambar, resize handler yang menghitung ulang layout.

Satu jebakan umum: memakai debounce untuk tombol "beli sekarang". Pengguna yang mengklik dua kali cepat akan menganggap klik pertamanya tidak terdaftar, lalu mengklik lagi, dan order dobel. Untuk tombol, yang benar adalah disable tombol setelah klik pertama, bukan debounce.

Satu lagi: nilai delay bukan angka magis. 300 milidetik untuk search terasa pas di kebanyakan kasus, tapi uji dengan pengguna sungguhan. Terlalu pendek dan server tetap kebanjiran, terlalu panjang dan aplikasi terasa lemot.

## Variasi yang sering dibutuhkan

Implementasi dasar di atas sudah cukup untuk banyak kasus, tapi dua varian ini sering muncul di codebase nyata.

Varian pertama: debounce dengan opsi eksekusi di awal (leading edge). Kadang kamu ingin respons instan pada aksi pertama, lalu mengabaikan aksi berikutnya sampai jeda berlalu. Berguna untuk tombol yang boleh diklik ulang setelah jeda, tapi tidak untuk klik ganda yang tidak disengaja.

```js
function debounceLeading(fn, delay) {
  let timerId;
  return function (...args) {
    if (!timerId) fn.apply(this, args);
    clearTimeout(timerId);
    timerId = setTimeout(() => { timerId = null; }, delay);
  };
}
```

Varian kedua: gabungkan debounce dengan AbortController untuk membatalkan request yang sudah tidak relevan. Pengguna mengetik "kop", request jalan, lalu mengetik "kopi" dan request baru dibuat. Tanpa pembatalan, respons "kop" yang datang belakangan bisa menimpa hasil "kopi" yang benar. Polanya sederhana: simpan controller di closure, abort sebelum membuat request baru.

Kalau kamu pakai React, bungkus fungsi debounce dengan `useCallback` atau simpan di `useRef` agar instance-nya tidak dibuat ulang setiap render. Debounce yang dibuat ulang tiap render sama saja dengan tidak pakai debounce.

Dua fungsi kecil di atas menyelamatkan banyak aplikasi dari masalah performa yang sebenarnya sepele. Copy, tempel, sesuaikan delay-nya, dan search bar kamu tidak akan lagi menghajar server setiap kali seseorang mengetik huruf "a".
