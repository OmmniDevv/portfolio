---
title: "Filter, Map, dan Reduce: Olah Array Tanpa Loop Manual"
date: 2026-11-07
excerpt: "Filter, map, dan reduce adalah tiga method array JavaScript yang paling sering dipakai. Artikel ini menjelaskan cara kerjanya dengan contoh kode nyata."
tags: javascript, tutorial, coding, web
image: https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg
---

Array di JavaScript hampir selalu butuh diolah: disaring, diubah bentuknya, atau diringkas jadi satu nilai. Cara lama memakai for dan push ke array baru tetap jalan, tapi tiga method bawaan, filter, map, dan reduce, biasanya membuat kode lebih pendek dan lebih mudah dibaca. Ketiganya tidak mengubah array asli. Mereka mengembalikan array atau nilai baru, dan itu membuat kode lebih aman dari efek samping yang tidak disengaja.

![Kode JavaScript di layar laptop](https://blogger.googleusercontent.com/img/a/AVvXsEimfOvtDbY65AmHcdvCCTFWpaq5JTkcbBna6okqSd2kBe_bQockYRXqSdDVGFitAobQjW2FP-B_LhojxE5OCbkCMP8gdqIkMIpWpj4KSrEM-e0rQFWHLaYe6DtPQbeHRWuWAVBUa9y2dhsuqta-zSIVSc1zlljX--ShFgK5RJ8HFPQqnZJUKTF5oR2l=s750)

## Filter: ambil yang lolos syarat

Filter menerima satu fungsi penguji dan mengembalikan array baru yang hanya berisi item yang lolos. Fungsi itu dipanggil sekali untuk tiap item, dan item masuk ke hasil kalau fungsinya mengembalikan true.

```js
const harga = [12000, 45000, 8000, 99000, 25000];

const mahal = harga.filter((h) => h > 20000);
// [45000, 99000, 25000]

const murah = harga.filter((h) => h <= 20000);
// [12000, 8000]
```

Pola ini enak dipakai untuk daftar produk, daftar tugas yang belum selesai, atau komentar yang perlu dimoderasi. Syaratnya ditulis sekali, di dalam fungsi kecil, dan array asli tetap utuh.

## Map: ubah tiap item jadi bentuk baru

Map mengubah setiap item dan mengembalikan array baru dengan panjang yang sama. Jumlah item tidak berubah, isinya yang berubah. Ini cocok untuk memformat data sebelum ditampilkan.

```js
const produk = [
  { nama: "Kopi Gula Aren", harga: 18000 },
  { nama: "Es Teh Melati", harga: 8000 },
];

const label = produk.map((p) => `${p.nama} - Rp${p.harga.toLocaleString("id-ID")}`);
// ["Kopi Gula Aren - Rp18.000", "Es Teh Melati - Rp8.000"]
```

Satu kesalahan yang sering terjadi: memakai map hanya untuk efek samping, misalnya console.log di dalam callback tanpa memakai hasil kembaliannya. Kalau hasilnya tidak dipakai, forEach lebih jujur. Map itu untuk transformasi, bukan untuk sekadar jalan-jalan.

## Reduce: rangkum banyak nilai jadi satu

Reduce paling fleksibel di antara ketiganya, dan paling sering bikin bingung di awal. Ia berjalan melewati semua item sambil membawa satu nilai akumulator, lalu mengembalikan nilai akhir itu. Nilai akhirnya bisa berupa angka, string, objek, atau array.

```js
const keranjang = [
  { nama: "Kopi", harga: 18000, jumlah: 2 },
  { nama: "Roti", harga: 12000, jumlah: 1 },
];

const total = keranjang.reduce((acc, item) => {
  return acc + item.harga * item.jumlah;
}, 0);
// 48000
```

Angka 0 di ujung itu nilai awal akumulator. Tanpa nilai awal, reduce memakai item pertama sebagai akumulator, dan itu rawan error kalau array-nya kosong. Biasakan selalu menulis nilai awal, walau array-nya kelihatan tidak mungkin kosong.

Reduce juga berguna untuk mengelompokkan data. Contohnya, menghitung berapa tugas per status:

```js
const tugas = [
  { judul: "Desain", status: "selesai" },
  { judul: "Coding", status: "jalan" },
  { judul: "Testing", status: "jalan" },
];

const hitung = tugas.reduce((acc, t) => {
  acc[t.status] = (acc[t.status] || 0) + 1;
  return acc;
}, {});
// { selesai: 1, jalan: 2 }
```

## Rangkai ketiganya dalam satu alur

Kekuatan sebenarnya muncul saat ketiganya dirangkai. Tiap langkah menghasilkan array baru, jadi langkah berikutnya tinggal melanjutkan.

```js
const transaksi = [
  { item: "Kopi", harga: 18000, lunas: true },
  { item: "Teh", harga: 8000, lunas: false },
  { item: "Roti", harga: 12000, lunas: true },
];

const pemasukan = transaksi
  .filter((t) => t.lunas)
  .map((t) => t.harga)
  .reduce((acc, h) => acc + h, 0);
// 30000
```

Baca dari atas ke bawah: saring yang lunas, ambil harganya, jumlahkan. Tidak ada variabel sementara, tidak ada array kosong yang diisi manual. Kalau satu langkah salah, kamu bisa menghapusnya dan melihat hasil langkah sebelumnya, karena tiap tahap berdiri sendiri.

## Kapan tetap pakai loop biasa

Tiga method ini bukan pengganti loop untuk semua situasi. Kalau kamu perlu berhenti di tengah jalan, misalnya berhenti mencari begitu ketemu satu item, for dengan break lebih tepat. Kalau kodenya butuh await di tiap iterasi secara berurutan, for...of lebih gampang dibaca daripada trik reduce dengan promise.

Aturannya sederhana: kalau tujuannya menyaring, mengubah, atau meringkas seluruh isi array, pakai filter, map, atau reduce. Kalau alurnya butuh keluar lebih awal atau langkah yang rumit, loop biasa tidak salah.

Mulai dari satu method dulu. Ganti satu loop filter manual di kode kamu hari ini, jalankan test-nya, dan rasakan bedanya. Setelah nyaman, rangkai ketiganya seperti contoh di atas.
