---
title: 5 Teknik Prompt Engineering yang Langsung Bisa Dipakai
date: 2026-10-02
excerpt: Prompt engineering bukan soal kata ajaib. Ini 5 teknik konkret (role, few-shot, chain-of-thought, constraints, iterasi) dengan contoh yang bisa langsung dicoba.
tags: ai, prompt, tutorial
image: https://cdn.openart.ai/uploads/image_HbEuQ2cX_1722984465292_raw.jpg
---

Banyak orang mengira prompt engineering itu soal menemukan "kata ajaib" yang bikin AI tiba-tiba pintar. Kenyataannya jauh lebih membumi: ini soal memberi instruksi yang jelas, seperti kamu memberi brief ke rekan kerja. Berikut lima teknik yang hasilnya langsung terasa.

## 1. Beri peran (role prompting)

AI bekerja lebih baik kalau tahu dia sedang berperan sebagai siapa. Bandingkan:

Buruk: "Jelaskan fotosintesis."

Bagus: "Kamu adalah guru biologi SMA yang sabar. Jelaskan fotosintesis ke murid kelas 10 dengan bahasa sehari-hari dan satu analogi yang mudah diingat."

Peran memberi konteks gaya bahasa, kedalaman, dan sudut pandang. Hasilnya langsung lebih terarah.

## 2. Kasih contoh (few-shot)

Kalau kamu mau format output tertentu, jangan cuma dijelaskan, tunjukkan contohnya. Misalnya kamu mau AI mengubah daftar belanja jadi tabel:

```
Ubah jadi tabel dengan kolom Nama dan Jumlah.
Contoh:
Input: "apel 3, susu 1"
Output:
| Nama | Jumlah |
|------|--------|
| apel | 3      |
| susu | 1      |

Sekarang kerjakan: "telur 12, roti 2"
```

Dengan satu contoh saja, akurasi format naik drastis. Ini teknik paling ampuh untuk tugas berulang.

![Ilustrasi mengetik prompt di laptop](https://mspcorp.ca/wp-content/uploads/2024/03/Effective-prompt-scaled-1.jpg)

## 3. Minta berpikir bertahap (chain-of-thought)

Untuk soal yang butuh penalaran (matematika, logika, debugging), tambahkan kalimat sederhana: "Jelaskan langkah demi langkah sebelum memberi jawaban akhir."

Tanpa itu, AI sering langsung melompat ke jawaban dan salah di tengah jalan. Dengan diminta menguraikan langkahnya, dia "dipaksa" menalar secara berurutan, dan kamu juga bisa melihat di mana letak kesalahannya kalau jawabannya keliru.

## 4. Pasang batasan (constraints)

AI cenderung memberi jawaban generik kalau tidak dibatasi. Spesifikkan:

- Panjang: "maksimal 100 kata"
- Format: "dalam bentuk bullet points"
- Audiens: "untuk anak SMP"
- Yang dihindari: "tanpa istilah teknis"

Batasan mengubah jawaban vague menjadi jawaban yang siap pakai.

## 5. Iterasi, jangan sekali jadi

Kesalahan terbesar pemula: menulis satu prompt panjang, kecewa dengan hasilnya, lalu menyerah. Cara yang benar adalah iterasi. Mulai dari prompt sederhana, lihat hasilnya, lalu perbaiki satu hal dalam satu waktu: "lebih singkat", "tambahkan contoh", "ubah tonenya lebih santai".

Setiap iterasi memberi kamu pemahaman lebih baik tentang cara AI merespons, dan prompt finalmu biasanya jauh berbeda (dan jauh lebih bagus) dari draf pertama.

## Teknik bonus: beri AI alat verifikasi

Satu trik yang jarang dibahas: minta AI memeriksa jawabannya sendiri. Setelah dia menjawab, lanjutkan dengan "Sekarang periksa jawabanmu: adakah bagian yang tidak konsisten atau perlu dikoreksi?"

Teknik ini bekerja karena draf pertama dan proses review memakai "mode" yang berbeda. Saat menulis, AI fokus merangkai kalimat yang mengalir. Saat memeriksa, dia fokus mencari kesalahan. Sering kali dia sendiri yang menemukan dan memperbaiki kekeliruannya.

Ini tidak sempurna dan tidak menggantikan verifikasi manusia untuk hal penting, tapi untuk draf email, ringkasan, atau ide kasar, putaran review mandiri ini menaikkan kualitas secara nyata dengan biaya nol.

## Penutup

Lima teknik ini mencakup 90% kebutuhan sehari-hari. Intinya satu: perlakukan AI seperti asisten yang cerdas tapi butuh brief jelas. Semakin spesifik instruksimu, semakin bagus hasilnya. Tidak ada sihir, hanya komunikasi yang baik.
