---
title: "Map dan Set JavaScript: Kapan Berhenti Pakai Array"
date: 2026-10-27
excerpt: Array bukan jawaban untuk semua koleksi data. Pelajari Map dan Set JavaScript lewat contoh nyata: cache, penghitung, dan daftar unik tanpa loop berlapis.
tags: javascript, tutorial, programming, map, set
image: https://assets.ithillel.ua/images/blog/cover/_transform_blogSplash_desktop_2x/Blog-JsMap.jpg
---

Kebanyakan kode JavaScript yang kamu tulis sehari-hari memakai array dan objek. Keduanya sudah cukup untuk banyak hal, tapi ada situasi di mana keduanya memaksamu menulis kode yang lambat atau berbelit. Di situlah Map dan Set masuk. Keduanya sudah ada sejak ES2015, tapi masih sering dilewatkan karena array dan objek terasa lebih familiar.

Aturan praktisnya begini. Pakai Map ketika kamu perlu memasangkan kunci dengan nilai dan kuncinya bukan sekadar string. Pakai Set ketika kamu hanya peduli pada keunikan, tanpa peduli pada urutan pasangan kunci dan nilai. Sisanya, array dan objek tetap jadi pilihan yang baik.

## Map: objek yang tidak memaksamu memakai string

Objek JavaScript memaksa semua kunci menjadi string atau symbol. Itu menimbulkan masalah klasik. Kunci `"1"` dan `1` dianggap sama, kunci `"__proto__"` bisa menimbulkan perilaku aneh, dan objek tidak bisa dipakai sebagai kunci tanpa diubah jadi string `"[object Object]"`. Map tidak punya masalah itu. Kunci Map bisa berupa apa saja, termasuk objek, fungsi, dan nilai `NaN`.

Contoh paling nyata adalah cache. Misalnya kamu punya fungsi mahal yang menghitung sesuatu dari sebuah objek konfigurasi, dan kamu ingin menyimpan hasilnya supaya tidak dihitung dua kali untuk objek yang sama:

```js
const cache = new Map();

function hitungMahal(config) {
  if (cache.has(config)) {
    return cache.get(config);
  }
  const hasil = config.nilai * 2 + config.pengali;
  cache.set(config, hasil);
  return hasil;
}

const cfg = { nilai: 10, pengali: 3 };
hitungMahal(cfg); // menghitung, lalu menyimpan
hitungMahal(cfg); // mengambil dari cache
```

Dengan objek biasa, trik ini tidak bisa jalan, karena objek yang berbeda akan bertabrakan jadi satu kunci string yang sama. Dengan Map, identitas objek itu sendiri yang jadi kunci.

Map juga punya perilaku yang lebih bisa ditebak soal ukuran dan urutan. `map.size` memberi jumlah entri secara langsung, tanpa perlu `Object.keys(map).length`. Iterasi Map berjalan sesuai urutan penyisipan, dan metode seperti `forEach`, `keys`, `values`, dan `entries` tersedia tanpa perlu mengubahnya jadi array dulu:

```js
const stok = new Map([
  ["kopi", 12],
  ["teh", 8],
  ["susu", 0],
]);

for (const [nama, jumlah] of stok) {
  if (jumlah === 0) console.log(`${nama} habis`);
}
```

![Contoh kode JavaScript yang menunjukkan struktur data Map dan Set](https://cdn-images-1.medium.com/max/1600/1*NYErGGfVZAwnb0MmdillRQ.png)

## Set: daftar unik tanpa pemeriksaan manual

Set menyimpan nilai unik, dan hanya itu. Tidak ada pasangan kunci dan nilai, tidak ada duplikat. Kalau kamu pernah menulis loop untuk membuang duplikat dari array, Set menggantikan seluruh loop itu dengan satu baris:

```js
const idTerdaftar = [101, 102, 101, 103, 102, 104];
const idUnik = [...new Set(idTerdaftar)];
// [101, 102, 103, 104]
```

Keuntungan yang lebih besar muncul saat kamu memeriksa keanggotaan berulang kali. Memeriksa apakah sebuah nilai ada di array dengan `includes` berarti memindai array dari awal setiap kali. Untuk array kecil, tidak ada bedanya. Untuk daftar yang diperiksa ribuan kali dalam satu proses, misalnya memfilter log atau memvalidasi antrean, `set.has()` jauh lebih cepat karena Set memakai tabel hash di balik layar.

Contoh yang sering muncul di aplikasi nyata adalah menyaring daftar berdasarkan daftar blokir:

```js
const emailDiblokir = new Set(["spam@contoh.com", "bot@contoh.com"]);

function saringPendaftar(pendaftar) {
  return pendaftar.filter((p) => !emailDiblokir.has(p.email));
}
```

Kode ini tetap mudah dibaca meski daftar blokirnya tumbuh jadi ribuan entri. Versi array dengan `includes` di dalam `filter` akan melambat seiring daftar membesar, sementara versi Set tidak.

Set juga berguna untuk operasi himpunan yang sering ditulis manual. Irisan dua daftar, gabungan, dan selisih bisa ditulis dengan kombinasi `filter` dan `has`:

```js
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

const irisan = [...a].filter((x) => b.has(x)); // [3, 4]
const selisih = [...a].filter((x) => !b.has(x)); // [1, 2]
const gabungan = [...new Set([...a, ...b])]; // [1, 2, 3, 4, 5, 6]
```

## Kapan tetap memakai array dan objek

Map dan Set bukan pengganti array dan objek. Array tetap pilihan terbaik saat urutan penting dan kamu butuh metode seperti `map`, `filter`, dan `reduce` secara langsung, atau saat datanya akan diubah jadi JSON, karena `JSON.stringify` tidak menangani Map dan Set dengan cara yang kamu harapkan. Kalau kamu perlu mengirim Map lewat API, ubah dulu jadi objek atau array dengan `Object.fromEntries(map)` atau `[...map]`.

Objek tetap pilihan terbaik untuk data dengan bentuk yang tetap dan sudah diketahui, seperti respons API, konfigurasi, atau state aplikasi. Objek juga lebih mudah dibaca saat di-debug di konsol, dan lebih natural untuk ditulis sebagai literal.

Satu jebakan yang layak diingat: Set menganggap nilai primitif yang sama sebagai duplikat, tapi dua objek dengan isi yang sama dianggap berbeda, karena Set membandingkan identitas, bukan isi. Jadi `new Set([{a: 1}, {a: 1}])` tetap berisi dua entri. Kalau deduplikasi yang kamu butuhkan berdasarkan isi, ubah dulu objeknya jadi string kunci, misalnya dengan `JSON.stringify`, atau dedup berdasarkan satu field seperti id:

```js
const pengguna = [
  { id: 1, nama: "Rina" },
  { id: 1, nama: "Rina" },
  { id: 2, nama: "Budi" },
];

const terlihat = new Set();
const penggunaUnik = pengguna.filter((p) => {
  if (terlihat.has(p.id)) return false;
  terlihat.add(p.id);
  return true;
});
// [{ id: 1, nama: "Rina" }, { id: 2, nama: "Budi" }]
```

Pola ini, Set sebagai penjaga keunikan di dalam `filter`, adalah salah satu pola paling berguna yang bisa kamu bawa ke kode sehari-hari.

## Cara memilih dengan cepat

Saat kamu menulis kode dan merasa perlu memeriksa "apakah ini sudah ada" berulang kali, itu tanda Set. Saat kamu perlu mengambil nilai berdasarkan kunci yang bukan string, atau menyimpan hasil perhitungan yang terikat pada satu objek tertentu, itu tanda Map. Saat datanya berbentuk daftar berurutan yang akan diolah dengan `map` dan `filter`, tetap pakai array. Saat datanya berbentuk catatan dengan field yang tetap, tetap pakai objek.

Map dan Set tidak membuat kode jadi lebih canggih dengan sendirinya. Nilai mereka ada di tempat yang tepat: menggantikan loop berlapis dengan satu pemeriksaan, menggantikan kunci string yang rapuh dengan kunci apa pun, dan membuat niat kode jadi jelas dari struktur datanya. Begitu kamu terbiasa membacanya, kamu akan mulai melihat tempat-tempat di kode lama yang sebenarnya sudah lama meminta struktur data ini.
