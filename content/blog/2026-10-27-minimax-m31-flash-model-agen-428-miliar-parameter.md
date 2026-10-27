---
title: "MiniMax M3.1 Flash: Model Agen 428 Miliar Parameter"
date: 2026-10-27
excerpt: MiniMax merilis M3.1 Flash pada 19 Oktober 2026, model 428 miliar parameter dengan konteks 1 juta token. Ini yang ditawarkan dan yang masih perlu dibuktikan.
tags: ai, minimax, model, open-weight, agen
image: https://images.ctfassets.net/jdtwqhzvc2n1/7yZajSp7oZtdo0LS8zJURB/563cbad89b03903c36ca77f3d08d78db/Gemini_Generated_Image_hszkp8hszkp8hszk.png?w=800&q=75
---

MiniMax merilis M3.1 Flash pada 19 Oktober 2026, dan bobot modelnya diunggah ke publik pada 23 Oktober. Model ini datang di tengah bulan yang padat oleh rilis model terbuka, tapi ada satu hal yang membuatnya layak diperhatikan: ia dirancang sejak awal sebagai model agen, bukan sekadar model chat yang diberi kemampuan memanggil tool belakangan.

M3.1 Flash adalah model mixture-of-experts dengan total 428 miliar parameter, dan hanya sekitar 23 miliar parameter yang aktif untuk tiap token. Arsitektur seperti ini sudah jadi pola umum di model besar tahun ini. Idenya sederhana. Model menyimpan banyak "pakar" di dalamnya, tapi tiap permintaan hanya mengaktifkan sebagian kecil, sehingga biaya komputasi per token tetap terkendali meski ukuran totalnya besar.

![Ilustrasi tangan robot yang melambangkan model AI agen](https://automationalley.com/wp-content/uploads/635168718c18b2657647b126_aihand-980x551.jpg)

## Konteks 1 juta token dan mode berpikir

MiniMax memberi M3.1 Flash jendela konteks 1 juta token. Angka itu menempatkannya sejajar dengan model-model besar lain yang dirilis bulan ini. Dalam praktik, konteks sebesar itu berguna untuk pekerjaan agen yang membaca banyak hal sekaligus, misalnya menjelajahi repositori kode, membaca dokumentasi panjang, atau memeriksa hasil dari banyak pemanggilan tool dalam satu sesi.

Tapi konteks panjang selalu datang dengan catatan yang sama. Model bisa menerima dokumen besar, tapi belum tentu mengingat detail di tengah dokumen dengan sama baiknya. Kalau kamu berencana memakai konteks 1 juta token untuk pekerjaan penting, uji dulu dengan dokumenmu sendiri. Masukkan bagian penting di awal dan di akhir, lalu periksa apakah jawabannya benar-benar merujuk ke isi dokumen, bukan sekadar menebak dari pola umum.

Satu hal menarik dari M3.1 Flash: mode berpikirnya aktif secara bawaan, dengan tingkat usaha yang bisa diatur dari rendah sampai maksimal. Pengaturan bawaan adalah maksimal. Ini masuk akal untuk model agen, karena pekerjaan agen sering butuh penalaran beberapa langkah sebelum bertindak. Konsekuensinya, respons bisa lebih lambat dan lebih mahal dibanding model yang menjawab langsung. Untuk tugas ringan seperti klasifikasi atau ekstraksi singkat, menurunkan tingkat usaha adalah langkah yang wajar.

## Harga dan klaim performa

Dari sisi harga API, M3.1 Flash dipatok 0,15 dolar per satu juta token input dan 0,60 dolar per satu juta token output. Itu harga yang agresif, dan menempatkannya di kelompok model murah untuk ukuran dan kemampuannya. Analisis dari The Decoder yang dikutip sejumlah liputan menyebut model ini naik 13 poin pada Artificial Analysis Intelligence Index sambil memangkas separuh biaya produksi dibanding pendahulunya, dengan performa yang setara DeepSeek V4.1 Flash pada harga yang sama.

Semua angka itu perlu dibaca dengan hati-hati. Skor benchmark dari pihak ketiga memang membantu, tapi tidak pernah bercerita lengkap. Benchmark mengukur tugas yang sudah ditentukan sebelumnya, sementara pekerjaan agen di dunia nyata penuh dengan instruksi yang ambigu, tool yang gagal, dan data yang berantakan. Satu-satunya uji yang benar-benar berarti adalah tugasmu sendiri, dengan data dan tool yang benar-benar kamu pakai.

Ada juga cerita kecil yang menarik di balik rilis ini. MiniMax menyebut model anonim bernama "Space Bunny" yang sempat muncul di arena pengujian publik adalah versi awal dari M3.1 Flash. Praktik seperti ini, menguji model secara anonim sebelum pengumuman resmi, sudah beberapa kali terjadi di industri ini. Tujuannya jelas, mengukur performa tanpa bias nama merek.

## Buat apa model seperti ini cocok

M3.1 Flash paling masuk akal untuk tiga jenis pekerjaan. Yang pertama adalah coding agent, misalnya memperbaiki bug di codebase, menulis tes, atau melakukan refaktor yang menyentuh banyak file. Konteks besar dan mode berpikir bawaan memang dirancang untuk alur seperti itu.

Yang kedua adalah agen riset yang membaca banyak sumber, lalu menyusun ringkasan atau laporan. Di sini, konteks 1 juta token memberi ruang untuk memasukkan banyak dokumen sekaligus, asalkan kamu tetap memverifikasi kutipan dan angka di hasilnya.

Yang ketiga adalah otomatisasi alur kerja yang melibatkan banyak langkah dan banyak tool, seperti memproses antrean tiket dukungan atau mengolah data dari beberapa sistem. Untuk pekerjaan seperti ini, harga per token yang rendah membuat eksperimen jadi lebih murah, dan bobot terbuka memberi opsi untuk menjalankan model sendiri kalau kebijakan datamu tidak mengizinkan API publik.

Di sisi lain, model ini bukan pilihan otomatis untuk semua hal. Kalau kebutuhanmu hanya menjawab pertanyaan singkat atau mengklasifikasikan teks, model yang lebih kecil dan lebih cepat akan memberi hasil yang sama dengan biaya lebih rendah dan latensi lebih singkat. Model besar baru terasa nilainya ketika tugasnya memang panjang, berlapis, dan butuh banyak konteks.

## Yang masih perlu dibuktikan

Rilis bobot terbuka pada 23 Oktober adalah kabar baik, karena komunitas bisa menguji klaim MiniMax secara independen. Tapi ada beberapa hal yang baru bisa dinilai setelah pemakaian nyata selama beberapa minggu. Yang pertama adalah kualitas agen di luar benchmark, terutama ketika tool yang dipanggil mengembalikan error atau data yang tidak sesuai harapan. Yang kedua adalah stabilitas format output, karena agen yang sering merusak format JSON atau memanggil tool dengan argumen salah akan menghabiskan waktu untuk perbaikan. Yang ketiga adalah biaya nyata, karena mode berpikir maksimal bisa membuat tagihan membengkak kalau tidak diatur.

Pola yang paling aman untuk mencoba model baru seperti ini selalu sama. Mulai dari satu tugas nyata yang sudah kamu ukur sebelumnya, bandingkan hasilnya dengan model yang sekarang kamu pakai, dan catat tiga hal: kualitas jawaban, jumlah langkah yang dibutuhkan, dan biaya per tugas. Kalau ketiganya membaik, barulah pindahkan lebih banyak beban kerja ke sana. Kalau tidak, tidak ada yang hilang selain waktu eksperimen yang singkat.

Gelombang model terbuka sepanjang Oktober menunjukkan satu arah yang makin jelas. Model besar dan murah bukan lagi pengecualian, dan kemampuan agen bukan lagi fitur tambahan. Pertanyaannya sekarang bukan lagi model mana yang paling besar, tapi model mana yang paling bisa diandalkan saat diberi pekerjaan nyata dan dibiarkan bekerja sendiri.
