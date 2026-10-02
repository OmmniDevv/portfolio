---
title: Git Branch dan Merge untuk Pemula, Tanpa Panik
date: 2026-10-02
excerpt: Branch, merge, dan conflict adalah momok pemula Git. Panduan ini menjelaskan alurnya dengan analogi sederhana plus perintah yang aman untuk dicoba.
tags: git, tutorial, pemula
image: https://www.massiverealities.co/tech-team.png
---

Banyak pemula Git cuma berani pakai tiga perintah: `add`, `commit`, `push`, semuanya di branch main. Begitu dengar kata "branch" dan "merge", langsung keringat dingin. Padahal branch adalah fitur Git yang paling membebaskan, asal paham idenya.

## Analogi: fotokopi naskah

Bayangkan kamu menulis naskah di Google Docs. Mau coba rombak bab 3 secara drastis tapi takut merusak versi yang sudah bagus? Kamu duplikat dokumennya, utak-atik yang duplikat, dan kalau hasilnya bagus, salin perubahannya kembali ke dokumen asli. Itulah branch: salinan kerja yang independen.

```bash
git branch fitur-login      # bikin salinan bernama "fitur-login"
git checkout fitur-login    # pindah kerja ke salinan itu
# ... ngoding bebas di sini, main tetap aman ...
```

Atau versi singkatnya: `git checkout -b fitur-login` yang membuat sekaligus pindah.

## Merge: menggabungkan kembali

Setelah fitur selesai dan sudah dites, saatnya menggabungkan kembali ke main:

```bash
git checkout main            # kembali ke main
git merge fitur-login       # gabungkan perubahan dari branch fitur
```

Git akan menggabungkan perubahan secara otomatis selama tidak ada konflik. Setelah merge sukses dan sudah di-push, branch yang sudah tidak dipakai boleh dihapus dengan `git branch -d fitur-login` agar rapi.

![Ilustrasi kode dan kolaborasi tim](https://web.bynaric.in/wp-content/uploads/2023/01/computer-program-coding-screen-1-2.jpg)

## Conflict: tidak semenyeramkan itu

Conflict terjadi kalau dua branch mengubah baris yang SAMA di file yang sama, dan Git tidak tahu versi mana yang benar. Git akan menandai bagian yang konflik seperti ini:

```
<<<<<<< HEAD
versi dari main
=======
versi dari branch fitur
>>>>>>> fitur-login
```

Tugasmu cuma satu: edit file, pilih versi yang benar (atau gabungkan manual), hapus tanda-tandanya, lalu `git add` dan `git commit`. Selesai. Tidak ada data yang hilang misterius, semua versi masih tersimpan di history.

Tips pencegahan: pull dari main secara rutin sebelum mulai kerja (`git pull origin main`), dan bikin branch yang fokus pada satu fitur saja agar area konfliknya kecil.

## Alur aman untuk pemula

## Stash: laci sementara

Skenario umum: kamu sedang mengutak-atik branch fitur, tiba-tiba harus pindah ke main untuk memperbaiki bug urgent. Perubahanmu belum selesai dan belum layak di-commit. Apa yang dilakukan?

Jawabannya `git stash`: perintah ini menyimpan perubahanmu yang belum di-commit ke "laci" sementara dan mengembalikan working directory ke kondisi bersih.

```bash
git stash              # simpan perubahan ke laci
git checkout main       # pindah, working directory bersih
# ... perbaiki bug, commit ...
git checkout fitur-login
git stash pop           # kembalikan perubahan dari laci
```

Stash sangat berguna untuk interupsi mendadak. Anggap saja seperti bookmark darurat: pekerjaanmu aman tersimpan, dan kamu bisa kembali tepat di titik kamu berhenti. Untuk melihat isi laci, pakai `git stash list`.

Pola yang dipakai banyak tim profesional sebenarnya sederhana: main selalu dalam kondisi jalan, tiap fitur dikerjakan di branch sendiri, merge kembali setelah dites. Kalau eksperimenmu gagal total, tinggal hapus branch-nya, main tidak tersentuh sama sekali.

Mulailah dengan branch untuk hal kecil, misalnya branch `coba-ganti-warna`. Rasakan kebebasan mengutak-atik tanpa takut merusak. Setelah nyaman, branch akan berubah dari momok menjadi alat favoritmu.
