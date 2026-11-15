---
title: "Template Literals JavaScript: String Dinamis Tanpa Ribet"
date: 2026-11-15
excerpt: "Template literals menggantikan gabungan string dengan tanda plus yang berantakan. Pelajari backtick, interpolasi, string multiline, dan tagged template dengan contoh nyata."
tags: javascript, tutorial, web-development, coding
image: https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=1200&q=80
---

Kalau kamu pernah menulis kode seperti ini, kamu tahu rasanya:

```js
const pesan = "Halo, " + nama + "! Kamu punya " + jumlah + " pesan baru.";
```

Tanda plus di mana-mana, spasi yang gampang ketinggalan, dan satu tanda kutip yang salah bisa merusak semuanya. Template literals menyelesaikan masalah itu dengan cara yang jauh lebih enak dibaca.

## Backtick dan ${}

Template literals memakai backtick (`` ` ``), bukan tanda kutip biasa. Di dalamnya, kamu bisa menyisipkan variabel atau ekspresi apa pun dengan `${}`.

```js
const nama = "Malik";
const jumlah = 3;

const pesan = `Halo, ${nama}! Kamu punya ${jumlah} pesan baru.`;
console.log(pesan);
// Halo, Malik! Kamu punya 3 pesan baru.
```

Isi `${}` bisa lebih dari sekadar nama variabel. Operasi matematika, pemanggilan fungsi, bahkan ternary, semuanya bisa masuk:

```js
const harga = 50000;
const diskon = 0.1;

const struk = `Total bayar: Rp${harga - harga * diskon}`;
console.log(struk);
// Total bayar: Rp45000
```

Satu hal yang perlu diingat, `${}` hanya bekerja di dalam backtick. Kalau kamu menulisnya di dalam tanda kutip biasa, yang keluar justru teks `${nama}` apa adanya.

## String multiline tanpa \n

Sebelum template literals, membuat string beberapa baris berarti menumpuk `\n` atau menggabungkan banyak potongan. Sekarang, tekan Enter saja dan baris barunya ikut terbawa:

```js
const email = `Halo ${nama},

Pesananmu sudah dikirim.
Nomor resi: ${resi}

Terima kasih sudah berbelanja!`;

console.log(email);
```

Hasilnya persis seperti yang kamu tulis, termasuk baris kosong di tengah. Ini berguna banget untuk template email, pesan WhatsApp, atau teks notifikasi yang memang butuh beberapa baris.

![Kode JavaScript di layar editor](https://img.myloview.se/vaggdekor/technology-development-with-javascript-coding-on-computer-screen-can-be-used-for-code-background-700-299929228.jpg)

## Contoh nyata: membangun HTML

Tempat template literals paling bersinar adalah saat kamu membangun potongan HTML dari data. Bandingkan dua cara ini:

```js
// Cara lama
const card = '<div class="card"><h2>' + produk.nama + '</h2><p>Rp' + produk.harga + '</p></div>';

// Template literal
const card = `
  <div class="card">
    <h2>${produk.nama}</h2>
    <p>Rp${produk.harga.toLocaleString("id-ID")}</p>
  </div>
`;
```

Versi kedua langsung kelihatan strukturnya. Kamu bisa membaca HTML-nya tanpa harus mengurai tanda plus dan kutip. Kalau daftarnya banyak, gabungkan dengan `map` dan `join`:

```js
const daftar = produkList
  .map((p) => `<li>${p.nama} - Rp${p.harga.toLocaleString("id-ID")}</li>`)
  .join("");

document.querySelector("#list").innerHTML = `<ul>${daftar}</ul>`;
```

Pola ini muncul di hampir semua proyek frontend tanpa framework. Sederhana, tapi menghemat banyak waktu.

## Nested template dan kondisi di dalam

Template literal bisa bersarang. Kamu bisa menaruh template literal lain di dalam `${}`, lengkap dengan logika kondisional:

```js
const user = { nama: "Malik", premium: true };

const badge = `
  <div class="user">
    <span>${user.nama}</span>
    ${user.premium ? '<span class="badge">Premium</span>' : ""}
  </div>
`;
```

Kalau pengguna bukan premium, bagian badge menghasilkan string kosong dan tidak ada elemen tambahan yang muncul. Trik kecil ini membuat template tetap bersih tanpa `if` di luar string.

## Tagged template: level lanjut yang jarang dipakai

Ada satu fitur yang jarang disentuh pemula, yaitu tagged template. Kamu menaruh fungsi tepat sebelum backtick, dan fungsi itu menerima potongan string mentah plus nilai-nilai interpolasi:

```js
function rupiah(strings, ...values) {
  let hasil = strings[0];
  values.forEach((v, i) => {
    hasil += typeof v === "number" ? v.toLocaleString("id-ID") : v;
    hasil += strings[i + 1];
  });
  return hasil;
}

const total = rupiah`Total belanja kamu Rp${125000} untuk ${3} item.`;
// Total belanja kamu Rp125.000 untuk 3 item.
```

Fungsi `rupiah` memformat setiap angka secara otomatis. Pola ini dipakai library seperti styled-components dan beberapa alat sanitasi HTML untuk mencegah injeksi. Buat pemakaian sehari-hari kamu mungkin tidak butuh, tapi bagus untuk diketahui saat menemukannya di library orang lain.

## Kapan tetap pakai kutip biasa

Template literals bukan pengganti semua string. String pendek yang tetap, seperti `"Selamat datang"` atau `'id-ID'`, lebih enak ditulis dengan kutip biasa. Backtick baru terasa manfaatnya saat ada interpolasi, multiline, atau HTML di dalamnya. Intinya, pakai alat yang paling mudah dibaca untuk kasus itu.

Mulai sekarang, tiap kali kamu menulis tanda plus untuk menggabung string, coba ganti dengan backtick. Kode jadi lebih pendek, lebih mudah dibaca, dan bug spasi yang hilang ikut berkurang.
