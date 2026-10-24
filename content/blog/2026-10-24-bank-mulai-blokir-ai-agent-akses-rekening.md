---
title: Bank Mulai Blokir AI Agent Akses Rekening, Kenapa?
date: 2026-10-24
excerpt: Citi, Wells Fargo, BofA, dan JPMorgan membatasi agent AI pihak ketiga masuk ke rekening nasabah. Cari tahu kenapa bank panik dan apa artinya buat kebiasaan digitalmu.
tags: keamanan, ai agent, perbankan, opini
image: https://www.krti.io/wp-content/uploads/2026/08/Digital-engineering-1.png
---

Bayangkan kamu menyuruh asisten AI: "cek saldo gue, terus bayar tagihan listrik yang jatuh tempo minggu ini." Terdengar praktis. Sekarang bayangkan bank tempat kamu menyimpan uang melihat kebiasaan itu dan berkata: tidak boleh. Itulah yang baru saja terjadi di Amerika Serikat.

Menurut laporan yang dikutip USA Today pada 23 Oktober 2026, empat bank raksasa, Citi, Wells Fargo, Bank of America, dan JPMorgan Chase, mengambil langkah membatasi agent AI pihak ketiga mengakses platform dan layanan mereka. Bank lain disebut mengikuti. Juru bicara Citi menulis dengan tegas: mereka tidak mengizinkan agent atau asisten AI pihak ketiga masuk ke akun nasabah atau bertransaksi langsung di platform digital banking mereka. Nasabah Citi hanya bisa memberi agent akses baca terbatas melalui penyedia open banking yang disetujui bank.

## Kenapa bank-bank ini panik

Alasannya bukan benci teknologi. Ini soal akuntabilitas. Ketika manusia salah transfer, bank tahu siapa yang bertanggung jawab. Ketika sebuah agent AI salah membaca instruksi dan memindahkan uang ke rekening yang salah, siapa yang disalahkan? Penggunanya, pembuat agent-nya, atau modelnya?

Angka-angkanya menjelaskan kekhawatiran itu. Sebuah studi Palo Alto Networks tahun 2026 menemukan dua pertiga CISO di sektor finansial dan perangkat lunak menempatkan AI agentik di tiga risiko keamanan siber teratas, dan lebih dari sepertiga menempatkannya sebagai risiko nomor satu. Andre Durand, CEO Ping Identity, menyebut situasi ini "window of vulnerability": jendela kerentanan di mana sistem, bank, dan pengguna semuanya rentan terhadap kecepatan AI dipersenjatai untuk penipuan.

![Ilustrasi brankas dan keamanan perbankan digital](https://jetron.com/wp-content/uploads/2024/04/Vault-980x735.jpg)

Masalah teknisnya nyata. Agent bisa disusupi lewat prompt injection, bisa mengambil keputusan yang tidak diinginkan pengguna, dan yang paling sulit: bagaimana bank membedakan permintaan dari manusia dengan permintaan dari agent yang mengatasnamakan manusia? Seperti kata Durand, kalau bank bisa mendeteksi itu agent dan bukan manusia, pertanyaan berikutnya adalah bagaimana bank tahu agent itu bertindak atas wewenang manusia yang sah?

## Ironi di sisi pengguna

Data survei Ping yang sama menunjukkan paradoks menarik. Sebanyak 71 persen konsumen khawatir agent AI yang bertindak atas nama mereka bisa salah mewakili kepribadian atau nilai mereka. Tapi hanya 22 persen yang menolak mempercayakan transaksi finansial apa pun kepada AI. Artinya sebagian besar orang sadar risikonya, tetapi tetap mau memakai. Kenyamanan mengalahkan kekhawatiran, seperti biasa.

## Yang sebenarnya diinginkan bank

Penting dicatat: bank tidak melarang agent begitu saja tanpa alternatif. Yang mereka tolak adalah agent pihak ketiga yang login memakai kredensial nasabah, seolah-olah ia manusia. Yang mereka izinkan adalah akses terstruktur lewat open banking: API resmi dengan izin terbatas, token yang bisa dicabut, dan jejak audit yang jelas. Citi sendiri menyebut nasabah bisa memberi agent akses baca terbatas lewat penyedia open banking yang disetujui.

Ini sebenarnya pola yang sehat dan bisa ditiru industri lain. Masalahnya bukan "AI dilarang masuk", melainkan "masuknya lewat pintu yang benar". Industri perlu standar identitas agent: cara bank tahu bahwa permintaan datang dari agent, agent mana itu, dan atas wewenang siapa ia bertindak. Sampai standar itu matang, pembatasan seperti ini akan makin sering kita lihat, bukan makin jarang.

## Pelajaran buat kita di Indonesia

Berita ini soal bank Amerika, tapi polanya universal. Beberapa hal yang layak kamu pegang:

- **Jangan pernah berikan kredensial m-banking ke aplikasi atau agent pihak ketiga**, seberapa pun meyakinkan klaim keamanannya. PIN, OTP, dan password adalah garis merah.
- **Pakai fitur resmi bank** untuk automasi: auto-debit, jadwal transfer, dan notifikasi transaksi. Itu "agent" yang sudah diaudit dan dijamin bank.
- **Waspadai phishing berkedok agent AI**. Setelah isu ini ramai, penipu punya umpan baru: "asisten AI resmi bank X" yang meminta kamu login lewat tautan palsu. Bank tidak pernah meminta kredensial lewat cara seperti itu.

Bank-bank besar tidak sedang anti-AI. Mereka sedang menolak satu hal spesifik: akses yang tidak bisa diaudit dan tidak bisa dipertanggungjawabkan. Dan kalau dipikir-pikir, itu standar yang masuk akal untuk uang siapa pun.

Sumber: USA Today (23 Oktober 2026), laporan Axios, studi Palo Alto Networks 2026, laporan Ping Identity Oktober 2026.
