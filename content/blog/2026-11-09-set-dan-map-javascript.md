---
title: "Set dan Map JavaScript: Struktur Data yang Sering Dilupa"
date: 2026-11-09
excerpt: "Array dan object memang serbaguna, tapi Set dan Map sering jadi jawaban yang lebih bersih. Ini cara kerja keduanya dengan contoh nyata yang bisa dipakai."
tags: javascript, tutorial, coding, web
image: https://aylgorith.com/media/2026/02/charlesdeluvio-pjAH2Ax4uWk-unsplash-1920x1280.jpg
---

Kebanyakan kode JavaScript hanya memakai dua struktur data: array dan object. Keduanya memang cukup untuk banyak hal, sampai kamu ketemu kasus yang bikin kode jadi berantakan. Daftar yang tidak boleh duplikat tapi kamu cek manual dengan `includes` di setiap tambah. Object yang dipakai sebagai kamus tapi kuncinya selalu berubah jadi string. Di titik itu, JavaScript sebenarnya sudah menyediakan jawaban bawaan: `Set` dan `Map`.

![Kode JavaScript di layar laptop](https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1663324239089%2FcVPG2V1ef.jpg%3Fw%3D800%26h%3D420%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1080&q=75)

## Set: array yang menolak duplikat

`Set` adalah koleksi nilai unik. Kamu memasukkan nilai apa saja, dan `Set` memastikan tidak ada yang kembar. Tidak perlu cek manual, tidak perlu filter di akhir.

```js
const tag = new Set();

tag.add("javascript");
tag.add("react");
tag.add("javascript"); // ditolak diam-diam, tidak masuk dua kali

console.log(tag.size); // 2
console.log(tag.has("react")); // true
```

Perhatikan bahwa `add` yang duplikat tidak melempar error, nilainya cuma tidak ditambahkan. Ini perilaku yang disengaja dan justru yang bikin `Set` enak dipakai.

Kasus paling umum adalah membersihkan array dari duplikat. Dulu orang menulis `filter` dengan `indexOf`, sekarang satu baris cukup.

```js
const nilai = [8, 9, 8, 7, 9, 10, 7];
const unik = [...new Set(nilai)];
console.log(unik); // [8, 9, 7, 10]
```

Urutan tetap terjaga sesuai kemunculan pertama, jadi hasilnya bisa diprediksi. `Set` juga punya `delete` untuk menghapus satu nilai dan `clear` untuk mengosongkan semuanya.

Satu hal yang sering membingungkan pemula: `Set` membandingkan nilai dengan aturan SameValueZero, mirip `===` tapi dengan satu pengecualian, `NaN` dianggap sama dengan `NaN`. Jadi `new Set([NaN, NaN]).size` hasilnya 1, padahal `NaN === NaN` itu `false`. Untuk object, perbandingan tetap berdasarkan referensi, bukan isi. Dua object dengan isi sama tapi referensi beda tetap dihitung sebagai dua nilai berbeda.

## Map: object yang kuncinya bebas

`Map` mirip object, tapi dengan kebebasan yang object tidak punya. Kunci di `Map` boleh tipe apa saja: string, angka, boolean, bahkan object atau function. Di object biasa, semua kunci dipaksa jadi string, dan itu sumber bug yang halus.

```js
const skor = new Map();

skor.set("andi", 90);
skor.set("budi", 85);
skor.set(2026, "angkatan");

console.log(skor.get("andi")); // 90
console.log(skor.get(2026)); // "angkatan"
console.log(skor.size); // 3
```

Coba lakukan hal yang sama dengan object biasa dan kunci angka `2026` akan berubah jadi string `"2026"`. Di `Map`, angka tetap angka. Perbedaan ini penting kalau kamu memakai ID numerik atau object sebagai kunci.

`Map` juga menyimpan urutan penyisipan, jadi iterasi dengan `for...of` atau `forEach` selalu mengikuti urutan kamu memasukkan data. Object modern juga menjaga urutan kunci string, tapi aturannya lebih rumit, kunci angka bulat diurutkan menaik duluan, bukan mengikuti urutan masuk. Di `Map`, tidak ada kejutan seperti itu.

```js
const stok = new Map([
  ["kopi", 12],
  ["gula", 5],
  ["susu", 8],
]);

for (const [barang, jumlah] of stok) {
  console.log(`${barang}: ${jumlah}`);
}
// kopi: 12
// gula: 5
// susu: 8
```

## Kapan pakai yang mana

Aturan praktisnya cukup sederhana. Pakai `Set` saat yang kamu butuhkan adalah daftar nilai unik dan yang penting adalah ada atau tidaknya suatu nilai, misalnya tag yang dipilih pengguna, ID yang sudah diproses, atau kata kunci yang sudah dilihat.

Pakai `Map` saat kamu butuh pasangan kunci dan nilai, apalagi kalau kuncinya bukan string atau urutan penyisipan penting. Contoh nyata adalah cache hasil fetch berdasarkan object request, atau tabel penerjemah kode status ke pesan.

Pakai array biasa kalau urutan dan indeks memang yang kamu butuhkan, dan pakai object biasa kalau struktur datanya tetap dan kuncinya memang string yang diketahui sejak awal, seperti konfigurasi atau data JSON dari API.

```js
// Contoh nyata: menghitung berapa kali tiap kata muncul
function hitungKata(teks) {
  const hitung = new Map();
  for (const kata of teks.toLowerCase().split(" ")) {
    hitung.set(kata, (hitung.get(kata) || 0) + 1);
  }
  return hitung;
}

console.log(hitungKata("kucing makan ikan kucing tidur"));
// Map(4) { 'kucing' => 2, 'makan' => 1, 'ikan' => 1, 'tidur' => 1 }
```

Kode di atas akan jauh lebih panjang kalau memakai object, karena kamu harus berurusan dengan kunci bawaan seperti `constructor` atau `toString` yang bisa bentrok dengan kata dari teks. Di `Map`, tidak ada kunci warisan yang mengganggu.

## Dua alat yang layak masuk kebiasaan

`Set` dan `Map` sudah tersedia di semua browser modern dan Node.js sejak lama, jadi tidak ada alasan kompatibilitas untuk menghindarinya. Mereka bukan fitur eksperimental, mereka bagian stabil dari bahasa.

Mulai dari satu kebiasaan kecil. Setiap kali kamu menulis `array.includes` di dalam loop untuk mengecek duplikat, coba ganti dengan `Set`. Setiap kali object dipakai sebagai kamus dengan kunci dinamis, coba pertimbangkan `Map`. Kode yang dihasilkan biasanya lebih pendek, lebih cepat dibaca, dan lebih sedikit menyimpan kejutan.
