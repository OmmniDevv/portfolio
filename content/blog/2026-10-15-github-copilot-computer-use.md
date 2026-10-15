---
title: "Copilot Kini Bisa Klik dan Ketik di Aplikasi Desktopmu"
date: 2026-10-15
excerpt: "GitHub Copilot kini bisa mengklik dan mengetik di aplikasi desktop lewat fitur Computer Use. Ini cara kerjanya dan batas keamanan yang perlu kamu tahu."
tags: ai, github, news
image: "https://www.webdew.com/hs-fs/hubfs/Imported_Blog_Media/Github-copilot-1024x566.webp?width=1024&height=566&name=Github-copilot-1024x566.webp"
---

Selama ini asisten coding AI cuma bisa bergerak di dalam batas yang dikasih developer: file kode, terminal, repository, API. Sejak 1 Oktober 2026, batas itu mulai bergeser. GitHub membuka public preview fitur bernama Computer Use untuk Copilot CLI dan aplikasi Copilot di macOS dan Windows. Sederhananya, Copilot sekarang bisa mengoperasikan aplikasi desktop seperti manusia: melihat layar, mengklik tombol, mengetik teks, scroll, drag, sampai pindah antar jendela aplikasi.

Yang bikin ini menarik bukan sekadar kemampuan kliknya. Melainkan fakta bahwa tombol yang diklik tidak perlu milik software yang dirancang untuk AI. GitHub secara eksplisit menyasar aplikasi lama dan aplikasi GUI yang tidak punya API, tidak punya CLI, dan tidak terhubung ke MCP. Itu lapisan software raksasa yang selama ini sulit diotomatisasi secara programatik: aplikasi kasir jadul, software administrasi kantor, sampai form isian yang cuma ada di desktop.

## Cara kerjanya

Copilot tidak asal menebak posisi tombol dari screenshot. Ia membaca dulu accessibility tree milik sistem operasi, yaitu struktur elemen antarmuka (tombol, kolom teks, menu) yang disediakan OS untuk screen reader. Kalau konteks visual masih kurang, barulah ia mengambil screenshot. Setelah paham, ia melakukan aksi: klik, ketik, tekan tombol keyboard, scroll, drag.

![Ilustrasi GitHub Copilot](https://raw.githubusercontent.com/kaiwisdom/awesome-chatgpt-zh/main/imgs/github_copilot_x.png)

Setiap sesi melewati tahap persetujuan sebelum Copilot menyentuh aplikasi apa pun. Kamu bisa mengatur aplikasi mana saja yang boleh diakses dan mencabut izinnya kapan pun. Di sisi enterprise, admin organisasi juga bisa mematikan fitur ini sepenuhnya lewat pengaturan terkelola.

## Contoh tugas yang cocok

Bayangkan pekerjaan seperti ini: memindahkan data dari 200 baris spreadsheet ke form aplikasi inventaris kantor yang tidak punya fitur import. Atau mengisi laporan pengeluaran tiap akhir bulan di portal yang sama sekali tidak punya API. Tugas semacam itu selama ini cuma bisa dikerjakan manusia yang sabar, atau programmer nekat yang menulis skrip otomasi berbasis koordinat layar yang gampang rusak tiap aplikasinya update.

Computer Use menawarkan jalan ketiga: beri instruksi dalam bahasa natural, setujui tiap langkah penting, biarkan agen mengerjakannya sambil kamu mengawasi. Buat tim IT, ini membuka peluang otomatisasi untuk software warisan yang dulu dianggap "tidak mungkin diotomatisasi". Buat freelancer, ini bisa memangkas jam kerja administratif yang tidak dibayar klien.

## Keamanan: jangan asal nyalakan

Computer Use mati secara default, dan itu keputusan yang tepat. Memberi AI akses mengklik di komputermu adalah izin yang besar. Ada dua saklar yang perlu kamu pahami, karena keduanya terpisah.

Saklar kedua adalah local sandboxing, yang mencapai general availability pada 7 Oktober tanpa biaya tambahan. Sandbox membatasi apa yang boleh dibaca, ditulis, dan dijangkau jaringan oleh perintah yang dijalankan agen. Saran yang masuk akal dari para pengulas: aktifkan sandbox dulu, baru computer use. Kalau hanya computer use yang dinyalakan, agen mendapat jangkauan ke desktop sementara perintah shell-nya masih berjalan dengan hak penuh akun usermu.

Demo resmi GitHub sendiri menjalankan alur ini untuk tugas nyata: mengisi expense report di Safari. Tugas yang membosankan, repetitif, dan terjebak di antarmuka visual. Tepat sasaran.

## Batasan yang perlu diingat

Ini masih preview, jadi ekspektasinya dijaga. Otomatisasi desktop bisa gagal karena hal sepele: tampilan aplikasi berubah setelah update, izin yang kurang, atau instruksi yang ambigu. Computer Use juga bukan kontrol komputer tanpa batas seperti di film. Ia bekerja di dalam batas izin yang kamu konfigurasi, dan perilakunya bisa berubah karena statusnya masih preview.

Buat developer dan tim IT, ini tetap langkah besar: dari agen yang memahami software menjadi agen yang juga bisa mengoperasikan antarmuka yang dipakai manusia untuk menjalankan software itu. Buat pengguna biasa, pesannya sederhana: kalau nanti Copilot menawarkan untuk "mengambil alih" aplikasimu, pahami dulu izinnya sebelum menekan setuju.

Tren yang lebih besar di sini adalah agen AI yang makin tidak peduli pada batas aplikasi. Tahun ini saja kita melihat Copilot masuk ke desktop, Perplexity menjadwalkan tugas otomatis, dan Grok ikut merakit slide presentasi. Arahnya jelas: AI yang mengerjakan alur kerja utuh, bukan sekadar menjawab chat. Yang membedakan pemenangnya nanti bukan siapa yang paling canggih, melainkan siapa yang paling bisa dipercaya dengan izin sebesar itu.

Sumber: [izood.net](https://izood.net/tech/github-copilot-computer-use-guide), [responserift.dev](https://responserift.dev/blog/github-copilot-computer-use-desktop-automation), [undercodenews.com](https://undercodenews.com/github-copilot-gains-computer-use-ai-agent-can-now-control-desktop-applications-on-macos-and-windows-video/)
