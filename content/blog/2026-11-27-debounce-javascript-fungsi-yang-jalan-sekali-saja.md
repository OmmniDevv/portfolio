---
title: Debounce JavaScript, Fungsi yang Jalan Sekali Saja
date: 2026-11-27
excerpt: Debounce menunda eksekusi fungsi sampai pengguna berhenti mengetik atau me-resize. Pelajari cara kerjanya, contoh kodenya, dan kapan memakainya.
tags: javascript, tutorial, frontend, webdev, debounce
image: https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg
---

Ketik di kolom pencarian, dan aplikasi langsung memanggil API di setiap huruf yang kamu ketik. Sepuluh huruf berarti sepuluh request. Server kewalahan, hasil pencarian berkedip-kedip, dan pengalaman pengguna jadi berantakan. Masalah ini punya solusi yang sederhana: debounce.

Debounce adalah teknik menunda eksekusi fungsi sampai ada jeda. Fungsi baru benar-benar jalan setelah pengguna berhenti melakukan sesuatu selama waktu tertentu. Kalau pengguna terus mengetik, timer di-reset terus. Baru saat dia berhenti, fungsi dieksekusi sekali saja.

## Cara kerja debounce, tanpa jargon

Bayangkan lift yang pintunya menutup lima detik setelah orang terakhir masuk. Kalau ada orang baru masuk sebelum lima detik habis, hitungan dimulai lagi dari nol. Lift baru berangkat setelah lima detik penuh tanpa ada yang masuk. Itu debounce.

Di JavaScript, idenya sama. Setiap kali event terjadi, kita membatalkan timer lama dan memasang timer baru. Fungsi aslinya hanya dipanggil saat timer berhasil selesai tanpa gangguan.

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

Fungsi `debounce` di atas menerima dua hal: fungsi yang mau ditunda dan jeda dalam milidetik. Hasilnya adalah fungsi baru yang bisa dipakai seperti biasa. Setiap kali fungsi baru ini dipanggil, timer lama dibatalkan lewat `clearTimeout`, lalu timer baru dipasang. Kalau tidak ada panggilan lagi selama `delay`, fungsi asli akhirnya jalan.

## Contoh nyata: kolom pencarian

Ini kasus paling umum. Tanpa debounce, setiap ketikan memicu request ke server.

```js
const searchInput = document.querySelector("#search");

async function cariProduk(query) {
  const res = await fetch(`/api/produk?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  tampilkanHasil(data);
}

const cariDebounced = debounce(cariProduk, 300);

searchInput.addEventListener("input", (event) => {
  cariDebounced(event.target.value);
});
```

Dengan jeda 300 milidetik, request baru dikirim setelah pengguna berhenti mengetik selama 0,3 detik. Mengetik "sepatu lari" yang panjangnya 11 karakter tidak lagi menghasilkan 11 request. Hasilnya biasanya satu atau dua request saja. Server berterima kasih, dan hasil pencarian tidak lagi berkedip karena respons yang datang belakangan menimpa respons yang lebih baru.

![Laptop menampilkan kode JavaScript di editor](https://www.internetacademy.jp/it/images/what-is-javascript.jpg)

## Kapan debounce cocok dipakai

Kolom pencarian adalah contoh klasik, tapi bukan satu-satunya. Event `resize` pada window bisa terpanggil puluhan kali per detik saat pengguna menyeret tepi jendela. Kalau handler-nya menghitung ulang layout yang berat, debounce menjaga halaman tetap responsif.

Form validasi juga sering memakainya. Daripada menampilkan pesan error di setiap ketikan, validasi dijalankan setelah pengguna berhenti mengetik sejenak. Pesan error muncul di saat yang masuk akal, bukan saat pengguna masih di tengah mengetik alamat emailnya.

Autosave adalah contoh lain. Editor yang menyimpan otomatis tidak perlu menyimpan di setiap tombol yang ditekan. Simpan setelah pengguna berhenti mengetik selama satu atau dua detik, dan kamu menghemat banyak request yang tidak perlu.

## Debounce dan throttle itu beda

Dua teknik ini sering tertukar. Debounce menunggu sampai aktivitas berhenti. Throttle membatasi seberapa sering fungsi boleh jalan, tapi tetap menjalankannya secara berkala selama aktivitas berlangsung.

Scroll adalah contoh yang bagus untuk throttle. Saat pengguna menggulir halaman, kamu mungkin mau memperbarui posisi elemen setiap 100 milidetik, selama dia terus menggulir. Debounce di sini malah buruk, karena fungsi baru jalan setelah pengguna berhenti menggulir, dan elemen tidak akan bergerak selama itu.

Aturan praktisnya: kalau kamu butuh hasil akhir setelah pengguna selesai, pakai debounce. Kalau kamu butuh pembaruan berkala selama pengguna masih aktif, pakai throttle.

## Jeda yang pas

Tidak ada angka ajaib untuk delay. 300 milidetik adalah titik awal yang umum untuk kolom pencarian, cukup pendek sehingga terasa responsif, cukup panjang untuk menggabungkan ketikan yang cepat. Untuk autosave, satu sampai dua detik lebih masuk akal, karena menyimpan terlalu sering tetap boros.

Satu hal yang perlu diingat: debounce tidak menghapus kebutuhan akan loading state. Pengguna tetap perlu tahu bahwa pencarian sedang berjalan. Tampilkan indikator kecil saat request dikirim, dan hapus saat hasilnya datang. Debounce membuat request lebih sedikit, bukan membuat jaringan jadi instan.

## Penutup

Debounce adalah salah satu utilitas kecil yang paling sering dipakai di frontend, dan implementasinya cuma belasan baris. Kuncinya ada di `setTimeout` dan `clearTimeout` yang bekerja berpasangan. Sekali kamu paham polanya, kamu akan menemukannya di mana-mana: pencarian, resize, validasi, autosave. Simpan fungsi `debounce` di atas ke dalam utilitas proyekmu, dan pakai setiap kali sebuah event terlalu sering memanggil fungsi yang mahal.
