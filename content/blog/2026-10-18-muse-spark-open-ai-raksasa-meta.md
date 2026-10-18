---
title: "Muse Spark Open: AI Raksasa Meta yang Jalan di Mac"
date: 2026-10-18
excerpt: "Meta merilis Muse Spark Open tanggal 15 Oktober 2026: model open-weight 816B parameter yang bisa jalan di dua Mac Studio. Ini artinya buat developer Indonesia."
tags: ai, news, meta, open-source
image: "https://cdn.pixeora.com/1766765765527-free-hd-artificial-intelligence-brain-network-digital-neurons-futuristic-cinematic-photo-pixeora.jpg"
---

Kamis, 15 Oktober 2026. Meta merilis versi open-weight dari model AI andalannya, Muse Spark. Namanya Muse Spark Open. Kalau kamu developer yang selama ini cuma bisa memakai model besar lewat API, kabar ini menarik: bobot modelnya bisa diunduh dan dijalankan sendiri, bahkan di atas meja kerja, bukan di data center.

Angkanya memang monster. Total 816 miliar parameter, tapi hanya sekitar 42 miliar yang aktif untuk tiap token berkat arsitektur mixture-of-experts. Context window-nya 1 juta token, dan inputnya multimodal sejak awal: teks, gambar, audio, sampai video bisa masuk bareng. Meta membangunnya untuk dua pekerjaan spesifik, yaitu coding dan pekerjaan agen yang berjalan lama.

## Jalan di Mac? Serius?

Bagian yang paling bikin orang melongo adalah klaim "bisa jalan di Mac". Meta bekerja sama dengan Apple supaya modelnya jalan di dua unit Mac Studio dengan chip M5 Ultra yang dihubungkan lewat framework MLX milik Apple. Dua mesin itu gabung jadi seperti satu superkomputer dengan sekitar 1 terabyte unified memory.

Jangan salah paham. Ini bukan berarti kamu bisa menjalankannya di MacBook Air sambil ngopi. Kebutuhan memorinya sekitar 1 TB. Mac Studio 512 GB yang dipakai aja belum dijual bebas saat pengumuman, dan versi 256 GB-nya dihargai di atas 10 ribu dolar AS. Versi terkuantisasi yang muat di sekitar 300 GB ada, tapi tetap jauh dari laptop biasa. Pesannya Meta jelas: model sebesar ini sudah bisa keluar dari data center dan duduk di desktop, walau desktop-nya super mahal.

Yang menarik juga adalah perdamaiannya. Apple dan Meta sudah bertahun-tahun ribut soal privasi dan kebijakan App Store. Rilis ini menandai mereka kerja bareng lagi. CEO Apple John Ternus dan CEO Meta Mark Zuckerberg saling lempar ucapan selamat di X.

![Ilustrasi model AI yang berjalan di komputer desktop](https://runwayselling.com/wp-content/uploads/2024/07/AI2.jpg)

## Open-weight bukan berarti bebas sebebasnya

Satu hal yang perlu diluruskan. Meta merilis bobot modelnya, tapi lisensinya adalah Muse Model License dengan syarat komersial yang terbatas. Artinya kamu bisa mengunduh, memodifikasi, dan menjalankan sendiri, tapi baca dulu ketentuannya sebelum dipakai untuk produk komersial. Open-weight tidak sama dengan open source penuh. Kamu dapat bobot terlatihnya, bukan seluruh data latih dan kode pelatihannya.

Bobotnya tersedia di Hugging Face dan katalog model cloud seperti Amazon SageMaker, Google Cloud Model Garden, dan Microsoft Foundry. Kalau tidak mau pusing soal hardware, akses API-nya ditawarkan beberapa provider seperti Baseten, Fireworks AI, Groq, dan Together AI.

## Seberapa bagus? Tergantung diukur dari mana

Di tabel benchmark yang dirilis Meta sendiri, Muse Spark Open mencetak 61,8 di tes agen JobBench, lebih dari dua kali lipat Inkling dari Thinking Machines Lab yang cuma 31,1. Kedengarannya hebat, tapi ingat, ini angka dari Meta sendiri.

Di sisi coding, ceritanya beda. Terminal-Bench 2.1 menempatkan Muse Spark Open di 76,4, di bawah Kimi K3 (85), GLM 5,3, dan Qwen3,8. Model open-weight dari Tiongkok masih lebih kuat di coding. Klaim Meta sebagai "model open-weight AS paling mumpuni" perlu diuji independen sebelum dipercaya penuh.

## Buat developer Indonesia, apa dampaknya?

Sebenarnya ada dua. Pertama, tren model besar yang bisa dijalankan lokal makin nyata. Buat perusahaan yang datanya sensitif dan tidak boleh keluar ke cloud, opsi menjalankan model sendiri di infrastruktur sendiri jadi makin masuk akal, walau biayanya masih besar.

Kedua, persaingan open-weight makin panas. Kimi, Qwen, GLM dari Tiongkok terus menekan dari sisi coding, Meta menekan dari sisi agen dan multimodal. Buat developer, ini kabar bagus: pilihan makin banyak, harga akses makin turun.

Tapi realistis saja. Buat kebanyakan dari kita, cara paling masuk akal menikmati model ini tetap lewat API provider, bukan menjalankan sendiri. Kecuali kamu punya dua Mac Studio nganggur di kantor, ya.

*Sumber: Reuters dan TechCrunch, 15 Oktober 2026.*

Satu catatan terakhir buat yang penasaran soal versi ringannya. Komunitas open source biasanya tidak butuh waktu lama untuk membuat versi terkuantisasi yang lebih kecil. MarkTechPost mencatat ada build 2-bit GGUF via Unsloth yang muat di sekitar 300 GB. Masih jauh dari laptop biasa, tapi trennya jelas: model raksasa makin lama makin bisa diperas ke hardware yang lebih murah. Dua tahun lalu angka 816B parameter cuma ada di data center. Sekarang sudah turun ke meja kerja. Mungkin dua tahun lagi turun ke laptop beneran.
