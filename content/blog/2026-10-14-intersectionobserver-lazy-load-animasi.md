---
title: "IntersectionObserver: Lazy Load & Animasi Tanpa Plugin"
date: 2026-10-14
excerpt: "Animasi yang muncul saat di-scroll dan gambar yang load hanya saat terlihat tidak butuh library berat. API bawaan browser ini sudah cukup, ini caranya."
tags: javascript, tutorial, webdev
image: "https://pcbdewindroos.nl/wp-content/uploads/2019/07/code-768x431.jpg"
---

Kamu pasti pernah buka website yang elemennya muncul perlahan begitu di-scroll. Kartu yang meluncur dari bawah, gambar yang baru ter-load saat hampir terlihat. Banyak yang mengira efek seperti itu butuh library animasi berat. Padahal browser modern sudah punya API bawaan untuk ini: IntersectionObserver.

Cara lama biasanya begini: pasang listener di event `scroll`, lalu tiap kali scroll hitung posisi elemen dengan `getBoundingClientRect()`. Masalahnya, event scroll bisa menyala puluhan kali per detik. Perhitungan layout berulang itu bikin scrolling terasa patah-patah, apalagi di HP kentang. IntersectionObserver membalik pendekatannya: kamu cukup bilang "kasih tahu saya kalau elemen ini masuk layar", dan browser yang mengurus sisanya dengan cara yang efisien.

## Animasi reveal saat scroll

Pola paling umum: elemen mulai tersembunyi, lalu muncul dengan transisi begitu terlihat. CSS-nya sederhana.

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: none;
}
```

Lalu di JavaScript, satu observer mengawasi semua elemen berkela `.reveal`:

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

Parameter `threshold: 0.2` artinya callback jalan saat 20 persen elemen sudah masuk viewport. Baris `unobserve` penting: sekali elemen muncul, tidak perlu diawasi lagi. Observer yang dibiarkan mengawasi ratusan elemen adalah pekerjaan sia-sia yang diam-diam memakan memori.

![Kode JavaScript di layar](https://images.unsplash.com/photo-1742072594003-abf6ca86e154?w=1200&q=80&fit=crop)

## Lazy load gambar dengan rootMargin

Kasus kedua yang paling berguna: halaman dengan banyak gambar. Tanpa lazy load, browser mengunduh semuanya sekaligus, termasuk gambar di bagian bawah yang mungkin tidak pernah dilihat pengunjung. Solusinya, simpan URL asli di atribut `data-src` dan biarkan observer menggantinya saat gambar mendekat.

```html
<img data-src="foto-asli.jpg" src="placeholder.jpg" alt="Foto produk" width="800" height="600">
```

```js
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    imgObserver.unobserve(img);
  });
}, { rootMargin: '200px' });

document.querySelectorAll('img[data-src]').forEach((img) => imgObserver.observe(img));
```

`rootMargin: '200px'` adalah triknya. Ia memperluas area pantauan sejauh 200 piksel ke segala arah, jadi gambar mulai diunduh sebelum benar-benar terlihat. Pengunjung tidak akan sempat melihat gambar setengah loading. Atribut `width` dan `height` di tag img juga jangan lupa, supaya layout tidak lompat-lompat saat gambar asli masuk.

## Jebakan yang sering bikin bingung

Tiga hal ini paling sering membuat pemula mengira API-nya rusak, padahal tidak.

Pertama, callback langsung jalan saat halaman dimuat untuk elemen yang sudah terlihat. Itu perilaku normal, bukan bug. Kalau kamu tidak mau animasi jalan untuk elemen di atas lipatan, beri pengecualian atau biarkan saja, karena elemen yang langsung terlihat memang tidak butuh animasi masuk.

Kedua, `threshold` dan `rootMargin` sering tertukar fungsinya. Threshold mengatur seberapa besar bagian elemen yang harus terlihat sebelum callback jalan. RootMargin mengatur seberapa besar area pantauan diperluas di luar viewport. Untuk lazy load gambar, rootMargin positif lebih berguna daripada threshold besar, karena kamu ingin gambar mulai diunduh sebelum terlihat, bukan tepat saat terlihat.

Ketiga, konten yang ditambahkan belakangan lewat JavaScript, misalnya hasil infinite scroll, tidak otomatis diawasi. Kamu harus memanggil `observer.observe()` untuk tiap elemen baru. Pola yang rapi: bungkus logika observe dalam fungsi kecil, lalu panggil lagi setiap kali daftar item bertambah.

Satu observer bisa mengawasi ratusan elemen sekaligus, jadi jangan bikin observer baru per elemen. Itu pemborosan yang tidak perlu.

## Kapan tidak perlu ini

API ini didukung semua browser modern, jadi kompatibilitas bukan masalah kecuali kamu masih harus mendukung Internet Explorer (semoga tidak). Untuk halaman sederhana dengan sedikit gambar, lazy load bawaan HTML lewat atribut `loading="lazy"` sebenarnya sudah cukup dan tidak butuh JavaScript sama sekali. IntersectionObserver bersinar saat kamu butuh kontrol lebih: animasi kustom, preload dengan jarak tertentu, atau memicu sesuatu yang spesifik begitu elemen terlihat.

Coba terapkan di satu halaman dulu. Rasakan bedanya di tab Network: jumlah request awal turun drastis, dan scrolling tetap mulus tanpa library tambahan satu pun.
