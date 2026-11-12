---
title: Lapor Bug yang Benar, Screenshot Langkah Pesan Error
date: 2026-11-12
excerpt: Laporan bug yang baik membuat masalah bisa diperbaiki dalam hitungan menit. Isinya cuma tiga hal: apa yang terjadi, langkah mengulanginya, dan bukti.
tags: teknologi, tips, debugging, kerja, programming
image: https://files.readme.io/b5e105b-report-bug-02.png
---

"Bang, aplikasinya error." Pesan seperti ini hampir tidak memberi informasi apa-apa. Error di bagian mana, setelah menekan apa, di perangkat apa, dan pesan errornya berbunyi seperti apa. Developer yang menerima laporan ini harus menebak-nebak dulu, dan tebakan itu sering salah, jadi perbaikan molor berhari-hari.

Laporan bug yang baik tidak butuh keahlian teknis. Ia cuma butuh tiga hal: apa yang terjadi, langkah untuk mengulanginya, dan bukti. Tiga hal ini memangkas waktu perbaikan secara drastis karena developer bisa langsung melihat masalahnya, bukan merekonstruksi dari nol.

## Tulis apa yang kamu lakukan, bukan kesimpulanmu

Kesalahan paling umum adalah menulis kesimpulan, bukan kejadian. "Aplikasinya rusak" adalah kesimpulan. "Setelah menekan tombol Simpan, muncul pesan merah 'Gagal menyimpan data'" adalah kejadian. Developer butuh kejadian, karena dari situlah ia menelusuri kode yang bermasalah.

Tuliskan langkahmu seperti resep masak, berurutan dan spesifik. Contoh yang bagus:

1. Buka halaman Daftar Pesanan.
2. Tekan tombol Tambah Pesanan.
3. Isi nama pelanggan "Budi", lalu tekan Simpan.
4. Muncul pesan merah "Gagal menyimpan data" dan pesanan tidak masuk daftar.

Dengan langkah seperti ini, developer bisa mengulang kejadian yang sama di perangkatnya dalam waktu kurang dari satu menit. Tanpa langkah, ia bisa menghabiskan setengah hari mencoba menebak kombinasi apa yang memicu error itu.

## Screenshot itu bukti, bukan hiasan

Screenshot menangkap hal yang sering luput dari tulisan: teks pesan error yang persis, tampilan layar saat error terjadi, dan data yang sedang tampil. Satu screenshot sering menjawab tiga pertanyaan sekaligus, dan itu menghemat bolak-balik tanya jawab.

Beberapa hal yang membuat screenshot jadi berguna, bukan sekadar gambar:

- Tangkap seluruh layar atau jendela aplikasi, jangan cuma potongan kecil yang tidak menunjukkan konteks.
- Pastikan pesan errornya terbaca. Kalau teksnya kecil, zoom dulu atau sertakan juga teks errornya dalam bentuk tulisan.
- Kalau error muncul setelah beberapa langkah, screenshot layar terakhir saja sudah cukup, selama langkah-langkahnya ditulis.

![Contoh dialog laporan bug dengan kolom deskripsi dan screenshot](https://wpmaintenancemode.com/wp-content/uploads/2026/02/What-Is-AMD-207-GPU-Driver-Error-768x448.jpg)

Satu catatan penting soal privasi. Sebelum mengirim screenshot, periksa apakah ada data sensitif yang ikut tertangkap, seperti nomor rekening, token, kata sandi, atau data pribadi orang lain. Tutupi bagian itu dulu. Screenshot yang bocor bisa jadi masalah yang lebih besar dari bug yang dilaporkan.

## Sertakan konteks perangkat

Bug yang sama bisa muncul di satu perangkat dan tidak muncul di perangkat lain. Karena itu, sertakan informasi dasar: jenis perangkat, sistem operasi, dan versi aplikasi atau browser yang dipakai. Tidak perlu detail teknis yang rumit, cukup yang kamu tahu.

Contohnya: "HP Infinix Note 30, Android 13, aplikasi versi 2.4.1" atau "Laptop Windows 11, Chrome versi terbaru". Kalau bug hanya terjadi di WiFi tertentu atau setelah update, sebutkan juga. Detail kecil seperti ini sering jadi petunjuk yang mengarah langsung ke penyebab.

Kamu juga bisa membantu dengan satu tes sederhana: coba ulangi langkah yang sama sekali lagi. Kalau error muncul lagi, berarti bisa diulang dan hampir pasti bisa diperbaiki. Kalau tidak muncul lagi, sebutkan juga. Developer jadi tahu bahwa masalahnya mungkin terkait kondisi tertentu, misalnya koneksi yang sempat putus.

## Template singkat yang bisa langsung dipakai

Kalau bingung mulai dari mana, salin format ini setiap kali menemukan bug:

**Yang terjadi:** (tuliskan apa yang kamu lihat, satu atau dua kalimat)

**Langkah mengulang:**
1. ...
2. ...
3. ...

**Yang seharusnya terjadi:** (tuliskan hasil yang kamu harapkan)

**Perangkat:** (HP atau laptop, sistem operasi, versi aplikasi)

**Bukti:** (lampirkan screenshot atau rekaman layar)

Lima bagian itu sudah cukup untuk sebagian besar laporan. Tidak perlu esai panjang. Justru laporan yang pendek dan lengkap jauh lebih cepat diproses daripada laporan panjang yang berputar-putar.

## Kenapa ini penting di luar dunia developer

Kebiasaan melaporkan masalah dengan jelas berguna di mana saja, bukan cuma di software. Laporan ke teknisi, ke layanan pelanggan, atau ke guru pembimbing punya pola yang sama: kejadian, langkah, bukti, dan konteks. Orang yang menerima laporanmu bisa langsung bekerja, bukan menghabiskan waktu bertanya hal dasar.

Jadi lain kali menemukan error, tahan dulu keinginan mengirim pesan "error kak" saja. Luangkan dua menit untuk menulis langkah, mengambil screenshot, dan mencatat perangkat. Dua menit itu bisa menghemat berjam-jam kerja orang lain, dan masalahmu selesai jauh lebih cepat.
