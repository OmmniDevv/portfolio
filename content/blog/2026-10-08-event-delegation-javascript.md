---
title: "Event Delegation: Satu Listener untuk Banyak Elemen"
date: 2026-10-08
excerpt: "Daripada menempel addEventListener ke 100 tombol satu per satu, tempel satu listener ke induknya. Begini cara kerja event delegation dan kapan memakainya."
tags: javascript, tutorial, dom, web
image: "https://images.pexels.com/photos/31177212/pexels-photo-31177212/free-photo-of-colorful-javascript-code-on-a-computer-screen.jpeg?cs=tinysrgb&dpr=1&w=500"
---

Bayangkan kamu bikin daftar todo dengan 100 item, dan tiap item punya tombol hapus. Cara paling intuitif: loop semua tombol, lalu tempel `addEventListener` ke masing-masing. Berhasil? Berhasil. Tapi ada dua masalah. Pertama, 100 listener itu boros memori. Kedua, kalau item baru ditambahkan lewat JavaScript, tombolnya tidak punya listener. Kamu harus menempel listener lagi setiap kali daftar berubah. Melelahkan.

Solusinya namanya event delegation, dan idenya sederhana: tempel satu listener ke elemen induk, lalu biarkan event "menggelembung" ke atas.

## Bubbling itu kuncinya

Di DOM, ketika kamu klik sebuah tombol, event click tidak berhenti di tombol itu. Ia naik ke atas: dari tombol ke `div` pembungkusnya, ke `body`, sampai ke `document`. Ini disebut bubbling. Event delegation memanfaatkan perilaku ini.

Contoh daftar todo:

```html
<ul id="todo-list">
  <li>Belajar JS <button class="hapus">Hapus</button></li>
  <li>Ngoding <button class="hapus">Hapus</button></li>
</ul>
```

Tanpa delegation, kamu pasang listener ke tiap `.hapus`. Dengan delegation, cukup satu:

```js
const list = document.getElementById("todo-list");

list.addEventListener("click", (event) => {
  // event.target = elemen yang benar-benar diklik
  if (event.target.classList.contains("hapus")) {
    event.target.closest("li").remove();
  }
});
```

Klik tombol hapus mana pun, event-nya naik ke `ul`, listener menangkapnya, lalu kita cek: yang diklik beneran tombol hapus atau bukan. Item yang ditambahkan belakangan lewat JavaScript otomatis ikut tertangani, karena listener-nya ada di induk yang tidak pernah berubah.

![Kode JavaScript di layar editor](https://www.finkhof-wagrain.at/wp-content/uploads/2024/03/software-developer-programming-code-on-computer-2023-11-27-05-19-58-utc-tmj1UYz9Iq-scaled.jpg)

## Kapan teknik ini paling berguna

Event delegation bersinar di tiga situasi. Daftar dinamis seperti contoh di atas adalah yang paling klasik. Yang kedua: tabel atau grid besar dengan banyak sel yang bisa diklik. Ketiga: form dengan banyak input yang butuh validasi serupa, tempel satu listener `input` di form-nya.

Tapi jangan dipakai membabi buta. Kalau cuma ada dua tiga tombol yang statis, pasang listener langsung saja. Kode yang jelas mengalahkan kode yang "pintar" tapi membingungkan. Delegation juga kurang cocok untuk event yang tidak bubbling, seperti `focus` dan `blur` (meski keduanya punya versi bubbling: `focusin` dan `focusout`).

## Jebakan yang sering kejadian

Satu kesalahan umum: lupa mengecek `event.target`. Tanpa pengecekan, klik di area kosong dalam `ul` juga memicu logika hapus. Selalu filter berdasarkan class, tag, atau atribut `data-*`.

Atribut `data-*` malah bikin pola ini makin rapi:

```js
list.addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-aksi]");
  if (!tombol) return;

  const aksi = tombol.dataset.aksi;
  if (aksi === "hapus") tombol.closest("li").remove();
  if (aksi === "selesai") tombol.closest("li").classList.toggle("done");
});
```

`closest("[data-aksi]")` mencari elemen terdekat (termasuk dirinya sendiri) yang punya atribut `data-aksi`. Kalau klik jatuh di luar tombol mana pun, hasilnya `null` dan kita keluar lebih awal. Satu listener, banyak aksi, nol pusing soal elemen baru.

Intinya: kalau kamu menemukan dirimu menulis loop hanya untuk menempel listener yang sama berkali-kali, berhentilah. Naikkan listener-nya satu tingkat, dan biarkan bubbling yang bekerja.
