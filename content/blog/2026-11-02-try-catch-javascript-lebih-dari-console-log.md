---
title: "Try Catch JavaScript yang Tidak Cuma Console Log"
date: 2026-11-02
excerpt: "Try catch sering berhenti di console.log dan error dibiarkan lewat. Ini cara menulis penanganan error JavaScript yang jelas bagi user dan mudah dilacak."
tags: javascript, tutorial, error-handling, coding
image: https://yagi-system.com/wp-content/uploads/2026/07/javascript-error-message-eyecatch-1200x630.jpg
---

Buka kode JavaScript apa pun yang sudah cukup lama hidup, dan kamu hampir pasti menemukan pola ini:

```js
try {
  await simpanData(data);
} catch (error) {
  console.log(error);
}
```

Kelihatannya aman. Tidak ada crash, tidak ada layar merah, tidak ada keluhan. Padahal pola ini sering menyembunyikan masalah, bukan menyelesaikannya. User menekan tombol simpan, tidak terjadi apa-apa, dan tidak ada yang tahu kenapa. Developer membuka console berhari-hari kemudian, dan jejak errornya sudah hilang bersama sesi browser itu.

Try catch bukan alat untuk membuat error menghilang. Ia adalah alat untuk memutuskan apa yang terjadi setelah error muncul: siapa yang diberi tahu, apa yang dicatat, dan apakah program boleh lanjut atau harus berhenti.

## Tangkap di tempat yang bisa bertindak

Kesalahan pertama yang paling umum adalah menangkap error terlalu awal, di tempat yang tidak bisa berbuat apa-apa selain mencetaknya. Fungsi yang mengambil data dari API, misalnya, tidak tahu apakah kegagalan itu harus ditampilkan sebagai pesan di layar, dicoba ulang, atau dibiarkan saja. Kalau fungsi itu menelan errornya sendiri, pemanggilnya tidak pernah tahu bahwa ada yang gagal.

Pola yang lebih sehat adalah membiarkan error naik sampai ke tempat yang bisa mengambil keputusan. Fungsi tingkat rendah melempar, fungsi tingkat atas yang menangani tampilan yang menangkap.

```js
async function ambilProfil(userId) {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok) {
    throw new Error(`Gagal memuat profil (status ${res.status})`);
  }
  return res.json();
}

async function tampilkanProfil(userId) {
  try {
    const profil = await ambilProfil(userId);
    renderProfil(profil);
  } catch (error) {
    tampilkanPesan("Profil tidak bisa dimuat. Coba lagi sebentar lagi.");
    laporkanError(error);
  }
}
```

Di sini, `ambilProfil` tidak berpura-pura tahu cara menangani kegagalan. Ia hanya memberi kabar yang jelas: apa yang gagal dan statusnya berapa. Keputusan soal pesan ke user dan pencatatan ada di `tampilkanProfil`, tempat yang memang berurusan dengan layar.

## Bedakan error yang bisa dipulihkan dan yang tidak

Tidak semua error layak diperlakukan sama. Ada error yang bisa dipulihkan, seperti jaringan yang sempat putus atau input user yang salah format. Ada juga error yang menandakan bug di kode, seperti mengakses properti dari nilai yang ternyata tidak ada. Memperlakukan keduanya dengan cara yang sama membuat program berperilaku aneh: bug disembunyikan sebagai "coba lagi nanti", atau gangguan jaringan kecil malah membuat aplikasi crash.

Untuk error yang bisa dipulihkan, beri user jalan keluar. Pesan yang baik menyebut apa yang terjadi dan apa yang bisa dilakukan user. "Terjadi kesalahan" tanpa tindakan lanjutan membuat user menebak-nebak. "Koneksi terputus, periksa jaringanmu lalu tekan coba lagi" memberi user sesuatu untuk dilakukan.

## Jangan menelan error diam-diam

Bentuk terburuk dari try catch adalah blok catch yang kosong, atau yang hanya mencetak ke console lalu melanjutkan seolah tidak terjadi apa-apa.

```js
// Jangan lakukan ini
try {
  await kirimPembayaran(data);
} catch {
  // diam, semoga tidak ada yang sadar
}
```

Kalau pembayaran gagal dan kode lanjut ke langkah berikutnya, user bisa mengira pembayaran berhasil padahal tidak. Kalau pengiriman email gagal dan tidak ada yang mencatat, tidak ada yang akan tahu sampai user komplain.

Aturan praktisnya: setiap blok catch harus melakukan minimal satu dari tiga hal ini. Memberi tahu user dengan cara yang sesuai, mencatat error ke tempat yang bisa ditinjau nanti, atau melempar ulang error yang sudah diperkaya informasinya. Kalau blok catch tidak melakukan satu pun dari ketiganya, blok itu sebaiknya dihapus saja dan biarkan errornya terlihat.

![Ilustrasi kode program yang sedang diperiksa untuk mencari kesalahan](https://a-us.storyblok.com/f/1023164/10896037c5/screenshot-2025-07-29-at-12-32-01.jpg/m/800x500/smart/)

## Tulis pesan error yang membantu debugging

Pesan error yang baik menjawab tiga pertanyaan: apa yang gagal, di mana konteksnya, dan data apa yang terlibat. "Gagal menyimpan" kurang membantu. "Gagal menyimpan draft artikel dengan id 42" jauh lebih mudah dilacak, karena developer langsung tahu harus memeriksa apa.

```js
try {
  await simpanDraft(artikel);
} catch (error) {
  const pesan = `Gagal menyimpan draft artikel ${artikel.id}: ${error.message}`;
  laporkanError(new Error(pesan, { cause: error }));
  tampilkanPesan("Draft belum tersimpan. Perubahanmu masih ada di halaman ini.");
}
```

Perhatikan dua hal di contoh itu. Error asli tetap disertakan sebagai penyebab, supaya stack trace-nya tidak hilang. Dan pesan ke user tidak meniru pesan teknis mentah-mentah. User tidak butuh tahu soal status HTTP atau nama fungsi. User butuh tahu apakah datanya aman dan apa yang harus ia lakukan.

## Finally untuk pekerjaan bersih-bersih

Ada satu bagian try catch yang sering dilupakan: `finally`. Blok ini selalu berjalan, entah try berhasil atau catch yang berjalan. Tempatnya yang tepat adalah pekerjaan bersih-bersih yang harus terjadi apa pun hasilnya.

```js
let sedangMemuat = true;
tampilkanSpinner();

try {
  const data = await ambilData();
  renderData(data);
} catch (error) {
  tampilkanPesan("Data tidak bisa dimuat.");
  laporkanError(error);
} finally {
  sedangMemuat = false;
  sembunyikanSpinner();
}
```

Tanpa `finally`, kamu harus menulis kode menyembunyikan spinner di dua tempat: di akhir try dan di akhir catch. Lupa satu tempat saja, spinner akan berputar selamanya setelah error terjadi. Pola yang sama berlaku untuk menutup koneksi, melepaskan kunci, atau mengembalikan tombol ke keadaan bisa diklik.

## Try catch bukan pengganti validasi

Satu kesalahpahaman terakhir: memakai try catch untuk menangani input yang sebenarnya bisa dicek sejak awal. Misalnya, mengakses properti dari data yang mungkin kosong, lalu mengandalkan catch untuk menanganinya. Itu bekerja, tapi membuat alur program sulit dibaca: pembaca kode harus menebak kondisi apa saja yang bisa melempar error di dalam try.

Validasi yang bisa dilakukan sebelum eksekusi sebaiknya tetap ditulis sebagai pengecekan biasa. Try catch disimpan untuk hal-hal yang memang di luar kendali kode saat itu berjalan: jaringan, file, izin, atau layanan pihak ketiga. Pembagian ini membuat kode lebih mudah dibaca dan error yang benar-benar tak terduga lebih mudah dikenali.

## Penutup

Try catch yang baik tidak membuat error hilang. Ia membuat error ditangani di tempat yang tepat, dicatat dengan informasi yang cukup, dan dikomunikasikan ke user dalam bahasa yang bisa ditindaklanjuti. Mulailah dari satu kebiasaan: setiap kali kamu menulis blok catch, tanyakan apakah blok itu memberi tahu user, mencatat sesuatu, atau melempar ulang dengan konteks lebih baik. Kalau jawabannya tidak untuk ketiganya, blok itu belum selesai ditulis, tidak peduli seberapa rapi kelihatannya.
