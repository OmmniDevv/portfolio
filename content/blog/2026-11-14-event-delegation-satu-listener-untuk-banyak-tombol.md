---
title: Event Delegation, Satu Listener untuk Banyak Tombol
date: 2026-11-14
excerpt: Event delegation memasang satu listener di elemen induk untuk menangani klik banyak tombol, termasuk tombol yang baru dibuat setelah halaman dimuat.
tags: javascript, tutorial, web development
image: https://i2.wp.com/static0.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/laptop-with-javascript-code-on-the-screen.jpg
---

Bayangkan sebuah daftar tugas dengan seratus item, masing-masing punya tombol hapus. Cara yang paling sering diajarkan adalah memasang `addEventListener` di setiap tombol. Cara itu bekerja, tapi ada dua masalah. Pertama, seratus listener berarti seratus fungsi yang menempel di memori. Kedua, tombol yang dibuat belakangan tidak punya listener sama sekali, jadi harus dipasang lagi secara manual.

Event delegation menyelesaikan keduanya dengan satu listener. Kuncinya ada di cara event bekerja di browser: event yang terjadi di elemen anak akan naik ke elemen induknya. Proses naik ini disebut bubbling, dan kita bisa memanfaatkannya dengan memasang listener di induk, lalu memeriksa tombol mana yang sebenarnya diklik.

## Contoh yang bermasalah dulu

Misalnya ada daftar tugas seperti ini:

```html
<ul id="todo-list">
  <li>Belajar JavaScript <button class="delete">Hapus</button></li>
  <li>Baca dokumentasi <button class="delete">Hapus</button></li>
</ul>
<button id="add">Tambah tugas</button>
```

Pendekatan yang umum dilakukan pemula:

```js
document.querySelectorAll(".delete").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest("li").remove();
  });
});
```

Kode ini bekerja untuk dua tombol yang sudah ada. Masalah muncul saat tombol Tambah membuat item baru. Item baru itu tidak punya listener, jadi tombol hapusnya tidak berfungsi. Solusi yang sering dipakai adalah memasang listener lagi setiap kali menambah item, dan di situlah kodenya mulai berantakan.

## Satu listener di induk

Dengan event delegation, listener dipasang sekali di `<ul>`, dan setiap klik di dalamnya ditangani di sana:

```js
const list = document.getElementById("todo-list");

list.addEventListener("click", (event) => {
  const btn = event.target.closest(".delete");
  if (!btn) return;

  btn.closest("li").remove();
});
```

Ada dua hal penting di kode ini. `event.target` adalah elemen yang benar-benar diklik, sedangkan `closest(".delete")` mencari tombol hapus terdekat dari titik klik, termasuk kalau yang diklik adalah ikon atau teks di dalam tombol. Baris `if (!btn) return` memastikan klik di area kosong daftar tidak melakukan apa-apa.

Karena listener menempel di `<ul>`, item baru yang ditambahkan belakangan langsung ikut terlayani tanpa kode tambahan:

```js
document.getElementById("add").addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = `Tugas baru <button class="delete">Hapus</button>`;
  list.appendChild(li);
});
```

Tidak ada `addEventListener` baru di sini. Tombol hapus di item baru langsung bekerja karena kliknya tetap naik ke `<ul>`.

![Seseorang mengetik kode JavaScript di laptop](https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1663324239089%2FcVPG2V1ef.jpg%3Fw%3D800%26h%3D420%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1080&q=75)

## Menangani beberapa aksi dalam satu listener

Pola ini makin terasa manfaatnya kalau satu daftar punya beberapa jenis tombol. Misalnya setiap item punya tombol selesai dan hapus:

```js
list.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;

  const item = btn.closest("li");
  if (btn.classList.contains("done")) {
    item.classList.toggle("completed");
  }
  if (btn.classList.contains("delete")) {
    item.remove();
  }
});
```

Satu listener menangani dua aksi berbeda. Pola ini juga bisa diperluas dengan atribut `data-action` supaya kodenya lebih mudah dibaca:

```html
<button data-action="done">Selesai</button>
<button data-action="delete">Hapus</button>
```

```js
list.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action]");
  if (!btn) return;

  const item = btn.closest("li");
  const action = btn.dataset.action;

  if (action === "done") item.classList.toggle("completed");
  if (action === "delete") item.remove();
});
```

Dengan `data-action`, menambah jenis tombol baru tinggal menambah satu cabang `if`, tanpa menyentuh HTML lain atau menambah listener.

## Kapan sebaiknya tidak dipakai

Event delegation bukan jawaban untuk semua situasi. Kalau sebuah halaman hanya punya satu atau dua tombol yang tidak pernah berubah, memasang listener langsung di tombolnya lebih mudah dibaca. Delegation juga tidak cocok untuk event yang tidak melakukan bubbling, misalnya `focus` dan `blur` dalam bentuk aslinya. Untuk kasus itu, ada pasangan `focusin` dan `focusout` yang melakukan bubbling.

Satu lagi yang perlu diingat: jangan memasang listener di `document` atau `body` untuk semua hal. Semakin tinggi listener dipasang, semakin banyak event yang harus melewati pemeriksaan `if` yang tidak relevan. Pasang di induk terdekat yang masuk akal, misalnya `<ul>` untuk daftar, atau `<table>` untuk baris tabel.

## Penutup

Event delegation adalah salah satu pola yang membuat kode JavaScript terasa lebih dewasa. Satu listener di induk menggantikan puluhan listener di anak, elemen baru langsung bekerja tanpa kode tambahan, dan semua aksi terpusat di satu tempat yang mudah dilacak.

Kalau kamu sedang membangun daftar, tabel, atau galeri dengan banyak elemen yang bisa diklik, coba tulis ulang dengan pola ini. Kemungkinan besar kodenya jadi lebih pendek, dan bug tombol baru yang tidak berfungsi akan hilang dengan sendirinya.
