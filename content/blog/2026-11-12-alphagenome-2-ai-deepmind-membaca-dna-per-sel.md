---
title: AlphaGenome 2, AI DeepMind yang Membaca DNA per Sel
date: 2026-11-12
excerpt: DeepMind merilis AlphaGenome 2 pada 11 November 2026. Model ini memprediksi efek varian DNA pada tiap jenis sel, bukan rata-rata jaringan saja.
tags: ai, deepmind, genomik, sains, teknologi
image: https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80
---

Google DeepMind mengumumkan AlphaGenome 2 pada 11 November 2026. Model ini memprediksi bagaimana perubahan kecil pada DNA memengaruhi kerja gen, dan bedanya dengan model sebelumnya ada pada satu hal: konteks selnya.

Varian DNA yang sama bisa tidak berarti apa-apa di satu jenis sel, lalu jadi pemicu masalah di jenis sel lain. Model genomik lama merata-ratakan sinyal dari seluruh jaringan, jadi efek yang hanya muncul di sel tertentu ikut tenggelam. AlphaGenome 2 justru diminta memilih dulu kondisi yang mau diperiksa, misalnya jenis sel, jaringan, atau keadaan sel saat sakit, lalu memberi prediksi khusus untuk kondisi itu.

## Dari jaringan ke sel tunggal

AlphaGenome 1, pendahulunya, membaca sekuens DNA sepanjang satu juta huruf dan memprediksi aktivitas molekuler untuk banyak jaringan sekaligus. Pendekatan itu berguna, tapi kasar. Jaringan itu campuran puluhan jenis sel, dan sinyal dari sel langka sering kalah oleh sel yang jumlahnya dominan.

AlphaGenome 2 membalik cara kerjanya. Model ini mengevaluasi satu kondisi dalam satu waktu dan membawa kondisi itu ke seluruh jaringan sarafnya. Hasilnya, cara segmen DNA yang sama dibaca bisa berbeda-beda tergantung sel yang sedang dilihat. Peneliti juga bisa memasukkan data eksperimen sel tunggal mereka sendiri sebagai kondisi, jadi prediksinya menyesuaikan dengan sampel yang benar-benar mereka teliti.

Latihannya pun besar. DeepMind melatih model ini dengan data bulk dan sel tunggal dari manusia dan tikus, termasuk lebih dari 100 juta profil sel individual.

## Angka yang dilaporkan DeepMind

Pada TenK10K, dataset imun sel tunggal yang mencakup 28 jenis sel, AlphaGenome 2 berhasil menemukan kembali 30 persen varian yang diduga menjadi penyebab perubahan ekspresi gen, dengan presisi 90 persen. Sebagai pembanding, AlphaGenome 1 yang di-fine-tuning pada data sel tunggal hanya mencapai 16 persen pada ukuran yang sama.

Angka itu tetap perlu dibaca dengan jujur. Paper DeepMind sendiri mengingatkan bahwa meski presisinya tinggi, model ini baru menemukan kembali sebagian kecil dari varian yang dinominasikan analisis statistik sebagai kemungkinan penyebab. Artinya AlphaGenome 2 adalah alat penyaring yang kuat, bukan vonis akhir. Peneliti tetap perlu memvalidasi temuan di laboratorium.

![Ilustrasi data dan dashboard penelitian](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)

## Cara mengaksesnya

DeepMind menyediakan AlphaGenome 2 lewat AlphaGenome API untuk riset non-komersial, lengkap dengan tutorial Colab untuk pemakaian dengan kondisi ekspresi. Riset komersial masuk lewat private preview. DeepMind juga menyiapkan AlphaGenome 2 Skills untuk Antigravity, platform pengembangan agen milik Google.

Ada dua sumber yang sudah disiapkan untuk peneliti yang tidak mau menjalankan perbandingan besar sendiri. Keduanya berisi prediksi yang sudah dihitung sebelumnya, jadi tinggal dipakai sebagai titik awal analisis.

Satu batasan penting: kedua versi AlphaGenome hanya untuk riset. Keduanya belum divalidasi atau disetujui untuk keperluan klinis dan diagnostik. Jadi jangan bayangkan model ini dipakai dokter untuk mendiagnosis pasien dalam waktu dekat. Jalurnya masih panjang, dari prediksi ke bukti lab, lalu ke uji klinis.

## Kenapa ini penting buat yang bukan ahli genetika

Buat orang di luar bidang genomik, rilis ini menunjukkan arah yang jelas dari model AI ilmiah. Model generalis yang menjawab semua hal mulai digantikan model spesialis yang paham satu domain dengan dalam, lengkap dengan konteks yang tepat. AlphaGenome 2 tidak mencoba menjelaskan seluruh biologi. Ia fokus pada satu pertanyaan yang sempit, yaitu apa efek varian ini di sel ini, dan menjawabnya lebih baik dari pendahulunya.

Pola yang sama terlihat di bidang lain. Model coding makin paham repo spesifik, model cuaca makin paham wilayah tertentu, dan model genomik sekarang paham sel tertentu. Spesialisasi dengan konteks yang benar sedang jadi cara paling efektif menaikkan kualitas hasil AI, jauh lebih efektif daripada sekadar membesarkan model.

Kalau kamu mengikuti perkembangan AI di sains, AlphaGenome 2 layak dicatat. Bukan karena namanya besar, tapi karena ia menyelesaikan masalah nyata yang sudah lama mengganggu peneliti: sinyal penting yang hilang di dalam rata-rata. Model seperti ini juga mengingatkan bahwa kemajuan AI tidak selalu datang dari model yang lebih besar. Kadang ia datang dari pertanyaan yang lebih tajam dan data yang lebih tepat sasaran.
