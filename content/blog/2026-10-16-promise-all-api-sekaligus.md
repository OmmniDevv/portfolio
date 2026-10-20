---
title: "Promise.all: Panggil Banyak API Sekaligus Tanpa Antre"
date: 2026-10-16
excerpt: "Ambil 5 data API satu per satu butuh 5 detik. Dengan Promise.all cukup 1 detik. Pelajari cara menjalankan request paralel di JavaScript dengan benar."
tags: javascript, tutorial, api
image: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=1200"
---

Bayangkan kamu bikin halaman profil yang perlu tiga data: info user, daftar postingan, dan daftar teman. Kalau kamu pakai `await` tiga kali berurutan, tiap request nunggu yang sebelumnya selesai. Tiga request yang masing-masing 1 detik berarti total 3 detik. Padahal ketiganya tidak saling bergantung, jadi tidak ada alasan untuk mengantre.

`Promise.all` menyelesaikan masalah ini: ia menjalankan beberapa promise secara bersamaan dan menunggu semuanya selesai. Total waktu yang dibutuhkan hanya selama request paling lambat.

## Masalah: await berurutan itu lambat

```js
// Cara lambat: request berjalan satu per satu
const user = await fetch("/api/user").then(r => r.json());       // 1 detik
const posts = await fetch("/api/posts").then(r => r.json());     // 1 detik
const friends = await fetch("/api/friends").then(r => r.json()); // 1 detik
// total: ~3 detik
```

## Solusi: jalankan paralel dengan Promise.all

```js
// Cara cepat: semua request jalan bareng
const [user, posts, friends] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
  fetch("/api/friends").then(r => r.json()),
]);
// total: ~1 detik (selama request paling lambat)
```

`Promise.all` menerima array promise, lalu mengembalikan promise yang resolve dengan array hasil dalam urutan yang sama seperti input. Urutan hasil dijamin sama persis dengan urutan request, walau yang selesai duluan adalah request ketiga.

![Kode JavaScript di layar editor dengan sintaks berwarna](https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200)

## Kapan boleh paralel, kapan harus berurutan?

Aturan mainnya simpel: kalau request B butuh hasil request A, pakai await berurutan. Kalau tidak saling bergantung, pakai Promise.all.

Contoh yang harus berurutan:

```js
const user = await fetch("/api/user").then(r => r.json());
// ID user dipakai untuk request berikutnya, jadi tidak bisa paralel
const orders = await fetch(`/api/orders?userId=${user.id}`).then(r => r.json());
```

Contoh yang bagus untuk paralel: mengambil data dashboard dari beberapa endpoint independen, memuat beberapa gambar, atau menyimpan banyak record sekaligus.

## Perangkap: satu gagal, semua gagal

Ini perilaku `Promise.all` yang paling sering bikin kaget. Kalau satu promise reject, seluruh `Promise.all` langsung reject dan hasil promise lain yang sudah berhasil ikut dibuang.

```js
try {
  const results = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/tidak-ada").then(r => r.json()), // 404, reject!
  ]);
} catch (err) {
  console.error("Gagal:", err); // data user yang sudah berhasil ikut hilang
}
```

Ada tiga cara mengatasinya. Pilih yang paling cocok dengan kebutuhanmu.

**1. Promise.allSettled: semua request diselesaikan, sukses atau gagal**

```js
const results = await Promise.allSettled([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/tidak-ada").then(r => r.json()),
]);

results.forEach(r => {
  if (r.status === "fulfilled") console.log("OK:", r.value);
  else console.log("Gagal:", r.reason);
});
```

Cocok untuk kasus di mana tiap request berdiri sendiri, misalnya memuat widget dashboard yang satu per satu. Satu widget gagal, yang lain tetap tampil.

**2. Tangani error per request**

```js
const [user, posts] = await Promise.all([
  fetch("/api/user").then(r => r.json()).catch(() => null),
  fetch("/api/posts").then(r => r.json()).catch(() => []),
]);
// user mungkin null, posts mungkin [] kosong, tapi program tidak crash
```

**3. Validasi response dulu**

Jangan lupa: `fetch` tidak reject untuk status 404 atau 500. Ia hanya reject kalau network-nya sendiri bermasalah. Jadi tambahkan pengecekan `response.ok`:

```js
const data = await Promise.all([
  fetch("/api/user").then(r => {
    if (!r.ok) throw new Error("User gagal: " + r.status);
    return r.json();
  }),
]);
```

## Jangan berlebihan

Paralel itu bagus, tapi 50 request sekaligus ke server yang sama bisa bikin server kewalahan atau kena rate limit. Kalau jumlahnya besar, batasi dengan batching: bagi jadi kelompok kecil, tiap kelompok jalan paralel.

```js
const ids = [1, 2, 3, 4, 5, 6];
const batchSize = 3;

for (let i = 0; i < ids.length; i += batchSize) {
  const batch = ids.slice(i, i + batchSize);
  await Promise.all(batch.map(id => fetch(`/api/item/${id}`)));
}
// tiap iterasi: 3 request paralel, lalu lanjut batch berikutnya
```

Intinya: pahami ketergantungan antar request sebelum memilih. Independen berarti paralel dengan `Promise.all`. Bergantung berarti berurutan. Satu baris perubahan pola bisa memangkas waktu loading aplikasi dari hitungan detik jadi sepersekian detik.
