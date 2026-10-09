---
title: "TypeScript untuk yang Sudah Bisa JavaScript"
date: 2026-10-09
excerpt: "Sudah nyaman dengan JavaScript? TypeScript cuma menambah tipe data di atasnya. Panduan praktis dari nol sampai paham interface, union, dan generics."
tags: typescript, tutorial, javascript, web
image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?w=1200&q=80"
---

Ada momen yang pasti pernah dialami semua programmer JavaScript: kode berjalan lancar di laptop, lalu meledak di production karena sebuah fungsi menerima `undefined` padahal mengharap string. Error-nya baru ketahuan saat program sudah jalan. TypeScript lahir untuk menangkap kesalahan seperti itu sebelum kode dieksekusi, bukan sesudah.

Kabar baiknya, kalau kamu sudah bisa JavaScript, kamu sudah bisa 90 persen TypeScript. Sisanya cuma soal memberi tahu tipe data ke compiler.

## Sebenarnya TypeScript itu apa

Sederhananya: TypeScript adalah JavaScript ditambah anotasi tipe, yang kemudian dikompilasi kembali menjadi JavaScript biasa. Browser tidak pernah menjalankan TypeScript. Semua anotasi tipe dihapus saat kompilasi, yang tersisa JavaScript polos.

Artinya dua hal. Satu, semua kode JavaScript valid adalah kode TypeScript valid. Kamu bisa memigrasi file `.js` jadi `.ts` sedikit demi sedikit. Dua, tipe hanya ada saat kamu ngoding (compile time). Saat program jalan, tidak ada pengecekan tipe sama sekali.

## Setup paling minimal

Tidak perlu ribet. Di folder project:

```bash
npm init -y
npm install -D typescript
npx tsc --init
```

Perintah terakhir membuat `tsconfig.json`. Untuk mulai, cukup pastikan `strict` bernilai `true` (ini default yang baik) dan `outDir` mengarah ke folder build, misalnya `./dist`. Kompilasi satu file semudah:

```bash
npx tsc index.ts
```

Kalau cuma mau coba-coba tanpa install, buka TypeScript Playground di browser. Tidak perlu setup apa pun.

## Anotasi dasar: semudah memberi label

```ts
let nama: string = "Kana";
let umur: number = 17;
let sudahMakan: boolean = false;

function sapa(nama: string): string {
  return `Halo, ${nama}!`;
}

sapa("Omni");      // OK
sapa(123);         // Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

Error seperti di atas muncul di editor bahkan sebelum kamu menjalankan apa pun. Itulah seluruh nilai jual TypeScript dalam satu contoh.

Untuk object, pakai `interface`:

```ts
interface Pengguna {
  nama: string;
  umur: number;
  email?: string; // tanda tanya = opsional, boleh tidak diisi
}

function daftar(p: Pengguna) {
  console.log(`${p.nama} (${p.umur}) terdaftar`);
}

daftar({ nama: "Malik", umur: 17 }); // OK, email opsional
daftar({ nama: "Malik" });          // Error: umur wajib ada
```

![Contoh code completion TypeScript di VS Code](https://code.visualstudio.com/assets/docs/languages/typescript/ts-snippets.png)

Bedanya `interface` dan `type`? Untuk pemula, aturan praktisnya: pakai `interface` untuk bentuk object, pakai `type` untuk gabungan tipe (union) atau alias sederhana.

```ts
type Status = "menunggu" | "diproses" | "selesai";

function ubahStatus(s: Status) { /* ... */ }

ubahStatus("menunggu"); // OK
ubahStatus("ngaret");   // Error: bukan salah satu dari tiga nilai itu
```

Union type seperti ini luar biasa berguna. Tanpa TypeScript, typo `"selesai"` jadi `"slesai"` baru ketahuan saat fitur rusak di tangan pengguna.

## Generics: satu konsep yang terlihat menakutkan

Banyak yang mundur saat melihat `<T>`. Padahal idenya sederhana: fungsi yang bekerja untuk banyak tipe tanpa kehilangan informasi tipe.

```ts
function ambilPertama<T>(daftar: T[]): T | undefined {
  return daftar[0];
}

const angka = ambilPertama([1, 2, 3]);     // T = number, hasil: number | undefined
const kata = ambilPertama(["a", "b"]);     // T = string, hasil: string | undefined
```

Tanpa generics, kamu harus menulis fungsi terpisah untuk tiap tipe, atau memakai `any` dan kehilangan semua keamanan tipe. Generics menyelesaikan keduanya sekaligus. Kamu tidak perlu menguasainya di hari pertama, tapi kenali polanya karena kamu akan sering melihatnya di library.

## Error yang paling sering bikin pemula kaget

Begitu `strict` aktif, ada dua error yang hampir pasti kamu temui di minggu pertama. Yang pertama:

```ts
function panjangNama(nama?: string) {
  return nama.length; // Error: 'nama' is possibly 'undefined'
}
```

TypeScript memaksamu menangani kemungkinan `undefined`. Solusinya elegan, pakai optional chaining dan nullish coalescing yang sebenarnya sudah ada di JavaScript modern:

```ts
function panjangNama(nama?: string) {
  return nama?.length ?? 0;
}
```

Error kedua yang populer:

```ts
const user = { nama: "Kana" };
console.log(user.umur); // Error: Property 'umur' does not exist
```

Di JavaScript, ini menghasilkan `undefined` diam-diam dan bug-nya baru muncul jauh di baris lain. Di TypeScript, kamu langsung ditunjuk baris masalahnya. Setelah terbiasa, error-error ini terasa seperti asisten yang cerewet tapi selalu benar, bukan seperti gangguan.

## Jebakan terbesar: `any`

TypeScript punya jalan pintas bernama `any` yang mematikan semua pengecekan tipe:

```ts
let data: any = { nama: "Kana" };
data.apaPun.bolehDiakses.tanpaError; // tidak ada error, padahal ngawur
```

Tiap kali kamu menulis `any`, kamu sedang berkata ke compiler: "sudahi pekerjaanmu". Sesekali boleh saat terdesak (misalnya data dari API pihak ketiga yang bentuknya belum jelas), tapi kalau satu file penuh `any`, kamu cuma menulis JavaScript dengan langkah ekstra. Gunakan `unknown` kalau memang belum tahu tipenya, karena `unknown` memaksamu memeriksa tipe sebelum memakai nilainya.

## Kapan tidak perlu TypeScript

Jujur saja: tidak semua project butuh. Script sekali pakai, bot kecil, atau prototipe yang umurnya seminggu lebih cepat ditulis dalam JavaScript polos. TypeScript membayar lunas saat codebase tumbuh: banyak file, banyak kontributor, atau kode yang harus dirawat berbulan-bulan. Di titik itu, error yang tertangkap di editor jauh lebih murah daripada error yang tertangkap pengguna.

Mulailah dari satu file. Tambahkan tipe ke fungsi yang paling sering bikin bug. Rasakan bedanya seminggu. Kebanyakan orang yang mencoba dengan cara ini tidak pernah kembali ke JavaScript polos untuk project serius.
