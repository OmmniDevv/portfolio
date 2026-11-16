---
title: "Debounce dan Throttle di JavaScript, Bedanya Apa?"
date: 2026-11-16
excerpt: "Debounce dan throttle sama-sama membatasi seberapa sering fungsi dipanggil, tapi caranya beda. Pelajari kapan memakai yang mana, lengkap dengan contoh kode yang bisa langsung dipakai."
tags: javascript, tutorial, web-development, coding
image: https://tsi.lv/wp-content/uploads/2020/02/Computer-Sciences-MSc.jpg
---

Ketik di kolom pencarian, lalu aplikasi mengirim request ke server di setiap huruf yang kamu ketik. Scroll halaman, lalu fungsi hitung posisi jalan ratusan kali per detik. Dua masalah ini punya akar yang sama: fungsi dipanggil terlalu sering. Debounce dan throttle adalah dua cara mengatasinya, dan keduanya sering tertukar.

## Debounce: tunggu sampai berhenti

Debounce menunda eksekusi fungsi sampai tidak ada lagi pemanggilan baru selama waktu tertentu. Bayangkan lift yang pintunya baru menutup setelah tidak ada lagi orang yang masuk selama tiga detik. Selama masih ada yang masuk, hitungan mundur diulang dari awal.

Pola ini cocok untuk kolom pencarian. Pengguna mengetik "jakarta", dan kamu tidak mau mengirim request untuk "j", "ja", "jak", dan seterusnya. Kamu mau mengirim satu request setelah pengguna berhenti mengetik.

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const cari = debounce((teks) => {
  console.log("Mencari:", teks);
}, 300);

cari("j");
cari("ja");
cari("jak");
// Hanya "jak" yang akhirnya dicari, 300 ms setelah panggilan terakhir
```

Setiap kali `cari` dipanggil, timer lama dibatalkan dan timer baru dibuat. Fungsi aslinya baru jalan setelah tidak ada panggilan baru selama 300 milidetik. Kalau pengguna terus mengetik tanpa jeda, fungsi tidak pernah jalan. Itu memang sifat debounce, dan di kasus pencarian itu justru yang diinginkan.

Satu hal yang sering terlewat: fungsi hasil debounce harus dibuat sekali dan dipakai ulang. Kalau kamu membuat debounce baru di setiap render komponen React, timernya ikut terbuang dan debounce tidak bekerja. Simpan hasil debounce di luar render atau bungkus dengan `useCallback` atau `useRef`.

## Throttle: batasi secepat apa pun pemanggilnya

Throttle bekerja dengan cara lain. Fungsi boleh jalan, tapi paling sering sekali dalam interval tertentu. Bayangkan keran air yang sudah disetel: berapa pun kerasnya kamu memutar, aliran airnya tetap segitu.

Pola ini cocok untuk event scroll dan resize. Kamu tetap butuh tahu posisi scroll secara berkala, tapi tidak perlu tahu setiap pikselnya. Sekali tiap 100 atau 200 milidetik sudah cukup untuk memperbarui tampilan.

```js
function throttle(fn, limit) {
  let sedangMenunggu = false;
  return function (...args) {
    if (sedangMenunggu) return;
    fn.apply(this, args);
    sedangMenunggu = true;
    setTimeout(() => {
      sedangMenunggu = false;
    }, limit);
  };
}

const saatScroll = throttle(() => {
  console.log("Posisi scroll:", window.scrollY);
}, 200);

window.addEventListener("scroll", saatScroll);
```

Versi ini menjalankan fungsi langsung di panggilan pertama, lalu mengabaikan panggilan berikutnya sampai interval habis. Ada juga varian yang menjalankan panggilan terakhir setelah interval selesai, tapi untuk kebanyakan kasus, versi sederhana ini sudah cukup.

![Kode program di layar komputer](https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg)

## Kapan pakai yang mana

Aturannya praktis. Kalau kamu peduli dengan nilai terakhir dan tidak masalah menunggu, pakai debounce. Pencarian, validasi form saat mengetik, dan autosave adalah contoh klasiknya. Autosave yang memakai debounce akan menyimpan setelah pengguna berhenti mengetik, bukan di tengah kalimat.

Kalau kamu peduli dengan keteraturan dan tidak boleh ada jeda yang terlalu lama, pakai throttle. Scroll, resize, dan gerakan mouse masuk kategori ini. Animasi yang mengikuti kursor, misalnya, harus tetap bergerak walaupun kursornya tidak berhenti.

Ada juga kasus di tengah-tengah. Tombol "kirim" yang bisa diklik dua kali secara tidak sengaja bisa diamankan dengan throttle yang sangat pendek, atau dengan menonaktifkan tombolnya setelah klik pertama. Debounce tidak cocok di sini karena klik kedua yang datang cepat justru akan menunda eksekusi, dan pengguna mengira tombolnya rusak.

## Contoh nyata: pencarian dengan fetch

Menggabungkan debounce dengan `fetch` adalah pola yang akan kamu temui di hampir semua aplikasi. Perhatikan juga pembatalan request lama, supaya hasil pencarian yang datang terlambat tidak menimpa hasil yang lebih baru.

```js
const input = document.querySelector("#cari");
let controller;

const cariProduk = debounce(async (teks) => {
  if (controller) controller.abort();
  controller = new AbortController();

  try {
    const res = await fetch(`/api/produk?q=${teks}`, {
      signal: controller.signal,
    });
    const data = await res.json();
    tampilkanHasil(data);
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  }
}, 300);

input.addEventListener("input", (e) => cariProduk(e.target.value));
```

Kode ini menyelesaikan dua masalah sekaligus. Debounce mengurangi jumlah request, dan AbortController memastikan hanya hasil pencarian terbaru yang ditampilkan. Tanpa pembatalan, request untuk "jak" yang lambat bisa datang setelah request "jakarta" dan menimpa hasil yang benar.

## Kesalahan yang sering terjadi

Kesalahan paling umum adalah memakai debounce untuk event yang butuh respons berkala, seperti scroll. Hasilnya, fungsi baru jalan setelah pengguna berhenti scroll, dan tampilan terasa tertinggal. Kesalahan sebaliknya adalah memakai throttle untuk pencarian. Request tetap terkirim di tengah pengguna mengetik, dan server menerima query yang belum selesai.

Kesalahan lain adalah memilih delay yang terlalu besar. Debounce 1000 milidetik untuk kolom pencarian terasa lambat. Pengguna mengetik, menunggu, dan bertanya-tanya kenapa belum ada hasil. Nilai 200 sampai 300 milidetik biasanya terasa pas. Untuk throttle, 100 sampai 200 milidetik cukup untuk scroll dan resize tanpa membuat tampilan patah-patah.

Debounce dan throttle bukan teknik yang sulit, tapi memilih yang salah bisa membuat aplikasi terasa lambat atau boros request. Kenali dulu sifat event yang kamu hadapi, lalu pilih yang sesuai. Sisanya tinggal menulis dua fungsi kecil di atas dan memakainya di tempat yang tepat.
