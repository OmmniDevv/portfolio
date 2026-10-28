---
title: "Open Weight Bukan Open Source: Bedanya Buat Kamu"
date: 2026-10-28
excerpt: "Banyak model AI disebut terbuka padahal hanya bobotnya yang bisa diunduh. Pahami beda open weight dan open source sebelum kamu memakai atau membagikannya."
tags: ai, open source, model ai, lisensi
image: https://miro.medium.com/v2/resize:fit:1200/1*y-_XtswTZYTj-sX9amy4-w.png
---

Akhir-akhir ini hampir semua rilis model AI membawa label terbuka. Di pengumuman, di halaman unduhan, sampai di utas media sosial, kata "open" dipakai begitu saja. Masalahnya, terbuka di sini bisa berarti banyak hal yang sangat berbeda. Ada model yang benar-benar bisa kamu pelajari sampai ke akarnya, ada juga yang hanya boleh kamu unduh dan jalankan, tanpa boleh kamu ubah sesuka hati atau pakai untuk usaha.

Perbedaan yang paling sering tertukar adalah open weight dan open source. Keduanya terdengar mirip, tapi hak yang kamu dapatkan jauh berbeda. Kalau kamu salah paham, risikonya nyata: proyek yang sudah jalan bisa tiba-tiba melanggar lisensi, atau model yang kamu kira gratis ternyata tidak boleh dipakai untuk keperluan komersial.

## Open weight artinya bobotnya bisa diunduh

Model AI modern menyimpan pengetahuannya dalam angka-angka yang disebut bobot (weights). Bobot inilah yang membuat model bisa menebak kata berikutnya, mengenali pola, atau menjawab pertanyaan. Model open weight membagikan file bobot ini secara publik, sehingga kamu bisa mengunduhnya dan menjalankannya di komputermu sendiri, tanpa harus selalu terhubung ke server penyedia.

Keuntungannya jelas. Kamu tidak mengirim semua prompt ke server orang lain, kamu bisa menjalankan model secara luring, dan kamu bisa mengukur sendiri seberapa cepat atau lambat model itu di perangkatmu. Buat banyak pengembang, ini sudah cukup. Mereka hanya butuh model yang bisa jalan lokal untuk prototipe, alat internal, atau sekadar belajar cara kerja inferensi.

Tapi mengunduh bobot bukan berarti kamu tahu cara model itu dibuat. Data latihnya mungkin tidak dibagikan. Kode pelatihannya mungkin tertutup. Bahkan cara data itu dikumpulkan dan dibersihkan bisa tetap menjadi rahasia perusahaan. Kamu memegang hasil akhirnya, bukan resepnya.

![Ilustrasi jaringan saraf dan kode yang melambangkan model AI terbuka](https://aichronicle.online/wp-content/uploads/2025/11/a-futuristic-digital-brain-composed-of-neural-network-lines-and-coding-symbols-glowing-with-blue-and-green-hues-symbolizing-open-source-ai-and-advanced-reasoning-capabilities-942-600x400.png)

## Open source menuntut jauh lebih banyak

Open source punya arti yang lebih ketat. Istilah ini berasal dari dunia perangkat lunak, dan definisinya sudah lama dijaga oleh komunitas. Perangkat lunak open source harus boleh dipakai siapa saja, untuk tujuan apa saja, termasuk komersial. Kode sumbernya harus tersedia, boleh diubah, dan hasil ubahannya boleh dibagikan lagi dengan syarat yang jelas.

Terapkan standar itu ke model AI, dan syaratnya jadi panjang. Bukan hanya bobot yang dibuka, tapi juga kode pelatihan, kode inferensi, dan penjelasan tentang data latih. Pengguna harus bisa memeriksa, mengubah, dan membagikan ulang tanpa harus meminta izin tambahan. Lisensinya pun harus lisensi open source yang dikenal, seperti MIT atau Apache untuk kode, bukan dokumen syarat pakai yang ditulis sendiri oleh perusahaan dan bisa berubah sewaktu-waktu.

Karena syaratnya berat, hanya sedikit model AI yang benar-benar memenuhi definisi ini secara penuh. Banyak yang disebut "open" di berita sebenarnya hanya open weight. Labelnya tidak salah secara pemasaran, tapi menyesatkan kalau kamu menganggap semua yang terbuka itu setara.

## Lisensi adalah bagian yang paling sering dilewatkan

Bagian yang paling menentukan bukan seberapa besar modelnya, melainkan lisensi yang menyertainya. Lisensi adalah dokumen yang menjawab pertanyaan praktis: bolehkah dipakai untuk bisnis, bolehkah diubah, bolehkah dibagikan ulang, dan apakah ada kewajiban yang harus kamu penuhi.

Sebagian model open weight memakai lisensi permisif yang longgar. Kamu boleh memakai, mengubah, dan menjual hasil karyamu dengan kewajiban yang ringan, misalnya mencantumkan atribusi. Sebagian lagi memakai lisensi komunitas yang ditulis khusus. Lisensi seperti ini sering membatasi pemakaian komersial di atas ambang tertentu, melarang pemakaian untuk melatih model pesaing, atau mewajibkan kamu memakai nama dan ketentuan tambahan dari penyedia. Ada juga model yang bobotnya bisa diunduh tapi lisensinya melarang modifikasi tertentu atau pembagian ulang.

Praktik yang aman adalah membaca lisensi sebelum mengunduh, bukan sesudah proyek jadi. Cari empat hal ini. Pertama, apakah pemakaian komersial diizinkan tanpa batas. Kedua, apakah modifikasi dan fine tuning diizinkan. Ketiga, apakah pembagian ulang diizinkan dan dengan syarat apa. Keempat, apakah ada larangan khusus, misalnya untuk melatih model lain atau untuk bidang tertentu. Kalau salah satu jawabannya tidak jelas, anggap itu sebagai risiko, bukan sebagai izin.

## Pertanyaan yang sebaiknya kamu tanyakan sebelum memakai model

Supaya tidak terjebak label, biasakan bertanya dengan urutan ini saat menemukan model baru. Apakah yang dibuka hanya bobotnya, atau juga kode dan data latihnya. Lisensi apa yang berlaku, dan apakah lisensi itu dikenal luas atau ditulis khusus oleh penyedia. Apakah ada batasan pemakaian komersial atau pembagian ulang yang akan mengganggumu nanti. Dan terakhir, apakah ukuran modelnya masuk akal untuk perangkat yang kamu punya, karena model yang bisa diunduh belum tentu nyaman dijalankan.

Jawaban atas pertanyaan-pertanyaan itu menentukan banyak keputusan teknis. Model dengan lisensi ketat mungkin tetap cocok untuk belajar atau proyek pribadi, tapi tidak cocok untuk produk yang akan dijual. Model yang bobotnya terbuka tapi datanya tertutup mungkin tetap berguna untuk inferensi, tapi tidak ideal kalau kamu ingin meneliti bias atau memperbaiki perilaku model dari akarnya.

## Jadi, label apa yang harus kamu percaya

Percaya pada dokumen, bukan pada kata "open" di judul pengumuman. Halaman lisensi, repositori kode, dan dokumentasi data jauh lebih bisa dipercaya daripada klaim pemasaran. Kalau penyedia hanya membagikan bobot tanpa kode dan tanpa penjelasan data, sebut saja apa adanya: itu model open weight. Sebutan itu bukan hinaan, dan model seperti itu tetap bermanfaat. Yang keliru adalah menganggapnya setara dengan open source penuh.

Sikap ini juga membuatmu lebih tenang saat memilih. Kamu tidak perlu menolak semua model open weight, dan tidak perlu memuja semua yang berlabel terbuka. Pakai model open weight untuk belajar dan prototipe, pakai model dengan lisensi yang benar-benar jelas untuk produk yang akan kamu bagikan atau jual. Dengan begitu, proyekmu tidak hanya jalan, tapi juga berdiri di atas izin yang bisa kamu pertanggungjawabkan.
