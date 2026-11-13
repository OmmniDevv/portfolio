---
title: Gemini Decision 1, Model AI yang Menjawab Tanpa Mengetik
date: 2026-11-13
excerpt: Google merilis Gemini Decision 1, model AI yang menilai pilihan dalam sekali jalan tanpa menulis teks. Harga 0,10 dolar per sejuta token input dan latensi sekitar 200 milidetik.
tags: ai, google, gemini, api
image: https://images.ctfassets.net/jdtwqhzvc2n1/4TfIIY6R65jh2mVqLpg49F/d8d05f864c08d4c8dd53496856f1053f/an-ai-thinking-deeply-d1QQ83YATmWIi27u1BpWAQ-n6j3Yxn7TMuUfTDndIEbUA-transformed.jpeg?w=800&q=75
---

Model bahasa besar biasanya bekerja dengan cara mengetik jawaban token demi token. Untuk satu pertanyaan sederhana, proses itu terasa berlebihan. Google melihat celah ini dan pada 11 November 2026 merilis Gemini Decision 1, model yang dirancang khusus untuk satu pekerjaan: menilai pilihan, bukan menulis kalimat.

Model ini diumumkan Sundar Pichai dan Logan Kilpatrick di acara AI Engineer. Bedanya dengan model Gemini biasa cukup mendasar. Decision 1 tidak menghasilkan teks panjang. Ia menerima pertanyaan, menilai semua pilihan yang tersedia dalam satu kali proses, lalu mengembalikan jawaban beserta skor keyakinan untuk tiap pilihan.

## Kenapa model seperti ini dibutuhkan

Bayangkan sebuah aplikasi yang harus mengklasifikasikan ribuan ulasan pelanggan setiap jam. Memakai model bahasa biasa untuk pekerjaan itu sama seperti menyuruh seorang penulis esai mengisi formulir pilihan ganda. Bisa, tapi lambat dan mahal. Setiap jawaban harus ditunggu sampai selesai ditulis, padahal yang dibutuhkan cuma satu huruf: A, B, atau C.

Decision 1 memangkas proses itu. Google mengklaim model ini menjawab dalam 150 sampai 250 milidetik dari ujung ke ujung, dan harganya 0,10 dolar per satu juta token input dengan output gratis. Sebagai perbandingan, Google menyebut angka itu sekitar lima kali lebih murah dari Flash-Lite. Untuk klasifikasi massal, selisih ini terasa sekali di tagihan akhir bulan.

![Robot AI yang sedang memproses data dan mengambil keputusan](https://i.postimg.cc/dVMpPqcP/autonomous-decision-making-AI-shutterstock-1987947446-700x.png)

## Apa saja yang bisa dilakukan

Model ini menerima input teks, gambar, audio, video, dan PDF. Dalam satu request, ia bisa menangani sampai 1.000 pertanyaan sekaligus, dengan konteks 256 ribu token. Format jawabannya fleksibel: ya atau tidak, pilihan ganda sampai 255 opsi, sampai penilaian berbasis rubrik.

Beberapa contoh penggunaan yang masuk akal:

- **Moderasi konten.** Menilai apakah sebuah komentar melanggar aturan atau tidak, lengkap dengan skor keyakinan. Kalau skornya rendah, kasusnya bisa dilempar ke peninjau manusia.
- **Routing tiket dukungan.** Mengarahkan keluhan pelanggan ke tim yang tepat tanpa perlu membaca satu per satu.
- **Penilaian otomatis.** Memeriksa jawaban ujian atau tugas berdasarkan rubrik yang sudah ditentukan, lalu memberi skor per kriteria.
- **Klasifikasi dokumen.** Memilah ribuan file ke kategori yang sudah ditetapkan, misalnya faktur, kontrak, atau surat lamaran.

Yang menarik, setiap jawaban disertai skor keyakinan. Ini penting karena klasifikasi bukan pekerjaan yang selalu hitam putih. Skor itu memberi ruang untuk aturan sederhana: kalau keyakinan di atas 90 persen, proses otomatis; kalau di bawah itu, serahkan ke manusia.

## Dari prototipe internal sampai rilis dalam enam minggu

Menurut laporan dari acara peluncuran, Decision 1 berawal sebagai prototipe internal di Google DeepMind. Tim kecil menyelesaikannya dan merilis API-nya sekitar enam minggu kemudian. Kecepatan ini menjelaskan kenapa Google bisa mengalahkan Anthropic dalam merilis model keputusan produksi, padahal kategori ini sudah lama dibicarakan.

Di sisi lain, perlu dicatat bahwa model ini bukan pengganti model bahasa umum. Ia tidak menulis artikel, tidak menjawab pertanyaan terbuka, dan tidak cocok untuk percakapan. Ia adalah alat khusus, dan justru di situlah kekuatannya. Alat khusus yang murah dan cepat sering lebih berguna daripada alat serba bisa yang mahal.

## Apa artinya buat developer Indonesia

Untuk developer yang membangun aplikasi dengan kebutuhan klasifikasi, model seperti ini membuka kemungkinan baru. Sebelumnya, pilihan yang ada adalah memakai model kecil yang hasilnya kurang konsisten, atau memakai model besar yang tagihannya membengkak. Decision 1 berada di tengah: kemampuan model besar untuk menilai, dengan biaya yang masuk akal untuk volume tinggi.

Satu hal yang perlu diingat: harga 0,10 dolar per sejuta token berlaku untuk input, dan output tidak dikenai biaya. Tapi biaya sebenarnya tetap tergantung seberapa banyak token yang dikirim. Prompt yang panjang dengan 1.000 pertanyaan sekaligus tetap memakan token yang tidak sedikit. Seperti biasa, ukur dulu dengan volume nyata sebelum memutuskan.

Rilis ini juga menandai arah yang lebih luas. Setelah bertahun-tahun berlomba membuat model yang makin besar dan makin pintar menulis, perusahaan AI mulai memecah pekerjaan ke model-model kecil yang khusus. Ada model untuk menulis, ada model untuk memutuskan, ada model untuk memanggil fungsi di HP. Masa depan AI mungkin bukan satu model raksasa, melainkan banyak model kecil yang masing-masing jago di satu hal.

Google merilis Gemini Decision 1 lewat Gemini Decisions API. Buat yang penasaran, dokumentasinya sudah tersedia dan model ini bisa dicoba langsung. Kalau aplikasimu banyak mengandalkan klasifikasi, ini layak dicoba sebelum tagihan model besar makin membengkak.
