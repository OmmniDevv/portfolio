---
title: "TypeScript: Partial, Pick, dan Omit Biar Tipe Tak Berulang"
date: 2026-10-28
excerpt: "Satu tipe User bisa melahirkan form edit, kartu profil, dan payload API tanpa ditulis ulang. Kenali Partial, Pick, dan Omit lewat contoh yang bisa dipakai."
tags: typescript, tutorial, programming, frontend
image: https://cybersoft.edu.vn/wp-content/uploads/2022/12/ts.jpg
---

Pernahkah kamu menulis tipe yang sama tiga kali dengan sedikit perbedaan? Satu tipe lengkap untuk data dari server, satu lagi untuk form edit yang semua fieldnya opsional, satu lagi untuk payload simpan yang tidak butuh id. Awalnya terasa wajar, tapi lama-lama file tipemu penuh dengan salinan yang sulit dijaga. Ubah satu field di tipe utama, lupa mengubah salinannya, dan bug pun muncul dari tempat yang tidak terduga.

TypeScript punya jawaban yang rapi untuk masalah ini: utility types. Utility types adalah tipe bawaan yang mengubah tipe lain menjadi bentuk baru. Tiga yang paling sering terpakai sehari-hari adalah Partial, Pick, dan Omit. Ketiganya tidak butuh library tambahan dan bisa langsung kamu pakai di proyek apa pun.

Kita mulai dari satu tipe dasar yang akan dipakai di semua contoh berikut:

```ts
type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
  isAdmin: boolean;
};
```

Tipe ini adalah sumber kebenaran tunggal. Semua varian di bawah berasal dari sini, sehingga kalau field berubah, variannya ikut berubah secara otomatis.

## Partial: semua field jadi opsional untuk form edit

Form edit jarang mengirim semua field sekaligus. Pengguna mungkin hanya mengubah bio, sementara nama dan email dibiarkan sama. Kalau tipe form edit menuntut semua field wajib diisi, kamu terpaksa mengirim data lama yang tidak berubah, atau menulis tipe baru yang semua fieldnya ditandai opsional satu per satu.

Partial menyelesaikan ini dalam satu baris. Partial mengubah semua properti dari sebuah tipe menjadi opsional:

```ts
type UserUpdate = Partial<User>;

const update: UserUpdate = {
  bio: "Belajar TypeScript sambil membangun proyek kecil.",
};
```

Objek di atas sah, walau hanya berisi bio. TypeScript tetap memeriksa nama properti dan tipe nilainya. Menulis `nam: "Budi"` akan ditolak karena salah ketik, dan menulis `bio: 123` juga ditolak karena bio harus string. Jadi fleksibilitasnya tidak mengorbankan keamanan tipe.

Pola ini cocok untuk fungsi update, baik ke API maupun ke state lokal. Fungsi menerima Partial, lalu menggabungkannya dengan data lama:

```ts
function updateUser(current: User, changes: UserUpdate): User {
  return { ...current, ...changes };
}
```

Perhatikan bahwa Partial bekerja satu lapis saja. Kalau User punya properti objek di dalamnya, properti dalam objek itu tetap wajib diisi. Untuk kasus bertingkat, kamu perlu pola lain, tapi untuk form datar seperti contoh di atas, Partial sudah lebih dari cukup.

![Ilustrasi kode TypeScript di layar editor](https://oboe-storage.s3.amazonaws.com/dev/covers/v1/sequence-28654/112b5fba-bfd3-4132-ac25-c495eb25f16a.jpeg)

## Pick: ambil hanya field yang dibutuhkan komponen

Komponen kartu profil tidak butuh semua data User. Ia hanya butuh nama, bio, dan mungkin status admin untuk menampilkan lencana. Mengoper seluruh objek User ke komponen itu memang jalan, tapi membuat komponen bergantung pada data yang tidak ia pakai, dan menyulitkan saat kamu ingin memakai ulang komponen untuk data dari sumber lain.

Pick mengambil sebagian properti dari sebuah tipe, sesuai daftar nama yang kamu sebutkan:

```ts
type UserCard = Pick<User, "name" | "bio" | "isAdmin">;

const card: UserCard = {
  name: "Budi",
  bio: "Suka ngoding dan kopi susu.",
  isAdmin: false,
};
```

Menambahkan `email` ke objek itu akan ditolak, karena email tidak termasuk dalam daftar Pick. Itu justru yang diinginkan: komponen menerima tepat apa yang ia butuhkan, tidak lebih.

Pick juga berguna di sisi API. Misalnya endpoint daftar pengguna hanya mengembalikan nama dan bio untuk alasan privasi. Daripada menulis tipe baru dari nol, cukup Pick dua field itu dari User. Kalau suatu hari field bio diganti namanya, TypeScript akan langsung protes di semua tempat yang masih memakai nama lama.

## Omit: buang field yang tidak boleh dikirim

Kebalikan Pick adalah Omit. Omit membuat tipe baru dengan membuang properti yang kamu sebutkan. Kasus paling klasik adalah payload pembuatan data baru. Saat membuat pengguna baru, id biasanya dibuat oleh server, jadi klien tidak boleh mengirimnya:

```ts
type NewUser = Omit<User, "id" | "isAdmin">;

const payload: NewUser = {
  name: "Sari",
  email: "sari@example.com",
  bio: "Baru mulai belajar web.",
};
```

Kalau ada yang iseng menambahkan `id` atau `isAdmin` ke payload, TypeScript menolaknya. Ini mencegah bug yang halus, misalnya form pendaftaran yang diam-diam mengirim status admin dari sisi klien.

Omit dan Pick bisa saling menggantikan dalam banyak kasus. Pilih berdasarkan mana yang lebih mudah dibaca. Kalau kamu hanya butuh dua field dari sepuluh, Pick lebih jelas. Kalau kamu hanya ingin membuang satu field dari sepuluh, Omit jauh lebih singkat daripada menulis sembilan nama field di Pick.

## Menggabungkan ketiganya dalam satu alur

Ketiga utility ini paling terasa manfaatnya saat dipakai bersama dalam satu alur nyata. Bayangkan halaman profil dengan tiga kebutuhan: menampilkan kartu, mengedit profil, dan mendaftarkan pengguna baru. Semuanya berangkat dari tipe User yang sama:

```ts
type UserCard = Pick<User, "name" | "bio">;
type UserUpdate = Partial<User>;
type NewUser = Omit<User, "id" | "isAdmin">;
```

Tiga baris itu menggantikan tiga definisi tipe manual yang masing-masing berisi beberapa field. Lebih penting lagi, ketiganya tidak bisa menyimpang dari User. Mengubah tipe email dari string menjadi objek akan langsung terasa di semua varian, dan TypeScript menunjukkan tempat mana saja yang perlu diperbaiki.

Satu kebiasaan yang layak ditiru adalah menamai varian sesuai kegunaannya, bukan sesuai utility yang dipakai. Nama seperti UserCard, UserUpdate, dan NewUser jauh lebih mudah dipahami saat dibaca ulang daripada nama seperti PartialUser atau PickedUser. Utility adalah cara membuatnya, bukan identitasnya.

Mulai dari sini, setiap kali kamu tergoda menyalin tipe lalu mengubah sedikit isinya, berhentilah sejenak dan tanyakan: apakah ini bisa dibuat dari tipe yang sudah ada dengan Partial, Pick, atau Omit. Dalam kebanyakan kasus, jawabannya ya, dan kodemu akan jadi lebih pendek sekaligus lebih sulit rusak.
