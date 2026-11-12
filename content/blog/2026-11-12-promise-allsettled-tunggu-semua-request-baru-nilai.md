---
title: Promise.allSettled, Tunggu Semua Request Baru Nilai
date: 2026-11-12
excerpt: Promise.all langsung gagal saat satu request error. Promise.allSettled menunggu semua request selesai dulu, lalu memberi laporan lengkap untuk masing-masing.
tags: javascript, tutorial, promise, async, programming
image: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80
---

Bayangkan kamu memanggil tiga API sekaligus: profil user, daftar pesanan, dan notifikasi. Dua berhasil, satu gagal karena servernya sedang bermasalah. Dengan `Promise.all`, seluruh panggilan dianggap gagal dan dua hasil yang sudah berhasil ikut dibuang. Padahal halamanmu sebenarnya bisa tampil dengan data yang ada, sambil memberi tahu user bagian mana yang belum termuat.

Di sinilah `Promise.allSettled` masuk. Ia menunggu semua promise selesai, entah berhasil atau gagal, lalu mengembalikan laporan lengkap untuk masing-masing.

## Perbedaan yang paling terasa

`Promise.all` itu seperti ujian yang gugur di soal pertama yang salah. Satu promise reject, seluruh hasil hilang, dan kamu hanya tahu error dari yang gagal duluan. `Promise.allSettled` sebaliknya, ia menunggu sampai semua selesai, lalu memberi daftar hasil satu per satu.

Hasilnya berupa array objek. Setiap objek punya properti `status` yang bernilai `fulfilled` atau `rejected`. Kalau berhasil, ada properti `value` berisi hasilnya. Kalau gagal, ada properti `reason` berisi errornya. Urutannya sama persis dengan urutan promise yang kamu masukkan, jadi tidak perlu menebak hasil mana milik request yang mana.

```js
const hasil = await Promise.allSettled([
  fetch("/api/profil").then((r) => r.json()),
  fetch("/api/pesanan").then((r) => r.json()),
  fetch("/api/notifikasi").then((r) => r.json()),
]);

hasil.forEach((item, i) => {
  if (item.status === "fulfilled") {
    console.log(`Request ${i} berhasil:`, item.value);
  } else {
    console.log(`Request ${i} gagal:`, item.reason);
  }
});
```

Kode di atas tidak pernah melempar error ke luar, walau semua request gagal. `allSettled` sendiri selalu resolve, kecuali kamu memberi input yang bukan iterable. Itu sifat yang disengaja, karena tugasnya melaporkan, bukan menghakimi.

## Contoh nyata: dashboard yang tetap tampil

Kasus paling umum ada di halaman dashboard. Beberapa widget mengambil data dari sumber berbeda. Kalau satu sumber mati, dashboard yang baik tetap menampilkan widget lain dan menandai widget yang bermasalah dengan pesan yang jelas.

```js
async function muatDashboard() {
  const [profil, pesanan, notifikasi] = await Promise.allSettled([
    ambilProfil(),
    ambilPesanan(),
    ambilNotifikasi(),
  ]);

  if (profil.status === "fulfilled") {
    tampilkanProfil(profil.value);
  } else {
    tampilkanError("profil", profil.reason);
  }

  if (pesanan.status === "fulfilled") {
    tampilkanPesanan(pesanan.value);
  } else {
    tampilkanError("pesanan", pesanan.reason);
  }

  if (notifikasi.status === "fulfilled") {
    tampilkanNotifikasi(notifikasi.value);
  }
}
```

Pola ini juga berguna saat mengunggah banyak file sekaligus. User perlu tahu file mana yang berhasil naik dan mana yang perlu diunggah ulang, bukan sekadar pesan "upload gagal" yang tidak menjelaskan apa-apa.

![Kode JavaScript di layar laptop](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80)

## Menangani error dengan detail yang cukup

Satu hal yang sering dilupakan: properti `reason` berisi error asli dari promise yang gagal, lengkap dengan pesannya. Jangan dibuang begitu saja. Simpan atau tampilkan ringkasannya, karena pesan itulah yang membedakan "server notifikasi mati" dengan "token kedaluwarsa". Dua penyebab itu butuh penanganan yang berbeda, dan kamu hanya bisa membedakannya kalau pesannya sampai ke tanganmu.

Untuk kasus upload file, kamu bisa memakai `reason` untuk memberi tombol "Coba lagi" hanya pada file yang gagal, sementara file yang berhasil langsung diberi tanda centang. User tidak perlu mengunggah ulang semuanya dari awal, dan server tidak menerima duplikat yang tidak perlu.

Ada satu jebakan kecil yang perlu diingat. Karena `allSettled` tidak pernah reject, jangan lupa memeriksa status tiap hasil. Kode yang langsung membaca `.value` tanpa mengecek `status` akan mendapat `undefined` untuk item yang gagal, dan bug seperti ini diam-diam lolos karena tidak ada error yang terlempar. Biasakan selalu memeriksa `status` sebelum menyentuh `value` atau `reason`.

## Kapan tetap pakai Promise.all

`allSettled` bukan pengganti `all` untuk semua kasus. Kalau request-request itu saling bergantung, misalnya kamu butuh token dulu sebelum memanggil API berikutnya, pakai `await` berurutan saja. Kalau satu kegagalan memang harus membatalkan semuanya, misalnya transaksi yang harus utuh atau tidak sama sekali, `Promise.all` tetap pilihan yang benar karena ia langsung berhenti di kegagalan pertama.

Aturan praktisnya sederhana. Kalau hasil sebagian masih berguna, pakai `allSettled`. Kalau hasil sebagian tidak ada gunanya tanpa sisanya, pakai `all`. Banyak kode yang salah pilih di sini, lalu menambal dengan try catch berlapis yang sebenarnya tidak diperlukan.

## Menghitung hasil dengan rapi

Setelah mendapat array hasil, kamu bisa memisahkan yang berhasil dan yang gagal dengan filter biasa. Tidak perlu loop manual yang panjang.

```js
const hasil = await Promise.allSettled(janjiJanji);

const berhasil = hasil
  .filter((h) => h.status === "fulfilled")
  .map((h) => h.value);

const gagal = hasil
  .filter((h) => h.status === "rejected")
  .map((h) => h.reason);

console.log(`${berhasil.length} berhasil, ${gagal.length} gagal`);
```

Dukungan browser sudah luas. `Promise.allSettled` tersedia di semua browser modern sejak 2020 dan di Node.js 12.9 ke atas, jadi tidak perlu polyfill untuk proyek baru. Kalau masih mendukung browser yang sangat lama, cek dulu tabel kompatibilitas sebelum memakainya.

Intinya, `allSettled` mengubah cara pandang dari "satu gagal, semua gagal" menjadi "laporkan semua, putuskan setelah tahu lengkap". Untuk halaman yang mengambil data dari banyak sumber, cara pandang kedua jauh lebih dekat dengan yang sebenarnya dibutuhkan user.
