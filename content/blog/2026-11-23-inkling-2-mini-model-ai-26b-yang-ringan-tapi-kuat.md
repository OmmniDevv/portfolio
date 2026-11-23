---
title: Inkling 2 Mini, Model AI 26B yang Ringan tapi Kuat
date: 2026-11-23
excerpt: Thinking Machines merilis Inkling 2 Mini, model 26,4 miliar parameter dengan hanya 3,4 miliar parameter aktif. Kecil, hemat, dan andal untuk coding.
tags: ai, model-ai, thinking-machines, open-source
image: https://www.sciencenewstoday.org/wp-content/uploads/2025/07/bigstock-Artificial-Intelligence-Brain-207462289.jpg.webp
---

November 2026 makin ramai. Setelah Google, OpenAI, dan Alibaba merilis model barunya dalam satu minggu, giliran Thinking Machines yang ikut unjuk gigi. Pada 21 November 2026, lab yang didirikan Mira Murati ini merilis Inkling 2 Mini, sebuah model bahasa dengan 26,4 miliar parameter total dan hanya 3,4 miliar parameter aktif. Angka keduanya yang menarik, karena selisihnya menjelaskan cara kerja model ini.

Inkling 2 Mini memakai arsitektur looped Mixture-of-Experts, atau MoE berulang. Bayangkan sebuah gedung dengan sedikit lantai, tapi setiap lantai dipakai berkali-kali dengan tugas yang berbeda. Itulah gambaran kasarnya. Lapisan transformer di dalam model ini tidak disusun sekali jalan dari bawah ke atas, melainkan diputar ulang beberapa kali. Hasilnya, model bisa punya kapasitas total 26,4 miliar parameter, tapi saat menjawab satu token, hanya 3,4 miliar parameter yang benar-benar bekerja.

![Ilustrasi otak buatan dan jaringan saraf AI](https://images.squarespace-cdn.com/content/v1/5ef188567208c4234e8ed97c/1687556140604-KNN7IZDFM4ET81A9OYWI/SOCIAL+POST+-+AI.jpg?format=1500w)

## Kenapa parameter aktif itu penting

Ukuran model yang sering disebut di berita biasanya adalah total parameter. Angka itu penting untuk kapasitas, tapi bukan angka yang menentukan biaya jalan. Yang menentukan berapa besar memori dan komputasi yang dibutuhkan saat model dipakai adalah parameter aktif, yaitu bagian yang benar-benar dihitung untuk setiap token.

Di Inkling 2 Mini, rasionya sekitar satu banding delapan. Dari 26,4 miliar parameter yang tersimpan, hanya 3,4 miliar yang aktif per token. Praktisnya, kebutuhan komputasi saat inferensi jadi setara model kelas 3 miliar parameter, sementara kapasitas pengetahuannya mendekati model yang jauh lebih besar. Ini kabar baik untuk siapa pun yang menjalankan model di perangkat sendiri, karena memori dan listrik yang dibutuhkan ikut menyusut.

Pendekatan seperti ini bukan hal baru. Model MoE pada umumnya sudah memakai trik serupa, yaitu mengaktifkan sebagian "pakar" saja untuk tiap token. Yang berbeda di Inkling 2 Mini adalah lapisan yang dipakai berulang, sehingga jumlah parameter yang harus disimpan bisa ditekan lebih jauh lagi. Thinking Machines tampaknya mengejar efisiensi dari dua arah sekaligus, sedikit pakar yang aktif dan lapisan yang dipakai ulang.

## Di mana posisi model ini

Rilis ini datang di tengah banjir model November 2026. Google membawa Gemini 4 Neon, OpenAI membawa GPT-6.2 Astra dan Sol, Alibaba membawa Qwen4-Max dengan 2,4 triliun parameter. Di antara nama-nama besar itu, Inkling 2 Mini mengambil jalur yang berbeda. Ia tidak mencoba menjadi yang terbesar, melainkan yang paling masuk akal untuk dijalankan sendiri.

Model sekelas ini biasanya menyasar pengembang yang membangun agen coding, asisten lokal, atau alat bantu riset tanpa harus menyewa klaster GPU besar. Dengan parameter aktif yang kecil, latensi bisa ditekan dan biaya per token ikut turun, dua hal yang terasa langsung saat model dipakai untuk tugas berulang seperti menulis kode atau merangkum dokumen.

Satu hal yang perlu dicatat, detail performa model ini masih terbatas karena rilisnya baru berumur beberapa hari. Skor benchmark dan perbandingan head to head dengan model sekelasnya belum banyak beredar saat artikel ini ditulis. Jadi kalau kamu berencana memakainya untuk proyek serius, tunggu evaluasi independen atau coba sendiri dengan beban kerja yang kamu punya. Klaim efisiensi memang menarik, tapi yang menentukan tetap hasil di tugas nyata.

## Yang bisa dipelajari dari rilis ini

Ada pola yang makin jelas di industri AI sepanjang 2026. Lab besar berlomba membuat model makin besar, tapi di saat yang sama muncul gelombang model kecil yang dirancang untuk hemat. Inkling 2 Mini adalah contoh gelombang kedua itu. Tujuannya bukan mengalahkan model raksasa di semua hal, melainkan memberi pilihan yang cukup baik dengan biaya yang jauh lebih rendah.

Buat pengembang, ini berarti pilihan makin banyak. Tugas berat seperti penalaran mendalam tetap bisa dilempar ke model besar lewat API, sementara tugas sehari-hari bisa dikerjakan model kecil yang jalan di perangkat sendiri. Arsitektur campuran seperti ini sudah jadi pola umum, dan rilis seperti Inkling 2 Mini membuatnya makin mudah diwujudkan.

Kalau kamu penasaran, pantau repositori dan kanal resmi Thinking Machines untuk bobot model dan lisensinya. Model kecil yang efisien hanya berguna kalau memang bisa diunduh dan dijalankan dengan bebas, jadi lisensi dan ketersediaan bobotnya layak ditunggu sebelum mengambil keputusan.
