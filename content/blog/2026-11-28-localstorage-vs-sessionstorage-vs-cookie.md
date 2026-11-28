---
title: localStorage vs sessionStorage vs Cookie, Bedanya Apa
date: 2026-11-28
excerpt: localStorage, sessionStorage, dan cookie sama-sama menyimpan data di browser, tapi masa hidup dan kegunaannya berbeda. Ini perbandingannya beserta contoh kode.
tags: javascript, tutorial, web, browser, frontend
image: https://img.php.cn/upload/article/000/000/000/174226346023118.jpg
---

Browser punya tiga tempat umum untuk menyimpan data: localStorage, sessionStorage, dan cookie. Ketiganya sering dipakai bergantian oleh pemula, padahal cara kerja dan masa hidupnya berbeda. Salah pilih bisa berakibat data hilang saat tidak seharusnya, atau justru data tersimpan lebih lama dari yang kamu mau.

![Dialog hapus data browsing di browser](https://images.ctfassets.net/lzny33ho1g45/7cngQAXBh5YqrCj3ASGz8P/7cfef5a059b94c9ef0bf3430e981b9ec/Screen_Shot_2025-04-15_at_3.25.18_PM.png?fm=webp)

## localStorage, data yang menetap

localStorage menyimpan data sebagai pasangan kunci dan nilai, dan datanya tetap ada sampai kamu menghapusnya lewat kode atau pengguna membersihkan data browser. Tutup tab, tutup browser, restart laptop, datanya masih ada saat kamu kembali.

Kapasitasnya sekitar 5 MB per origin, cukup besar untuk preferensi pengguna, tema gelap atau terang, dan draft yang belum selesai dikirim. Cara pakainya sederhana:

```js
// Simpan
localStorage.setItem("tema", "gelap");

// Baca
const tema = localStorage.getItem("tema");

// Hapus satu kunci
localStorage.removeItem("tema");
```

Satu hal yang wajib diingat: localStorage hanya menyimpan string. Kalau kamu menyimpan objek, ubah dulu ke JSON.

```js
const pengaturan = { bahasa: "id", notifikasi: true };
localStorage.setItem("pengaturan", JSON.stringify(pengaturan));

const dibaca = JSON.parse(localStorage.getItem("pengaturan"));
console.log(dibaca.bahasa); // "id"
```

Karena datanya menetap, jangan simpan hal sensitif di sini. Token akses dan data pribadi yang penting tidak cocok disimpan di localStorage, karena script apa pun yang berjalan di halaman itu bisa membacanya.

## sessionStorage, data yang ikut tab

sessionStorage punya API yang sama persis dengan localStorage, tapi datanya hanya hidup selama tab itu terbuka. Begitu tab ditutup, semua datanya hilang. Buka tab baru ke situs yang sama, sessionStorage-nya kosong dan terpisah.

```js
sessionStorage.setItem("langkahCheckout", "2");
console.log(sessionStorage.getItem("langkahCheckout")); // "2"
```

Ini cocok untuk data sementara yang hanya relevan di satu sesi, misalnya langkah terakhir di formulir multi halaman, filter yang sedang dipakai di halaman pencarian, atau data yang diteruskan antar halaman dalam satu alur. Kalau pengguna menutup tab lalu kembali, wajar kalau alurnya mulai dari awal.

Perlu dicatat, memuat ulang halaman tidak menghapus sessionStorage. Yang menghapusnya hanya menutup tab atau jendela. Jadi jangan kaget kalau data masih ada setelah refresh, itu memang perilaku yang dirancang seperti itu.

## Cookie, data yang ikut ke server

Cookie adalah yang tertua dari ketiganya, dan satu-satunya yang otomatis dikirim ke server di setiap request HTTP. Sifat inilah yang membuatnya cocok untuk sesi login, karena server perlu mengenali pengguna di setiap halaman yang diminta.

```js
// Cookie sederhana, berlaku 7 hari
document.cookie = "bahasa=id; max-age=604800; path=/";

// Membaca semua cookie
console.log(document.cookie);
```

Ukuran cookie jauh lebih kecil, sekitar 4 KB per cookie. Selain itu, membaca cookie lewat JavaScript terasa canggung karena hasilnya berupa satu string panjang yang harus dipecah sendiri. Untuk itu, banyak developer memakai helper kecil atau library.

```js
function bacaCookie(nama) {
  const pasangan = document.cookie
    .split("; ")
    .find((item) => item.startsWith(nama + "="));
  return pasangan ? pasangan.split("=")[1] : null;
}
```

Cookie punya pengaturan keamanan yang tidak dimiliki dua saudaranya. Atribut `HttpOnly` membuat cookie tidak bisa dibaca JavaScript, sehingga aman dari pencurian lewat script jahat. Atribut `Secure` memastikan cookie hanya dikirim lewat HTTPS, dan `SameSite` membatasi kapan cookie dikirim ke situs lain. Untuk token sesi, kombinasi ketiganya adalah standar yang umum dipakai.

## Kapan pakai yang mana

Aturan praktisnya bisa diringkas begini. Kalau data hanya dibutuhkan oleh JavaScript di browser dan boleh bertahan lama, pakai localStorage. Tema, bahasa, dan preferensi tampilan masuk kelompok ini.

Kalau data hanya relevan selama tab terbuka dan boleh hilang saat tab ditutup, pakai sessionStorage. Alur checkout, draft formulir, dan status sementara di satu halaman cocok di sini.

Kalau server perlu membaca data itu di setiap request, pakai cookie. Sesi login dan preferensi yang memengaruhi respons server adalah contohnya. Dan kalau datanya sensitif, pastikan cookie-nya memakai HttpOnly dan Secure.

Ada satu pengecualian yang sering membingungkan pemula: menyimpan token login di localStorage memang mudah, tapi bukan praktik yang aman. Token di localStorage bisa dibaca oleh script apa pun di halaman, termasuk script jahat yang lolos lewat celah XSS. Cookie dengan HttpOnly menutup celah itu karena JavaScript tidak bisa menyentuhnya sama sekali.

## Kesalahan umum yang sering terjadi

Kesalahan pertama adalah menyimpan objek tanpa JSON.stringify. Hasilnya, yang tersimpan adalah string "[object Object]", dan datanya hilang begitu saja tanpa pesan error. Selalu ubah ke JSON sebelum menyimpan, dan bungkus JSON.parse dengan try catch saat membaca, karena data yang tersimpan bisa rusak atau berubah format dari versi lama.

Kesalahan kedua adalah menganggap localStorage bersifat privat. Data di localStorage bisa dibaca oleh siapa pun yang membuka DevTools di komputer yang sama, dan oleh script pihak ketiga yang dimuat di halaman. Jangan simpan kata sandi, nomor kartu, atau token penting di sana.

Kesalahan ketiga adalah memakai cookie untuk data besar. Karena cookie dikirim di setiap request, menyimpan data berukuran besar di cookie membuat setiap request membawa beban tambahan yang tidak perlu. Simpan data besar di localStorage atau di server, dan biarkan cookie hanya membawa pengenal sesi.

## Penutup

localStorage untuk data yang menetap di browser, sessionStorage untuk data yang hidup selama tab terbuka, dan cookie untuk data yang harus dibaca server. Pilih berdasarkan siapa yang butuh data itu dan berapa lama data itu harus hidup, bukan berdasarkan mana yang paling mudah ditulis. Pilihan yang tepat membuat aplikasi lebih cepat, lebih aman, dan tidak membuat pengguna kehilangan data di saat yang tidak tepat.
