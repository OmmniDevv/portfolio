---
title: Kolibri 1.1, Model AI 75B yang Ringan tapi Cerdas
date: 2026-11-27
excerpt: Aleph Alpha merilis Kolibri 1.1, model open-weight 75B dengan hanya 3,44B parameter aktif per token, konteks 262 ribu token, dan lisensi Apache 2.0.
tags: ai, model-ai, open-source, aleph-alpha, kolibri
image: https://cdn.hackernoon.com/images/artificial-neural-network-clh5wvvky000401s695tx3vkd.png?auto=format&fit=max&w=2048
---

Aleph Alpha merilis Kolibri 1.1 pada 25 November 2026. Model ini menarik karena ukurannya besar di atas kertas, 75 miliar parameter, tapi biaya menjalankannya jauh lebih kecil dari angka itu. Arsitekturnya Mixture of Experts, jadi hanya sebagian parameter yang aktif untuk tiap token. Angka yang dilaporkan: 3,44 miliar parameter aktif per token.

Itu pola yang sama seperti model MoE lain di tahun ini. Model besar tidak harus dijalankan secara penuh. Yang penting adalah seberapa pintar bagian yang aktif itu bekerja, bukan total parameter yang tersimpan di disk.

## Apa yang dibawa Kolibri 1.1

Kolibri 1.1 adalah model bilingual Jerman dan Inggris. Fokus dua bahasa ini bukan kebetulan. Aleph Alpha adalah perusahaan Jerman, dan pasar Eropa memang butuh model yang kuat di bahasa Jerman tanpa mengorbankan bahasa Inggris. Banyak model besar hari ini masih terasa seperti model Inggris yang diterjemahkan, bukan model yang benar-benar dwibahasa.

Konteksnya 262.144 token. Angka ini cukup untuk dokumen panjang, basis kode yang besar, atau percakapan yang berlarut-larut tanpa model lupa awal pembicaraan. Untuk perbandingan, konteks 128 ribu token sudah terasa lega untuk kebanyakan pekerjaan. 262 ribu memberi ruang dua kali lipat dari itu.

Lisensinya Apache 2.0. Ini penting. Lisensi ini berarti perusahaan dan pengembang bisa memakai, memodifikasi, dan mendistribusikan model ini, termasuk untuk keperluan komersial, tanpa membayar royalti. Model open-weight dengan lisensi permisif seperti ini yang biasanya paling cepat diadopsi di proyek nyata.

![Ilustrasi jaringan saraf tiruan](https://www.jarvis-ai.cz/sites/default/files/styles/article_hero_480/public/2026-10/abstract-ai-visualization-neural-networks-no-people-digital-art-tech-aesthetic-1792781036.png.webp?itok=8OFTRvfe)

## Effort level yang bisa diatur

Satu fitur yang membedakan Kolibri 1.1 adalah configurable reasoning effort. Pengguna bisa mengatur seberapa dalam model berpikir untuk satu tugas. Pertanyaan ringan bisa dijawab dengan effort rendah, hemat waktu dan biaya. Soal yang sulit bisa diberi effort tinggi.

Konsep ini mirip dengan yang dilakukan beberapa model reasoning lain, tapi di sini effort-nya bisa dikonfigurasi langsung. Buat pengembang, ini berarti satu model bisa melayani dua kebutuhan sekaligus. Tidak perlu ganti model saat pindah dari tugas remeh ke tugas berat, cukup ubah satu parameter.

Skor benchmark yang dilaporkan adalah 73,2 persen skor agregat, dengan biaya 0,21 GPU-hours per 1.000 tugas. Angka benchmark agregat memang bukan ukuran mutlak, tapi rasio skor terhadap biaya komputasi ini yang menarik. Model ini dirancang untuk kerja yang efisien, bukan sekadar mengejar skor tertinggi dengan biaya berapapun.

## Di mana posisinya di November 2026

November 2026 adalah bulan yang padat untuk rilis model. GPT-6.2 Astra dan Sol dari OpenAI, Gemini 4 Neon dari Google, Qwen4-Max dari Alibaba, sampai Inkling 2 Mini dari Thinking Machines Lab, semuanya rilis dalam dua minggu. Kolibri 1.1 masuk di tengah keramaian itu dengan posisi yang berbeda.

Model-model frontier bersaing di kemampuan tertinggi. Kolibri 1.1 bersaing di efisiensi dan keterbukaan. Bobotnya bisa diunduh gratis, lisensinya permisif, dan kebutuhan komputasinya ringan karena hanya 3,44 miliar parameter yang aktif. Buat tim yang mau menjalankan model sendiri di infrastruktur mereka, ini kombinasi yang sulit ditolak.

Ada juga Amazon Strands Decider v2 yang rilis di hari yang sama, 25 November, dengan model sampai 31 miliar parameter untuk tugas klasifikasi dan pengambilan keputusan. Trennya jelas. Vendor besar tidak lagi hanya merilis model raksasa serba bisa. Mereka merilis model yang spesifik, efisien, dan bisa di-self-host.

## Siapa yang paling diuntungkan

Tim yang membangun produk di Eropa, atau yang melayani pengguna berbahasa Jerman, adalah target paling jelas. Model bilingual yang kuat di bahasa Jerman masih jarang, apalagi yang open-weight.

Pengembang yang membangun agen atau alur kerja otomatis juga diuntungkan. Konteks 262 ribu token dan reasoning effort yang bisa diatur membuat model ini cocok untuk tugas agen yang panjang, di mana model harus membaca banyak konteks lalu mengambil keputusan berulang kali.

Yang terakhir, siapa pun yang peduli soal biaya inferensi. Parameter aktif yang kecil berarti token yang lebih murah untuk dihasilkan, dan model yang bisa di-self-host berarti tidak ada tagihan API per token sama sekali. Buat penggunaan volume tinggi, selisihnya terasa.

## Yang masih perlu dibuktikan

Kolibri 1.1 baru rilis. Skor benchmark dari vendor selalu perlu diuji ulang oleh pihak ketiga dan komunitas. Yang paling penting untuk dilihat adalah bagaimana model ini berperilaku di tugas nyata, bukan di benchmark. Apakah reasoning effort yang bisa diatur benar-benar memberi perbedaan yang terasa? Apakah kualitas bahasa Jermannya setara dengan bahasa Inggrisnya?

Jawabannya akan muncul dalam beberapa minggu ke depan, saat komunitas mulai mengunduh, menguji, dan membandingkan. Untuk sekarang, yang jelas adalah arahnya. Model open-weight yang efisien, dwibahasa, dan murah dijalankan sedang jadi tren yang nyata di akhir 2026, dan Kolibri 1.1 adalah salah satu contoh paling segar dari tren itu.
