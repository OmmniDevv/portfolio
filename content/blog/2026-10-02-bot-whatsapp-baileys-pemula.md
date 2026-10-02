---
title: Bikin Bot WhatsApp Sendiri dengan Baileys (Panduan Pemula)
date: 2026-10-02
excerpt: Panduan lengkap membuat bot WhatsApp dengan Baileys dan Node.js, dari instalasi dan pairing code sampai auto-reply pesan otomatis. Cocok untuk pemula.
tags: whatsapp, bot, nodejs, tutorial
image: https://www.tahawultech.com/wp-content/uploads/2018/07/WhatsApp-chats-2-1-840x440.jpg
---

Pernah kepikiran punya asisten yang otomatis membalas chat WhatsApp? Misalnya bot yang menjawab "Halo! Ada yang bisa dibantu?" setiap ada pelanggan baru yang chat. Ternyata bikinnya tidak sesulit yang dibayangkan, dan kamu tidak perlu jadi programmer senior untuk mulai.

Library yang paling populer untuk ini namanya Baileys. Ini library Node.js tidak resmi yang memungkinkan kode JavaScript kamu terhubung ke WhatsApp seperti WhatsApp Web, lalu membaca dan membalas pesan secara otomatis.

## Yang perlu disiapkan

Cukup dua hal: Node.js versi 18 ke atas terinstal di komputermu, dan satu nomor WhatsApp yang akan dijadikan bot (disarankan nomor kedua, bukan nomor pribadimu, karena ada risiko nomor kena blokir kalau bot-nya spam).

Buat folder project baru, lalu instal Baileys:

```bash
mkdir bot-wa && cd bot-wa
npm init -y
npm install @whiskeysockets/baileys
```

## Kode bot paling sederhana

Buat file `index.js` dengan isi berikut:

```js
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("sesi");
  const sock = makeWASocket({ auth: state });

  sock.ev.on("creds.update", saveCreds);

  // Minta pairing code (8 digit) alih-alih scan QR
  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode("6281234567890");
    console.log("Pairing code:", code);
  }

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const teks = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const dari = msg.key.remoteJid;

    if (teks.toLowerCase() === "halo") {
      await sock.sendMessage(dari, { text: "Halo juga! Ada yang bisa dibantu?" });
    }
  });
}

start();
```

Ganti `6281234567890` dengan nomor bot-mu dalam format internasional (tanpa tanda +).

![Ilustrasi chat WhatsApp di HP](https://www.mistergadget.tech/wp-content/uploads/2025/11/whatsapp-11102025-mistergadget.tech_.jpg)

## Cara menjalankannya

Jalankan dengan `node index.js`. Di terminal akan muncul pairing code 8 digit. Buka WhatsApp di HP, masuk ke Pengaturan, Perangkat Tertaut, Tautkan Perangkat, lalu pilih "Tautkan dengan nomor telepon" dan masukkan kode tersebut.

Setelah tertaut, coba kirim "halo" dari nomor lain ke nomor bot. Kalau dibalas otomatis, selamat, bot-mu hidup.

Sesi login tersimpan di folder `sesi`, jadi kamu tidak perlu pairing ulang setiap restart. Jangan hapus folder itu kecuali kamu memang mau logout.

## Kembangkan sesuai kebutuhan

Dari fondasi ini, kamu bisa menambah banyak fitur: auto-reply berdasarkan kata kunci, menu interaktif, integrasi dengan database, sampai pengingat jadwal. Kuncinya adalah event `messages.upsert` yang memberi tahu setiap ada pesan masuk, dan `sock.sendMessage` untuk membalas.

## Menangani jenis pesan lain

Teks bukan satu-satunya yang masuk. User bisa mengirim gambar, stiker, atau pesan suara. Baileys memberi tahu jenisnya lewat struktur `msg.message`, jadi kamu bisa merespons berbeda:

```js
if (msg.message.imageMessage) {
  await sock.sendMessage(dari, { text: "Gambar diterima! Lagi diproses..." });
} else if (msg.message.stickerMessage) {
  await sock.sendMessage(dari, { text: "Stikernya lucu, tapi aku belum bisa membalas stiker." });
}
```

Pola ini membuka banyak kemungkinan. Bot katalog bisa membalas dengan daftar produk saat user mengetik "katalog", bot absensi bisa mencatat kehadiran dari pesan "hadir". Kuncinya selalu sama: baca jenis pesan, tentukan responsnya.

Untuk bot yang lebih serius, pisahkan logika per perintah ke fungsi atau file tersendiri. File `index.js` yang berisi semua logika akan cepat membengkak dan susah dirawat setelah fiturnya belasan.

Satu peringatan penting: ini library tidak resmi, jadi gunakan dengan bijak. Jangan kirim pesan massal atau spam, karena WhatsApp bisa memblokir nomor yang terdeteksi otomatisasi agresif. Untuk pemakaian pribadi dan bisnis kecil dengan volume wajar, umumnya aman.

Selamat bereksperimen. Bot pertamamu mungkin sederhana, tapi rasa puas saat dia membalas pesan pertamanya itu luar biasa.
