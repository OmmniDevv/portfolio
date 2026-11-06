---
title: "Git Stash: Simpan Kerjaan Setengah Jalan Tanpa Commit"
date: 2026-11-03
excerpt: "Pindah branch padahal kode belum selesai sering berujung commit asal-asalan. Git stash menyimpan perubahan sementara supaya kembali tanpa mengotori riwayat."
tags: git, tutorial, coding, developer
image: https://www.intre.it/wp-content/uploads/2022/06/cover-git-rebase-merge-aliu-1024x576.webp
---

Skenario ini hampir pasti pernah kamu alami. Kamu sedang mengerjakan sebuah fitur, kodenya setengah jadi, ada fungsi yang belum selesai dan satu file yang masih berantakan. Lalu datang kabar: ada bug di produksi yang harus diperbaiki sekarang, di branch lain. Kamu tidak bisa pindah branch begitu saja karena perubahanmu belum di-commit, tapi membuat commit dengan pesan "wip" hanya demi pindah branch terasa mengotori riwayat.

Di sinilah git stash bekerja. Stash adalah laci sementara di Git. Kamu memasukkan perubahan yang belum selesai ke dalamnya, working directory-mu kembali bersih, dan kamu bebas pindah branch. Setelah urusan darurat selesai, kamu membuka laci itu lagi dan melanjutkan pekerjaanmu tepat dari titik kamu meninggalkannya.

## Perintah dasar yang paling sering dipakai

Mulailah dari keadaan yang paling umum: ada file yang sudah diubah tapi belum di-commit. Satu perintah sudah cukup:

```bash
git stash
```

Git mengambil semua perubahan pada file yang sudah dilacak, menyimpannya, dan mengembalikan working directory ke kondisi commit terakhir. Perintah `git status` setelah itu akan menampilkan working tree yang bersih. Kamu bisa pindah branch, memperbaiki bug, melakukan commit di sana, lalu kembali ke branch semula.

Untuk mengembalikan simpananmu, ada dua perintah yang sering tertukar:

```bash
git stash pop
git stash apply
```

Keduanya mengembalikan perubahan dari stash terbaru ke working directory. Bedanya ada di nasib stash itu sendiri. `pop` menghapus stash setelah berhasil diterapkan, jadi lacinya kosong lagi. `apply` membiarkan stash tetap tersimpan, sehingga kamu bisa menerapkannya lagi di tempat lain. Kalau kamu tipe orang yang was-was kehilangan pekerjaan, pakai `apply` dulu, dan hapus stash secara manual setelah kamu yakin semuanya kembali dengan benar.

Beri nama pada stash-mu. Secara bawaan, stash hanya dicatat sebagai `stash@{0}`, `stash@{1}`, dan seterusnya, yang tidak memberi petunjuk apa pun tentang isinya. Begitu kamu punya dua atau tiga stash sekaligus, kamu akan bingung sendiri. Pesan singkat mengubah segalanya:

```bash
git stash push -m "form login setengah jalan"
git stash list
```

Perintah kedua menampilkan daftar stash beserta pesannya, sehingga kamu bisa memilih mana yang mau dikembalikan tanpa menebak-nebak.

## Melihat dan memilih stash tertentu

Stash bekerja seperti tumpukan: yang terakhir disimpan adalah yang pertama dikembalikan. Tapi kamu tidak wajib mengikuti urutan itu. Kalau kamu punya beberapa stash, sebut nomornya secara eksplisit:

```bash
git stash list
git stash apply stash@{1}
```

Sebelum menerapkan, kamu juga bisa mengintip isinya tanpa mengubah apa pun:

```bash
git stash show -p stash@{1}
```

Perintah ini menampilkan diff dari stash tersebut, persis seperti melihat perubahan sebelum commit. Kebiasaan mengintip dulu sebelum menerapkan menghindarkanmu dari kejutan, terutama ketika kamu sudah lupa apa yang sebenarnya kamu simpan minggu lalu.

![Ilustrasi alur kerja Git dengan branch dan riwayat commit](https://cgs-cdn.sgp1.digitaloceanspaces.com/blog-ceegees-in/uploads/2023/03/10043055/git-480x320.jpg)

## Stash sebagian file, bukan semuanya

Kadang kamu tidak ingin menyimpan semua perubahan, hanya sebagian. Misalnya kamu mengubah dua file, tapi hanya satu yang berkaitan dengan pekerjaan yang tertunda, sementara file lainnya justru harus ikut commit sekarang. Git mengizinkan stash per file:

```bash
git stash push -- src/form-login.js
```

Hanya file yang kamu sebut yang masuk stash, sisanya tetap berada di working directory. Variasi ini sangat berguna ketika pekerjaanmu bercampur dalam satu branch dan kamu ingin memisahkannya dengan rapi tanpa membuat commit darurat.

Ada satu hal yang sering mengejutkan pemula: secara bawaan, stash tidak menyimpan file baru yang belum pernah dilacak Git. File yang baru kamu buat dengan `touch` atau lewat editor, tapi belum pernah di-`add`, akan tetap tertinggal di working directory setelah stash. Kalau kamu memang ingin menyimpannya juga, tambahkan flag `-u`:

```bash
git stash push -u -m "termasuk file baru"
```

## Saat stash gagal diterapkan

Mengembalikan stash tidak selalu mulus. Kalau branch tujuan sudah berubah di bagian yang sama dengan yang kamu simpan, Git akan melaporkan konflik, sama seperti konflik saat merge. Jangan panik. Konflik stash diselesaikan dengan cara yang sama: buka file yang bertanda konflik, pilih bagian yang benar, lalu tandai sebagai selesai. Stash yang di-`pop` dan gagal diterapkan tidak langsung hilang, Git mempertahankannya supaya kamu tidak kehilangan pekerjaan di tengah konflik.

Setelah konflik selesai dan kamu yakin tidak ada yang tertinggal, hapus stash yang sudah tidak dibutuhkan:

```bash
git stash drop stash@{0}
```

Atau bersihkan semuanya sekaligus kalau kamu sudah yakin tidak ada yang perlu diselamatkan:

```bash
git stash clear
```

Perintah terakhir ini tidak bisa dibatalkan, jadi pakai hanya setelah kamu memeriksa daftar stash dengan `git stash list` dan memastikan semuanya memang sudah diterapkan atau sudah tidak relevan.

## Satu batasan yang wajib diingat

Stash adalah tempat singgah, bukan tempat penyimpanan. Stash hanya hidup di repository lokalmu, tidak ikut saat kamu push ke remote, dan tidak punya cadangan apa pun. Kalau repository lokalmu hilang atau kamu menjalankan `clear` tanpa sengaja, pekerjaan di dalam stash ikut hilang. Karena itu, jangan membiarkan pekerjaan penting mengendap di stash berminggu-minggu. Begitu pekerjaan darurat selesai, segera kembalikan stash-mu, lanjutkan pekerjaan itu sampai commit yang layak, dan biarkan lacinya kosong lagi. Stash yang paling sehat adalah stash yang umurnya pendek: disimpan pagi, dikembalikan sore, dan riwayat commit-mu tetap bercerita dengan rapi tentang apa yang sebenarnya kamu kerjakan.
