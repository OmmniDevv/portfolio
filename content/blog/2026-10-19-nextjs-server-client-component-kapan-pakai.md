---
title: "Server vs Client Component di Next.js: Mana Kapan?"
date: 2026-10-19
excerpt: "Server vs Client Component di Next.js App Router: aturan main, contoh kode fetch data di server, dan kesalahan umum yang sering dilakukan pemula."
tags: nextjs, react, tutorial, webdev
image: "https://nextjsreactjs.com/wp-content/uploads/2023/10/rahul-mishra-7vNPUkY3gg4-unsplash-470x264.jpg"
---

Sejak Next.js 13, setiap component di App Router adalah Server Component secara default. Ini perubahan besar dari era Pages Router, di mana semua component dirender di browser. Banyak developer yang pindah ke App Router masih bingung: kapan harus tambah `"use client"`, dan kapan biarkan saja? Artikel ini menjawabnya dengan contoh konkret.

## Aturan mainnya sederhana

Server Component berjalan di server, hasilnya HTML dikirim ke browser. Client Component berjalan di browser, seperti React biasa. Aturan praktisnya:

- Butuh akses langsung ke database, API key, atau file system? **Server Component.**
- Butuh state, event handler (onClick, onChange), atau browser API (localStorage, window)? **Client Component.**
- Cuma menampilkan data statis atau hasil fetch? **Server Component**, biar JavaScript yang dikirim ke browser lebih sedikit.

Contoh Server Component yang fetch data langsung, tanpa useEffect, tanpa loading state manual:

```tsx
// app/products/page.tsx (Server Component, tanpa "use client")
async function getProducts() {
  const res = await fetch("https://api.example.com/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <ul>
      {products.map((p: { id: number; name: string }) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

Perhatikan: component-nya `async`. Ini cuma bisa di Server Component. Data diambil di server, HTML jadi dikirim ke browser. API key yang dipakai di `fetch` tidak bocor ke client.

![Ilustrasi pengembangan aplikasi React](https://www.weblineindia.com/assets/img/og-img/react-js-development_og.jpg)

## Kapan tambah "use client"

Begitu butuh interaktivitas, tandai component sebagai Client Component dengan directive di baris paling atas:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Klik: {count}</button>;
}
```

Pola yang disarankan: keep `"use client"` sekecil mungkin. Jangan tandai seluruh page sebagai client cuma karena satu tombol butuh onClick. Bungkus bagian interaktifnya saja dalam component kecil, sisanya tetap Server Component. Hasilnya: bundle JavaScript yang dikirim ke browser jauh lebih ramping.

## Kesalahan yang sering terjadi

Satu, menandai semua component sebagai `"use client"` karena malas mikir. Ini menghilangkan seluruh keuntungan App Router.

Dua, mencoba pakai `useState` atau event handler di Server Component lalu heran kenapa error. React akan protes dengan jelas, baca pesannya.

Tiga, fetch data di Client Component dengan useEffect padahal datanya tidak butuh interaktivitas. Pindahkan ke Server Component, lebih cepat dan lebih aman.

## Pola komposisi yang benar

Satu hal yang membingungkan pemula: Server Component bisa me-render Client Component, tapi tidak sebaliknya. Maksudnya, kamu boleh import component `"use client"` di dalam Server Component. Yang tidak boleh adalah me-render Server Component di dalam Client Component secara langsung.

Praktiknya terlihat seperti ini. Page tetap Server Component, ia fetch data, lalu datanya diteruskan sebagai props ke component client yang interaktif:

```tsx
// app/dashboard/page.tsx (Server Component)
import { Chart } from "./chart"; // "use client"

async function getStats() {
  const res = await fetch("https://api.example.com/stats");
  return res.json();
}

export default async function DashboardPage() {
  const stats = await getStats();
  return <Chart data={stats} />;
}
```

Satu batasan penting: data yang diteruskan dari server ke client harus bisa di-serialize, alias data JSON biasa. Jangan kirim function, class instance, atau objek aneh lainnya lewat props, nanti React protes.

Pola ini namanya komposisi, dan ini cara idiomatis membangun aplikasi di App Router. Data mengalir dari server ke bawah, interaktivitas hidup di daun-daun component yang kecil. Page-mu tetap ringan, browser user tidak dibebani JavaScript yang tidak perlu.

Intinya: server untuk data, client untuk interaksi. Begitu pola pikir ini nempel, App Router terasa natural.
