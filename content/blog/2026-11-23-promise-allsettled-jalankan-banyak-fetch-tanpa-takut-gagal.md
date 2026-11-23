---
title: Promise.allSettled, Jalankan Banyak Fetch Tanpa Takut Gagal
date: 2026-11-23
excerpt: Satu fetch gagal tidak seharusnya menggagalkan semuanya. Promise.allSettled menunggu semua promise selesai dan melaporkan mana yang berhasil dan gagal.
tags: javascript, tutorial, promise, async
image: https://i.pinimg.com/originals/9f/77/2d/9f772df8eb4ed97ef296626cee87af9b.jpg
---

Ada satu jebakan klasik saat memakai `Promise.all`. Kamu kirim lima request sekaligus, empat berhasil, satu gagal. Hasilnya? `Promise.all` menolak semuanya. Empat data yang sudah berhasil didapat ikut hilang, dan kamu harus menulis ulang logika untuk mengambilnya lagi. Kalau skenarionya memang butuh semua berhasil atau tidak sama sekali, perilaku itu benar. Tapi sering kali kita justru ingin kebalikannya, ambil sebanyak mungkin yang berhasil, lalu tangani yang gagal belakangan.

Di sinilah `Promise.allSettled` masuk. Method ini menunggu semua promise selesai, entah berhasil atau gagal, lalu mengembalikan laporan lengkap untuk masing-masing.

## Perbedaan dengan Promise.all

Contoh paling cepat untuk merasakan bedanya adalah simulasi tiga request, di mana satu di antaranya gagal.

```js
const urls = [
  "https://api.example.com/users/1",
  "https://api.example.com/users/2",
  "https://api.example.com/users/999", // anggap ini 404
];

const results = await Promise.allSettled(
  urls.map((url) => fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }))
);

console.log(results);
```

Hasilnya berupa array dengan tiga objek, satu untuk tiap promise:

```js
[
  { status: "fulfilled", value: { id: 1, name: "Andi" } },
  { status: "fulfilled", value: { id: 2, name: "Budi" } },
  { status: "rejected", reason: Error: HTTP 404 }
]
```

Tidak ada yang hilang. Dua data yang berhasil tetap bisa dipakai, dan yang gagal tercatat dengan alasannya. Bandingkan dengan `Promise.all` pada kode yang sama, hasilnya cuma satu error 404 dan dua data yang sudah berhasil ikut lenyap.

![Contoh kode Promise dan async await di editor](https://pbs.twimg.com/media/F8p62QdbQAAxDr2.jpg)

## Pola praktis: pisahkan yang berhasil dan yang gagal

Hasil `allSettled` paling enak dipakai dengan cara memisahkan array hasilnya berdasarkan `status`. Pola ini sering muncul saat mengambil banyak data sekaligus, misalnya memuat daftar produk dari beberapa toko atau mengambil profil dari beberapa pengguna.

```js
async function fetchBanyak(urls) {
  const settled = await Promise.allSettled(
    urls.map((url) =>
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} di ${url}`);
        return res.json();
      })
    )
  );

  const berhasil = settled
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);

  const gagal = settled
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason.message);

  return { berhasil, gagal };
}

const { berhasil, gagal } = await fetchBanyak([
  "https://api.example.com/produk/1",
  "https://api.example.com/produk/2",
  "https://api.example.com/produk/3",
]);

console.log(`Berhasil: ${berhasil.length}, gagal: ${gagal.length}`);
if (gagal.length > 0) {
  console.warn("Yang gagal:", gagal);
}
```

Perhatikan satu detail penting di contoh ini. `fetch` sendiri hanya menolak promise kalau ada masalah jaringan, seperti tidak ada internet. Respons 404 atau 500 tetap dianggap berhasil oleh `fetch`, jadi perlu dicek manual lewat `res.ok` lalu dilempar sebagai error. Tanpa pengecekan itu, `allSettled` akan melaporkan semua sebagai `fulfilled` walau server menjawab error.

## Kapan pakai all, kapan pakai allSettled

Aturan sederhananya begini. Kalau semua request harus berhasil agar hasil akhirnya masuk akal, pakai `Promise.all`. Contohnya mengambil profil pengguna dan token sesi sebelum menampilkan dashboard, kalau salah satu gagal, halaman memang tidak bisa lanjut.

Sebaliknya, kalau tiap request berdiri sendiri dan sebagian hasil tetap berguna, pakai `Promise.allSettled`. Contohnya memuat beberapa widget di dashboard, mengirim notifikasi ke banyak alamat, atau mengambil data dari beberapa sumber yang salah satunya mungkin sedang mati. Kegagalan satu bagian tidak boleh meruntuhkan sisanya.

Ada juga `Promise.any` dan `Promise.race` untuk kebutuhan lain, tapi keduanya tidak dibahas di sini karena menyelesaikan masalah yang berbeda.

## Catatan kompatibilitas

`Promise.allSettled` adalah bagian dari ES2020 dan sudah didukung semua browser modern serta Node.js versi 12.9 ke atas. Jadi untuk proyek baru, tidak ada alasan untuk menghindarinya. Kalau proyekmu masih harus jalan di lingkungan yang sangat lama, sebuah polyfill kecil sudah cukup, karena perilakunya sederhana, tunggu semua promise selesai lalu bungkus hasilnya.

Satu hal terakhir, `allSettled` tidak membuat request jadi lebih cepat. Semua promise tetap jalan bersamaan seperti pada `Promise.all`, jadi total waktunya ditentukan oleh request yang paling lambat. Bedanya hanya pada cara hasil akhirnya dilaporkan. Dan untuk banyak kasus nyata, laporan yang lengkap itu jauh lebih berguna daripada satu error yang menelan semuanya.
