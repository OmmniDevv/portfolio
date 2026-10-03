"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

/**
 * Kamus string UI utama — mencakup seluruh section homepage.
 * Tambah key baru di BOTH id & en dengan struktur identik agar typecheck lolos.
 */
const STRINGS = {
  id: {
    nav: {
      about: "Tentang",
      skills: "Kemampuan",
      projects: "Proyek",
      blog: "Blog",
      contact: "Kontak",
      cta: "Mari Bicara",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      mainNavLabel: "Navigasi utama",
    },
    hero: {
      eyebrow: "Studio — Portfolio Pribadi",
      titleA: "Kami membangun",
      titleHighlight: "produk digital",
      titleB: "yang memberikan hasil nyata.",
      intro:
        "Halo, saya Abdul Malik Rizky Nur Rahmat. Junior developer dari Bandung yang fokus bikin website cepat dan bot automasi yang rapi.",
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      hint: "Psst — klik Mao di sebelah kanan, dia bisa diajak interaksi!",
    },
    buttons: {
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      letsTalk: "Mari Bicara",
      send: "Kirim",
      subscribe: "Berlangganan",
      downloadCv: "Download CV",
      printCv: "Print / Simpan PDF",
      readMore: "Baca Selengkapnya",
      backHome: "Kembali ke Beranda",
      back: "Kembali",
    },
    about: {
      eyebrow: "Tentang",
      title: "Sedikit tentang saya",
      desc: "Saya pelajar SMK yang menghabiskan sebagian besar waktu untuk ngoding. Ketertarikan saya ada di dua hal: membangun website yang cepat dan membuat bot yang mengotomatisasi hal-hal membosankan.",
      imgAlt: "Foto Abdul Malik Rizky Nur Rahmat",
      fact1k: "Sekolah",
      fact1v: "SMKN 7 Baleendah",
      fact2k: "Kelas",
      fact2v: "XII",
      fact3k: "Peran",
      fact3v: "Junior Developer & Freelancer",
      fact4k: "Minat",
      fact4v: "Web Development, Bot Automasi",
    },
    capabilities: {
      eyebrow: "Core Capabilities",
      title: "Kami menolak hasil yang biasa-biasa saja.",
      desc: "Setiap piksel direkayasa untuk performa mutlak. Ini yang bisa saya kerjakan untukmu.",
      techLabel: "Teknologi",
      item1: {
        title: "Web Development",
        desc: "Website company profile, dashboard, dan aplikasi web full-stack. Next.js, React, Laravel. Cepat, responsif, dan SEO-friendly.",
      },
      item2: {
        title: "Bot & Automasi",
        desc: "Bot WhatsApp, Telegram, dan Discord untuk automasi bisnis. Notifikasi, auto-reply, integrasi API.",
      },
      item3: {
        title: "Optimasi & Performa",
        desc: "Audit kecepatan, optimasi bundle, dan best practice. Website yang ringan itu website yang dihormati pengunjungnya.",
      },
    },
    marquee: {
      label: "Tech stack",
    },
    projects: {
      eyebrow: "Karya",
      title: "Proyek pilihan",
      desc: "Diambil langsung dari GitHub saya. Klik kartu untuk membuka repositorinya.",
      emptyTitle: "Gagal memuat proyek",
      emptyDescA: "Coba lagi nanti, atau lihat langsung di",
      emptyDescB: ".",
      noDesc: "Belum ada deskripsi.",
    },
    testimonials: {
      eyebrow: "Testimoni",
      title: "Kata mereka",
      ratingLabel: "Rating 5 dari 5",
      item1: {
        name: "Rina Wijaya",
        role: "Owner, Dapur Rina — UMKM Kuliner Bandung",
        quote:
          "Web company profile-nya rapi banget dan loading-nya cepat. Sejak punya website sendiri, pelanggan jadi lebih percaya dan order via WhatsApp naik hampir dua kali lipat.",
      },
      item2: {
        name: "Budi Santoso",
        role: "Admin, Toko Berkah Jaya",
        quote:
          "Bot WhatsApp-nya ngebantu banget buat auto-reply orderan yang masuk tiap hari. Kerjaan admin kepangkas hampir setengah, dan nggak ada lagi chat pelanggan yang kelewat.",
      },
      item3: {
        name: "Siti Rahma",
        role: "Ketua OSIS SMKN 7 Baleendah",
        quote:
          "Dashboard datanya gampang dipakai walau kami bukan orang IT. Pas minta revisi juga direspons cepat, hasilnya sesuai yang kami bayangin.",
      },
    },
    journey: {
      eyebrow: "Perjalanan",
      title: "Dari awal sampai kini",
      m1: {
        year: "2023",
        title: "Masuk SMKN 7 Baleendah",
        desc: "Mulai belajar programming dengan serius di bangku SMK.",
      },
      m2: {
        year: "2024",
        title: "Mendalami bot development",
        desc: "Fokus ke bot WhatsApp, Telegram, dan Discord dengan Node.js dan TypeScript.",
      },
      m3: {
        year: "2025",
        title: "Terjun ke freelance",
        desc: "Mulai mengerjakan project untuk klien: website dan bot automasi.",
      },
      m4: {
        year: "2026",
        title: "Portfolio & Perpus-Online",
        desc: "Merilis website portfolio ini dan sistem perpustakaan Laravel untuk sekolah.",
      },
      m5: {
        year: "Kini",
        title: "Kelas XII",
        desc: "Tahun terakhir SMK. Terbuka untuk freelance dan kolaborasi.",
      },
    },
    certificates: {
      eyebrow: "Sertifikat",
      title: "Course & lomba",
      item1: {
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding Indonesia",
        year: "2024",
        type: "Course",
      },
      item2: {
        title: "Lomba Web Design Tingkat Kota",
        issuer: "TechFest Bandung",
        year: "2024",
        type: "Lomba",
      },
      item3: {
        title: "Belajar JavaScript Lanjutan",
        issuer: "Dicoding Indonesia",
        year: "2025",
        type: "Course",
      },
      item4: {
        title: "Hackathon Pelajar Nasional",
        issuer: "Komunitas Developer",
        year: "2025",
        type: "Lomba",
      },
    },
    anime: {
      label: "Anime favorit",
      eyebrow: "Hobi",
      titleA: "Anime",
      titleB: "Favorit",
      desc: "Selain ngoding, saya juga penikmat anime. Ini daftar yang paling berkesan.",
      item1: { title: "Frieren: Beyond Journey's End", genre: "Fantasy" },
      item2: { title: "Steins;Gate", genre: "Sci-Fi" },
      item3: { title: "Violet Evergarden", genre: "Drama" },
      item4: { title: "Mushishi", genre: "Slice of Life" },
      item5: { title: "Cowboy Bebop", genre: "Space Western" },
      item6: { title: "March Comes in Like a Lion", genre: "Drama" },
    },
    codingStats: {
      label: "Statistik ngoding",
      eyebrow: "Aktivitas",
      titleA: "Statistik",
      titleB: "Ngoding",
      desc: "Dihitung dari 13 repo publik GitHub.",
      note: "Estimasi kasar setara jam manusia.",
      stat1: "Estimasi jam ngoding",
      stat2: "Repository publik",
      stat3: "Total commit",
      langTitle: "Bahasa teratas",
      hoursUnit: "jam",
      updated: "Diperbarui",
      skills: {
        JavaScript: "Andalan utama: bot WhatsApp (Baileys) & web interaktif.",
        PHP: "Backend Laravel: api-ujikom, libralink, LuxBid.",
        CSS: "Styling web: Tailwind & custom CSS di hampir semua proyek.",
        Blade: "Templating Laravel untuk dashboard & admin panel.",
        TypeScript: "Web modern: portfolio Next.js ini & proyek TypeScript lain.",
        Python: "Scripting & otomasi, termasuk tooling bot.",
      },
    },
    pricing: {
      eyebrow: "Harga Jasa",
      title: "Transparan sejak awal",
      desc: "Estimasi harga untuk project freelance. Harga final menyesuaikan kompleksitas — diskusi dulu gratis.",
      popular: "Populer",
      cta: "Tanya Dulu",
      footnote:
        "*Syarat & ketentuan berlaku. Butuh yang custom? Ceritakan kebutuhanmu — estimasi detail diberikan sebelum project mulai, tanpa biaya.",
      plan1: {
        name: "Web Company Profile",
        price: "Rp 1,5 jt",
        unit: "mulai dari",
        desc: "Website profil usaha yang rapi, cepat, dan SEO-friendly.",
        f1: "5–7 halaman (home, tentang, layanan, galeri, kontak)",
        f2: "Desain responsif (HP & desktop)",
        f3: "Form kontak via WhatsApp",
        f4: "SEO dasar + Google Maps",
        f5: "Gratis domain .com tahun pertama*",
      },
      plan2: {
        name: "Web App / Dashboard",
        price: "Rp 4 jt",
        unit: "mulai dari",
        desc: "Aplikasi web atau dashboard admin sesuai kebutuhan bisnis.",
        f1: "Login & hak akses user",
        f2: "CRUD data + laporan",
        f3: "Database MySQL",
        f4: "Export Excel/PDF",
        f5: "Deploy + training singkat",
      },
      plan3: {
        name: "Bot WhatsApp / Telegram",
        price: "Rp 1 jt",
        unit: "mulai dari",
        desc: "Bot automasi untuk order, notifikasi, atau auto-reply.",
        f1: "Auto-reply & menu interaktif",
        f2: "Notifikasi otomatis",
        f3: "Integrasi API / spreadsheet",
        f4: "Multi-device (WhatsApp)",
        f5: "Panduan instalasi",
      },
      plan4: {
        name: "Maintenance",
        price: "Rp 300 rb",
        unit: "/bulan",
        desc: "Web tetap aman, update, dan backup rutin.",
        f1: "Update konten ringan",
        f2: "Backup database berkala",
        f3: "Monitoring uptime",
        f4: "Fix bug minor",
        f5: "Laporan bulanan singkat",
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Sering ditanyakan",
      desc: "Masih ragu? Ini jawaban untuk pertanyaan yang paling sering masuk.",
      q1: {
        q: "Berapa lama pengerjaan project?",
        a: "Company profile biasanya 1–2 minggu, web app/dashboard 3–6 minggu, dan bot 1–3 minggu — tergantung kompleksitas dan kelengkapan materi (teks, foto, logo) dari kamu. Timeline pasti dikasih sebelum project mulai.",
      },
      q2: {
        q: "Sistem pembayarannya bagaimana?",
        a: "DP 50% di awal sebagai tanda jadi, pelunasan 50% setelah website/bot live dan kamu setuju hasil akhirnya. Pembayaran via transfer bank atau e-wallet.",
      },
      q3: {
        q: "Apakah dapat revisi?",
        a: "Dapat. Setiap paket termasuk 2x revisi mayor selama masa pengerjaan. Revisi kecil (typo, ganti foto/teks) gratis selama project berjalan.",
      },
      q4: {
        q: "Bagaimana kalau ada bug setelah serah terima?",
        a: "Ada garansi bug-fixing 30 hari setelah serah terima untuk bug yang berasal dari pengerjaan saya. Setelah itu bisa ambil paket maintenance bulanan.",
      },
      q5: {
        q: "Teknologi apa yang dipakai?",
        a: "Website pakai Next.js/React + Tailwind (cepat & SEO-friendly), backend bisa Laravel + MySQL kalau butuh dashboard. Bot WhatsApp pakai Baileys, bot Telegram pakai Telegram Bot API.",
      },
      q6: {
        q: "Apakah saya dapat akses penuh ke source code?",
        a: "Ya. Setelah pelunasan, semua source code, akses hosting/domain, dan dokumentasi singkat diserahkan penuh ke kamu. Tidak ada yang disandera.",
      },
      q7: {
        q: "Bagaimana cara mulai order?",
        a: "Hubungi saya via halaman kontak / WhatsApp, ceritakan kebutuhanmu, lalu kita diskusi gratis sampai dapat estimasi harga & timeline yang jelas. Deal → DP → project jalan.",
      },
      q8: {
        q: "Apakah melayani di luar Bandung / luar negeri?",
        a: "Bisa. Semua komunikasi via WhatsApp/Zoom dan serah terima online, jadi lokasi bukan masalah.",
      },
    },
    blogTeaser: {
      eyebrow: "Blog",
      title: "Tulisan terbaru",
      allPosts: "Semua tulisan →",
      empty: "Belum ada tulisan. Segera hadir.",
      minRead: "menit baca",
    },
    achievements: {
      eyebrow: "Prestasi",
      titleA: "Pencapaian",
      titleB: "lomba",
      desc: "Beberapa kompetisi yang pernah diikuti dan dimenangkan di bidang web development dan desain.",
      item1: {
        juara: "Juara 1",
        lomba: "Web Design Competition",
        penyelenggara: "TechFest SMK se-Kota Bandung",
        desc: "Membangun landing page company profile dalam 6 jam dengan penilaian desain, responsivitas, dan kecepatan loading.",
      },
      item2: {
        juara: "Juara 2",
        lomba: "Hackathon Web App",
        penyelenggara: "Himpunan Mahasiswa Informatika",
        desc: "Mengembangkan aplikasi pendataan perpustakaan berbasis web dalam 24 jam bersama tim 3 orang.",
      },
      item3: {
        juara: "Finalis",
        lomba: "Lomba Web Development",
        penyelenggara: "Dinas Pendidikan Jawa Barat",
        desc: "Lolos ke babak final tingkat provinsi dengan project sistem informasi sekolah.",
      },
      item4: {
        juara: "Juara 3",
        lomba: "UI/UX Design Challenge",
        penyelenggara: "Komunitas Desainer Bandung",
        desc: "Merancang ulang tampilan aplikasi kasir UMKM dengan fokus pada kemudahan pemakaian.",
      },
      item5: {
        juara: "Juara Harapan 1",
        lomba: "Bot Automation Contest",
        penyelenggara: "Komunitas Developer Indonesia",
        desc: "Membuat bot WhatsApp auto-reply untuk pemesanan dengan alur percakapan natural.",
      },
      item6: {
        juara: "Peserta Terbaik",
        lomba: "Coding Camp Web Development",
        penyelenggara: "Pelatihan Intensif 1 Bulan",
        desc: "Menyelesaikan seluruh modul dan project akhir dengan nilai tertinggi di angkatan.",
      },
    },
    guestbook: {
      eyebrow: "Buku Tamu",
      titleA: "Tinggalkan",
      titleB: "pesan",
      desc: "Mampir dan sapa! Pesanmu bakal tampil di sini.",
      formLabel: "Form buku tamu",
      nameLabel: "Nama",
      namePlaceholder: "Namamu siapa?",
      msgLabel: "Pesan",
      msgPlaceholder: "Tulis pesanmu di sini… (maks 500 karakter)",
      sending: "Mengirim…",
      send: "Kirim Pesan",
      failDefault: "Gagal mengirim pesan.",
      sentFallback: "Pesan terkirim!",
      networkError: "Jaringan bermasalah, coba lagi ya.",
      empty: "Belum ada pesan. Jadilah yang pertama ninggalin jejak! ✨",
      listLabel: "Daftar pesan buku tamu",
    },
    contact: {
      eyebrow: "Kontak",
      titleA: "Punya proyek dalam pikiran?",
      titleB: "Mari bicara.",
      desc: "Ceritakan kebutuhanmu. Saya akan membalas secepat mungkin, biasanya dalam 1x24 jam.",
    },
    newsletter: {
      title: "Newsletter",
      desc: "Update proyek dan tulisan baru, langsung ke emailmu. Tanpa spam.",
      emailLabel: "Alamat email",
      subscribe: "Daftar",
      failDefault: "Gagal mendaftar.",
      unknownError: "Terjadi kesalahan.",
    },
    footer: {
      extraNavLabel: "Tautan tambahan",
      creditA: "© 2026 Abdul Malik Rizky Nur Rahmat. Dibangun dengan Next.js.",
      creditB: "Karakter Live2D: sample data © Live2D Inc.",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      cta: "Let's Talk",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mainNavLabel: "Main navigation",
    },
    hero: {
      eyebrow: "Studio — Personal Portfolio",
      titleA: "We build",
      titleHighlight: "digital products",
      titleB: "that deliver real results.",
      intro:
        "Hi, I'm Abdul Malik Rizky Nur Rahmat. A junior developer from Bandung focused on fast websites and tidy automation bots.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      hint: "Psst — click Mao on the right, she's interactive!",
    },
    buttons: {
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      letsTalk: "Let's Talk",
      send: "Send",
      subscribe: "Subscribe",
      downloadCv: "Download CV",
      printCv: "Print / Save PDF",
      readMore: "Read More",
      backHome: "Back to Home",
      back: "Back",
    },
    about: {
      eyebrow: "About",
      title: "A little about me",
      desc: "I'm a vocational school student who spends most of my time coding. My interests boil down to two things: building fast websites and creating bots that automate the boring stuff.",
      imgAlt: "Photo of Abdul Malik Rizky Nur Rahmat",
      fact1k: "School",
      fact1v: "SMKN 7 Baleendah",
      fact2k: "Grade",
      fact2v: "XII",
      fact3k: "Role",
      fact3v: "Junior Developer & Freelancer",
      fact4k: "Interests",
      fact4v: "Web Development, Bot Automation",
    },
    capabilities: {
      eyebrow: "Core Capabilities",
      title: "We refuse mediocre results.",
      desc: "Every pixel is engineered for absolute performance. Here's what I can build for you.",
      techLabel: "Technologies",
      item1: {
        title: "Web Development",
        desc: "Company profile websites, dashboards, and full-stack web apps. Next.js, React, Laravel. Fast, responsive, and SEO-friendly.",
      },
      item2: {
        title: "Bots & Automation",
        desc: "WhatsApp, Telegram, and Discord bots for business automation. Notifications, auto-replies, API integrations.",
      },
      item3: {
        title: "Optimization & Performance",
        desc: "Speed audits, bundle optimization, and best practices. A lightweight website is a website visitors respect.",
      },
    },
    marquee: {
      label: "Tech stack",
    },
    projects: {
      eyebrow: "Work",
      title: "Selected projects",
      desc: "Pulled live from my GitHub. Click a card to open its repository.",
      emptyTitle: "Failed to load projects",
      emptyDescA: "Try again later, or check directly on",
      emptyDescB: ".",
      noDesc: "No description yet.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What they say",
      ratingLabel: "Rated 5 out of 5",
      item1: {
        name: "Rina Wijaya",
        role: "Owner, Dapur Rina — Culinary SME, Bandung",
        quote:
          "The company profile website is super neat and loads fast. Since having our own website, customers trust us more and WhatsApp orders nearly doubled.",
      },
      item2: {
        name: "Budi Santoso",
        role: "Admin, Toko Berkah Jaya",
        quote:
          "The WhatsApp bot helps a ton with auto-replying to daily orders. Admin workload got cut almost in half, and no customer chat ever slips through anymore.",
      },
      item3: {
        name: "Siti Rahma",
        role: "Student Council Head, SMKN 7 Baleendah",
        quote:
          "The data dashboard is easy to use even though we're not IT people. Revision requests were answered quickly, and the result matched what we imagined.",
      },
    },
    journey: {
      eyebrow: "Journey",
      title: "From the start until now",
      m1: {
        year: "2023",
        title: "Entered SMKN 7 Baleendah",
        desc: "Started learning programming seriously in vocational school.",
      },
      m2: {
        year: "2024",
        title: "Deep into bot development",
        desc: "Focused on WhatsApp, Telegram, and Discord bots with Node.js and TypeScript.",
      },
      m3: {
        year: "2025",
        title: "Went freelance",
        desc: "Started taking on client projects: websites and automation bots.",
      },
      m4: {
        year: "2026",
        title: "Portfolio & Perpus-Online",
        desc: "Launched this portfolio site and a Laravel library system for school.",
      },
      m5: {
        year: "Now",
        title: "Grade XII",
        desc: "Final year of vocational school. Open for freelance and collaboration.",
      },
    },
    certificates: {
      eyebrow: "Certificates",
      title: "Courses & competitions",
      item1: {
        title: "Web Programming Basics",
        issuer: "Dicoding Indonesia",
        year: "2024",
        type: "Course",
      },
      item2: {
        title: "City-level Web Design Competition",
        issuer: "TechFest Bandung",
        year: "2024",
        type: "Competition",
      },
      item3: {
        title: "Advanced JavaScript",
        issuer: "Dicoding Indonesia",
        year: "2025",
        type: "Course",
      },
      item4: {
        title: "National Student Hackathon",
        issuer: "Developer Community",
        year: "2025",
        type: "Competition",
      },
    },
    anime: {
      label: "Favorite anime",
      eyebrow: "Hobbies",
      titleA: "Favorite",
      titleB: "Anime",
      desc: "Besides coding, I'm also an anime enjoyer. These left the biggest impression on me.",
      item1: { title: "Frieren: Beyond Journey's End", genre: "Fantasy" },
      item2: { title: "Steins;Gate", genre: "Sci-Fi" },
      item3: { title: "Violet Evergarden", genre: "Drama" },
      item4: { title: "Mushishi", genre: "Slice of Life" },
      item5: { title: "Cowboy Bebop", genre: "Space Western" },
      item6: { title: "March Comes in Like a Lion", genre: "Drama" },
    },
    codingStats: {
      label: "Coding statistics",
      eyebrow: "Activity",
      titleA: "Coding",
      titleB: "Stats",
      desc: "Computed from 13 public GitHub repos.",
      note: "Rough human-equivalent estimate.",
      stat1: "Est. coding hours",
      stat2: "Public repos",
      stat3: "Total commits",
      langTitle: "Top languages",
      hoursUnit: "h",
      updated: "Updated",
      skills: {
        JavaScript: "Main weapon: WhatsApp bots (Baileys) & interactive web.",
        PHP: "Laravel backends: api-ujikom, libralink, LuxBid.",
        CSS: "Web styling: Tailwind & custom CSS across projects.",
        Blade: "Laravel templating for dashboards & admin panels.",
        TypeScript: "Modern web: this Next.js portfolio & other TS projects.",
        Python: "Scripting & automation, including bot tooling.",
      },
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Transparent from the start",
      desc: "Estimated rates for freelance projects. Final price adjusts to complexity — the initial discussion is free.",
      popular: "Popular",
      cta: "Ask First",
      footnote:
        "*Terms & conditions apply. Need something custom? Tell me your needs — a detailed estimate is given before the project starts, free of charge.",
      plan1: {
        name: "Company Profile Website",
        price: "Rp 1.5 mio",
        unit: "starting from",
        desc: "A neat, fast, SEO-friendly business profile website.",
        f1: "5–7 pages (home, about, services, gallery, contact)",
        f2: "Responsive design (mobile & desktop)",
        f3: "Contact form via WhatsApp",
        f4: "Basic SEO + Google Maps",
        f5: "Free .com domain for the first year*",
      },
      plan2: {
        name: "Web App / Dashboard",
        price: "Rp 4 mio",
        unit: "starting from",
        desc: "A web app or admin dashboard tailored to your business needs.",
        f1: "Login & user access control",
        f2: "Data CRUD + reports",
        f3: "MySQL database",
        f4: "Excel/PDF export",
        f5: "Deployment + quick training",
      },
      plan3: {
        name: "WhatsApp / Telegram Bot",
        price: "Rp 1 mio",
        unit: "starting from",
        desc: "Automation bots for orders, notifications, or auto-replies.",
        f1: "Auto-reply & interactive menus",
        f2: "Automatic notifications",
        f3: "API / spreadsheet integration",
        f4: "Multi-device (WhatsApp)",
        f5: "Installation guide",
      },
      plan4: {
        name: "Maintenance",
        price: "Rp 300k",
        unit: "/month",
        desc: "Keep your site secure, updated, and regularly backed up.",
        f1: "Light content updates",
        f2: "Periodic database backups",
        f3: "Uptime monitoring",
        f4: "Minor bug fixes",
        f5: "Short monthly report",
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked",
      desc: "Still unsure? Here are answers to the most common questions.",
      q1: {
        q: "How long does a project take?",
        a: "Company profiles usually take 1–2 weeks, web apps/dashboards 3–6 weeks, and bots 1–3 weeks — depending on complexity and how complete your materials are (text, photos, logo). You'll get a firm timeline before the project starts.",
      },
      q2: {
        q: "How does payment work?",
        a: "50% down payment upfront as a commitment, the remaining 50% after the website/bot is live and you're happy with the result. Payment via bank transfer or e-wallet.",
      },
      q3: {
        q: "Do I get revisions?",
        a: "Yes. Every package includes 2 major revisions during development. Small revisions (typos, swapping photos/text) are free while the project is running.",
      },
      q4: {
        q: "What if there's a bug after handover?",
        a: "There's a 30-day bug-fixing warranty after handover for bugs from my work. After that, you can take the monthly maintenance package.",
      },
      q5: {
        q: "What technologies do you use?",
        a: "Websites use Next.js/React + Tailwind (fast & SEO-friendly); backends can be Laravel + MySQL if you need a dashboard. WhatsApp bots use Baileys, Telegram bots use the Telegram Bot API.",
      },
      q6: {
        q: "Do I get full access to the source code?",
        a: "Yes. After full payment, all source code, hosting/domain access, and short documentation are handed over to you completely. Nothing is held hostage.",
      },
      q7: {
        q: "How do I start an order?",
        a: "Reach me via the contact page / WhatsApp, tell me your needs, then we discuss for free until we land on a clear price & timeline estimate. Deal → down payment → project starts.",
      },
      q8: {
        q: "Do you serve clients outside Bandung / abroad?",
        a: "Yes. All communication goes through WhatsApp/Zoom and handover is online, so location isn't an issue.",
      },
    },
    blogTeaser: {
      eyebrow: "Blog",
      title: "Latest posts",
      allPosts: "All posts →",
      empty: "No posts yet. Coming soon.",
      minRead: "min read",
    },
    achievements: {
      eyebrow: "Achievements",
      titleA: "Competition",
      titleB: "wins",
      desc: "A few competitions I've joined and won in web development and design.",
      item1: {
        juara: "1st Place",
        lomba: "Web Design Competition",
        penyelenggara: "TechFest — Bandung Vocational Schools",
        desc: "Built a company profile landing page in 6 hours, judged on design, responsiveness, and load speed.",
      },
      item2: {
        juara: "2nd Place",
        lomba: "Hackathon Web App",
        penyelenggara: "Informatics Student Association",
        desc: "Developed a web-based library data app in 24 hours with a team of 3.",
      },
      item3: {
        juara: "Finalist",
        lomba: "Web Development Competition",
        penyelenggara: "West Java Education Office",
        desc: "Reached the provincial finals with a school information system project.",
      },
      item4: {
        juara: "3rd Place",
        lomba: "UI/UX Design Challenge",
        penyelenggara: "Bandung Designers Community",
        desc: "Redesigned an SME cashier app interface with a focus on ease of use.",
      },
      item5: {
        juara: "Honorable Mention",
        lomba: "Bot Automation Contest",
        penyelenggara: "Indonesian Developer Community",
        desc: "Built a WhatsApp auto-reply bot for ordering with a natural conversation flow.",
      },
      item6: {
        juara: "Best Participant",
        lomba: "Web Development Coding Camp",
        penyelenggara: "1-Month Intensive Training",
        desc: "Completed all modules and the final project with the highest score in the cohort.",
      },
    },
    guestbook: {
      eyebrow: "Guestbook",
      titleA: "Leave a",
      titleB: "message",
      desc: "Drop by and say hi! Your message will show up here.",
      formLabel: "Guestbook form",
      nameLabel: "Name",
      namePlaceholder: "What's your name?",
      msgLabel: "Message",
      msgPlaceholder: "Write your message here… (max 500 characters)",
      sending: "Sending…",
      send: "Send Message",
      failDefault: "Failed to send message.",
      sentFallback: "Message sent!",
      networkError: "Network trouble, please try again.",
      empty: "No messages yet. Be the first to leave a mark! ✨",
      listLabel: "Guestbook message list",
    },
    contact: {
      eyebrow: "Contact",
      titleA: "Have a project in mind?",
      titleB: "Let's talk.",
      desc: "Tell me about your needs. I'll get back to you as soon as possible, usually within 24 hours.",
    },
    newsletter: {
      title: "Newsletter",
      desc: "Project updates and new posts, straight to your inbox. No spam.",
      emailLabel: "Email address",
      subscribe: "Subscribe",
      failDefault: "Subscription failed.",
      unknownError: "Something went wrong.",
    },
    footer: {
      extraNavLabel: "Additional links",
      creditA: "© 2026 Abdul Malik Rizky Nur Rahmat. Built with Next.js.",
      creditB: "Live2D character: sample data © Live2D Inc.",
    },
  },
} as const;

type _RawStrings = typeof STRINGS.id;
/** Tipe kamus: struktur dari ID, nilai sebagai string umum (bukan literal). */
export type Strings = { [K in keyof _RawStrings]: _RawStrings[K] extends object ? { [K2 in keyof _RawStrings[K]]: _RawStrings[K][K2] extends object ? { [K3 in keyof _RawStrings[K][K2]]: string } : string } : string };

const TYPED_STRINGS: Record<Lang, Strings> = STRINGS;

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "id" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* abaikan — pakai default 'id' */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* abaikan */
    }
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: TYPED_STRINGS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

/** Ambil bahasa aktif + kamus string. Harus dipakai di dalam <LangProvider>. */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam <LangProvider>");
  return ctx;
}
