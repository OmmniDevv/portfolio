---
title: "Event Delegation: Satu Listener untuk Ratusan Elemen"
date: 2026-10-20
excerpt: "Event delegation memakai satu event listener di elemen induk untuk menangani klik ratusan elemen anak. Kode lebih hemat memori dan tetap bekerja untuk elemen yang ditambah belakangan."
tags: javascript, tutorial, web, frontend
image: "https://jobs.sahla-dz.com/wp-content/uploads/2025/08/featured-2288-1024x683.jpeg"
---

Bayangkan kamu bikin daftar todo. Setiap baris punya tombol hapus. Cara yang pertama kepikiran: pasang `addEventListener` ke tiap tombol. Sepuluh baris, sepuluh listener. Seratus baris, seratus listener. Dan kalau user menambah baris baru lewat JavaScript, tombol barunya tidak punya listener sama sekali. Kamu harus pasang lagi manual.

Ada cara yang lebih rapi. Pasang satu listener di induknya, dan biarkan event-nya "naik" ke sana. Teknik ini namanya event delegation.

## Masalah dengan cara biasa

Contoh yang sering ditulis pemula:

```js
document.querySelectorAll('.hapus').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('li').remove();
  });
});
```

Ini bekerja untuk tombol yang sudah ada saat halaman dimuat. Tapi ada dua masalah. Pertama, setiap tombol makan satu listener di memori. Untuk daftar kecil tidak terasa, tapi untuk tabel dengan ribuan baris, bedanya nyata. Kedua, tombol yang dibuat belakangan (misalnya setelah fetch data dari API) tidak ikut terdaftar. Kamu harus ingat memanggil ulang kode pemasangan listener setiap kali DOM berubah, dan itu sumber bug yang menyebalkan.

## Solusinya: pasang di induk

```html
<ul id="todo-list">
  <li>Belajar JavaScript <button class="hapus">Hapus</button></li>
  <li>Baca dokumentasi <button class="hapus">Hapus</button></li>
</ul>
```

```js
document.getElementById('todo-list').addEventListener('click', (e) => {
  const btn = e.target.closest('.hapus');
  if (!btn) return; // klik bukan di tombol hapus, abaikan
  btn.closest('li').remove();
});
```

Satu listener. Menangani semua tombol yang ada sekarang maupun yang ditambahkan nanti. Tidak perlu kode tambahan saat list berubah.

![Kode JavaScript di layar editor](https://funix.edu.vn/wp-content/uploads/2019/08/67156064_405965033377428_1663567865988513792_n.jpg)

## Kenapa ini bekerja

Setiap event di DOM punya fase "bubbling": setelah event terjadi di elemen target, ia naik ke induk, lalu ke induknya lagi, sampai ke `document`. Klik di tombol `.hapus` akan naik melewati `<li>`, lalu `<ul id="todo-list">`. Listener yang kita pasang di `<ul>` ikut terpanggil, dan `e.target` tetap menunjuk elemen yang diklik (tombolnya), bukan `<ul>`-nya.

Jadi kita tidak menebak-nebak. Kita menangkap event di satu titik yang pasti dilewati semua klik di dalam daftar.

## Gunakan closest(), jangan target mentah

Satu jebakan umum: `e.target` belum tentu tombolnya. Kalau di dalam tombol ada ikon `<svg>` atau `<span>`, yang diklik bisa jadi elemen anak itu, bukan `<button>`-nya. Makanya dipakai `closest('.hapus')`: ia mencari ke atas dari titik klik sampai menemukan elemen yang cocok. Kalau tidak ketemu, hasilnya `null`, dan kita keluar dari handler dengan `return`.

Pola yang sama berlaku untuk menemukan barisnya: `btn.closest('li')` mencari `<li>` terdekat ke atas, tidak peduli seberapa dalam struktur HTML di dalam baris itu. Kode jadi tahan terhadap perubahan markup.

## Kasus lain yang cocok

Teknik ini bukan cuma untuk tombol hapus. Beberapa pola yang pas:

- **Menu tab atau navigasi**: satu listener di `<nav>`, cek `e.target.closest('a')` untuk tahu tab mana yang diklik.
- **Tabel data**: klik di sel mana pun, pakai `closest('tr')` untuk dapat barisnya, lalu baca `dataset.id`.
- **Dropdown atau accordion**: toggle class di induk terdekat tanpa pasang listener per item.
- **Form dinamis**: input yang ditambah user tetap ter-handle tanpa kode ulang.

Intinya: kapan pun kamu punya banyak elemen sejenis di dalam satu wadah, delegation hampir selalu lebih sederhana.

## Kapan sebaiknya tidak dipakai

Delegation bukan obat untuk semua. Kalau elemennya sedikit dan statis (misalnya tiga tombol di toolbar), pasang listener langsung saja, lebih mudah dibaca. Juga hati-hati memasang listener di `document` atau `body` untuk semuanya: setiap klik di halaman akan lewat sana, dan handler yang berat bisa memperlambat interaksi. Batasi container-nya sesempit mungkin, sedekat mungkin dengan elemen target.

Satu lagi: event yang tidak bubble (seperti `focus`, `blur`, atau `mouseenter`) tidak bisa didelegasikan dengan cara ini. Untuk `focus` dan `blur` ada versi capturing-nya (`focusin`/`focusout`) yang bisa dipakai sebagai gantinya.

## Penutup

Event delegation adalah salah satu pola yang memisahkan kode JavaScript yang "jalan" dari yang "tahan lama". Satu listener di induk, `closest()` untuk identifikasi, dan daftar dinamis berhenti jadi masalah. Lain kali kamu menulis `querySelectorAll` diikuti `forEach` untuk pasang listener, berhenti sejenak dan tanya: bisa tidak ini didelegasikan ke induknya?
