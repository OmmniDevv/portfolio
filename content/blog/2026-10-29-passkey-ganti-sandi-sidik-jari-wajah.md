---
title: "Passkey: Ganti Sandi dengan Sidik Jari dan Wajah"
date: 2026-10-29
excerpt: "Passkey mengganti sandi yang mudah bocor dengan kunci yang tersimpan di perangkatmu. Login cukup sidik jari atau wajah, dan situs palsu tidak bisa mencurinya."
tags: keamanan, passkey, tips, privasi
image: https://tech-hack.nl/web/wp-content/uploads/2026/02/Wat-zijn-Passkeys-wachtwoorden-beveiliging-smartphone-iPhone-Android-2FA-Tech-hack-Sora-980x653.jpg
---

Coba ingat berapa banyak sandi yang kamu pakai. Email, media sosial, bank, aplikasi belajar, toko online, dan entah berapa lagi. Sebagian orang memakai sandi yang sama di mana-mana supaya mudah diingat. Sebagian lain memakai variasi kecil dari satu sandi. Keduanya berisiko: sekali satu layanan bocor, akun lain ikut terancam.

Passkey menawarkan jalan keluar yang berbeda. Alih-alih mengingat rangkaian karakter, kamu login dengan sesuatu yang sudah melekat di perangkatmu: sidik jari, wajah, atau PIN perangkat. Rasanya seperti membuka kunci HP, padahal di balik layar ada mekanisme kriptografi yang jauh lebih kuat daripada sandi biasa.

## Cara kerja passkey dalam bahasa sederhana

Passkey memakai sepasang kunci yang saling berhubungan. Satu kunci bersifat privat dan tidak pernah keluar dari perangkatmu. Kunci pasangannya bersifat publik dan disimpan oleh situs yang kamu pakai.

Saat kamu login, situs mengirim sebuah tantangan acak ke perangkatmu. Perangkat memakai kunci privat untuk menandatangani tantangan itu, tapi hanya setelah kamu membuka kunci perangkat dengan sidik jari, wajah, atau PIN. Situs lalu memeriksa tanda tangan itu dengan kunci publik yang ia simpan. Kalau cocok, kamu masuk.

Yang penting dari skema ini adalah kunci privat tidak pernah dikirim ke situs, tidak pernah diketik, dan tidak pernah terlihat olehmu dalam bentuk teks. Tidak ada sandi yang bisa disadap saat transit, tidak ada sandi yang bisa ditebak dari daftar bocoran, dan tidak ada sandi yang bisa kamu ketik secara tidak sengaja di situs palsu.

Kenapa situs palsu tidak bisa menipu passkey? Karena tantangan yang ditandatangani terikat pada domain situs yang asli. Kalau kamu diarahkan ke situs tiruan yang domainnya berbeda, perangkat tidak akan mengeluarkan tanda tangan yang valid untuk situs itu. Lapisan ini membuat passkey tahan terhadap phishing dengan cara yang tidak dimiliki sandi biasa.

## Mengaktifkan passkey di akun yang sudah kamu pakai

Langkah pastinya berbeda di tiap layanan, tapi polanya mirip. Biasanya kamu masuk ke pengaturan akun, membuka bagian keamanan, lalu mencari opsi passkey atau kunci sandi. Setelah memilih buat passkey, perangkat akan meminta konfirmasi sidik jari, wajah, atau PIN, lalu passkey tersimpan.

Beberapa layanan besar sudah mendukung passkey, termasuk akun Google, Apple, dan Microsoft, serta sejumlah bank dan toko online. Kalau layanan favoritmu belum menyediakan opsi ini, kamu tidak bisa memaksakannya. Sembari menunggu, tetap pakai sandi yang kuat dan unik, plus verifikasi dua langkah.

Saat membuat passkey, perhatikan di mana ia disimpan. Banyak perangkat menyinkronkan passkey lewat akun cloud, misalnya akun Google di Android atau iCloud Keychain di perangkat Apple. Sinkronisasi ini berguna kalau kamu ganti HP: passkey ikut pindah tanpa perlu membuat ulang satu per satu. Pastikan akun cloud itu sendiri dilindungi dengan baik, karena ia menjadi penjaga semua passkey-mu.

![Ilustrasi membuka kunci ponsel dengan sidik jari](https://www.otto.de/updated/app/uploads/2017/04/Smartphone-Fingerabruck-passwort-1200x900.jpg)

## Kalau HP hilang, apakah akun ikut hilang

Ini pertanyaan yang paling sering muncul, dan jawabannya menenangkan: tidak, asal kamu menyiapkan jalan pemulihan sejak awal. Passkey yang tersinkron lewat akun cloud bisa dipakai lagi setelah kamu masuk ke akun cloud itu di perangkat baru. Prosesnya mirip memulihkan foto dan kontak, hanya saja yang dipulihkan adalah kunci login.

Meski begitu, jangan hanya mengandalkan satu perangkat. Beberapa langkah pengaman yang layak dilakukan adalah mengaktifkan passkey di dua perangkat yang kamu percaya, misalnya HP dan laptop, menyimpan metode pemulihan yang ditawarkan layanan, dan memastikan email pemulihan masih aktif dan bisa diakses. Kalau sebuah layanan masih menyediakan kode pemulihan sekali pakai, simpan kode itu di tempat yang aman dan terpisah dari HP.

Ada satu kebiasaan yang perlu diubah: jangan lagi menganggap PIN perangkat sebagai hal sepele. Karena PIN bisa membuka passkey, PIN yang mudah ditebak seperti tanggal lahir menjadi celah. Pakai PIN yang tidak mudah ditebak orang di sekitarmu, dan aktifkan kunci layar otomatis setelah jeda singkat.

## Batasan yang perlu kamu tahu

Passkey bukan tongkat ajaib yang menyelesaikan semua masalah keamanan. Ada beberapa batasan yang perlu dipahami sebelum kamu beralih sepenuhnya.

Tidak semua situs mendukung passkey. Di layanan yang belum mendukung, kamu tetap butuh sandi. Masa peralihan ini bisa terasa membingungkan karena sebagian akun memakai passkey dan sebagian masih memakai sandi. Catat akun mana yang sudah beralih, supaya kamu tidak panik saat login.

Perangkat bersama juga butuh perhatian. Kalau kamu login di komputer umum atau HP pinjaman, jangan membuat passkey di sana. Passkey yang dibuat di perangkat orang lain berarti kunci privatnya tinggal di perangkat itu. Untuk perangkat yang bukan milikmu, tetap pakai cara login biasa dan pastikan keluar setelah selesai.

Terakhir, passkey melindungi proses login, bukan isi akun setelah kamu masuk. Kalau perangkatmu sudah terbuka dan dipakai orang lain, orang itu bisa mengakses akun yang sedang aktif. Kunci layar, jeda kunci otomatis, dan kebiasaan mengunci HP sebelum meletakkannya tetap penting.

## Layak dicoba, mulai dari satu akun

Kamu tidak perlu mengubah semua akun dalam sehari. Mulai dari satu akun penting yang sudah mendukung passkey, misalnya email utama. Email sering menjadi kunci pemulihan untuk akun lain, jadi mengamankannya memberi efek berantai yang besar.

Setelah passkey pertama aktif, coba login ulang dari perangkat lain untuk memastikan sinkronisasi berjalan. Kalau berhasil, lanjutkan ke akun berikutnya di waktu yang berbeda. Perpindahan bertahap membuatmu terbiasa dengan cara kerja baru ini tanpa tekanan.

Sandi sudah melayani kita puluhan tahun, tapi kelemahannya makin jelas: mudah ditebak, mudah bocor, dan mudah dipalsukan lewat situs tiruan. Passkey tidak meminta kita mengingat lebih banyak, justru meminta kita mengingat lebih sedikit, sambil memindahkan beban keamanan ke perangkat yang memang dirancang untuk menjaganya. Itu pertukaran yang layak dicoba.
