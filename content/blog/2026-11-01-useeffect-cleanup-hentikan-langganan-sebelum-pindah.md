---
title: "useEffect Cleanup: Hentikan Langganan Sebelum Pindah"
date: 2026-11-01
excerpt: "Lupa membersihkan useEffect bisa membuat aplikasi React memanggil API berkali-kali. Ini pola cleanup yang benar, lengkap dengan contoh nyata."
tags: javascript, react, nextjs, tutorial
image: https://blogger.googleusercontent.com/img/a/AVvXsEhoUNQ23CGO7Dh_wNSeRySnvBL_g1Eb2DTEFq9RTiBcAm9TTjBNjSu4YKKSUIgwl8_QDBcEFhk1GQNkVZgH0NDXLgrAG8UDonhJRz5HzmBHOD2_oBzHPNkusNuyNgoXp_jd2U2RAfBoNrZRAX1SmcK1-gLc8QK6HJO4xI-FGkG7GIm1JcErhFn5QaXX=w1200-h630-p-k-no-nu
---

Pernah membuka halaman React, pindah ke halaman lain, lalu melihat console penuh warning soal state yang di-update pada komponen yang sudah tidak ada? Atau API yang terpanggil berkali-kali padahal kamu hanya membuka halaman sekali? Kemungkinan besar penyebabnya satu: useEffect tanpa cleanup.

Cleanup adalah fungsi yang kamu kembalikan dari dalam useEffect. React menjalankannya sebelum effect berjalan ulang dan saat komponen dilepas dari layar. Tugasnya sederhana: menghentikan apa pun yang effect itu mulai. Kalau effect membuka langganan, cleanup menutupnya. Kalau effect menyalakan timer, cleanup mematikannya.

## Masalah klasik: fetch yang terlambat pulang

Bayangkan komponen profil yang mengambil data user berdasarkan ID. Kodenya mungkin terlihat seperti ini:

```tsx
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => setUser(data));
}, [userId]);
```

Kelihatannya tidak ada yang salah. Tapi perhatikan skenario ini: user membuka profil A, lalu cepat pindah ke profil B sebelum respons profil A datang. Respons A akhirnya tiba dan memanggil `setUser` dengan data yang salah, menimpa data B yang mungkin sudah tampil. Lebih parah lagi, kalau komponennya sudah dilepas sepenuhnya, React akan mengeluh karena state di-update pada komponen yang tidak lagi terpasang.

Solusinya adalah AbortController, API bawaan browser yang memang dibuat untuk membatalkan fetch:

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setUser(data))
    .catch((err) => {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    });

  return () => controller.abort();
}, [userId]);
```

Saat userId berubah atau komponen dilepas, cleanup berjalan dan fetch yang masih menggantung dibatalkan. Perlu diingat, `abort()` membuat promise fetch menolak dengan error bernama `AbortError`, jadi tangkap dan abaikan error itu secara eksplisit supaya tidak dikira error sungguhan.

## Langganan yang tidak pernah ditutup

Kasus kedua yang sama seringnya: event listener dan langganan real-time. Misalnya komponen yang mendengarkan ukuran jendela atau koneksi WebSocket:

```tsx
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

Tanpa baris return itu, setiap kali komponen dipasang, satu listener baru menempel di window dan tidak pernah dilepas. Buka tutup halaman sepuluh kali, maka satu event resize akan memicu sepuluh handler. Aplikasi makin lambat tanpa alasan yang jelas, dan bug seperti ini sulit dilacak karena gejalanya muncul jauh setelah penyebabnya.

Pola yang sama berlaku untuk interval, timeout, dan langganan apa pun yang punya fungsi "berhenti". Aturannya mudah diingat: setiap kali effect memulai sesuatu yang terus berjalan, cleanup harus menghentikannya.

![Ilustrasi layar kode yang sedang ditulis developer di depan komputer](https://hamdyx.dev/_next/image?url=%2Fhero-bg.webp&w=1200&q=75)

## Kenapa effect berjalan dua kali di development

Banyak developer kaget saat melihat effect-nya berjalan dua kali di mode development. Ini bukan bug, melainkan perilaku StrictMode React yang sengaja memasang, melepas, lalu memasang lagi komponen untuk menguji cleanup-mu. Kalau effect tanpa cleanup, masalahnya langsung terlihat: fetch ganda, listener ganda, langganan ganda.

Justru karena itu, StrictMode adalah teman yang baik. Kalau aplikasimu berperilaku aneh di development tapi normal di production, jangan matikan StrictMode untuk menutupinya. Perbaiki cleanup-nya. Production tidak menjalankan effect dua kali, tapi user yang berpindah halaman dengan cepat akan memicu masalah yang sama persis.

## Daftar periksa sebelum selesai

Sebelum menganggap sebuah effect beres, tanyakan tiga hal ini ke dirimu sendiri.

Apakah effect ini memulai sesuatu yang berlanjut? Fetch, timer, listener, WebSocket, dan observer semuanya masuk kategori ini. Kalau ya, cleanup wajib ada.

Apakah cleanup benar-benar menghentikan hal yang sama? Kesalahan umum adalah membuat handler baru di cleanup, misalnya `removeEventListener` dengan fungsi anonim yang berbeda dari yang didaftarkan. Listener seperti itu tidak akan terhapus karena referensinya tidak sama. Simpan handler dalam variabel dan pakai variabel yang sama di kedua tempat.

Apakah ada kondisi balapan antar effect? Dua fetch berurutan untuk ID yang berbeda bisa pulang dalam urutan terbalik. AbortController menyelesaikan ini untuk fetch, tapi untuk sumber data lain, pola flag sederhana kadang cukup:

```tsx
useEffect(() => {
  let active = true;

  loadData(userId).then((data) => {
    if (active) setUser(data);
  });

  return () => {
    active = false;
  };
}, [userId]);
```

Pola ini tidak membatalkan pekerjaan yang sedang berjalan, tapi mencegah hasilnya dipakai setelah komponen tidak lagi peduli.

## Penutup

Cleanup useEffect sering terasa seperti pekerjaan rumah yang membosankan, sampai bug akibat mengabaikannya muncul di aplikasi nyata. Kabar baiknya, polanya selalu sama: apa yang dibuka harus ditutup, apa yang dinyalakan harus dimatikan, dan apa yang dilanggan harus berhenti. Begitu pola ini jadi kebiasaan, sebagian besar bug "aneh" di React hilang dengan sendirinya, dan kamu tidak perlu lagi menebak kenapa API terpanggil tiga kali untuk satu halaman.
