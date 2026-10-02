# OmniDev Portfolio

Portfolio pribadi Abdul Malik Rizky Nur Rahmat. Dibangun ulang dengan pendekatan minimalis dan glassmorphism.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Three.js (objek 3D hero)

## Jalankan lokal

```bash
npm install
npm run dev
```

## Struktur

- `app/` — halaman (beranda, blog) dan API newsletter
- `components/` — komponen UI
- `content/blog/` — tulisan blog dalam Markdown
- `lib/` — helper (blog, GitHub API)

## Menambah tulisan blog

Buat file `.md` di `content/blog/` dengan frontmatter:

```md
---
title: Judul tulisan
date: 2026-10-05
tags: tag1, tag2
excerpt: Ringkasan singkat.
---

Isi tulisan...
```

## Deploy

Otomatis via Vercel setiap push ke `main`.

