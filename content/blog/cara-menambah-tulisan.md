---
title: Cara menambah tulisan baru di blog ini
date: 2026-10-02
tags: blog, panduan
excerpt: Blog ini jalan pakai file Markdown. Ini panduan singkat cara nambah postingan baru, lengkap dengan format frontmatter yang dipakai.
---

Blog ini sengaja dibuat simpel: tiap tulisan adalah satu file Markdown di folder `content/blog/`. Tidak ada CMS, tidak ada database. Cukup tulis, commit, push, dan Vercel yang akan deploy otomatis.

## Format file

Nama file jadi URL. Contoh: `content/blog/belajar-typescript.md` akan tampil di `/blog/belajar-typescript`.

Tiap file diawali frontmatter seperti ini:

```md
---
title: Judul tulisanmu
date: 2026-10-05
tags: typescript, belajar
excerpt: Satu dua kalimat ringkasan yang tampil di daftar tulisan.
---

Isi tulisan pakai Markdown biasa...
```

Kolom `excerpt` opsional. Kalau dikosongkan, ringkasan diambil otomatis dari awal isi.

## Yang didukung

Markdown standar plus tabel dan checklist (lewat remark-gfm):

| Sintaks | Hasil |
|---|---|
| `**tebal**` | **tebal** |
| `*miring*` | *miring* |
| `` `kode` `` | `kode` |

- [x] Checklist seperti ini juga bisa
- [ ] Tinggal centang yang sudah beres

## Estimasi baca

Lama baca dihitung otomatis dari jumlah kata (sekitar 200 kata per menit), jadi tidak perlu ditulis manual.

## Tips

Tulis seperti ngobrol. Satu topik satu tulisan. Kalau tulisannya kepanjangan, pecah jadi seri. Selamat menulis!
