---
title: "Supabase Akuisisi Turso: Satu Database untuk Setiap AI Agent"
date: 2026-10-04
excerpt: "Supabase mengakuisisi Turso, perusahaan di balik SQLite versi Rust. Alasannya: AI agent kini memutar jutaan database kecil, bukan satu database besar."
tags: ai, tren, database
image: "https://www.ssdc.cloud/modern-data-center-server-racks-with-blue-lighting.jpg"
---

Dulu rumusnya sederhana: satu aplikasi, satu database. Aplikasi kamu besar atau kecil, datanya tinggal di satu tempat yang sama. Lalu datang AI coding agent, dan rumus itu pecah.

## Yang terjadi tanggal 2 Oktober

Supabase (layanan Postgres terkelola) mengumumkan mereka mengakuisisi Turso, perusahaan yang menulis ulang SQLite dalam Rust. Keduanya mengumumkan di hari yang sama, 2 Oktober 2026, tanpa menyebut harga.

Yang menarik bukan angkanya, tapi alasannya. CEO Supabase, Paul Copplestone, menulis bahwa agent sekarang memutar "jutaan database" untuk mendukung prototipe, eksplorasi, dasbor, dan aplikasi yang mereka bangun. Supabase sendiri mengklaim meluncurkan lebih dari satu juta database per minggu.

![Ruang server data center](https://news.stocktwits-cdn.com/large_Data_center_jpg_5f0fa8e828.webp)

## Kenapa satu agent butuh satu database

Pikirkan cara agent coding bekerja. Kamu suruh dia bikin prototipe dasbor penjualan. Dia menulis kode, butuh tempat nyimpan data dummy, lalu memutar database baru. Besok kamu suruh dia bikin prototipe lain. Database baru lagi. Dalam waktu satu jam, satu agent bisa memulai lebih banyak proyek kecil daripada yang bisa dimulai seorang manusia dalam seminggu.

Di sisi Turso, pendiri mereka Glauber Costa mengatakannya lebih lugas: "One agent, one task, one user. Setiap agent layak punya database terisolasinya sendiri, dan ekonominya harus masuk akal untuk jutaan database."

Sebagai bagian dari akuisisi, Costa bergabung ke Supabase sebagai Head of Agentic Services. Jadi ini bukan sekadar beli teknologi, tapi beli orang yang sudah memikirkan masalah ini.

## Kenapa SQLite cocok untuk era agent

Pilihan Turso bukan kebetulan. SQLite itu file database tunggal, tidak butuh server, dan bisa diputar dalam hitungan milidetik. Versi Rust-nya Turso menambahkan replikasi, jadi database kecil itu tetap bisa disinkronkan.

Bandingkan dengan model lama: database baru berarti provisioning server, konfigurasi user, atur backup. Untuk manusia yang bikin satu aplikasi per bulan, itu wajar. Untuk agent yang bikin puluhan prototipe per jam, itu tidak masuk akal. Agent butuh database yang semurah dan secepat mereka menulis kode.

Inilah kenapa tesis "satu agent, satu task, satu user" penting. Isolasi berarti prototipe yang satu tidak bisa merusak data prototipe yang lain. Dan kalau satu prototipe dibuang, databasenya ikut dibuang tanpa drama.

## Ini pola yang lebih besar

Akuisisi ini cuma satu gejala. Seminggu ini saja:

- Epoch AI merilis riset: chip AI yang dikirim 2025 sampai 2027 diperkirakan bisa menjalankan 30 sampai 170 juta agent frontier secara bersamaan, atau sekitar 1,9 miliar agent dengan model open yang efisien.
- IBM mengumumkan platform agent coding mereka, Bob, bisa jalan sepenuhnya self-hosted, bahkan tanpa koneksi internet, untuk bank dan institusi yang tidak mau kode mereka keluar dari gedung.

Arahnya jelas. Agent bukan lagi fitur tambahan di IDE, tapi jadi unit kerja yang punya kebutuhan infrastruktur sendiri: komputasi, memori, dan sekarang database. OpenRouter mencatat traffic agent tumbuh jauh lebih cepat dari traffic manusia, dan 96% input sebuah agent di satu pengujian ternyata cuma membaca ulang percakapan lama. Agent haus memori dan haus database.

## Apa artinya buat developer biasa

Buat kamu yang masih level pemula, pesannya simpel: desain aplikasi dengan asumsi datanya akan diakses program lain, bukan cuma manusia. API yang rapi, schema yang jelas, dan migrasi yang bisa jalan otomatis, itu bukan lagi "best practice enterprise". Itu syarat supaya agent bisa bekerja dengan kodemu tanpa merusaknya.

Praktiknya bisa dimulai dari hal kecil. Tulis README yang menjelaskan cara menjalankan migrasi database dalam satu perintah. Pastikan schema punya constraint yang jelas, bukan cuma mengandalkan validasi di kode aplikasi. Kalau agent (atau manusia lain) salah memasukkan data, database yang menolak duluan jauh lebih murah daripada bug yang ditemukan tiga minggu kemudian.

Tren infrastrukturnya berubah cepat. Yang tidak berubah: data yang berantakan tetap bikin semua orang (dan semua agent) menderita.
