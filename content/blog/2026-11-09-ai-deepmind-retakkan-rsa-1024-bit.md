---
title: "AI DeepMind Retakkan RSA 1024-bit, Enkripsi Lama Terancam?"
date: 2026-11-09
excerpt: "Google DeepMind mengumumkan agen AI-nya menemukan dua kelemahan pada RSA 1024-bit. Bukan akhir enkripsi, tapi peringatan soal kunci lama yang masih dipakai."
tags: ai, keamanan, enkripsi, deepmind, teknologi
image: https://www.scoop.my/canon/uploads/2023/11/cybersecurity-unsplash-1024x683.jpg
---

Pada 6 November 2026, Google DeepMind mengumumkan sesuatu yang langsung bikin komunitas keamanan siber ramai. Agen AI mereka, yang bekerja di bawah pengawasan manusia dan kriptografer akademis, menemukan dua kelemahan yang sebelumnya tidak diketahui pada RSA 1024-bit. Bukan kunci RSA modern yang jebol, tapi tetap saja kabar ini penting, karena RSA 1024-bit masih berseliweran di sistem-sistem lama.

![Ilustrasi keamanan siber dan enkripsi](https://www.securitymagazine.com/ext/resources/2024/07/22/Two-opened-padlocks-on-keyboard-UNSPLASH.webp?t=1721662490)

## Yang sebenarnya terjadi

Supaya tidak salah paham, mari luruskan dulu. DeepMind tidak memecahkan RSA 1024-bit dari nol di laptop biasa. Yang mereka lakukan adalah reproduksi tersandbox terhadap sebuah kunci 1024-bit yang sebenarnya sudah pernah dipecahkan oleh tim akademis, dan hasil kerja tim itu sudah dipublikasikan di arsip IACR ePrint pada bulan September.

Di dalam reproduksi itu, agen AI menemukan dua celah yang belum pernah dicatat sebelumnya. Menurut laporan DeepMind, agen mereka memakai CPU 3,5 kali lebih sedikit dibanding memfaktorkan kunci itu secara langsung. Angka pengali itu masih bersifat teoretis, bukan hasil pengukuran ujung ke ujung di kondisi nyata. Tetap saja, ini bukti bahwa AI sudah bisa berkontribusi nyata di riset kriptanalisis, bukan cuma jadi alat bantu penulisan kode.

Pengumuman ini disampaikan oleh Pushmeet Kohli, VP of Science di DeepMind. Ia menekankan bahwa agen bekerja bersama manusia, bukan sendirian. Kriptografer akademis ikut mengawasi dan memvalidasi setiap langkah.

## Kenapa RSA 1024-bit masih relevan

Kalau RSA 1024-bit sudah lama dianggap lemah, kenapa temuan ini masih ramai dibicarakan? Jawabannya sederhana, kunci lama itu belum sepenuhnya pensiun.

Standar modern memakai RSA 2048-bit atau lebih, dan banyak sistem sudah pindah ke kurva eliptik. Tapi di lapangan, masih ada perangkat lama, sertifikat yang belum diperbarui, dan sistem internal perusahaan yang memakai kunci 1024-bit karena "selama ini jalan terus". Temuan DeepMind menambah satu alasan lagi untuk segera mengganti kunci-kunci itu, sebelum ada yang memanfaatkannya lebih dulu.

Ini juga bukan soal satu algoritma saja. Pesan yang lebih besar adalah kecepatan riset keamanan ikut berubah. Kalau agen AI bisa mempersingkat kerja kriptanalisis yang dulu memakan waktu berbulan-bulan, maka jadwal migrasi ke kriptografi yang lebih kuat ikut dipercepat. Organisasi yang menunda-nunda migrasi ke standar pasca-kuantum, misalnya, punya alasan tambahan untuk bergerak sekarang.

## Yang tidak perlu dikhawatirkan (untuk saat ini)

Ada tiga hal yang perlu dijaga supaya tidak panik berlebihan.

Pertama, RSA 2048-bit dan yang lebih besar tidak disentuh oleh temuan ini. Kunci yang kamu pakai di HTTPS, SSH, atau enkripsi pesan sehari-hari umumnya sudah jauh di atas 1024-bit.

Kedua, temuan ini berupa kelemahan pada satu kunci dalam kondisi laboratorium, bukan alat pemecah enkripsi massal yang bisa diunduh siapa saja. DeepMind mempublikasikannya lewat jalur akademis, bukan sebagai senjata.

Ketiga, AI di sini bekerja sebagai asisten riset, bukan peretas otonom. Setiap langkahnya diawasi manusia dan kriptografer. Yang berubah adalah kecepatan riset, bukan hilangnya kontrol manusia.

## Pelajaran buat kita yang bukan kriptografer

Kamu tidak perlu jadi ahli matematika untuk mengambil pelajaran dari kabar ini.

Cek sertifikat dan kunci yang dipakai layananmu. Kalau masih ada yang memakai RSA 1024-bit, itu sudah waktunya diganti, terlepas dari kabar DeepMind. Banyak penyedia hosting dan layanan cloud sudah menolak kunci di bawah 2048-bit secara default, jadi kalau kamu masih menemukannya, kemungkinan itu sistem yang sudah lama tidak disentuh.

Perbarui juga perangkat lunak yang sudah lama tidak di-update. Kelemahan kriptografi sering diperbaiki lewat update library, bukan lewat pengumuman besar. Library TLS, SSH, dan VPN yang tertinggal beberapa tahun bisa menyimpan masalah yang sudah diketahui publik.

Terakhir, kabar ini menunjukkan arah yang jelas. AI makin masuk ke riset keamanan tingkat lanjut, dan celah yang dulu butuh tim besar plus waktu lama bisa ditemukan lebih cepat. Buat penyerang, itu kabar buruk yang sama. Buat kita semua, itu alasan untuk tidak menunda perbaikan keamanan yang sebenarnya sudah bisa dilakukan dari kemarin.

RSA 1024-bit tidak mati kemarin, tapi umurnya makin pendek. Dan kali ini, yang mempersingkat bukan cuma teori di atas kertas, melainkan agen AI yang benar-benar mengerjakannya.
