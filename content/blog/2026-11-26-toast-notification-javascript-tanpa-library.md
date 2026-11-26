---
title: Toast Notification JavaScript Tanpa Library Tambahan
date: 2026-11-26
excerpt: Bikin notifikasi toast sendiri dengan JavaScript murni cuma butuh beberapa puluh baris kode. Ini panduan lengkapnya, dari HTML dan CSS sampai animasi.
tags: javascript, tutorial, frontend, web, css
image: https://uploads-ssl.webflow.com/628fbb408e684e5fe0824300/64013dcd2b44b858ffc637de_codebase.png
---

Pernah tidak, habis menekan tombol simpan di sebuah website lalu muncul kotak kecil di pojok layar yang bilang "Berhasil disimpan" dan hilang sendiri beberapa detik kemudian. Itu namanya toast notification. Hampir semua aplikasi modern memakainya, dari Gmail sampai Tokopedia. Fungsinya sederhana, memberi kabar ke pengguna tanpa mengganggu apa yang sedang dia kerjakan.

Berbeda dengan `alert()` yang memblokir seluruh halaman sampai pengguna menekan OK, toast cuma numpang lewat. Pengguna bisa mengabaikannya dan lanjut bekerja. Kabar baiknya, kamu tidak perlu menginstal library apa pun untuk membuatnya. JavaScript murni, sedikit HTML, dan sedikit CSS sudah cukup.

## HTML-nya dulu, sesederhana mungkin

Toast butuh satu wadah yang menampung semua notifikasi. Wadah ini ditaruh di akhir `body` supaya tidak mengganggu layout halaman.

```html
<div id="toast-container"></div>
<button onclick="showToast('Data berhasil disimpan', 'success')">
  Simpan
</button>
```

Wadah ini awalnya kosong. Setiap kali ada notifikasi baru, JavaScript akan membuat elemen baru dan memasukkannya ke dalam wadah ini. Pola ini membuat kamu bisa menampilkan banyak toast sekaligus tanpa menulis HTML baru tiap kali.

## CSS untuk posisi dan animasi

Toast biasanya muncul di pojok kanan bawah. CSS di bawah ini mengatur wadah supaya menempel di sana, dan memberi animasi masuk yang halus.

```css
#toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.toast {
  background: #1f2937;
  color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

.toast.success { border-left: 4px solid #22c55e; }
.toast.error { border-left: 4px solid #ef4444; }
.toast.info { border-left: 4px solid #3b82f6; }
```

Perhatikan trik kecil di sini. Toast dibuat dulu dalam keadaan transparan dan sedikit bergeser ke bawah. Begitu class `show` ditambahkan, transisi CSS mengurus animasinya. Kamu tidak perlu menulis animasi manual di JavaScript, cukup mainkan class.

![Contoh alert JavaScript yang memblokir halaman](https://images.ecency.com/p/99pyU5Ga1kwr5Xg46gnE3BrdGQcYkevrMfGqYdeSdR6t7waaKexK3G5P7tHMcij5szpLJK74qAucVp2rTQwxGvxG428C9mdiUor9U7MqTNcHq6f9x6HVevHEVeeeiGGLPQ.png?format=match&mode=fit)

## Fungsi JavaScript-nya

Ini inti dari semuanya. Fungsi `showToast` menerima pesan dan jenis notifikasi, membuat elemen, menampilkannya, lalu menghapusnya sendiri setelah beberapa detik.

```js
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Beri jeda sekejap supaya transisi CSS sempat berjalan
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    // Tunggu animasi keluar selesai, baru hapus dari DOM
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}
```

Ada dua detail yang sering dilewatkan pemula. Yang pertama, `requestAnimationFrame` dipakai supaya browser sempat menggambar toast dalam keadaan awal sebelum class `show` ditambahkan. Tanpa jeda ini, transisi kadang tidak jalan dan toast muncul begitu saja. Yang kedua, elemen dihapus dari DOM setelah animasi keluar selesai, bukan langsung saat timer habis. Kalau langsung dihapus, animasi keluarnya tidak akan pernah terlihat.

Penggunaannya jadi sangat singkat di mana saja di kode kamu.

```js
showToast('Profil berhasil diperbarui', 'success');
showToast('Gagal terhubung ke server', 'error', 5000);
showToast('Kamu punya 3 pesan baru', 'info');
```

## Tambahkan tombol tutup dan batas jumlah

Toast yang bagus bisa ditutup manual. Pengguna tidak perlu menunggu tiga detik kalau dia sudah membaca pesannya. Kamu bisa menambahkan tombol kecil di dalam toast dan memasang event listener yang menghapusnya langsung.

```js
const closeBtn = document.createElement('button');
closeBtn.textContent = 'x';
closeBtn.style.marginLeft = '12px';
closeBtn.onclick = () => toast.remove();
toast.appendChild(closeBtn);
```

Satu hal lain yang layak dipikirkan adalah membatasi jumlah toast yang tampil bersamaan. Kalau aplikasi kamu memanggil `showToast` berkali-kali dalam waktu singkat, layar bisa penuh dengan kotak notifikasi. Solusinya gampang, sebelum menambahkan toast baru, cek jumlah anak di dalam container dan hapus yang paling lama kalau sudah melebihi batas, misalnya tiga.

```js
if (container.children.length >= 3) {
  container.firstChild.remove();
}
```

## Jangan lupakan pengguna screen reader

Toast muncul dan hilang tanpa interaksi, jadi pengguna screen reader bisa saja tidak menyadarinya. Tambahkan atribut `aria-live="polite"` pada container supaya pembaca layar mengumumkan pesan toast saat muncul. Ini satu baris yang mudah dilupakan tapi besar dampaknya buat aksesibilitas.

```html
<div id="toast-container" aria-live="polite"></div>
```

## Penutup

Toast notification adalah salah satu komponen kecil yang memberi kesan besar. Website yang memberi umpan balik setiap aksi terasa jauh lebih hidup daripada yang diam saja. Dengan kode di atas, kamu sudah punya sistem notifikasi yang cukup untuk kebanyakan proyek, tanpa menambah satu pun dependensi. Kalau nanti kebutuhanmu berkembang, misalnya butuh progress bar di dalam toast atau antrean notifikasi, fondasi yang sama tinggal dikembangkan. Mulai dari yang sederhana, tambah fitur hanya saat benar-benar dibutuhkan.
