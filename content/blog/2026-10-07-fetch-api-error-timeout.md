---
title: "Fetch API Tanpa Panik: Tangani Error dan Timeout dengan Rapi"
date: 2026-10-07
excerpt: "fetch() tidak error saat server balas 404. Pelajari cara menangani error HTTP, jaringan putus, dan request menggantung dengan AbortController."
tags: javascript, tutorial, fetch, web
image: "https://images.pexels.com/photos/31343632/pexels-photo-31343632.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"
---

Hampir setiap aplikasi web modern mengambil data dari server, dan `fetch()` adalah cara paling umum melakukannya di JavaScript. Sayangnya tutorial pemula biasanya berhenti di contoh paling bahagia: server merespons, data datang, semua orang tersenyum. Di dunia nyata, server bisa down, jaringan bisa putus, dan request bisa menggantung selamanya. Artikel ini membahas cara menanganinya dengan rapi.

## Kejutan pertama: fetch tidak error saat 404

Ini jebakan paling umum. `fetch()` hanya melempar error kalau requestnya gagal total (misalnya tidak ada koneksi). Kalau server membalas dengan status 404 atau 500, promise-nya tetap dianggap sukses.

```js
const res = await fetch("https://api.example.com/users");

// res.ok bernilai true hanya untuk status 200-299
if (!res.ok) {
  throw new Error("Request gagal: " + res.status);
}

const data = await res.json();
```

Biasakan selalu mengecek `res.ok` sebelum memproses body. Satu baris ini menyelamatkanmu dari bug paling membingungkan: aplikasi menampilkan data kosong tanpa pesan apa pun.

## Membungkus semuanya dalam try/catch

Karena ada dua jenis kegagalan (HTTP error dan network error), pola paling aman adalah satu blok `try/catch` yang menangani keduanya:

```js
async function ambilPengguna() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("Server membalas " + res.status);
    }
    const users = await res.json();
    console.log(users[0].name);
  } catch (err) {
    // err bisa berupa network error ATAU error HTTP di atas
    console.error("Gagal mengambil data:", err.message);
  }
}
```

Ingat juga `res.json()` bisa gagal kalau server membalas HTML error page alih-alih JSON. Itu juga akan tertangkap oleh `catch` yang sama.

## Timeout: request yang menggantung selamanya

`fetch()` secara default tidak punya batas waktu. Kalau server diam tanpa membalas, request-mu menunggu selamanya dan loading spinner berputar tanpa akhir. Solusinya: `AbortController`.

```js
async function ambilDenganTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error("Server membalas " + res.status);
    }
    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timeout setelah " + ms + "ms");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
```

Perhatikan `clearTimeout(timer)` di blok `finally`. Tanpa itu, timer tetap berjalan meski request sudah selesai. Bukan error fatal, tapi kebocoran kecil yang menumpuk di aplikasi besar.

## Jangan lupa request POST juga bisa gagal

Contoh di atas semuanya GET, padahal pola yang sama berlaku untuk request yang mengirim data. Bedanya cuma di opsi yang dikirim:

```js
const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Halo", body: "Isi postingan" }),
});
if (!res.ok) {
  throw new Error("Gagal menyimpan: " + res.status);
}
```

Satu detail yang sering terlewat: `JSON.stringify` bisa melempar error kalau objeknya punya referensi melingkar (circular reference). Kalau datanya berasal dari state aplikasi yang kompleks, bungkus juga bagian itu dalam try/catch yang sama.

![Kode JavaScript di layar editor](https://images.pexels.com/photos/31177212/pexels-photo-31177212/free-photo-of-colorful-javascript-code-on-a-computer-screen.jpeg?cs=tinysrgb&dpr=1&w=500)

## Bonus: retry sederhana untuk error sementara

Kadang server cuma batuk sebentar. Untuk kasus seperti itu, percobaan ulang dengan jeda singkat sering cukup:

```js
async function ambilDenganRetry(url, percobaan = 3) {
  let terakhir;
  for (let i = 0; i < percobaan; i++) {
    try {
      return await ambilDenganTimeout(url);
    } catch (err) {
      terakhir = err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw terakhir;
}
```

Jeda dibuat bertambah (1 detik, 2 detik, 3 detik) supaya tidak membombardir server yang sedang kesulitan. Jangan pakai retry untuk error 404 atau 400, karena mengulang request yang memang salah alamat tidak akan mengubah hasil.

## Rangkuman pola amannya

Setiap kali memanggil API, tanyakan tiga hal pada kodemu: apakah status HTTP dicek, apakah network error ditangkap, dan apakah ada batas waktu. Kalau ketiganya terjawab, `fetch`-mu sudah jauh lebih dewasa dari kebanyakan tutorial di luar sana. Mulai dari fungsi kecil seperti contoh di atas, lalu pakai ulang di seluruh proyekmu.
