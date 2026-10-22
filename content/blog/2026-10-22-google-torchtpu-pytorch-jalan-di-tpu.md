---
title: Google Open Source TorchTPU, PyTorch Bisa Jalan di TPU
date: 2026-10-22
excerpt: Google merilis TorchTPU sebagai open source pada 20 Oktober 2026. Kode PyTorch yang sudah ada bisa jalan di chip TPU hanya dengan perubahan konfigurasi.
tags: ai, google, pytorch, tpu, open source
image: https://sites.research.google/trc/static/img/TPU_v4_Pod_Datacenter_Web.jpg
---

Selama ini, kalau kamu nulis kode PyTorch, hampir pasti jalan di atas GPU Nvidia. CUDA sudah seperti jalan tol satu-satunya: semua orang pakai karena semua tooling memang dibangun untuknya. Tanggal 20 Oktober 2026, Google mulai menggoyang kebiasaan itu dengan merilis TorchTPU sebagai proyek open source.

TorchTPU memungkinkan kode PyTorch yang sudah ada untuk berjalan di Tensor Processing Unit (TPU) milik Google hanya lewat perubahan konfigurasi, bukan rewrite. Pengumumannya disampaikan di PyTorch Conference 2026, dan Google menyebutnya dikembangkan bareng tim PyTorch di Meta. Buat yang belum familiar, TPU adalah chip akselerator AI rancangan Google yang selama ini hanya bisa dipakai lewat layanan cloud mereka dengan tooling khusus.

## Waktu rilisnya bukan kebetulan

Satu hari sebelum Google, tepatnya 19 Oktober 2026, Amazon merilis hal yang sangat mirip: TorchNeuron, jembatan dari PyTorch ke chip Trainium milik AWS. Dua raksasa cloud merilis tool dengan pitch yang hampir identik dalam selang 24 jam. Targetnya juga sama: dominasi Nvidia atas PyTorch yang didorong ekosistem CUDA.

Menurut laporan TechCrunch, versi Google sedikit lebih luas dari sisi ekosistem. Google menggandeng Meta dan Hugging Face secara terbuka, plus merilis TPU agent suite, tool bantu untuk memindahkan workload dan men-debug error selama proses porting. AWS lebih menekankan kontribusi upstream ke PyTorch sendiri untuk membersihkan asumsi-asumsi khusus Nvidia dari codebase.

## Apa yang sebenarnya berubah buat developer

Janji intinya sederhana: workload PyTorch yang sekarang jalan di GPU Nvidia bisa dicoba di chip non-Nvidia tanpa komitmen migrasi besar. Itu saja. Tapi detailnya menarik:

- Di Hugging Face Transformers v5, deploy model ke TPU sekarang tinggal melewatkan `device_map="tpu"`.
- Google juga memperbarui LiteRT, tool-nya untuk menjalankan AI di ponsel dan perangkat embedded, agar bekerja dengan aplikasi PyTorch.
- Jana van Greunen, direktur engineering PyTorch di Meta, menyebut langkah ini "massive step forward" yang memberi Meta fleksibilitas men-deploy workload PyTorch ke TPU Google.

![Pod TPU Google di data center](https://img.datacenterfrontier.com/files/base/ebm/datacenterfrontier/image/2022/09/1663195272426-googletpupod.png?auto=format,compress&fit=fill&fill=blur&w=1200&h=630)

## Jangan buru-buru membuang GPU

Wartawan TechCrunch Julie Bort menulis catatan yang perlu diingat: dua rilis ini tidak akan membuat developer meninggalkan hardware Nvidia secara massal hanya karena pindah jadi lebih mudah. Hardware, harga, dan performa nyata di production tetap jadi penentu.

Yang jelas berubah adalah bargaining position. Tim yang menjalankan PyTorch sekarang punya cara murah untuk menguji workload-nya di TPU atau Trainium. Kalau hasil benchmark independen nanti menunjukkan price-performance yang lebih baik, barulah migrasi sungguhan terjadi. Sampai saat itu, yang paling menarik untuk ditunggu:

- Benchmark independen TorchTPU vs GPU Nvidia di workload production, bukan angka dari Google sendiri.
- Konfirmasi dari maintainer vLLM dan SGLang soal kompatibilitas yang dijanjikan Google.
- Apakah AWS atau Google membalas rilis yang lain dengan fitur lanjutan.

Nvidia sendiri belum mengeluarkan respons publik atas TorchTPU, sama seperti diamnya mereka atas TorchNeuron sehari sebelumnya. Diam yang cukup berisik, kalau kamu tanya saya.

Ada konteks yang lebih besar di balik ini. Di minggu yang sama, Nvidia mengumumkan komitmen hampir $10 miliar untuk ekosistem AI Eropa dan menutup rangkaian kunjungan kebijakannya dengan keynote di GTC Berlin. Polanya jelas: modelnya dibagikan terbuka, tapi nilai sesungguhnya dikumpulkan di lapisan infrastruktur, silikon dan rak server. TorchTPU dan TorchNeuron menyerang pola itu dari arah berlawanan, dengan membuat silikon non-Nvidia lebih mudah dipakai.

Buat developer yang penasaran, cara mencobanya tidak serumit kedengarannya. Karena rilisnya open source dan dikembangkan bersama tim PyTorch di Meta, dokumentasi migrasinya tersedia publik. Mulai dari workload kecil yang tidak kritis, bandingkan biaya dan latensinya dengan setup GPU yang sekarang, lalu putuskan dari angka, bukan dari hype.

Sumber: blog Google Cloud (20 Oktober 2026) dan TechCrunch via Pondero.
