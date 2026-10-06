---
title: "Cara Membaca Error Message Tanpa Panik"
date: 2026-10-06
excerpt: "Error message bukan vonis, melainkan petunjuk lokasi. Pelajari anatominya: jenis error, pesan, dan baris kode yang bermasalah, lalu debug dengan tenang."
tags: tips, debugging, javascript, pemula
image: "https://dibitek.fr/wp-content/uploads/2025/03/digital-warning-error-message-with-glitch-effect-scaled.jpg"
---

Layar merah muncul, jantung berdebar, jari langsung menyalin semuanya ke Google tanpa membaca. Kalau itu kebiasaanmu, kamu tidak sendiri. Hampir semua pemula memperlakukan error message seperti vonis hukuman, padahal ia sebenarnya surat petunjuk yang ditulis cukup jelas. Masalahnya, kita tidak pernah diajari cara membacanya.

## Anatomi sebuah error

Ambil contoh error JavaScript yang sangat umum:

```
TypeError: Cannot read properties of undefined (reading 'nama')
    at tampilProfil (/app/user.js:12:5)
    at main (/app/index.js:4:3)
```

Tiga bagian ini cukup untuk memulai penyelidikan. `TypeError` adalah jenis errornya, dan jenis ini memberi tahu kategori masalah: kamu memperlakukan sebuah nilai seolah bertipe lain. `Cannot read properties of undefined (reading 'nama')` adalah pesannya: kode mencoba membaca properti `nama` dari sesuatu yang ternyata `undefined`. Lalu `/app/user.js:12:5` adalah lokasi persisnya: file user.js, baris 12, kolom 5.

Baris-baris di bawahnya disebut stack trace, yaitu jejak panggilan fungsi dari yang paling dalam sampai ke titik awal. Aturan bacanya sederhana: mulai dari baris paling atas yang menunjuk ke file milikmu, bukan file library. Di contoh di atas, `tampilProfil` di user.js baris 12 adalah tersangka utama.

## Empat error yang akan sering kamu temui

Daripada menghafal daftar panjang, kenali pola dari yang paling sering muncul. `Cannot read properties of undefined` hampir selalu berarti ada variabel yang kamu kira berisi objek, ternyata kosong. Penyebab klasiknya: lupa `await` pada `fetch`, atau mengakses data API sebelum responsnya datang.

`X is not defined` berbeda dengan `undefined`. Ini berarti nama variabelnya sama sekali tidak dikenal di scope itu, biasanya karena salah ketik (`usrname` vs `username`) atau lupa import.

`X is not a function` muncul saat kamu memanggil sesuatu yang bukan fungsi. Sering terjadi karena nama variabel tertimpa, misalnya parameter fungsi bernama sama dengan fungsi helper di luar.

`Unexpected token` di `JSON.parse` artinya string yang kamu parse bukan JSON valid. Sembilan dari sepuluh kasus, masalahnya ada di data yang dikirim server, bukan di kode parse-nya. Cetak dulu stringnya sebelum menyalahkan parser.

![Peringatan error di layar komputer](https://www.threatstop.com/hs-fs/hubfs/computer%20alert.png?width=455&name=computer%20alert.png)

## Cara kerja yang tenang

Saat error muncul, tahan godaan untuk mengubah banyak hal sekaligus. Langkah pertama: reproduksi. Pastikan kamu bisa memicu error yang sama berulang kali dengan langkah yang jelas. Error yang tidak bisa direproduksi tidak bisa diperbaiki dengan yakin.

Langkah kedua: baca dari lokasi yang ditunjuk, bukan dari tebakan. Buka file dan baris yang tertulis di stack trace, lalu cetak nilai variabel tepat sebelum baris itu dengan `console.log`. Dalam banyak kasus, satu baris log sudah menjawab semuanya: "oh, ternyata datanya null di sini".

Baru setelah itu Google membantu. Salin pesan error yang spesifik, idealnya dalam tanda kutip, ditambah nama library atau versinya. "Cannot read properties of undefined (reading 'map') React 19" jauh lebih berguna daripada "react error tolong". Dan kalau solusinya menyuruhmu mengubah lima hal sekaligus, curigai: solusi yang benar biasanya kecil.

Satu trik yang jarang diajarkan: klik link lokasi di console browser. DevTools Chrome dan Firefox membuat `user.js:12:5` bisa diklik dan langsung membawamu ke baris yang bermasalah di tab Sources. Kamu tidak perlu menghafal nomor baris, cukup klik. Di Node.js, pesan error di terminal juga sering bisa diklik kalau terminalmu mendukungnya.

Kalau setelah semua itu kamu masih buntu, jelaskan errornya dengan suara keras seolah sedang mengajari orang lain. Teknik ini dijuluki rubber duck debugging, dan ia bekerja karena memaksamu menyusun ulang asumsi. Sering kali, di tengah kalimat kedua kamu sudah menemukan jawabannya sendiri: "jadi datanya datang dari API... yang ternyata belum selesai di-fetch... oh."

## Error adalah teman yang jujur

Programmer senior bukan orang yang tidak pernah error. Mereka hanya sudah sering melihat pola yang sama sehingga diagnosanya cepat. Setiap error yang kamu baca sampai paham menambah satu pola ke koleksimu. Lama-lama kamu akan mengenali `undefined` yang bandel itu dari baunya saja, bahkan sebelum membuka stack trace.

Jadi lain kali layar merah muncul, tarik napas, baca tiga bagiannya, dan ikuti petunjuknya. Error message ditulis oleh programmer lain yang ingin membantumu. Hargai usahanya dengan membacanya.
