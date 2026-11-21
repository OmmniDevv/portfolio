---
title: K2-Horizon: Model AI Open Source 375 Miliar Parameter
date: 2026-11-21
excerpt: IFM merilis K2-Horizon, keluarga enam model AI open source sampai 375 miliar parameter, lengkap dengan data latih dan checkpoint. Ini yang perlu kamu tahu.
tags: ai, open source, model ai, k2-horizon
image: https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1280,h_720/https://tonex.wpenginepowered.com/wp-content/uploads/iStock-1427937310S-1-1.jpg
---

Rilis model AI besar biasanya datang dengan satu paket yang sama: bobot model, kartu model singkat, dan janji "open". IFM, institut riset yang berbasis di Abu Dhabi, memilih jalan yang berbeda pada 15 sampai 17 November 2026. Mereka merilis K2-Horizon, keluarga enam model bahasa yang dibuka hampir seluruhnya, dari bobot sampai data latih dan kode infrastrukturnya.

![Ilustrasi robot dan kecerdasan buatan](https://www.intelligenthq.com/wp-content/uploads/2018/04/ai-robot-1-1024x576.webp)

## Enam model dalam satu keluarga

Keluarga K2-Horizon membentang dari checkpoint dense 0,9 miliar parameter sampai flagship mixture-of-experts 375B-A23B. Angka A23B berarti 23 miliar parameter aktif untuk setiap token yang diproses, sementara total parameternya 375 miliar. Di antaranya ada varian 36B-A4B, model dense 32B, serta ukuran menengah 7,0B dan 3,7B untuk penalaran dan coding ilmiah.

Pembagian ini bukan sekadar pamer angka. Model kecil bisa dijalankan di perangkat yang lebih terbatas, model menengah cocok untuk eksperimen dan fine-tuning, dan model terbesar ditujukan untuk coding serta pekerjaan agen AI di lingkungan perusahaan. Empat model dilatih di atas korpus bersama sebesar 22 triliun token, jadi hasil antar ukuran bisa dibandingkan secara adil.

## Yang dibuka bukan cuma bobotnya

Poin yang paling menarik dari rilis ini ada di artefaknya. IFM membuka data latih, checkpoint antara selama pelatihan, dan kode infrastruktur yang dipakai untuk melatih model. Menurut ringkasan di halaman paper Hugging Face, sekitar 10 triliun token sintetis ikut dihasilkan lewat pipeline yang mereka rilis juga.

Ini penting karena selama ini "open source" di dunia model AI sering berhenti di bobot. Tanpa data dan proses latih, peneliti lain sulit memverifikasi klaim, mereproduksi hasil, atau memperbaiki kelemahan model. Dengan artefak lengkap, tim lain bisa memeriksa sendiri apa yang masuk ke dalam model dan bagaimana model itu dibentuk.

Laporan teknis lengkapnya terbit di arXiv dengan nomor 2611.21003 pada 18 November 2026. Laporan itu menguraikan tiga kontribusi utama: MoVA, Uno, dan RL360.

## MoVA dan Uno, singkatnya

MoVA adalah mekanisme attention yang dipakai keluarga ini, dengan softplus attention gating di dalamnya. Secara sederhana, MoVA mengatur bagian mana dari konteks yang layak mendapat perhatian lebih besar saat model memproses teks panjang. Tujuannya efisiensi, yaitu model besar tetap bisa menangani konteks panjang tanpa biaya komputasi yang membengkak secepat ukuran modelnya.

Uno adalah adapter difusi yang ikut dirilis. Detail teknisnya ada di laporan arXiv, tapi intinya Uno membantu model menangani tugas yang melibatkan proses bertahap, seperti memperbaiki keluaran selangkah demi selangkah. Buat pengguna akhir, kedua teknologi ini tidak terlihat langsung. Dampaknya terasa lewat kecepatan dan kualitas jawaban.

## Kenapa rilis ini layak diperhatikan

Ada tiga alasan. Yang pertama, reproduksibilitas. Ketika data, checkpoint, dan pipeline dibuka, klaim soal kemampuan model bisa diuji ulang oleh siapa saja. Ini standar yang sudah lama diminta komunitas open source.

Yang kedua, pilihan untuk tim kecil. Model 7B dan 3,7B masih masuk akal untuk dijalankan dan di-fine-tune tanpa klaster GPU raksasa. Tim yang membangun produk di atas model terbuka sekarang punya satu keluarga baru untuk dibandingkan dengan Qwen atau Llama.

Yang ketiga, posisi IFM sendiri. K2-Horizon adalah penyegaran generasi setelah K2 Think V2 yang rilis Januari 2026. IFM yang berbasis di Abu Dhabi juga membawa catatan soal residensi data dan aturan ekspor yang perlu dipetakan tim yang ingin memirror korpus lengkapnya. Itu bukan penghalang, tapi detail yang sebaiknya dicek sebelum mengunduh puluhan triliun token.

## Yang masih perlu dicek sendiri

Rilis terbuka bukan berarti tanpa pekerjaan rumah. Bobot model terbesar tetap butuh infrastruktur serius untuk dijalankan. Lisensi dan ketentuan penggunaan tiap artefak perlu dibaca langsung di ifm.ai/k2 dan halaman Hugging Face-nya. Dan seperti biasa, angka benchmark dari lab sebaiknya dibaca berdampingan dengan pengujian independen.

Kalau kamu membangun produk AI atau sekadar mengikuti perkembangan model terbuka, K2-Horizon layak masuk daftar pantauan minggu ini. Bukan karena angkanya paling besar, tapi karena paket rilisnya paling lengkap. Model boleh canggih, tapi yang membuat komunitas bisa ikut membangun adalah keterbukaan prosesnya. Di titik itu, IFM baru saja menaikkan standar.
