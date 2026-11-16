---
title: "Edge0-145B: Model AI 145 Miliar Parameter di Satu GPU"
date: 2026-11-16
excerpt: "Edge0 merilis Edge0-145B, model AI open-weight 145 miliar parameter yang dirancang jalan di satu GPU. Ini yang bikin pendekatannya beda dari model besar lain."
tags: ai, model-ai, open-source, gpu, berita
image: https://www.intelligenthq.com/wp-content/uploads/2018/04/ai-robot-1-1024x576.webp
---

Model AI besar selama ini identik dengan server raksasa. Mau menjalankan model ratusan miliar parameter, siapkan klaster GPU dan tagihan listrik yang bikin pusing. Edge0 membalik asumsi itu pada 12 November 2026 dengan merilis Edge0-145B, model open-weight 145 miliar parameter yang dirancang khusus untuk jalan di satu GPU.

Bukan cuma bobot modelnya yang dirilis. Paketnya lengkap: Edge0-145B dan saudaranya yang lebih kecil, Edge0-120B, plus dua alat pendukung di GitHub, yaitu edge0-infer dan edge0-strata. Lisensinya Apache 2.0, yang artinya siapa pun bisa memakai, memodifikasi, bahkan mengkomersialkan model ini tanpa biaya lisensi.

## Bukan sekadar model besar

Yang menarik dari Edge0-145B bukan cuma angkanya. Model ini memakai arsitektur latent sparse MoE, singkatan dari Mixture of Experts. Cara kerjanya sederhana kalau dibayangkan seperti tim ahli: untuk setiap potongan teks yang diproses, hanya sebagian kecil "ahli" di dalam model yang aktif. Sisanya diam. Hasilnya, model bisa punya kapasitas total yang besar tanpa harus menjalankan seluruh parameternya setiap saat.

Teknik tambahannya adalah predictive expert loading. Alih-alih memuat semua bobot model ke memori GPU sekaligus, sistem memprediksi ahli mana yang akan dibutuhkan berikutnya dan memuatnya lebih dulu. Ini yang membuat model 145 miliar parameter bisa muat di satu GPU NVIDIA dengan VRAM 16 GB ke atas, selama memakai CUDA 13 dan compute capability 7.5 atau lebih baru.

Buat gambaran, kartu grafis kelas konsumen seperti RTX 4070 ke atas sudah memenuhi syarat VRAM itu. Artinya, menjalankan agen AI lokal dengan model kelas ini bukan lagi monopoli perusahaan yang punya data center.

## Agen di komputer sendiri

Edge0 terang-terangan menargetkan agen di komputer pribadi, bukan sekadar chatbot. Model ini disiapkan untuk tugas agen: memakai tools, memanggil fungsi, dan bekerja dengan langkah-langkah yang panjang tanpa harus bolak-balik ke server cloud.

Checkpoint model tersedia di Hugging Face dengan nama Edge0/Edge0-145B-q3k dan Edge0/Edge0-145B-NVFP4, plus varian 120B. Alat edge0-infer versi 0.2.0 menyediakan perintah `serve` dan `chat` untuk menjalankan model secara lokal, dan server lokalnya mendukung Anthropic Messages API. Praktisnya, aplikasi yang sudah bicara dengan API Anthropic bisa diarahkan ke model lokal ini tanpa menulis ulang banyak kode.

Ada satu catatan penting. Bobot 145B tidak ikut di dalam paket unduhan edge0-infer. Kamu tetap harus mengunduh checkpointnya secara terpisah dari Hugging Face. Ukurannya besar, jadi siapkan koneksi dan ruang disk yang cukup sebelum mulai.

![Robot humanoid dengan komponen mekanik dan sirkuit bercahaya](https://www.atcgroup.co/resource/Image/ROBOTICS.jpg)

## Klaim benchmark, baca dengan hati-hati

Edge0 menyertakan tabel benchmark dalam pengumumannya, tapi sebagian besar baris di tabel itu adalah hasil evaluasi internal mereka sendiri. Artinya, angka-angka itu belum tentu sama dengan hasil pengujian independen. Sikap yang sehat adalah menganggapnya sebagai gambaran awal, bukan vonis akhir. Pengujian dari komunitas dan lembaga independen biasanya muncul beberapa minggu setelah rilis, dan dari sanalah gambaran yang lebih jujur akan terlihat.

Pola ini bukan cuma berlaku untuk Edge0. Hampir semua lab AI merilis angka terbaik dari pengujiannya sendiri. Bedanya, karena model ini open-weight, siapa pun bisa mengunduh dan mengujinya sendiri, tidak seperti model tertutup yang klaimnya tidak bisa diverifikasi.

## Kenapa rilis ini layak diperhatikan

Ada tiga hal yang membuat Edge0-145B berbeda dari rilis model besar lain di bulan November ini. Yang pertama, arahnya jelas ke bawah, ke perangkat yang dimiliki orang biasa, bukan ke atas, ke data center yang lebih besar. Yang kedua, lisensi Apache 2.0 dan bobot terbuka membuat eksperimen bisa dilakukan siapa saja, bukan cuma mitra resmi. Yang ketiga, paketnya lengkap dari awal: model, mesin inferensi, dan API yang kompatibel dengan standar yang sudah dipakai banyak aplikasi.

Tentu saja, "jalan di satu GPU" bukan berarti jalan di semua GPU. Syarat CUDA 13 dan VRAM 16 GB tetap menyaring banyak perangkat lama. Laptop tipis tanpa GPU diskret juga belum bisa ikut. Tapi ambang batasnya sudah jauh lebih rendah dibanding model sekelas ini setahun lalu, yang butuh beberapa GPU kelas data center sekaligus.

Kalau kamu tertarik mencoba, titik awalnya adalah repositori edge0-infer di GitHub dan checkpoint di Hugging Face. Cek dulu GPU yang kamu punya, pastikan driver CUDA 13 terpasang, lalu unduh varian yang sesuai. Dan seperti biasa dengan model baru, jangan langsung percaya klaim benchmarknya sebelum komunitas sempat mengujinya di tugas nyata.
