---
title: Deploy Website Next.js ke Vercel Gratis dalam 10 Menit
date: 2026-10-02
excerpt: Punya project Next.js yang cuma jalan di localhost? Deploy ke Vercel gratis: push ke GitHub, connect, deploy. Panduan langkah demi langkah untuk pemula.
tags: nextjs, vercel, deploy, tutorial
image: https://scanshare.com/wp-content/uploads/2020/07/artwork_home_cloud.png
---

Project Next.js yang cuma jalan di `localhost:3000` itu seperti masakan enak yang tidak pernah disajikan ke tamu. Deploy adalah cara menyajikannya ke internet, dan Vercel membuat proses ini semudah mungkin, gratis untuk project pribadi.

## Langkah 1: Push project ke GitHub

Vercel bekerja paling mulus dengan GitHub. Kalau project-mu belum di Git, inisialisasi dan push:

```bash
git init
git add .
git commit -m "Project pertamaku"
git branch -M main
git remote add origin https://github.com/username/nama-repo.git
git push -u origin main
```

Pastikan ada file `.gitignore` yang mengecualikan `node_modules` dan `.env.local`. Jangan pernah push file berisi API key atau password.

## Langkah 2: Import di Vercel

Buka vercel.com dan login dengan akun GitHub-mu. Klik "Add New Project", pilih repository yang baru di-push, lalu klik "Deploy". Itu saja. Vercel otomatis mendeteksi bahwa ini project Next.js dan mengatur build command (`next build`) dengan benar.

Tunggu sekitar satu sampai dua menit. Kalau berhasil, kamu dapat URL seperti `nama-project.vercel.app` yang langsung bisa dibuka siapa pun.

![Ilustrasi terminal dan deployment](https://techietory.com/wp-content/uploads/2024/09/161382-1024x635.png)

## Langkah 3: Environment variables

Kalau project-mu butuh API key atau konfigurasi rahasia, jangan taruh di kode. Di dashboard Vercel, buka Settings, Environment Variables, lalu tambahkan pasangan key-value yang sama seperti di `.env.local`-mu. Setelah menambah atau mengubahnya, lakukan redeploy agar berlaku.

## Deploy otomatis setiap push

Inilah bagian paling enaknya: setiap kali kamu `git push` ke branch main, Vercel otomatis membangun ulang dan mendeploy versi terbaru. Tidak perlu upload manual, tidak perlu SSH ke server. Workflow-nya jadi: ngoding, commit, push, situs update sendiri.

Untuk eksperimen berisiko, buat branch baru. Vercel akan membuat "preview deployment" dengan URL unik untuk branch itu, jadi kamu bisa cek hasilnya dulu sebelum merge ke main.

## Masalah umum dan solusinya

Build gagal? Cek log di dashboard Vercel, 90% kasus penyebabnya adalah kode yang error saat `next build` padahal di `next dev` baik-baik saja (misalnya variabel yang undefined saat prerender). Gambar tidak muncul? Pastikan path-nya benar dan file-nya ada di folder `public`.

## Pasang domain sendiri

URL `vercel.app` itu gratis dan langsung jalan, tapi untuk portfolio profesional, domain sendiri terlihat jauh lebih meyakinkan. Kabar baiknya, Vercel memudahkan ini juga.

Beli domain dari registrar mana pun (harganya mulai belasan ribu per tahun untuk ekstensi tertentu), lalu di dashboard Vercel buka Settings, Domains, dan tambahkan domainmu. Vercel akan memberi tahu DNS record apa yang harus ditambahkan di registrar: biasanya satu A record dan satu CNAME.

Setelah DNS propagasi (bisa 5 menit sampai beberapa jam), Vercel otomatis memasangkan sertifikat HTTPS gratis. Tidak perlu beli SSL terpisah, tidak perlu konfigurasi manual. Domain `www` dan non-www bisa diarahkan ke deployment yang sama.

Satu tips: kalau masih ragu beli domain, subdomain gratis dari registrar tertentu atau URL vercel.app sudah lebih dari cukup untuk portfolio dan project belajar.

Batas gratis Vercel cukup longgar untuk portfolio dan project belajar: bandwidth 100GB per bulan dan build yang cukup banyak. Kecuali situsmu viral mendadak, kamu tidak akan menyentuh batasnya.

Sepuluh menit dari sekarang, websitemu sudah live. Tidak ada alasan lagi project bagus cuma nangkring di localhost.
