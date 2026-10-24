---
title: Hy-Nomas, Model Video Tencent yang Bisa Diajak Main
date: 2026-10-24
excerpt: Tencent merilis Hy-Nomas, model dunia video open source yang merespons teks dan jalur kamera. Kamu bisa menjelajah dunia hasil AI seperti bermain game, bukan cuma menonton.
tags: ai, tencent, video ai, open source
image: https://toolnavs.com/uploads/articles/featured/4955e5ad5037bf7b.png
---

Kebanyakan model video AI bekerja dengan pola yang sama: kamu menulis prompt, model menghasilkan satu klip pendek, selesai. Kalau hasilnya kurang pas, kamu mengulang dari awal. Tencent baru saja merilis sesuatu yang mengubah pola itu. Namanya Hy-Nomas, dan ia dirancang untuk diajak main, bukan cuma ditonton.

Hy-Nomas adalah model dunia video (video world model) yang bersifat interaktif. Kamu memulai sebuah dunia dari teks atau gambar, lalu melanjutkannya dengan instruksi teks atau bahkan jalur kamera: belok kiri, maju, naik ke atas. Modelnya punya memori sehingga dunia yang kamu jelajahi tetap konsisten dari segmen ke segmen. Kalau kamu pernah memainkan game open world, bayangkan hal yang mirip, tetapi dunianya digambar ulang oleh AI setiap detik.

![Ilustrasi model dunia video interaktif dari Tencent](https://github.com/Tencent-Hunyuan/HY-WorldPlay/raw/main/assets/pipeline.png)

## Beda dengan generator video biasa

Generator video konvensional itu buta setelah klip selesai. Setiap prompt baru mulai dari nol, tidak ada hubungan dengan klip sebelumnya. Hy-Nomas justru dirancang di sekitar kontinuitas. Menurut halaman resminya di Hugging Face, generasi bisa berjalan dalam segmen-segmen dengan decoding yang mengalir di batas segmen, dan mode full-history menyimpan konteks makin banyak seiring generasi berlanjut. Artinya semakin lama kamu menjelajah, model semakin ingat bentuk dunia yang sudah kamu lewati. Pulang ke lokasi yang kamu tinggalkan lima menit lalu seharusnya tetap menunjukkan tempat yang sama, bukan pemandangan baru yang mirip-mirip.

Output videonya berjalan di 24 frame per detik, standar yang nyaman untuk mata manusia. Jujur saja, Tencent tidak menyertakan hasil evaluasi atau benchmark pada pengumumannya, jadi klaim performa praktisnya masih harus dibuktikan lewat demo yang mereka sediakan. Setidaknya ada demo interaktif daring tempat kamu bisa mencoba langsung: mulai dunia, lanjutkan dengan teks atau jalur kamera, lalu unduh video hasilnya.

## Open source betulan

Ini bagian yang menarik bagi developer. Hy-Nomas dirilis di bawah Apache License 2.0, dengan kode dan checkpoint model tersedia di Hugging Face. Ada panduan deployment web demo yang mencakup frontend, gateway, worker GPU, mode single-GPU, sampai deployment multi-host. Tencent juga menyebut dukungan adaptasi LoRA, sehingga model bisa disesuaikan untuk domain tertentu seperti robotika.

Di halaman acknowledgment-nya, Tencent berterima kasih pada tim di balik Gemma 4, Qwen3.8, Kimi-K3, DC-AE, dan MagiAttention. Detail yang menunjukkan model ini dibangun di atas fondasi riset komunitas, bukan monolit rahasia. Kombinasi lisensi terbuka, demo yang bisa dicoba tanpa install, dan dokumentasi deployment yang lengkap membuat Hy-Nomas salah satu rilis open source paling ramah praktisi bulan ini.

## Untuk apa model seperti ini

Use case paling jelas adalah prototyping game dan pra-visualisasi film. Daripada menggambar storyboard atau membangun level sementara yang memakan waktu berminggu-minggu, sutradara atau desainer bisa menjelajahi "draf dunia" yang dibuat AI untuk merasakan pacing dan komposisi adegan. Domain robotika juga disebut sebagai target adaptasi, yang masuk akal: robot butuh dunia simulasi untuk latihan, dan dunia yang bisa dijelajahi secara interaktif adalah simulator yang fleksibel.

Trennya jelas. Setelah berlomba-lomba soal resolusi dan durasi klip, laboratorium AI sekarang berlomba soal interaksi: model yang merespons, mengingat, dan bisa diarahkan secara real time. Ini bukan langkah pertama Tencent di jalur ini. Sebelumnya mereka merilis HY WorldPlay 1.5, model dunia real-time yang bisa dijelajahi dengan keyboard dan mouse lewat teknik distilasi Context Forcing, juga open source. Hy-Nomas melanjutkan garis itu ke arah generasi video yang lebih panjang dan bisa diadaptasi lewat LoRA.

Hy-Nomas adalah salah satu langkah Tencent ke arah itu, dan karena open source, langkah ini bisa dicoba siapa pun yang punya GPU, bukan cuma yang punya kontrak API.

Sumber: halaman resmi Tencent Hy-Nomas di Hugging Face, ringkasan rilis OutYet.ai (23 Oktober 2026).
