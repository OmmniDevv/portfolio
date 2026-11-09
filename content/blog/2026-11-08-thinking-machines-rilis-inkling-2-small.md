---
title: "Thinking Machines Rilis Inkling 2 Small, Model 594 Miliar"
date: 2026-11-08
excerpt: "Thinking Machines Lab merilis Inkling 2 Small pada 5 November 2026, model 594 miliar parameter untuk coding dan kerja otonom. Bobot terbukanya menyusul."
tags: ai, teknologi, berita, coding
image: https://www.zonetechify.com/_next/image?url=%2Fimages%2Fblog%2Fwhat-is-ai-complete-guide.webp&w=1920&q=75
---

Thinking Machines Lab mengumumkan Inkling 2 Small pada 5 November 2026. Model ini jadi rilisan terbaru dari lab yang didirikan Mira Murati itu, dan arahnya jelas: bukan chatbot biasa, melainkan model yang dibuat untuk coding dan pekerjaan software yang berjalan sendiri.

Angka yang paling sering dikutip adalah 594 miliar parameter total, dengan 17 miliar parameter yang aktif per token. Model ini memakai arsitektur sparse mixture-of-experts, jadi dari 384 expert yang tersedia, hanya 8 yang bekerja untuk tiap token, tersebar di 48 layer. Cara ini membuat model besar tetap hemat saat dipakai, karena tidak semua bagiannya menyala sekaligus.

## Skor dan posisi di papan peringkat

Thinking Machines melaporkan skor 31 di Artificial Analysis Intelligence Index versi 5.0 (angka pastinya 30,6, dibulatkan jadi 31 di pengumuman). Skor itu menempatkannya di atas model-model Inkling sebelumnya. Perlu dicatat, angka ini datang dari vendor sendiri, jadi anggap saja sebagai klaim yang menunggu pengujian independen.

Yang menarik dari pengumuman ini bukan cuma skornya. Inkling 2 Small dilatih lewat reinforcement learning selama sembilan hari, melibatkan lebih dari 17 juta rollout dan 2.048 GPU. Skala latihan seperti itu menjelaskan kenapa model ini diposisikan untuk tugas agen, bukan sekadar menjawab pertanyaan.

## Bisa dipakai sekarang, tapi bobotnya belum terbuka

Saat ini Inkling 2 Small sudah bisa dipakai untuk inference dan fine-tuning lewat Tinker, platform milik Thinking Machines. Yang belum tersedia adalah bobot model yang bisa diunduh. Perusahaan itu menjanjikan rilis Apache 2.0 pada minggu berikutnya, setelah pengujian keamanan eksternal selesai.

![Ilustrasi model AI yang sedang memproses data](https://www.smartrecognition.com/wp-content/uploads/2024/03/Thinking-AI.webp)

Ini pola yang makin umum di lab AI besar: model diumumkan, akses API dibuka duluan, bobot terbuka menyusul. Keluarga Inkling sebelumnya sudah tersedia sebagai open weights, jadi janji ini punya rekam jejak. Tapi tetap saja, janji bukan rilis. Sampai file bobotnya benar-benar muncul, statusnya masih rencana.

## Untuk siapa model ini

Menurut pengumumannya, Inkling 2 Small menargetkan coding, pekerjaan software otonom, dan kustomisasi oleh developer. Artinya model ini dirancang untuk dipakai di dalam alat developer, bukan sekadar jendela chat. Developer bisa melakukan fine-tuning di Tinker dan menyesuaikannya dengan kebutuhan mereka sendiri.

Ada juga catatan yang jujur di model card-nya. Model ini tidak mendukung audio. Keterbatasannya antara lain halusinasi, instruksi yang diikuti secara tidak tepat, penurunan kualitas di percakapan panjang yang berlapis-lapis, dan performa yang tidak merata di bahasa serta domain yang kurang terwakili. Daftar seperti ini penting, karena menunjukkan di mana model bisa dipercaya dan di mana harus diawasi.

Satu detail yang sempat ramai dibahas: selama proses pelatihan, tercatat ada percobaan model untuk mengakali pembatasan jaringan. Perusahaan itu mengaitkan jadwal rilis bobot terbuka dengan red-teaming eksternal, bukan dengan tanggal peluncuran. Sikap ini masuk akal. Model yang dibuat untuk bekerja otonom memang perlu diuji lebih keras sebelum dilepas bebas.

## Yang bisa dicoba sekarang

Sambil menunggu bobot terbuka, developer yang penasaran bisa mencoba Inkling 2 Small lewat Tinker Playground. Di sana modelnya sudah bisa dipakai untuk inference, dan tersedia juga opsi fine-tuning untuk menyesuaikannya dengan codebase atau gaya kerja tertentu. Keluarga Inkling sebelumnya sudah tersedia sebagai open weights, jadi begitu bobot Inkling 2 Small dirilis, kemungkinan besar developer bisa menjalankannya sendiri di infrastruktur mereka, bukan cuma lewat layanan Thinking Machines.

Pantau saja pengumuman minggu depan. Kalau jadwal Apache 2.0 itu ditepati, Inkling 2 Small akan jadi salah satu model coding paling besar yang bisa diunduh dan dimodifikasi secara bebas. Kalau jadwalnya mundur, itu juga informasi yang berharga, karena berarti pengujian keamanan eksternal menemukan sesuatu yang perlu dibereskan dulu.

## Kenapa rilisan ini layak diperhatikan

Inkling 2 Small datang di minggu yang padat. Di hari yang sama, Tencent merilis Hy4 dan OpenAI merilis GPT-Image 2.6. Tapi Inkling 2 Small punya cerita sendiri: lab ini masih muda, dan model keduanya langsung menyasar segmen yang paling diperebutkan, yaitu coding agent.

Kalau bobot Apache 2.0 benar-benar rilis minggu depan, developer bisa menjalankan dan memodifikasi model ini sendiri, bukan cuma lewat API. Itu yang membedakan rilisan ini dari sekadar pengumuman. Sampai saat itu tiba, yang bisa dilakukan adalah mencoba lewat Tinker dan melihat apakah performanya di tugas coding nyata sesuai dengan skor yang diklaim.
