---
title: Mercury 3, Model Diffusion yang Tembus 1000 Token per Detik
date: 2026-10-23
excerpt: Mercury 3 dari Inception Labs diklaim menembus 1000 token per detik lewat diffusion. Simak cara kerjanya dan bedanya dengan model autoregresif biasa.
tags: ai, llm, diffusion, model bahasa
image: https://seng.hkust.edu.hk/sites/default/files/2024-08/AI-Cover-Photo-English.jpg
---

Hampir tiap pekan ada model bahasa baru yang diumumkan. Kebanyakan bedanya cuma soal ukuran parameter atau harga per token. Yang muncul sekitar 19 Oktober 2026 kemarin sedikit berbeda: Inception Labs merilis Mercury 3, model bahasa berbasis diffusion yang diklaim menghasilkan lebih dari 1.000 token per detik. Yang menarik bukan cuma angkanya, tapi cara ia menghasilkan teks yang memang beda jalur dari model-model yang kita kenal.

## Cara kerja yang dibalik: diffusion vs autoregresif

Model bahasa yang kita pakai sehari-hari, dari GPT sampai Claude, Gemini, dan Llama, bekerja secara autoregresif. Ia memprediksi satu token berikutnya, menempelkannya di akhir kalimat, lalu memakai hasil itu untuk memprediksi token selanjutnya. Proses ini diulang ratusan kali sampai respons selesai. Cepat atau lambatnya jawaban ditentukan oleh seberapa cepat tiap langkah berjalan, karena langkah-langkahnya berurutan dan tidak bisa diparalelkan. Satu langkah harus selesai dulu sebelum langkah berikutnya mulai.

Model diffusion membalik pendekatannya. Ia mulai dari derau, sekumpulan token acak yang belum punya makna, lalu memperbaikinya sedikit demi sedikit dalam beberapa iterasi sampai terbentuk kalimat yang utuh. Karena setiap iterasi memperbarui banyak posisi token sekaligus, bukan satu per satu dari kiri ke kanan, prosesnya bisa jauh lebih paralel. Inilah sumber kecepatannya.

Analoginya begini: model autoregresif menulis seperti mengetik, satu huruf per ketukan, tidak bisa melompat. Model diffusion menulis seperti membuat sketsa buram dulu, lalu memperjelas garisnya beberapa kali sampai jadi gambar yang utuh. Keduanya sampai ke hasil akhir, tapi rute yang ditempuh beda.

Teknik diffusion sendiri bukan barang baru. Ia lebih dulu populer di dunia gambar, dipakai oleh generator gambar yang mengubah noise menjadi foto dalam beberapa langkah denoising. Yang dilakukan Inception Labs adalah membawa ide yang sama ke dunia teks, dan Mercury 3 adalah generasi ketiganya. Generasi sebelumnya, Mercury Coder, sudah memakai pendekatan diffusion khusus untuk menulis kode dan sempat menarik perhatian karena kecepatannya.

![Ilustrasi jaringan saraf kecerdasan buatan](https://vop.org/wp-content/uploads/2024/03/Artificial_Intelligence.jpg)

## Kenapa angka 1000 token per detik itu penting

Untuk konteks, model-model cepat yang umum dipakai hari ini biasanya menghasilkan puluhan sampai ratusan token per detik. Klaim empat digit menempatkan Mercury 3 di kelas kecepatan yang berbeda. Dampak praktisnya paling terasa di tiga skenario.

Pertama, coding assistant yang menulis file panjang. Menunggu model menyelesaikan satu file 500 baris itu pengalaman yang akrab bagi banyak developer. Kalau throughput naik berkali-kali lipat, jeda itu menyusut drastis.

Kedua, AI agent yang bekerja dalam banyak langkah. Agent modern tidak cuma menjawab sekali, ia memanggil tool, membaca hasil, merencanakan langkah berikut, berulang-ulang. Setiap putaran butuh token keluar, jadi kecepatan generasi langsung memangkas waktu total tugas.

Ketiga, aplikasi real-time seperti voice agent atau penerjemah langsung, di mana jeda setengah detik saja sudah terasa mengganggu.

Tapi ada catatan jujur yang perlu dipasang. Angka dari vendor selalu diukur pada kondisi terbaik. Kualitas keluaran pada kecepatan maksimum belum tentu sama dengan kecepatan normal, karena model diffusion punya trade-off bawaan: makin sedikit iterasi denoising, makin cepat, tapi hasilnya makin kasar. Selain itu diffusion untuk teks masih pendatang baru, jadi ekosistem tooling, evaluasi benchmark, dan pengalaman deployment-nya belum sematang model autoregresif yang sudah digarap bertahun-tahun. Angka besar itu titik awal diskusi, bukan alasan untuk langsung memindahkan workload produksi.

## Pekan yang sibuk untuk rilis model

Mercury 3 tidak datang sendirian. Pekan yang sama diwarnai beberapa pengumuman lain yang menunjukkan arah industri. MiniMax merilis M3.1 Flash dengan harga 0,15 dolar per juta token input dan 0,60 dolar per juta token output, diklaim 70 persen lebih murah dan tiga kali lebih cepat dari generasi sebelumnya, dengan bobot model yang dijadwalkan dibuka pada 23 Oktober. Mistral meluncurkan Timestral, seri model khusus peramalan deret waktu dalam empat ukuran dari 5 juta sampai 209 juta parameter, yang dirancang bisa berjalan di server internal perusahaan.

Kalau ditarik benang merahnya, polanya jelas: harga inferensi turun, kecepatan naik, dan model makin terspesialisasi per tugas. Buat developer, ini kabar baik. Biaya yang dulu jadi penghalang untuk bereksperimen dengan AI makin lama makin murah, dan pilihan arsitektur makin beragam.

## Apa artinya buat developer Indonesia

Buat kebanyakan dari kita, Mercury 3 hari ini lebih menarik sebagai tanda arah industri daripada tool yang langsung dipakai besok pagi. Diffusion untuk teks masih perlu pembuktian di kualitas dan kestabilan jangka panjang. Tapi kalau pendekatannya terbukti solid, bottleneck "model mengetik satu huruf per langkah" yang selama ini kita anggap sudah given ternyata bisa dipecahkan dengan cara berpikir yang berbeda.

Yang realistis dilakukan sekarang: pantau perkembangannya, coba sendiri kalau aksesnya dibuka, dan ukur di workload masing-masing. Jangan percaya angka marketing mentah-mentah, tapi jangan juga menutup mata pada ide baru cuma karena beda dari kebiasaan. Industri model bahasa sedang bergerak cepat, dan yang menang biasanya yang mau menguji, bukan yang cuma membaca pengumuman.

Sumber: rangkuman berita AI note.com dan aipster.com, Oktober 2026.
