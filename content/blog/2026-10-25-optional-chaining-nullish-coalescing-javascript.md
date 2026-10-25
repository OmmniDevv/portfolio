---
title: Optional Chaining dan Nullish Coalescing Biar Kode Aman
date: 2026-10-25
excerpt: Operator ?. dan ?? di JavaScript menghemat banyak pengecekan manual. Pelajari cara pakainya lewat contoh nyata, plus jebakan umum yang sering bikin bingung.
tags: javascript, tutorial, web
image: https://jobs.sahla-dz.com/wp-content/uploads/2025/08/featured-2288-1024x683.jpeg
---

Pernahkah kamu melihat error `Cannot read properties of undefined` di console? Error ini muncul hampir di setiap proyek JavaScript, dan penyebabnya hampir selalu sama: kode mencoba membaca properti dari sesuatu yang ternyata kosong. Data dari API belum datang, field opsional tidak diisi pengguna, atau objek bersarang yang satu cabangnya hilang. Dua operator kecil, `?.` dan `??`, dibuat untuk membereskan masalah ini dengan cara yang rapi.

Keduanya sudah didukung browser modern dan Node.js versi baru, jadi kamu tidak butuh library tambahan untuk memakainya. Mari lihat satu per satu dengan contoh yang benar benar kamu temui di proyek nyata.

## Optional chaining: membaca tanpa takut error

Bayangkan kamu mengambil data profil dari API seperti ini:

```js
const user = {
  name: "Dina",
  address: {
    city: "Bandung",
  },
};
```

Mengakses `user.address.city` aman. Tapi bagaimana kalau `address` tidak ada? Menulis `user.address.city` saat `address` bernilai `undefined` langsung melempar error dan menghentikan kode setelahnya. Cara lama mengatasinya adalah menulis pengecekan berlapis:

```js
const city = user.address && user.address.city;
```

Itu masih bisa dibaca untuk satu level. Untuk data yang lebih dalam, misalnya `response.data.user.profile.avatar`, pengecekannya jadi panjang dan melelahkan. Optional chaining memangkas semua itu:

```js
const city = user?.address?.city;
const avatar = response?.data?.user?.profile?.avatar;
```

Kalau ada satu bagian yang `null` atau `undefined`, hasilnya langsung `undefined` tanpa error. Kode setelahnya tetap jalan. Operator ini juga bisa dipakai untuk memanggil fungsi yang mungkin tidak ada:

```js
user.onSave?.();
```

Baris itu hanya memanggil `onSave` kalau fungsinya memang ada. Kalau tidak ada, tidak terjadi apa apa. Begitu juga dengan akses array:

```js
const firstTag = post?.tags?.[0];
```

Perlu diingat satu hal: optional chaining hanya berhenti di `null` dan `undefined`. Kalau nilainya `0`, string kosong, atau `false`, ia tetap lanjut membaca. Itu perilaku yang benar, karena nilai nilai itu bukan berarti datanya hilang.

![Kode JavaScript di layar laptop, tempat operator baru ini dipakai sehari-hari](https://portafidei.fr/wp-content/uploads/2026/02/pexels-mizunokozuki-12899188-edited-2048x1536.jpg)

## Nullish coalescing: nilai cadangan yang tidak serakah

Setelah berhasil membaca data dengan aman, masalah berikutnya adalah memberi nilai cadangan kalau datanya kosong. Cara lama memakai operator `||`:

```js
const limit = settings.limit || 10;
```

Kelihatannya baik, sampai kamu sadar `||` menganggap semua nilai falsy sebagai kosong. Kalau pengguna sengaja mengatur limit ke `0`, artinya ia tidak mau ada batas, tapi `||` akan menggantinya jadi `10` karena `0` dianggap falsy. Hal yang sama terjadi pada string kosong yang mungkin memang disengaja.

Operator `??` hanya bereaksi pada `null` dan `undefined`, tidak pada nilai falsy lain:

```js
const limit = settings.limit ?? 10;
const nickname = user.nickname ?? "Tamu";
```

Dengan kode ini, limit `0` tetap `0`, string kosong tetap string kosong, dan `false` tetap `false`. Nilai cadangan baru dipakai kalau datanya benar benar tidak ada. Perbedaan kecil ini menyelamatkan banyak bug yang sulit dilacak, terutama pada formulir dan pengaturan aplikasi.

Keduanya enak dipakai bersamaan. Pola yang paling sering muncul di kode produksi kira kira seperti ini:

```js
const city = user?.address?.city ?? "Kota tidak diketahui";
const timeout = config?.request?.timeout ?? 5000;
```

Baca dari kiri ke kanan: ambil nilainya dengan aman, kalau tidak ada, pakai cadangan. Satu baris menggantikan pengecekan yang dulu butuh beberapa baris if.

## Jebakan yang sering menjebak pemula

Ada beberapa hal yang membuat orang salah paham. Pertama, `??` tidak boleh dicampur langsung dengan `&&` atau `||` tanpa tanda kurung. Menulis `a ?? b || c` akan ditolak parser, dan itu memang disengaja supaya maksudmu jelas. Kalau memang perlu, beri tanda kurung: `(a ?? b) || c`.

Kedua, jangan memakai `?.` untuk semua hal secara membabi buta. Kalau sebuah nilai seharusnya selalu ada dan ternyata tidak ada, menutupinya dengan `?.` justru menyembunyikan bug. Misalnya, kalau objek pengguna wajib punya `id` setelah login, lebih baik biarkan error muncul saat pengembangan, atau tangani secara eksplisit, daripada diam diam menghasilkan `undefined` yang merambat ke tempat lain.

Ketiga, ingat bahwa hasil `?.` adalah `undefined`, bukan string kosong atau nol. Kalau hasil itu langsung ditampilkan ke layar, pengguna akan melihat teks "undefined" yang jelek. Pasangkan dengan `??` atau tangani tampilannya, seperti contoh kota di atas.

Terakhir, ada juga operator `??=` untuk penugasan. Ia hanya mengisi variabel kalau nilainya sedang `null` atau `undefined`:

```js
let theme = userSettings.theme;
theme ??= "light";
```

Baris terakhir hanya mengubah `theme` kalau nilainya kosong. Kalau pengguna sudah memilih "dark", pilihannya tidak akan ditimpa.

## Coba sendiri dalam lima menit

Buka console browser dan tempel potongan ini:

```js
const order = { item: { price: 45000 } };
console.log(order?.customer?.name ?? "Pembeli tidak tercatat");
console.log(order?.item?.price ?? 0);
```

Ubah ubah objeknya: hapus `item`, ganti `price` jadi `0`, lalu lihat hasilnya. Kamu akan langsung merasakan kenapa dua operator ini begitu disukai: kode jadi pendek, maksudnya jelas, dan error karena data kosong berkurang drastis.

Tidak ada yang mewah dari `?.` dan `??`. Mereka hanya membuat kode JavaScript lebih jujur soal kenyataan bahwa data di dunia nyata sering tidak lengkap. Dan di proyek yang datanya datang dari API, formulir, dan pengguna yang tidak bisa ditebak, kejujuran kecil seperti itu sangat berharga.
