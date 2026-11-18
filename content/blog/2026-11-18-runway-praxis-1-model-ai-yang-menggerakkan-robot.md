---
title: "Runway Praxis-1: Model AI yang Menggerakkan Robot"
date: 2026-11-18
excerpt: "Runway merilis Praxis-1, model AI 27 miliar parameter yang memprediksi video dan gerakan robot sekaligus. Bobotnya terbuka di bawah lisensi Apache 2.0."
tags: ai, robot, runway, open-source
image: https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200
---

Runway dikenal sebagai perusahaan di balik alat video generatif. Pada 11 November 2026, mereka melangkah ke arah yang berbeda: merilis Praxis-1, model AI yang dirancang untuk menggerakkan robot di dunia nyata. Bukan chatbot, bukan generator gambar, melainkan model yang memprediksi apa yang harus dilakukan robot berikutnya.

Yang membuat rilis ini menarik adalah pendekatannya. Praxis-1 adalah model "world action" berukuran 27 miliar parameter. Ia memprediksi video dan aksi robot dalam satu paket yang sama. Jadi model ini tidak hanya melihat dunia, ia juga memutuskan gerakan berdasarkan apa yang ia lihat.

![Robot humanoid dengan latar teknologi](https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200)

## Kenapa video dan aksi digabung

Robot yang bekerja di rumah atau gudang menghadapi masalah yang sama: dunia terus berubah. Gelas bergeser, pintu terbuka, orang lewat. Model yang hanya membaca perintah teks akan kewalahan karena ia tidak punya gambaran tentang apa yang terjadi setelah gerakannya dieksekusi.

Praxis-1 mencoba menyelesaikan ini dengan cara yang cukup masuk akal. Model ini memprediksi frame video berikutnya sekaligus aksi yang menyertainya. Dengan begitu, ia punya semacam simulasi internal tentang akibat dari gerakannya sendiri. Kalau prediksi videonya meleset, model bisa belajar bahwa aksinya juga keliru.

Arsitekturnya adalah mixture-of-experts diffusion transformer. Istilah ini terdengar berat, tapi intinya sederhana: model punya banyak sub-jaringan ahli, dan hanya sebagian yang aktif untuk tiap masukan. Cara ini membuat model besar tetap bisa dijalankan dengan biaya komputasi yang lebih masuk akal dibanding model padat dengan ukuran yang sama.

## Skor dan lisensi yang perlu dibaca dengan tenang

Runway mengklaim Praxis-1 meraih 46,2 persen di benchmark RoboLab-120. Angka ini terdengar spesifik dan memang itu gunanya: benchmark robot memang masih muda, dan skor 46 persen menunjukkan bahwa tugas robot umum masih jauh dari kata selesai. Jangan membaca angka ini seperti skor ujian sekolah. Di dunia robotik, 46 persen pada tugas yang beragam sudah cukup untuk menarik perhatian peneliti, tapi belum berarti robotnya siap bekerja tanpa pengawasan di rumahmu.

Bagian yang paling penting dari rilis ini justru bukan skornya, melainkan lisensinya. Praxis-1 dirilis dengan bobot terbuka di bawah Apache 2.0, termasuk untuk penggunaan komersial. Artinya laboratorium kecil, startup, dan peneliti independen bisa mengunduh dan bereksperimen tanpa harus menandatangani perjanjian khusus atau membayar lisensi.

Keterbukaan seperti ini punya efek berantai. Ketika sebuah model robot dirilis terbuka, komunitas bisa menguji kelemahannya di berbagai situasi, bukan hanya di demo yang sudah disiapkan. Kelemahan yang ditemukan di publik biasanya lebih cepat diperbaiki daripada kelemahan yang hanya diketahui tim internal.

## Apa artinya buat yang bukan peneliti robot

Kalau kamu bukan peneliti robotik, kabar ini tetap relevan karena arahnya jelas. Tahun ini, model AI besar tidak lagi berhenti di layar. Setelah model bahasa dan model gambar, giliran model yang menyentuh benda fisik. Praxis-1 bergabung dengan gelombang yang sama: model yang dilatih untuk bertindak, bukan hanya menjawab.

Perbedaannya dengan rilis model bahasa pada umumnya adalah biaya mencoba. Menjalankan model bahasa bisa dilakukan di laptop biasa. Menjalankan model robot butuh robotnya. Jadi dampak langsung ke pengguna umum masih bertahap. Yang pertama merasakan adalah tim riset dan perusahaan robotik yang selama ini membangun otaknya sendiri dari nol.

Ada juga pertanyaan yang belum terjawab. Runway belum menunjukkan secara luas bagaimana Praxis-1 berperilaku di luar lingkungan yang sudah dikenalnya. Robot yang belajar dari video punya risiko meniru gerakan yang terlihat benar tapi tidak aman untuk situasi tertentu. Lisensi terbuka membantu komunitas menguji ini, tapi pengujian di dunia nyata tetap memakan waktu dan biaya.

## Cara mengikuti perkembangan ini tanpa ikut hype

Kalau kamu tertarik dengan topik ini, ada beberapa hal yang bisa dilakukan. Unduh bobot modelnya dari repositori resminya dan baca dokumentasi yang menyertainya. Perhatikan bagian yang menjelaskan data latih dan batasan model, karena bagian itu biasanya lebih jujur daripada pengumuman peluncuran.

Bandingkan juga skornya dengan model robot terbuka lain, dan lihat apakah skor tersebut diukur pada tugas yang sama. Benchmark robotik masih belum punya standar tunggal, jadi perbandingan antar model perlu dibaca dengan catatan kakinya, bukan hanya angka besarnya.

Yang terakhir, perhatikan siapa yang memakai model ini dalam beberapa bulan ke depan. Rilis terbuka yang bagus biasanya diikuti oleh proyek komunitas: ada yang mengujinya di robot murah, ada yang menulis panduan instalasi, ada yang menemukan bug. Jejak pemakaian nyata seperti itu lebih bisa dipercaya daripada siaran pers di hari peluncuran.

Praxis-1 bukan robot yang bisa kamu beli. Ia adalah otak yang bisa dipelajari siapa saja. Dan justru di situlah nilainya: robot yang bisa digerakkan model terbuka membuat riset robotik tidak lagi monopoli perusahaan besar.
