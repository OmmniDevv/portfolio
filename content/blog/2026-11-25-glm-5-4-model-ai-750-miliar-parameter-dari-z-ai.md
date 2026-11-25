---
title: GLM-5.4, Model AI 750 Miliar Parameter dari Z AI
date: 2026-11-25
excerpt: Z AI merilis GLM-5.4 pada 23 November 2026, model flagship pertama berbasis Loop Transformer yang menjalankan 28 lapisannya dua kali demi penalaran lebih dalam.
tags: ai, glm-5, z-ai, berita, model-ai
image: https://www.intelligenthq.com/wp-content/uploads/2018/04/ai-robot-1-1024x576.webp
---

November 2026 makin ramai saja. Setelah GPT-6.2, Gemini 4 Neon, dan Qwen4-Max, giliran Z AI yang unjuk gigi. Pada 23 November 2026, perusahaan asal Tiongkok itu merilis GLM-5.4, model flagship pertama yang memakai arsitektur Loop Transformer. Yang bikin model ini menarik bukan cuma ukurannya yang mencapai skala 750 miliar parameter, tapi cara ia berpikir.

## Sekali jalan tidak cukup, jadi diulang

Kebanyakan model bahasa besar bekerja seperti ini: data masuk, melewati puluhan lapis transformer satu kali, lalu keluar sebagai jawaban. GLM-5.4 memakai pendekatan berbeda. Model ini punya 28 lapisan GLM-5 yang dijalankan dua kali dalam satu proses penalaran. Bayangkan membaca soal ujian dua kali sebelum menjawab, putaran kedua memberi kesempatan untuk menangkap hal yang terlewat di putaran pertama.

Z AI menyebut arsitektur ini Loop Transformer. Idenya sederhana tapi tidak murahan. Alih-alih menambah lapisan baru yang berarti menambah parameter dan biaya, lapisan yang sama dipakai berulang. Hasilnya, model bisa melakukan penalaran yang lebih dalam tanpa ukuran parameternya membengkak sebanding dengan itu.

Pendekatan loop seperti ini sebenarnya bukan hal yang sepenuhnya baru. Thinking Machines Lab memakai ide serupa di Inkling 2 Mini yang rilis 20 November 2026, model looped transformer dengan 26,4 miliar parameter. Bedanya, GLM-5.4 bermain di kelas yang jauh lebih besar, 750 miliar parameter, dan ditujukan sebagai model flagship, bukan model ringan.

## Kapan bisa dipakai

Untuk saat ini, GLM-5.4 baru tersedia lewat API. Z AI menyatakan bobot terbukanya direncanakan menyusul setelah pekerjaan keamanan selesai. Ini pola yang cukup umum di industri. Model dirilis dulu dalam bentuk layanan, lalu bobotnya dibuka setelah tim keamanan memastikan tidak ada celah yang berbahaya.

Buat pengguna biasa, kabar ini mungkin terasa jauh. Tapi ada dampak praktisnya. Setiap kali lab besar merilis arsitektur baru yang terbukti bekerja, arsitektur itu biasanya menular. Setahun lalu, teknik Mixture of Experts yang dulu cuma dipakai model raksasa kini sudah ada di model kecil yang bisa jalan di laptop. Kalau Loop Transformer terbukti efisien, jangan heran kalau tahun depan model di HP kamu juga memakai trik yang sama.

![Robot dan antarmuka kecerdasan buatan](https://www.informationoverloadday.com/wp-content/uploads/2022/10/1544527500_2VL9D6_Robotics_and_Artificial_Intelligence_shutterstock_470-768x415.jpg)

## Kenapa ini penting buat kamu

Ada satu tren yang terlihat jelas dari rilis-rilis November ini. Para lab sudah tidak lagi berlomba sekadar memperbesar parameter. GPT-6.2 Sol, Gemini 4 Hydrogen, Inkling 2 Mini, sampai GLM-5.4, semuanya bicara soal efisiensi. Bagaimana caranya mendapat penalaran yang lebih baik tanpa biaya komputasi yang meledak.

Buat pengembang, ini kabar baik. Model yang lebih efisien berarti biaya API lebih murah dan latensi lebih rendah. Buat pengguna, ini berarti fitur AI di aplikasi sehari-hari bisa makin pintar tanpa harus menunggu server yang makin mahal.

GLM-5.4 sendiri masih harus membuktikan diri. Klaim arsitektur itu satu hal, hasil di benchmark dan pemakaian nyata itu hal lain. Yang jelas, November 2026 sudah mencatat 27 rilis model yang terkonfirmasi dari 13 vendor, dan GLM-5.4 menutup bulan ini dengan sebuah pertanyaan menarik. Kalau lapisan yang sama bisa dipakai dua kali, kenapa harus selalu menambah lapisan baru.

Satu hal lagi yang patut dicatat adalah posisi Z AI di peta persaingan. Lab ini memang tidak sebesar OpenAI atau Google, tapi GLM sudah punya rekam jejak yang cukup panjang. Seri GLM sebelumnya dipakai luas lewat API dan model terbukanya, dan rilis kali ini menunjukkan mereka tidak mau ketinggalan di babak efisiensi. Mereka memilih jalur yang berbeda dari sekadar menumpuk parameter, dan itu pilihan yang masuk akal untuk lab yang harus bersaing dengan anggaran yang lebih kecil dari raksasa Amerika.

Buat kamu yang penasaran dan mau mencoba, jalur paling cepat adalah lewat API begitu aksesnya dibuka. Perhatikan harga per juta token dan bandingkan dengan model lain di kelas yang sama sebelum memutuskan. Model yang bagus di atas kertas belum tentu paling hemat untuk kebutuhanmu. Yang terpenting, pahami dulu apa yang mau kamu bangun, baru pilih modelnya. Arsitektur boleh baru, tapi cara memilihnya tetap sama.
