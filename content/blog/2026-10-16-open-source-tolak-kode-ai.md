---
title: "Komunitas Open Source Mulai Menolak Kode Buatan AI"
date: 2026-10-16
excerpt: "Proyek peta open source QGIS memberlakukan moratorium kontribusi dari AI. Kenapa komunitas developer mulai menutup pintu untuk kode buatan mesin?"
tags: ai, open source, opini
image: "https://images.pexels.com/photos/12899161/pexels-photo-12899161.jpeg?auto=compress&cs=tinysrgb&w=1200"
---

Ada sesuatu yang ironis terjadi minggu ini. Di saat Google merilis Gemini 4 Argon dan mengklaim model frontier memasuki era baru, proyek peta open source QGIS justru memberlakukan moratorium: tidak ada lagi kontribusi kode dari AI. Dua peristiwa berlawanan ini menandai satu hal yang sama. Dunia sedang mendebat batas antara kecanggihan dan kualitas.

QGIS bukan proyek kecil. Ia adalah software GIS open source yang dipakai profesional pemetaan di seluruh dunia. Keputusan mereka menolak kode AI bukan lahir dari sentimen anti-teknologi. Ia lahir dari pengalaman nyata mengelola codebase besar.

## Kenapa maintainer mulai lelah?

Kontribusi open source punya standar yang tidak tertulis tapi keras: kode yang masuk harus bisa dipahami, dirawat, dan dipertanggungjawabkan oleh manusia. Kode hasil AI sering gagal di ketiga hal ini.

Pertama, volume. AI bisa menghasilkan pull request dalam hitungan menit. Maintainer yang bekerja sukarela tiba-tiba dibanjiri PR dari kontributor yang bahkan tidak benar-benar memahami kode yang mereka kirim. Waktu review yang seharusnya dipakai untuk diskusi desain habis untuk memilah mana yang masuk akal dan mana yang halusinasinya AI.

Kedua, kualitas yang menipu. Kode AI biasanya terlihat rapi. Sintaks benar, komentar sopan, struktur meyakinkan. Masalahnya muncul belakangan: edge case yang tidak ditangani, asumsi yang salah tentang arsitektur proyek, atau dependensi yang sebenarnya tidak perlu. Studi yang dikutip Ars Technica pekan ini menyimpulkan hal yang sejalan: AI coding agent terbukti menghasilkan lebih banyak kode, tapi belum tentu menghasilkan software yang lebih baik.

Ketiga, akuntabilitas. Kalau kode buatan manusia punya bug, ada orang yang bisa ditanya: kenapa kamu menulis ini? Kalau kode buatan AI punya bug, jawabannya sering: saya juga tidak tahu, saya cuma prompt. Maintainer tidak bisa mewawancarai sebuah model.

![Dua developer berdiskusi sambil melihat kode di layar komputer](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200)

## Ini bukan perang, ini negosiasi batas

Penting untuk tidak salah baca. Komunitas open source tidak sedang menyatakan AI tidak berguna. Banyak maintainer sendiri memakai AI untuk menulis boilerplate, menjelaskan kode lama, atau membuat draft dokumentasi. Yang ditolak adalah pola kontribusi di mana AI menjadi penulis utama dan manusia cuma jadi kurir yang mengklik submit.

Analoginya seperti ini: boleh pakai kalkulator saat ujian matematika, tapi kamu tetap harus paham rumusnya. Proyek open source ingin kontributor yang memahami apa yang mereka kirim, bukan operator prompt.

Beberapa proyek mengambil jalan tengah. Ada yang mewajibkan pengungkapan (disclosure) kalau kode dibantu AI. Ada yang membatasi AI hanya untuk bagian tertentu seperti dokumentasi atau test. QGIS memilih moratorium total, yang mungkin terdengar ekstrem, tapi untuk proyek dengan maintainer terbatas, larangan tegas jauh lebih murah daripada sistem verifikasi yang rumit.

## Pelajaran buat developer Indonesia

Kita mungkin bukan maintainer QGIS, tapi dinamika ini relevan untuk karier kita.

**Jangan jadi kurir prompt.** Kalau kamu mengirim kode ke repo kantor atau proyek open source tanpa benar-benar memahaminya, kamu sedang melakukan hal yang ditolak QGIS itu, cuma skalanya lebih kecil. Bedakan antara "AI membantu saya menulis" dan "AI menulis, saya cuma menyalin".

**Kualitas review makin jadi skill mahal.** Ketika semua orang bisa menghasilkan kode cepat, kemampuan membaca, mengkritik, dan memperbaiki kode jadi pembeda. Ironisnya, kemampuan inilah yang justru diasah kalau kamu belajar memahami kode AI alih-alih menerimanya mentah-mentah.

**Reputasi open source tetap dibangun manusia.** Kontribusi yang diterima komunitas bukan yang paling banyak, tapi yang paling bisa dipercaya. Satu PR kecil yang kamu pahami penuh nilainya jauh lebih besar dari sepuluh PR hasil generate yang kamu tidak bisa jelaskan.

Moratorium QGIS mungkin akan dilonggarkan suatu hari, atau justru diikuti proyek lain. Apapun arahnya, pesannya jelas: komunitas developer sedang menegaskan bahwa software yang baik lahir dari pemahaman, bukan dari kecepatan mengetik. AI boleh mempercepat tanganmu, tapi tidak boleh menggantikan kepalamu.
