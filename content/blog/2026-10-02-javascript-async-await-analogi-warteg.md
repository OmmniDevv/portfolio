---
title: Async/Await JavaScript Dijelaskan Pakai Analogi Warteg
date: 2026-10-02
excerpt: Bingung dengan async/await? Bayangkan pesan makan di warteg: synchronous itu antre kaku, asynchronous itu pesan lalu duduk manis. Plus contoh kode nyata.
tags: javascript, tutorial, konsep
image: https://web.bynaric.in/wp-content/uploads/2023/01/computer-program-coding-screen-1-2.jpg
---

Async/await adalah salah satu konsep JavaScript yang paling bikin dahi berkerut saat pertama belajar. Padahal idenya sederhana kalau pakai analogi yang tepat. Mari ke warteg.

## Warteg synchronous

Bayangkan warteg dengan aturan aneh: satu pelanggan dilayani penuh dari pesan sampai makan selesai, baru pelanggan berikutnya boleh memesan. Kamu pesan ayam goreng, lalu semua orang di belakangmu menunggu sampai kamu selesai makan. Gila, kan? Itulah kode synchronous: tiap baris dieksekusi berurutan, dan operasi lambat (misalnya ambil data dari internet) memblokir semuanya.

```js
const data = ambilDataDariServer(); // program BERHENTI di sini sampai selesai
console.log(data);
console.log("baris ini nunggu lama");
```

## Warteg asynchronous

Warteg normal lebih masuk akal: kamu pesan, dapat nomor antrean, lalu duduk. Pelayan memanggil nomormu kalau makanan siap. Sementara menunggu, kamu bisa main HP. Itulah asynchronous: program tidak berhenti menunggu, melainkan melanjutkan kerjaan lain dan kembali lagi saat hasilnya siap.

Di JavaScript versi lama, ini ditulis dengan callback, yang cepat berubah jadi "callback hell":

```js
ambilData((data) => {
  olahData(data, (hasil) => {
    simpanHasil(hasil, () => {
      console.log("selesai... akhirnya");
    });
  });
});
```

Makin dalam, makin pusing. Lalu datang Promise, yang merapikan jadi rantai `.then()`. Dan akhirnya async/await, yang membuat kode asynchronous terlihat seperti kode biasa:

```js
async function sarapan() {
  const data = await ambilDataDariServer(); // tunggu di sini, tapi tidak memblokir
  console.log(data);
  console.log("baris ini jalan setelah data siap");
}
```

Kata kunci `await` itu seperti nomor antrean warteg: fungsi berhenti di titik itu sampai pesanan (Promise) selesai, tapi program lain tetap bisa jalan. Dan `async` di depan fungsi adalah syarat untuk boleh pakai `await` di dalamnya.

![Ilustrasi programmer bekerja dengan laptop](https://rehack.com/wp-content/uploads/2026/04/franck-v-JjGXjESMxOY-unsplash.jpg)

## Aturan main yang sering dilupakan

Pertama, `await` hanya bisa dipakai di dalam fungsi `async` (atau di top-level module modern). Kedua, fungsi `async` selalu mengembalikan Promise, jadi hasilnya pun harus di-await atau di-.then() oleh pemanggilnya. Ketiga, jangan lupa error handling:

```js
async function sarapanAman() {
  try {
    const data = await ambilDataDariServer();
    console.log(data);
  } catch (err) {
    console.error("Warungnya tutup:", err.message);
  }
}
```

Tanpa try/catch, error dari operasi async bisa hilang diam-diam dan bikin debugging jadi mimpi buruk.

## Kapan pakai apa?

## Operasi paralel dengan Promise.all

Kadang kamu perlu memesan beberapa hal sekaligus dan menunggu semuanya siap, seperti memesan makanan dan minuman dalam satu kunjungan. Menunggu satu per satu itu boros:

```js
// Lambat: total waktu = waktu1 + waktu2
const user = await ambilUser();
const produk = await ambilProduk();
```

Kalau kedua operasi tidak saling bergantung, jalankan paralel dengan `Promise.all`:

```js
// Cepat: total waktu = yang paling lama saja
const [user, produk] = await Promise.all([
  ambilUser(),
  ambilProduk(),
]);
```

Analoginya: kamu dan temanmu antre di kasir berbeda dalam satu warteg, lalu bertemu lagi di meja. Total waktu menunggu jadi jauh lebih singkat.

Hati-hati satu hal: kalau salah satu Promise gagal, `Promise.all` langsung melempar error dan hasil yang lain ikut hangus. Untuk kasus di mana tiap operasi boleh gagal sendiri-sendiri, pakai `Promise.allSettled` yang menunggu semuanya selesai apa pun hasilnya.

Gunakan async/await untuk hampir semua kode asynchronous modern: fetch API, baca file, query database. Kode jadi linear dan mudah dibaca, seperti resep masak langkah demi langkah. Callback masih ada di library lama, dan Promise mentah berguna kalau kamu perlu pola khusus seperti menjalankan banyak operasi paralel dengan `Promise.all()`.

Intinya: asynchronous bukan sihir, cuma cara program mengatur antrean kerjaan. Sekali analogi warteg ini nempel di kepala, dokumentasi async apa pun akan terasa jauh lebih ramah.
