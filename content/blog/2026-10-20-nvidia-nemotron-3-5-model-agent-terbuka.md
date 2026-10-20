---
title: "NVIDIA Rilis Nemotron 3.5, Model Terbuka untuk AI Agent"
date: 2026-10-20
excerpt: "NVIDIA merilis Nemotron 3.5: tiga model open-weight untuk AI agent, dipimpin Super VL 120B multimodal. Dua model Bolt dirancang berjalan lokal di PC."
tags: ai, berita, nvidia, open-source, ai-agent
image: "https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/hgx-1/data-center-hgx-nvlink-625-ut.jpg"
---

Tren AI tahun ini sudah jelas arahnya. Dari chatbot yang sekadar menjawab pertanyaan, industri bergerak ke AI agent: software yang mengerjakan tugas multi-langkah sendiri, dari riset web sampai triage keamanan. NVIDIA ikut nimbrung serius di tren ini. Pada 15 Oktober 2026 mereka merilis Nemotron 3.5, keluarga model dengan bobot terbuka (open-weight) yang memang dirancang untuk menjalankan agent.

Kenapa ini menarik? Karena NVIDIA selama ini dikenal sebagai penjual GPU, bukan pembuat model. Rilis ini menunjukkan mereka ingin menguasai dua-duanya: hardware-nya dan model yang jalan di atasnya.

## Isi keluarga Nemotron 3.5

Ada tiga model dalam rilis ini, dibagi untuk dua kebutuhan berbeda.

**Nemotron 3.5 Super VL** adalah model andalannya. Model multimodal dengan 120 miliar parameter yang memahami teks, gambar, dokumen, dan video dalam satu model. Arsitekturnya mixture-of-experts (MoE): dari total 120 miliar parameter, hanya sekitar 12 miliar yang aktif per token. NVIDIA mendeskripsikannya untuk agent "always-on" yang berjalan lama, kadang berhari-hari atau berminggu-minggu, untuk tugas seperti review dokumen, riset web, coding, triage keamanan siber, dan analisis video.

**Nemotron 3.5 Bolt 74B-A9B** adalah model 74 miliar parameter yang dirancang untuk tugas agentik lokal. Fokusnya menyeimbangkan kecepatan dengan penalaran: multi-step reasoning, tool calling, dan web browsing, tapi berjalan di infrastruktur sendiri.

**Bolt E4B** adalah yang terkecil, ditujukan untuk conversational agent. Model ini belum rilis saat pengumuman, dijadwalkan menyusul bulan ini.

Super VL dan Bolt 74B sudah tersedia sekarang.

![Server GPU NVIDIA untuk menjalankan model AI](https://etimg.etb2bimg.com/thumb/msid-131901285,imgsize-862349,width-1200,height=627,overlay-ettechmonk,resizemode-75/news/cloud-infrastructure/aws-ec2-g7-instances-boost-ai-graphics-performance-with-nvidia-rtx-pro-4500.jpg)

## Klaim performa, dengan catatan kaki

NVIDIA cukup agresif dengan klaimnya. Mereka bilang Super VL menyamai akurasi model reasoning terbesar mereka dengan parameter kira-kira seperlima, dan memberi throughput sampai lima kali lipat dibanding model open sejenis untuk pekerjaan agent. Angka ini mengutip hasil leaderboard Artificial Analysis yang dilaporkan AI Parabellum.

Catatan penting: itu klaim perusahaan pembuatnya, diukur di benchmark pilihan mereka. Nilai sebenarnya baru ketahuan setelah komunitas mengujinya di workload masing-masing. Kalau kamu memilih model untuk agent workflow, uji berdampingan dengan alternatif seperti GLM 5.3 atau Kimi K3 di tugasmu sendiri sebelum memutuskan.

## Kenapa "open-weight" jadi poin utamanya

Argumen jualan NVIDIA ada di satu kalimat: tidak seperti model frontier yang tertutup, organisasi bisa post-train Super VL dengan data mereka sendiri, deploy di infrastruktur mereka sendiri, dan memiliki apa yang mereka bangun.

Untuk perusahaan, ini soal kontrol. Data sensitif tidak perlu keluar ke API pihak ketiga. Model bisa disesuaikan dengan dokumen internal. Dan tidak ada ketergantungan pada harga API yang bisa berubah sewaktu-waktu.

Di sisi konsumen, NVIDIA mendorong tren asisten AI lokal. PC dengan chip mereka bisa menjalankan model Bolt untuk mendelegasikan pekerjaan sehari-hari tanpa mengirim workload ke cloud. Buat pengguna yang peduli privasi dan tidak mau memberi AI akses ke data keluarga, kesehatan, atau keuangan lewat server orang lain, ini opsi yang masuk akal.

## Siapa yang sudah pakai

TechCrunch mencatat sejumlah perusahaan sudah terlibat dalam ekosistem ini, dari Skydance dan EY sampai Ramp, CrowdStrike, Perplexity, dan Salesforce. Daftar nama itu memberi gambaran ke mana arahnya: bukan eksperimen lab, tapi deployment enterprise yang butuh model bisa diutak-atik dan dijalankan di infrastruktur sendiri.

## Cara mencobanya

Karena bobotnya terbuka, kamu tidak perlu menunggu akses API khusus. Rilisnya didukung SGLang dan vLLM, dua framework serving yang umum dipakai komunitas. Kalau kamu developer yang penasaran, jalur tercepat adalah menarik modelnya dan menjalankannya di vLLM dengan GPU yang memadai, lalu menguji tool-calling di use case kecil sebelum membangun agent yang lebih besar.

Untuk Bolt 74B yang lebih kecil, targetnya jelas: eksperimen lokal dan deployment di PC atau server sendiri.

## Penutup

Nemotron 3.5 bukan model paling besar yang rilis minggu ini (gelar itu dipegang model lain), tapi posisinya unik: open-weight, fokus agent, dan didukung perusahaan yang juga menjual hardware-nya. Kombinasi itu membuatnya layak dicoba, terutama buat tim yang ingin agent berjalan di infrastruktur sendiri.

**Sumber:** [TechCrunch](https://techcrunch.com/2026/10/19/nvidia-launches-new-open-models-to-run-agents-in-the-enterprise-and-on-pcs/) dan [GenZ NewZ](https://genznewz.com/nvidia-nemotron-35-targets-always-on-enterprise-ai-agents)
