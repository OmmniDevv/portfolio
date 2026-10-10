---
title: "Ngoding dari HP: Setup Termux Buat Belajar Coding"
date: 2026-10-10
excerpt: "Tidak punya laptop bukan alasan berhenti belajar coding. Termux mengubah HP Android jadi terminal Linux lengkap: Python, Node.js, sampai Git bisa jalan."
tags: tips, android, termux, pemula
image: "https://www.junkiescoder.com/_next/image?url=https%3A%2F%2Fprod-junkiescoder.s3.us-east-1.amazonaws.com%2Fuploads%2FAndroid_5f82f8c074.png&w=1080&q=75"
---

Banyak yang menunda belajar coding dengan alasan belum punya laptop. Padahal HP Android yang kamu pegang setiap hari bisa jadi mesin belajar yang serius. Termux adalah aplikasi terminal Linux untuk Android: bukan emulator main-main, tapi lingkungan Linux asli dengan package manager sendiri. Python, Node.js, Git, bahkan compiler C bisa diinstal dan berjalan.

Satu catatan penting: instal Termux dari F-Droid, bukan Play Store. Versi Play Store sudah lama tidak diperbarui dan bermasalah di Android baru. Buka f-droid.org dari browser HP, unduh APK F-Droid, lalu cari Termux di dalamnya.

## Langkah awal: perbarui semuanya

Begitu Termux terbuka pertama kali, kamu disambut prompt `$` yang polos. Jangan langsung instal ini-itu. Perbarui dulu daftar paket dan paket yang sudah ada:

```bash
pkg update && pkg upgrade -y
```

Perintah ini mirip `apt update && apt upgrade` di Ubuntu. Butuh koneksi internet dan sedikit kesabaran, karena unduhannya lumayan.

## Instal senjata utama

Untuk belajar web dan scripting, tiga paket ini cukup untuk berminggu-minggu:

```bash
pkg install -y python nodejs git
```

Verifikasi instalasinya:

```bash
python --version
node --version
git --version
```

Kalau ketiganya menampilkan nomor versi, kamu sudah punya toolchain yang setara dengan banyak setup laptop pemula.

![Layar terminal penuh kode](https://www.ebelingwebb.se/wp-content/uploads/2020/09/markus-spiske-qjnAnF0jIGk-unsplash-1-scaled.jpg)

## Coba bikin sesuatu yang nyata

Teori tanpa praktik cepat membosankan. Bikin server web mini pakai Node.js, cuma lima baris:

```js
// server.js
const http = require('http');
http.createServer((req, res) => {
  res.end('Halo dari HP saya!');
}).listen(3000);
```

Jalankan dengan `node server.js`, lalu buka browser HP dan kunjungi `http://localhost:3000`. Kamu baru saja menjalankan server web dari kantong celana. Rasanya beda waktu pertama kali berhasil, percaya deh.

Atau kalau lebih suka Python, coba script kecil yang mengolah data:

```python
# hitung.py
angka = [12, 45, 7, 89, 23]
print("Rata-rata:", sum(angka) / len(angka))
print("Terbesar:", max(angka))
```

Jalankan dengan `python hitung.py`.

## Tips biar nyaman dipakai lama

Mengetik kode di keyboard HP memang tantangan tersendiri. Beberapa hal yang membantu:

- Nyalakan tombol volume sebagai Ctrl di pengaturan Termux (gunakan kombinasi volume bawah + tombol untuk Ctrl+C dan kawan-kawan).
- Instal keyboard yang mendukung tombol panah dan simbol, atau pakai fitur extra keys Termux dengan menggeser ke kiri dari keyboard lalu menekan tombol plus.
- Pakai `nano` untuk edit file cepat (`pkg install nano`), dan pertimbangkan belajar `vim` kalau sudah nyaman.

Untuk menyimpan pekerjaan, inisialisasi Git di folder project seperti biasa: `git init`, `git add .`, `git commit -m "awal"`. Nanti waktu sudah punya laptop, tinggal `git clone` dan semua lanjut tanpa hambatan.

Termux bukan pengganti laptop untuk semua hal, tapi untuk belajar dasar pemrograman, latihan algoritma, dan eksperimen web, ia lebih dari cukup. Yang penting mulai dulu. Laptop bisa menyusul.

## Akses file HP dan trik lanjutan

Secara default Termux hidup di dunianya sendiri dan tidak bisa melihat folder Download atau Dokumen HP kamu. Untuk membukanya, jalankan sekali saja:

```bash
termux-setup-storage
```

Akan muncul popup izin akses penyimpanan. Setelah disetujui, folder HP bisa diakses lewat `~/storage/shared`, misalnya `~/storage/shared/Download`. Hati-hati menghapus file dari sini, karena yang terhapus adalah file asli di HP, bukan salinan.

Kalau nanti sudah punya laptop, kamu bisa SSH ke Termux lewat WiFi yang sama. Instal dulu server SSH-nya:

```bash
pkg install -y openssh
sshd
```

Lalu dari laptop, sambungkan dengan `ssh <username>@<ip-hp> -p 8022`. Cari IP HP di pengaturan WiFi. Enaknya, kamu bisa mengetik kode lewat keyboard laptop yang nyaman, tapi programnya tetap jalan di HP. Password default user Termux bisa diset dengan perintah `passwd`.

Satu peringatan jujur: Android kadang mematikan aplikasi background untuk hemat baterai, jadi server yang kamu jalankan bisa mati sendiri kalau HP dikunci lama. Untuk belajar dan eksperimen ini bukan masalah besar. Matikan optimasi baterai untuk Termux di pengaturan Android kalau kamu butuh proses jalan lebih lama.
