---
title: "localStorage: Simpan Data di Browser Tanpa Backend"
date: 2026-10-11
excerpt: "localStorage menyimpan data di browser pengguna tanpa server. Tutorial praktis: theme toggle, todo list, dan jebakan umum yang harus dihindari."
tags: javascript, tutorial, web, frontend
image: "https://savethevideo.net/blog/wp-content/uploads/2026/03/a-computer-screen-with-a-bunch-of-text-on-it-javascript-code-editor-error-popup-developer-typing.jpg"
---

Banyak aplikasi web kecil tidak butuh server sama sekali untuk menyimpan data. Preferensi tema, isi keranjang belanja sementara, draft formulir, sampai skor game, semua bisa disimpan langsung di browser pengguna lewat `localStorage`. Datanya bertahan walau tab ditutup atau browser di-restart. Gratis, tanpa setup, dan API-nya cuma tiga fungsi.

## Konsep dasarnya sederhana

`localStorage` adalah penyimpanan key-value milik browser. Tiga fungsi yang perlu kamu kenal:

```javascript
// Simpan (nilainya selalu string)
localStorage.setItem("tema", "gelap");

// Baca
const tema = localStorage.getItem("tema"); // "gelap"

// Hapus
localStorage.removeItem("tema");
```

Satu hal yang sering bikin bingung pemula: semua nilai disimpan sebagai string. Kalau kamu menyimpan angka atau objek, konversi dulu dengan `JSON.stringify`, dan baca balik dengan `JSON.parse`.

```javascript
const keranjang = [{ nama: "Kopi", harga: 15000 }];
localStorage.setItem("keranjang", JSON.stringify(keranjang));

const data = JSON.parse(localStorage.getItem("keranjang"));
console.log(data[0].nama); // "Kopi"
```

![Contoh kode JavaScript di editor](https://blog.aiensured.com/content/images/2023/08/Screenshot-2023-08-17-130535.png)

## Contoh nyata 1: theme toggle yang diingat

Pernah kesal karena web selalu balik ke mode terang padahal kamu sudah pilih mode gelap? Ini solusinya, dan kodenya pendek:

```javascript
const tombol = document.querySelector("#toggle-tema");

// Saat halaman dibuka, terapkan tema tersimpan
if (localStorage.getItem("tema") === "gelap") {
  document.body.classList.add("mode-gelap");
}

tombol.addEventListener("click", () => {
  const gelap = document.body.classList.toggle("mode-gelap");
  localStorage.setItem("tema", gelap ? "gelap" : "terang");
});
```

Logikanya: saat halaman dimuat, baca preferensi lama lalu terapkan. Saat tombol diklik, ubah tampilan sekaligus simpan pilihan baru. Pengguna buka web besok, temanya tetap seperti terakhir kali.

## Contoh nyata 2: todo list mini

Todo list adalah contoh klasik karena melibatkan array objek dan render ulang:

```javascript
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function simpanDanTampilkan() {
  localStorage.setItem("todos", JSON.stringify(todos));
  tampilkan(); // fungsi yang menggambar ulang daftar ke DOM
}

function tambahTodo(teks) {
  todos.push({ teks: teks, selesai: false });
  simpanDanTampilkan();
}
```

Pola kuncinya ada di baris pertama: `JSON.parse(...) || []`. Kalau belum ada data tersimpan, `getItem` mengembalikan `null`, dan `null || []` menghasilkan array kosong. Tanpa trik ini aplikasimu crash di kunjungan pertama.

## Batasan yang wajib kamu tahu

`localStorage` bukan tempat penyimpanan ajaib. Kapasitasnya sekitar 5MB per origin, jauh dari cukup untuk file besar tapi lebih dari cukup untuk preferensi dan data ringan. Datanya juga tidak terenkripsi dan bisa dibaca siapa pun lewat DevTools, jadi jangan pernah menyimpan token sensitif, password, atau data pribadi di sini. Untuk data sensitif, backend dengan session yang proper tetap jawabannya.

Ada juga `sessionStorage`, saudara kembarnya. API-nya identik, bedanya data hilang begitu tab ditutup. Cocok untuk data sementara seperti isi form multi-langkah yang tidak perlu bertahan antar sesi.

Satu jebakan terakhir: di mode private/incognito sebagian browser, `localStorage` bisa lempar error saat ditulis. Kalau aplikasimu harus tahan banting, bungkus aksesnya dalam try-catch.

```javascript
function simpanAman(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn("Penyimpanan tidak tersedia:", e);
    return false;
  }
}
```

Satu fitur bonus yang jarang dipakai: event `storage`. Kalau pengguna membuka webmu di dua tab sekaligus, perubahan `localStorage` di satu tab bisa memicu event di tab lainnya. Berguna untuk sinkronisasi sederhana:

```javascript
window.addEventListener("storage", (e) => {
  if (e.key === "tema") {
    document.body.classList.toggle("mode-gelap", e.newValue === "gelap");
  }
});
```

Ubah tema di tab pertama, tab kedua ikut berubah otomatis tanpa refresh. Detail kecil seperti ini yang membuat aplikasi terasa hidup dan profesional, padahal implementasinya cuma beberapa baris.

Itu saja. Dengan tiga fungsi, konversi JSON, event storage, dan kesadaran soal batasannya, kamu sudah bisa bikin web yang "ingat" penggunanya tanpa menyentuh server sama sekali. Coba terapkan theme toggle di proyek latihanmu minggu ini, rasanya beda begitu web mulai punya memori.
