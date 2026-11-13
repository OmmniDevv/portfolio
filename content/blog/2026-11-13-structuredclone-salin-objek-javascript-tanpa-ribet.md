---
title: structuredClone, Cara Salin Objek JavaScript Tanpa Ribet
date: 2026-11-13
excerpt: structuredClone menyalin objek JavaScript sampai ke level terdalam dalam satu baris. Pelajari bedanya dengan spread dan JSON, plus kapan sebaiknya tidak dipakai.
tags: javascript, tutorial, web development
image: https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg
---

Menyalin objek di JavaScript terdengar sepele sampai kamu menemukan bug yang sumbernya ternyata objek yang ikut berubah padahal kamu kira sudah disalin. Penyebabnya hampir selalu sama: yang disalin cuma referensinya, bukan isinya. Di sinilah `structuredClone` masuk, sebuah fungsi bawaan yang menyalin objek sampai ke level terdalam dalam satu baris.

## Masalahnya: salinan yang ternyata bukan salinan

Coba perhatikan kode ini:

```js
const user = {
  name: "Malik",
  address: { city: "Bandung", zip: "40115" },
};

const copy = { ...user };
copy.address.city = "Jakarta";

console.log(user.address.city); // "Jakarta"
```

Spread operator hanya menyalin satu level. Properti `address` di `copy` masih menunjuk ke objek yang sama dengan `user`. Ubah satu, yang lain ikut berubah. Ini yang disebut shallow copy, dan ini sumber bug yang sulit dilacak karena perubahannya terjadi di tempat yang tidak terduga.

Selama bertahun-tahun, trik yang paling populer untuk deep copy adalah `JSON.parse(JSON.stringify(obj))`. Trik ini bekerja, tapi punya banyak lubang.

## Kenapa JSON bukan jawaban yang bagus

```js
const data = {
  createdAt: new Date(),
  sayHi: () => "halo",
  count: undefined,
  big: 10n,
};

const copy = JSON.parse(JSON.stringify(data));
console.log(copy);
// { createdAt: "2026-11-13T00:00:00.000Z", count: undefined hilang, sayHi hilang }
```

Tiga masalah langsung terlihat. `Date` berubah jadi string, fungsi hilang tanpa peringatan, dan properti `undefined` ikut lenyap. Lebih parah lagi, kalau objek berisi `BigInt`, `JSON.stringify` langsung melempar error dan kode berhenti. Trik ini juga gagal total untuk objek yang punya referensi melingkar, misalnya objek yang menunjuk ke dirinya sendiri.

`structuredClone` menyelesaikan hampir semua masalah itu.

![Seseorang sedang menulis kode JavaScript di laptop](https://blogger.googleusercontent.com/img/a/AVvXsEimfOvtDbY65AmHcdvCCTFWpaq5JTkcbBna6okqSd2kBe_bQockYRXqSdDVGFitAobQjW2FP-B_LhojxE5OCbkCMP8gdqIkMIpWpj4KSrEM-e0rQFWHLaYe6DtPQbeHRWuWAVBUa9y2dhsuqta-zSIVSc1zlljX--ShFgK5RJ8HFPQqnZJUKTF5oR2l=s750)

## Cara pakai structuredClone

Penggunaannya sesederhana ini:

```js
const user = {
  name: "Malik",
  address: { city: "Bandung", zip: "40115" },
  tags: ["coding", "musik"],
  createdAt: new Date("2026-11-13"),
};

const copy = structuredClone(user);
copy.address.city = "Jakarta";

console.log(user.address.city); // "Bandung"
console.log(copy.createdAt instanceof Date); // true
```

Satu baris, dan salinannya benar-benar terpisah. `Date` tetap `Date`, array di dalamnya ikut disalin, dan mengubah salinan tidak menyentuh objek aslinya sama sekali.

Fungsi ini juga menangani referensi melingkar, sesuatu yang membuat `JSON.stringify` menyerah:

```js
const node = { value: 1 };
node.self = node;

const copy = structuredClone(node);
console.log(copy.self === copy); // true
console.log(copy.self === node); // false
```

Struktur melingkarnya dipertahankan, tapi menunjuk ke salinan, bukan ke objek asli. Ini berguna untuk struktur data seperti graf atau pohon yang saling terhubung.

## Apa saja yang bisa disalin

`structuredClone` mendukung sebagian besar tipe data yang sering dipakai sehari-hari: objek biasa, array, `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, `Blob`, `File`, sampai `ImageData`. Tipe-tipe ini disalin dengan benar, bukan diubah jadi bentuk lain.

Tapi ada batasnya. Fungsi tidak bisa disalin, begitu juga dengan DOM node dan beberapa objek khusus seperti `Error` dengan properti kustom yang aneh. Kalau kamu mencoba menyalin fungsi, `structuredClone` akan melempar `DataCloneError`. Jadi sebelum memakai fungsi ini, pastikan datamu memang data, bukan campuran data dan perilaku.

```js
const withFn = { greet: () => "halo" };
structuredClone(withFn); // DataCloneError
```

## Kapan sebaiknya tidak dipakai

Meski praktis, `structuredClone` bukan alat untuk semua situasi. Ada tiga kondisi yang perlu dipertimbangkan.

Untuk objek yang dangkal dan sederhana, spread operator atau `Object.assign` sudah cukup dan lebih cepat. Tidak ada gunanya memanggil deep copy untuk objek satu level.

Untuk data yang datang dari API dan akan langsung dikirim lagi sebagai JSON, `JSON.parse(JSON.stringify())` kadang justru lebih cocok karena hasilnya memang sudah dalam bentuk yang siap dikirim. `structuredClone` mempertahankan tipe seperti `Date`, dan `Date` tetap perlu diubah ke string saat dikirim lewat `fetch`.

Untuk objek yang sangat besar dengan ribuan properti bertingkat, deep copy selalu lebih berat dari shallow copy. Kalau performa jadi masalah, salin hanya bagian yang benar-benar perlu diubah, misalnya dengan menggabungkan spread di level atas dan `structuredClone` hanya di bagian yang dalam.

## Dukungan browser

`structuredClone` tersedia di semua browser modern: Chrome 98, Firefox 94, Safari 15.4, dan Edge 98 ke atas. Node.js mendukungnya sejak versi 17. Untuk proyek yang masih harus mendukung browser lama, tetap ada jalan: gunakan pustaka kecil atau tulis fungsi deep copy sendiri untuk kasus yang sederhana.

Satu catatan penting: `structuredClone` adalah fungsi global, jadi tidak perlu import apa pun. Ia juga tersedia di Web Worker dan Service Worker, yang berguna saat kamu memindahkan data antar thread tanpa takut objek aslinya ikut berubah.

## Penutup

Salinan objek yang setengah-setengah adalah salah satu sumber bug paling menyebalkan di JavaScript karena gejalanya muncul jauh dari penyebabnya. `structuredClone` menghapus satu kelas bug itu dengan satu baris kode. Ia bukan pengganti spread operator, melainkan alat untuk kasus yang memang butuh salinan penuh. Kalau datamu bertingkat dan kamu tidak mau pusing memikirkan referensi, ini fungsi yang tepat.
