---
title: "Debounce: Input Pencarian JavaScript yang Tidak Boros"
date: 2026-11-04
excerpt: "Setiap huruf yang diketik di kolom pencarian bisa memicu satu request ke server. Debounce menahan request itu sampai pengguna berhenti mengetik."
tags: javascript, tutorial, coding, web
image: https://miro.medium.com/v2/resize:fit:1200/1*QI41EbclPFLqId1TcpV_dQ.jpeg
---

Kamu mengetik "sepatu" di kolom pencarian sebuah situs. Enam huruf, dan kalau kode di baliknya ditulis dengan cara yang paling naif, itu berarti enam request dikirim ke server, satu per huruf. Huruf "s" memicu pencarian untuk "s", lalu "se", lalu "sep", dan seterusnya. Lima dari enam request itu hasilnya langsung dibuang, karena pengguna sudah mengetik huruf berikutnya sebelum responsnya kembali. Server bekerja keras untuk jawaban yang tidak pernah dibaca siapa pun.

Ini bukan sekadar soal boros. Di jaringan yang lambat, respons dari request lama bisa datang belakangan dan menimpa hasil yang benar. Pengguna mengetik "sepatu", tapi yang tampil di layar adalah hasil untuk "sep", karena respons itu datang paling akhir. Bug seperti ini sulit dilacak karena munculnya tidak konsisten, tergantung kecepatan jaringan saat itu.

Solusi klasiknya bernama debounce. Prinsipnya: jangan jalankan fungsi sekarang, tunggu dulu. Kalau ada panggilan baru sebelum waktu tunggu habis, buang timer lama dan mulai lagi dari nol. Fungsi baru benar-benar dijalankan setelah tidak ada panggilan baru selama jeda yang ditentukan, misalnya 300 milidetik. Pengguna yang mengetik dengan cepat hanya memicu satu request, yaitu setelah ia berhenti sejenak.

![Ilustrasi kode dan pencarian](https://a.storyblok.com/f/88751/1600x933/adb0397cbb/05_use_iconify_custom_fieldtype.png/m/1600x0/)

## Versi paling sederhana yang bisa langsung dipakai

Fungsi debounce bisa ditulis dalam belasan baris, tanpa library apa pun:

```js
function debounce(fn, delay = 300) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

Fungsi ini mengembalikan fungsi baru. Setiap kali fungsi baru itu dipanggil, timer lama dibatalkan dengan `clearTimeout`, lalu timer baru dipasang. Hanya panggilan terakhir dalam rentang jeda yang akhirnya mengeksekusi fungsi asli. Argumen dan konteks `this` diteruskan apa adanya, jadi fungsi ini bisa membungkus hampir semua handler.

Pemakaian untuk kolom pencarian terlihat seperti ini:

```js
const input = document.querySelector("#search");

async function cari(query) {
  if (!query.trim()) return;
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  tampilkanHasil(data);
}

input.addEventListener("input", debounce((event) => {
  cari(event.target.value);
}, 300));
```

Perhatikan satu detail: handler yang di-debounce menerima event, tapi event itu dipakai setelah jeda. Di React, ini bisa bermasalah pada versi lama karena event-nya didaur ulang, jadi ambil `event.target.value` lebih dulu atau pakai nilai dari state. Di DOM biasa, contoh di atas aman.

## Memilih jeda dan jebakan yang sering muncul

Angka 300 milidetik adalah titik awal yang masuk akal untuk pencarian, bukan aturan suci. Untuk input yang responsnya diharapkan terasa instan, seperti filter daftar yang datanya sudah ada di memori, 150 milidetik sudah cukup. Untuk pencarian yang memanggil API berat, 400 sampai 500 milidetik lebih sopan ke server. Terlalu pendek membuat debounce hampir tidak berguna, terlalu panjang membuat antarmuka terasa lambat karena pengguna menunggu hasil yang tak kunjung muncul.

Ada tiga jebakan yang sering membuat debounce gagal diam-diam. Yang pertama, membuat fungsi debounce baru di setiap render atau setiap event, sehingga timer-nya selalu baru dan tidak pernah membatalkan apa pun. Buat sekali, pakai berkali-kali. Yang kedua, lupa membersihkan timer saat komponen dilepas, misalnya dengan `clearTimeout` di cleanup, sehingga fungsi tetap jalan setelah pengguna pindah halaman. Yang ketiga, memakai debounce untuk aksi yang memang harus langsung terjadi, seperti tombol simpan atau kirim formulir. Menunda aksi semacam itu hanya membuat pengguna mengklik dua kali karena mengira klik pertamanya tidak masuk.

Debounce juga punya saudara dekat bernama throttle, dan keduanya sering tertukar. Throttle membatasi frekuensi, misalnya fungsi boleh jalan paling sering sekali tiap 200 milidetik, tapi tetap jalan selama pengguna beraktivitas. Debounce menunggu aktivitas berhenti. Untuk scroll dan resize, throttle biasanya lebih cocok karena kamu tetap ingin respons selama pengguna menggulir. Untuk pencarian dan validasi input, debounce yang menang.

## Kapan tidak perlu library

Banyak proyek menambahkan library utilitas hanya demi debounce, padahal fungsi di atas sudah cukup untuk mayoritas kasus. Library baru layak dipertimbangkan kalau kamu butuh opsi lanjutan seperti memanggil fungsi di awal jeda lalu menahannya, atau membatalkan panggilan yang tertunda secara eksplisit. Kalau kebutuhanmu hanya menahan request pencarian, belasan baris di atas lebih mudah dibaca, lebih mudah diuji, dan tidak menambah ukuran bundle.

Intinya, debounce adalah contoh bagus dari optimasi yang tidak perlu rumit. Satu timer, satu pembatalan, dan servermu berhenti melayani request yang hasilnya sudah tidak dibutuhkan siapa pun. Lain kali kamu melihat kolom pencarian yang terasa berat, cek dulu: apakah setiap ketikan langsung dikirim, atau sudah ditahan dengan debounce.
