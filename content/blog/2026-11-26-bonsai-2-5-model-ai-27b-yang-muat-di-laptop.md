---
title: Bonsai 2.5, Model AI 27B yang Muat di Laptop Biasa
date: 2026-11-26
excerpt: PrismML merilis Bonsai 2.5, model AI 27 miliar parameter dengan bobot cuma 5,9 GB. Skor coding-nya naik jauh dan bisa jalan lokal di laptop.
tags: ai, bonsai, model-ai, open-source, coding
image: https://mpost.io/wp-content/uploads/IMG_1808-1024x548.jpg.webp
---

Tanggal 24 November 2026, PrismML merilis Bonsai 2.5 27B. Ini model AI open source berbasis Qwen3.8 27B yang dirancang buat satu tugas spesifik, jadi otak coding agent yang jalan di mesin lokal. Bobotnya cuma 5,9 GB, kira-kira seukuran satu film Blu-ray. Buat model 27 miliar parameter, angka itu kecil sekali. Biasanya model sebesar ini butuh puluhan GB dan kartu grafis kelas atas.

Yang menarik bukan cuma ukurannya. PrismML mengklaim model ini jauh lebih kuat dari pendahulunya di tugas coding yang melibatkan banyak langkah, seperti memperbaiki bug, menjalankan perintah terminal, dan memakai tool secara berurutan. Kalau klaim itu benar, laptop biasa bisa menjalankan asisten coding yang tidak perlu mengirim kode kamu ke server mana pun.

## Kenapa bobotnya bisa sekecil itu

Rahasianya ada di teknik yang namanya ternary quantization. Model bahasa biasa menyimpan setiap parameter sebagai angka presisi tinggi, biasanya 16 bit. Bonsai memakai bobot ternary, yang intinya menyimpan setiap parameter hanya dalam tiga nilai, kira-kira minus satu, nol, dan plus satu.

Konsekuensinya langsung terasa. File model menyusut drastis karena tiap parameter cuma butuh sedikit bit. Itulah kenapa model 27 miliar parameter bisa dikemas jadi 5,9 GB. Sebagai perbandingan, versi full precision dari model dasarnya butuh puluhan GB dan kartu grafis dengan VRAM besar.

Tentu ada harga yang dibayar. Kompresi seagresif ini biasanya mengorbankan sedikit kemampuan. Pertanyaannya selalu sama, seberapa besar kemampuan yang hilang dan apakah pengorbanannya sepadan dengan ukuran yang didapat. PrismML menjawab dengan angka benchmark, dan angkanya memang terlihat bagus.

## Skornya naik, tapi baca dengan kepala dingin

Di SWE-bench Verified, benchmark yang menguji kemampuan model memperbaiki issue di repo sungguhan, skor Bonsai naik dari 60,8 di versi sebelumnya jadi 75,6. Sebagai pembanding, model dasarnya dalam versi full precision dapat skor 80,6. Artinya model terkompresi ini kehilangan sekitar 5 poin dari model aslinya, tapi tetap jauh lebih kuat dari pendahulunya.

Di DeepSWE v1.1, benchmark lain untuk tugas coding berbasis agent, skornya naik dari 0 jadi 27. Nol di sini bukan berarti model lama tidak bisa apa-apa, tapi harness agent yang dipakai tidak berhasil menyelesaikan satu pun tugas dengan model lama. Loncatan ke 27 menunjukkan model baru ini akhirnya bisa menyelesaikan tugas berantai, bukan cuma menjawab satu pertanyaan lalu berhenti.

Ada satu catatan yang jujur dari PrismML. Di LiveCodeBench v6, benchmark pemrograman kompetitif, skor Bonsai 2.5 tidak naik dari Bonsai 2. Jadi peningkatan ini spesifik di tugas agent dan perbaikan kode, bukan di semua jenis coding.

Semua angka ini datang dari PrismML sendiri, bukan dari pengujian independen. Sampai ada pihak ketiga yang menjalankan benchmark yang sama di perangkat yang sama, anggap angka ini sebagai klaim yang menjanjikan, bukan fakta final.

![Robot sedang menulis kode di laptop](https://skill-mine.com.sa/wp-content/uploads/2025/02/robot-is-holding-laptop-is-surrounded-by-computer-screens-scaled.jpg)

## Jalan di perangkat apa saja

PrismML merilis bobot Bonsai 2.5 di bawah lisensi Apache 2.0, jadi siapa saja bebas mengunduh, memakai, bahkan memakai ulang secara komersial. Model ini didukung llama.cpp di perangkat NVIDIA dan Intel, serta MLX di perangkat Apple. Praktisnya, laptop dengan RAM 16 GB sudah cukup untuk mencoba, meski perlu diingat bahwa ukuran file 5,9 GB bukan berarti kebutuhan memori total cuma segitu.

Saat model jalan, ada memori tambahan untuk konteks percakapan, cache attention, dan buffer runtime. Makin panjang konteks yang dipakai coding agent, makin besar memori yang dibutuhkan. Jadi kalau mau serius memakai Bonsai 2.5 untuk kerja harian, siapkan RAM lebih dari sekadar ukuran file modelnya.

## Buat siapa model ini cocok

Kelompok yang paling diuntungkan adalah pengembang yang bekerja dengan kode sensitif. Kalau repo perusahaan tidak boleh keluar dari mesin sendiri, model lokal seperti ini jadi jawaban yang masuk akal. Tidak ada data yang dikirim ke API luar, tidak ada tagihan per token, dan model tetap jalan walau internet mati.

Kelompok kedua adalah mereka yang ingin bereksperimen dengan coding agent tanpa biaya bulanan. Menjalankan agent di model cloud bisa cepat menghabiskan kredit, apalagi kalau agent itu menjalankan banyak langkah dan memanggil tool berkali-kali. Model lokal menghilangkan biaya itu, diganti dengan biaya listrik dan perangkat yang sudah dimiliki.

Buat pengguna biasa yang cuma butuh chatbot untuk tanya jawab, Bonsai 2.5 mungkin bukan pilihan pertama. Model ini dioptimalkan untuk coding agent, bukan percakapan umum.

## Yang masih harus dibuktikan

Ada tiga hal yang perlu diuji sebelum model ini bisa direkomendasikan tanpa ragu. Yang pertama, apakah skor benchmark PrismML bisa direplikasi di perangkat dan repo yang berbeda. Yang kedua, berapa sebenarnya kebutuhan memori puncak saat agent bekerja dengan konteks panjang dan banyak tool. Yang ketiga, seberapa sering agent menyelesaikan tugas tanpa melakukan kesalahan yang merusak kode, seperti menghapus file yang salah atau menjalankan perintah yang tidak diminta.

Bonsai 2.5 adalah bukti bahwa arah perkembangan model AI sudah bergeser. Bukan lagi sekadar memperbesar parameter, tapi membuat model yang sudah besar bisa muat di perangkat biasa tanpa kehilangan terlalu banyak kemampuan. Kalau tren ini berlanjut, asisten coding lokal yang kuat bukan lagi barang mewah. Ia akan jadi standar, sama seperti editor kode yang hari ini ada di semua laptop pengembang.
