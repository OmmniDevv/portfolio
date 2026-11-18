---
title: "URLSearchParams: Baca Query URL Tanpa Regex"
date: 2026-11-18
excerpt: "Query string di URL bisa dibaca dan diubah tanpa regex yang bikin pusing. URLSearchParams sudah ada di semua browser modern dan cara pakainya singkat."
tags: javascript, tutorial, coding, web
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200
---

Pernah membuka link seperti `https://toko.id/produk?page=2&kategori=kopi`? Bagian setelah tanda tanya itu namanya query string. Ia menyimpan data kecil yang dikirim lewat URL: nomor halaman, kata kunci pencarian, filter, sampai kode referral.

Dulu, membaca query string di JavaScript berarti menulis regex atau memecah string secara manual. Hasilnya rawan salah, apalagi kalau nilainya mengandung spasi atau karakter khusus. Sekarang ada cara yang jauh lebih rapi: `URLSearchParams`, API bawaan browser yang sudah tersedia di semua browser modern dan juga di Node.js.

![Kode JavaScript di layar editor gelap](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200)

## Membaca nilai dari URL

Cara paling umum memakai `URLSearchParams` adalah membaca parameter dari URL halaman yang sedang dibuka:

```js
const params = new URLSearchParams(window.location.search);

const page = params.get("page");
const kategori = params.get("kategori");

console.log(page); // "2"
console.log(kategori); // "kopi"
```

`window.location.search` mengembalikan bagian query string, termasuk tanda tanyanya. `URLSearchParams` memahaminya langsung, jadi kamu tidak perlu menghapus tanda tanya itu sendiri.

Hasil dari `get()` selalu berupa string atau `null` kalau parameternya tidak ada. Ini penting karena angka pun dibaca sebagai string. Kalau kamu butuh angka untuk perhitungan, ubah dulu dengan `Number()`:

```js
const page = Number(params.get("page") ?? 1);
```

## Menangani nilai yang sama muncul berkali-kali

Query string boleh punya parameter yang sama lebih dari sekali, misalnya `?tag=kopi&tag=gula&tag=susu`. Kalau kamu memakai `get()`, hanya nilai pertama yang dikembalikan. Untuk mengambil semuanya, pakai `getAll()`:

```js
const params = new URLSearchParams("?tag=kopi&tag=gula&tag=susu");

params.get("tag"); // "kopi"
params.getAll("tag"); // ["kopi", "gula", "susu"]
```

Ada juga `has()` untuk memeriksa apakah sebuah parameter ada atau tidak, tanpa peduli nilainya:

```js
params.has("diskon"); // true atau false
```

Ini berguna untuk fitur seperti mode gelap yang diaktifkan lewat URL, misalnya `?tema=gelap`, atau untuk mendeteksi apakah pengguna datang dari link referral tertentu.

## Mengubah query string tanpa reload

`URLSearchParams` bukan hanya untuk membaca. Kamu bisa menambah, mengubah, dan menghapus parameter, lalu menulisnya kembali ke URL tanpa me-reload halaman:

```js
const params = new URLSearchParams(window.location.search);

params.set("page", "3");
params.delete("kategori");
params.append("tag", "arabika");

const urlBaru = `${window.location.pathname}?${params.toString()}`;
history.pushState(null, "", urlBaru);
```

Metode `set()` akan menimpa nilai lama kalau parameternya sudah ada, dan menambah baru kalau belum. `append()` selalu menambah, sehingga bisa ada dua nilai untuk nama yang sama. `delete()` menghapus semua nilai dari sebuah nama sekaligus.

Kombinasi ini sangat berguna di halaman daftar produk atau pencarian. Pengguna mengganti filter, URL ikut berubah, dan halaman bisa dibagikan lewat tautan yang sudah berisi filter tersebut. Tidak ada reload yang mengganggu, tapi state halaman tetap tersimpan di address bar.

## Menangani spasi dan karakter khusus

Salah satu jebakan dalam query string adalah encoding. Spasi ditulis sebagai `%20` atau `+`, dan karakter seperti `&` atau `=` punya makna khusus. Kalau kamu membangun query string dengan menggabungkan string manual, karakter-karakter ini mudah merusak hasil.

`URLSearchParams` mengurus encoding secara otomatis:

```js
const params = new URLSearchParams();
params.set("q", "kopi tubruk & gula aren");

console.log(params.toString());
// "q=kopi+tubruk+%26+gula+aren"
```

Sebaliknya, saat membaca, nilainya langsung didekode kembali ke bentuk aslinya:

```js
const dibaca = new URLSearchParams("q=kopi+tubruk+%26+gula+aren");
dibaca.get("q"); // "kopi tubruk & gula aren"
```

Kamu tidak perlu mengingat aturan encoding mana pun. Cukup serahkan ke API ini.

## Mengubah objek menjadi query string

Pola lain yang sering dipakai adalah mengubah objek JavaScript menjadi query string untuk dikirim lewat `fetch`:

```js
const filter = { kategori: "kopi", harga: "murah", page: 2 };
const query = new URLSearchParams(filter).toString();

const res = await fetch(`/api/produk?${query}`);
```

Perlu diingat, `URLSearchParams` menerima objek hanya kalau semua nilainya berupa string atau angka. Nilai boolean atau objek bersarang akan diubah menjadi string dengan cara yang mungkin tidak kamu harapkan, jadi pastikan bentuk datanya sudah sederhana sebelum dikirim.

## Kapan tetap butuh cara lain

`URLSearchParams` menangani hampir semua kebutuhan query string. Satu hal yang tidak ia lakukan adalah membaca bagian setelah tanda pagar (`#`) di URL, karena itu memang bukan bagian dari query string. Untuk hash, pakai `window.location.hash` secara terpisah.

API ini juga tidak menyimpan riwayat atau sinkronisasi state secara otomatis. Kalau kamu mengubah parameter lewat `set()`, kamu tetap perlu menulis hasilnya kembali ke address bar dengan `history.pushState` atau `history.replaceState` seperti contoh di atas.

Secara keseluruhan, `URLSearchParams` adalah salah satu API kecil yang menghemat banyak waktu. Ia menggantikan regex rapuh dan string manual dengan empat metode yang mudah diingat: `get`, `set`, `delete`, dan `toString`. Kalau kamu masih memecah query string dengan `split("&")` di proyekmu, ini saat yang tepat untuk menggantinya.
