---
title: "Debounce & Throttle: Trik JS Biar API Enggak Kecapean"
date: 2026-10-13
excerpt: "Kolom pencarian yang menembak request tiap huruf bikin API kecapean. Debounce menunggu pengguna berhenti mengetik, throttle membatasi frekuensi. Ini caranya."
tags: javascript, tutorial, webdev
image: "https://images.pexels.com/photos/31177212/pexels-photo-31177212/free-photo-of-colorful-javascript-code-on-a-computer-screen.jpeg?cs=tinysrgb&dpr=1&w=500"
---

Bayangkan kamu bikin kolom pencarian produk. Pengguna mengetik "sepatu lari": tiap huruf yang ditekan langsung memicu request ke API. Sembilan huruf berarti sembilan request, dan delapan di antaranya sudah basi sebelum responsnya tiba karena pengguna sudah mengetik huruf berikutnya. Kuota jebol, server diserang sia-sia, dan hasilnya juga tidak lebih cepat sampai ke layar.

Masalah seperti ini muncul di banyak tempat: validasi form yang mengecek ke server tiap ketikan, auto-save draf, sampai handler scroll yang menghitung ulang layout puluhan kali per detik. Solusinya bukan server yang lebih besar, melainkan dua fungsi kecil di sisi klien: debounce dan throttle. Keduanya mengatur kapan sebuah fungsi boleh dijalankan, tapi caranya berbeda.

## Debounce: tunggu sampai tenang

Debounce itu seperti menekan tombol lift. Kamu bisa menekan tombolnya berkali-kali, tapi lift baru jalan setelah beberapa detik tidak ada yang menekan lagi. Setiap ada input baru, hitungan mundur diulang dari awal. Fungsi yang sebenarnya baru dijalankan setelah ada jeda tenang sepanjang durasi yang kamu tentukan.

Implementasinya cuma belasan baris:

```js
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce((e) => {
  cariProduk(e.target.value);
}, 300));
```

Logikanya sederhana: `clearTimeout` membatalkan timer lama setiap ada ketikan baru, lalu timer baru dipasang. Akibatnya `cariProduk` hanya dipanggil sekali, yaitu 300 milidetik setelah pengguna berhenti mengetik. Sembilan huruf yang diketik cepat menghasilkan satu request, bukan sembilan.

![Mengetik memicu banyak event di JavaScript](https://savethevideo.net/blog/wp-content/uploads/2026/03/a-computer-screen-with-a-bunch-of-text-on-it-javascript-code-editor-error-popup-developer-typing.jpg)

Angka 300 milidetik bukan aturan sakral. Untuk kolom pencarian, 200 sampai 400 milidetik biasanya terasa pas: cukup cepat supaya responsif, cukup lama supaya tidak boros. Untuk auto-save draf dokumen, kamu bisa pakai jeda yang lebih panjang, misalnya 1 sampai 2 detik.

## Throttle: jatah berkala

Throttle adalah kebalikannya. Fungsi tetap boleh dijalankan berkali-kali, tapi frekuensinya dibatasi, misalnya maksimal sekali tiap 200 milidetik. Kalau debounce menunggu keheningan, throttle seperti antrean dengan jatah waktu: siapa pun boleh maju, tapi bergantian sesuai jadwal.

Ini cocok untuk event yang memang mengalir terus seperti scroll, resize jendela, atau pergerakan mouse:

```js
function throttle(fn, interval = 200) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  updateNavbar();
}, 200));
```

Tanpa throttle, handler scroll bisa dipanggil puluhan kali per detik selama pengguna menggulir halaman. Dengan throttle 200 milidetik, `updateNavbar` jalan maksimal lima kali per detik. Matamu tidak akan bisa membedakan, tapi CPU laptopmu berterima kasih.

## Kapan pakai yang mana

Aturan praktisnya: pakai debounce untuk aksi yang menunggu hasil akhir. Kolom pencarian, validasi form saat mengetik, dan auto-save draf masuk kategori ini. Yang penting adalah input terakhir, bukan perjalanan menuju ke sana.

Pakai throttle untuk aksi yang mengikuti gerakan yang terus berjalan. Animasi yang dipicu scroll, laporan posisi mouse, dan handler resize jendela masuk kategori ini. Yang penting adalah mengikuti pergerakan secara berkala, bukan menunggu semuanya berhenti.

## Jebakan yang sering kejadian

Ada satu kesalahan klasik yang bikin debounce "tidak berfungsi": membuat fungsi debounce baru setiap kali event dipasang. Contohnya di React, kalau kamu menulis `onChange={debounce(handleChange, 300)}` langsung di JSX, setiap render membuat timer baru dan debounce-nya tidak pernah sempat bekerja. Solusinya: buat versi debounce-nya sekali saja, misalnya dengan `useMemo` atau `useCallback`, lalu pakai versi yang sama di setiap render.

Jebakan kedua: lupa bahwa debounce mengembalikan fungsi baru. Kalau kamu memasang dan melepas event listener, pastikan yang dilepas adalah fungsi hasil debounce yang sama, bukan fungsi aslinya. Simpan di variabel dulu, baru pasang dan lepas dengan variabel itu.

Jebakan ketiga khusus throttle: implementasi sederhana di atas memakai pola "leading edge", artinya panggilan pertama langsung jalan, lalu dibatasi. Ada juga pola "trailing edge" yang menunggu interval selesai baru menjalankan panggilan terakhir. Untuk scroll dan resize, leading edge biasanya cukup. Untuk kasus seperti tombol "kirim" yang diklik berkali-kali, kamu justru ingin memastikan klik terakhir tetap diproses, jadi trailing edge lebih tepat. Pilih sesuai kebutuhan, jangan asal tempel.

Dua fungsi ini tidak butuh library. Kamu bisa menulisnya sendiri dalam lima menit, atau menyalin pola di atas dan menyesuaikan angkanya. Lain kali halamanmu terasa berat atau API-mu kebanjiran request, sebelum menyalahkan server, cek dulu event handler-mu. Mungkin kodenya tidak salah, cuma belum dikasih rem.
