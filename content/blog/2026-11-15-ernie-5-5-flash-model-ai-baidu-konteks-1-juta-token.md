---
title: "ERNIE 5.5 Flash: Model AI Baidu dengan Konteks 1 Juta Token"
date: 2026-11-15
excerpt: "Baidu merilis ERNIE 5.5 Flash Preview di Baidu World 2026: 280 miliar parameter, konteks 1 juta token, dan bobot open source sebelum 25 November."
tags: ai, baidu, ernie, model-ai, berita-ai
image: https://web.hubeiai.com/static/assets/img/bg/ai10.jpg
---

Baidu tidak mau ketinggalan dari rilisan model besar bulan ini. Di acara Baidu World 2026 di Beijing pada 12 November, perusahaan itu mengumumkan ERNIE 5.5 Flash Preview, model fondasi terbaru mereka, lengkap dengan dua model aplikasi dan sebuah marketplace token.

Angka yang diumumkan cukup menarik perhatian. Model ini punya 280 miliar parameter total dengan 14 miliar parameter aktif per token, dan jendela konteks 1 juta token. Buat yang belum familiar, arsitektur seperti ini (mixture-of-experts) hanya mengaktifkan sebagian kecil parameter untuk tiap token, jadi biaya komputasinya jauh lebih kecil dibanding ukuran totalnya.

## Yang diumumkan selain modelnya

Baidu tidak cuma membawa satu model ke panggung. Ada dua model aplikasi yang ikut diperkenalkan.

Yang pertama ERNIE Wizshot Micro-Expression, model yang membuat video dari teks, gambar, dan suara. Fokusnya ada di ekspresi mikro, detail kecil di wajah yang biasanya membuat video hasil AI terlihat kaku. Yang kedua ERNIE Light Deep Thinking, model untuk permintaan rumit dan pemanggilan tool dengan kecepatan yang diklaim setara pencarian biasa.

Selain itu ada Token Exchange, marketplace untuk membeli layanan model. Idenya mirip toko aplikasi, tapi yang dijual adalah akses ke berbagai layanan model. Baidu mematok harga API-nya 1 RMB per satu juta token input, harga yang jelas ditujukan untuk pemakaian dalam volume besar.

![Ilustrasi model AI dan robotika](https://synctech.ie/_next/image?url=%2Fproject%2Faiauto.webp&w=1200&q=75)

## Open source sebelum 25 November

Bagian yang paling ditunggu banyak developer adalah rencana open source. Baidu menyatakan akan membuka bobot model ini sebelum 25 November. Kalau janji itu ditepati, ERNIE 5.5 Flash jadi salah satu model besar yang bisa diunduh dan dijalankan sendiri, bukan cuma diakses lewat API.

Sementara menunggu bobotnya rilis, API-nya sudah bisa dipakai lewat platform Qianfan milik Baidu, dan tersedia gratis di OpenRouter. Buat developer yang penasaran, ini jalan paling cepat untuk mencoba tanpa menunggu unduhan raksasa.

## Catatan penting soal klaim benchmark

Baidu menyebut model ini kompetitif di Terminal-Bench dan AutomationBench, dua benchmark yang menguji model pada tugas coding dan otomatisasi. Hasil ini datang dari Baidu sendiri, jadi wajar dibaca dengan sedikit jarak sampai ada pengujian independen. Hal yang sama berlaku untuk klaim efisiensi dari teknologi ERNIE Evolve yang mereka pakai untuk inference.

Status "Preview" juga perlu dipahami. Baidu sendiri bilang ini tahap menengah setelah pelatihan, jadi beberapa kemampuan bisa saja belum lengkap dan versi resminya masih akan ditingkatkan. Artinya, jangan buru-buru mengganti model produksi dengan versi preview ini sebelum mengujinya di kasus nyata.

## Kenapa rilisan ini layak diperhatikan

Ada tiga alasan rilisan ini bukan sekadar pengumuman biasa.

Konteks 1 juta token membuka cara kerja baru. Dokumen panjang, codebase besar, atau riwayat percakapan yang panjang bisa dimasukkan sekaligus tanpa dipotong-potong. Buat agen AI yang bekerja dengan banyak file, ini perubahan yang terasa langsung.

Harga per token yang rendah mengubah hitung-hitungan. Dengan 1 RMB per juta token input, tugas yang dulu mahal seperti merangkum ribuan dokumen atau menjalankan klasifikasi massal jadi jauh lebih masuk akal secara biaya.

Rencana open source memberi pilihan. Kalau bobotnya benar-benar dibuka, developer bisa menjalankan model ini di infrastruktur sendiri, memodifikasinya, atau mempelajarinya tanpa bergantung pada satu vendor.

## Yang bisa kamu lakukan sekarang

Kalau kamu developer dan penasaran, coba API-nya lewat OpenRouter yang saat ini gratis. Uji dengan tugas yang biasa kamu kerjakan, misalnya merangkum dokumen panjang atau menulis kode dari spesifikasi, lalu bandingkan hasilnya dengan model yang sudah kamu pakai. Jangan percaya klaim benchmark begitu saja, karena pengujian di tugasmu sendiri jauh lebih bisa diandalkan.

Kalau kamu lebih suka menunggu, tandai tanggal 25 November. Saat bobotnya rilis, komunitas open source biasanya cepat menguji, mengukur, dan membagikan hasilnya. Dua minggu dari sekarang, gambaran soal model ini akan jauh lebih jelas dibanding hari pengumumannya.
