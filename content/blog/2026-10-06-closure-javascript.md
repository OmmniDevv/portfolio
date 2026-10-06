---
title: "Closure di JavaScript: Fungsi yang Ingat Variabelnya"
date: 2026-10-06
excerpt: "Closure adalah fungsi yang menyimpan akses ke variabel di sekitarnya meski fungsi pembuatnya sudah selesai. Pahami sekali, keanehan JavaScript jadi masuk akal."
tags: javascript, tutorial, pemula
image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1920&q=80"
---

Closure terdengar seperti istilah kuliah yang rumit, padahal idenya sederhana: sebuah fungsi di JavaScript bisa "mengingat" variabel dari tempat ia dibuat, bahkan setelah tempat itu sudah selesai dijalankan. Sekali kamu paham konsep ini, banyak hal aneh di JavaScript tiba-tiba masuk akal, dari `setTimeout` yang berperilaku misterius sampai tombol counter yang menyimpan angkanya sendiri.

## Contoh paling pendek

```js
function buatPenghitung() {
  let hitung = 0;
  return function () {
    hitung++;
    return hitung;
  };
}

const a = buatPenghitung();
console.log(a()); // 1
console.log(a()); // 2

const b = buatPenghitung();
console.log(b()); // 1, mandiri, tidak ikut-ikutan a
```

Perhatikan: `buatPenghitung` sudah selesai dijalankan saat kita memanggil `a()`. Normalnya variabel `hitung` sudah hilang dari memori. Tapi tidak. Fungsi yang dikembalikan "menutup" (closing over) variabel `hitung` dan membawanya ke mana pun ia pergi. Setiap pemanggilan `buatPenghitung` juga membuat salinan `hitung` yang terpisah, sehingga `a` dan `b` tidak saling mengganggu.

## Kenapa ini berguna

Kegunaan paling langsung adalah menyimpan state privat tanpa membuat class. Variabel `hitung` tidak bisa diakses dari luar, hanya lewat fungsi yang dikembalikan. Kamu dapat enkapsulasi gratis.

Pola ini juga muncul di mana-mana tanpa kamu sadari. Event handler yang membaca variabel di sekitarnya, callback `fetch` yang memakai parameter dari fungsi pembungkusnya, sampai module pattern di Node.js, semuanya closure. Bahkan fungsi memoize sederhana pun closure:

```js
function memo(f) {
  const cache = {};
  return function (x) {
    if (!(x in cache)) cache[x] = f(x);
    return cache[x];
  };
}

const mahal = memo(function (n) { /* komputasi berat */ return n * 2; });
```

`cache` hidup selama fungsi hasil memo dipakai, tersembunyi dari kode lain, dan tidak perlu dideklarasikan di scope global.

![Kode JavaScript di layar](https://images.pexels.com/photos/4922658/pexels-photo-4922658.jpeg?cs=srgb&dl=pexels-chris-frewin-4922658.jpg&fm=jpg)

## Jebakan klasik: loop dan setTimeout

Sekarang bug paling terkenal yang disebabkan closure:

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
// Hasil: 4, 4, 4. Bukan 1, 2, 3.
```

Kenapa? Karena `var` hanya punya satu variabel `i` untuk seluruh loop. Tiga fungsi callback itu closure atas variabel yang sama. Saat `setTimeout` akhirnya jalan, loop sudah selesai dan `i` sudah bernilai 4. Mereka bertiga mengingat variabel yang sama, bukan nilainya saat callback dibuat.

Ada dua perbaikan. Yang modern, ganti `var` dengan `let`:

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
// Hasil: 1, 2, 3
```

`let` membuat binding `i` yang baru di setiap iterasi, jadi tiap callback menutup variabel yang berbeda. Kalau kamu terjebak di kode lama yang harus pakai `var`, bungkus dengan fungsi pembantu yang menerima salinan nilai sebagai parameter, seperti pola IIFE.

## Satu hal yang sering disalahpahami

Closure menyimpan referensi ke variabelnya, bukan salinan nilainya. Artinya kalau variabel luar berubah setelah closure dibuat, closure akan melihat nilai terbarunya. Ini fitur, bukan bug, tapi sering mengejutkan pemula. Uji pemahamanmu dengan contoh tombol ini:

```js
const tombol = document.getElementById("tombol");
let klik = 0;
tombol.addEventListener("click", function () {
  klik++;
  tombol.textContent = "Diklik " + klik + "x";
});
```

Handler klik adalah closure atas `klik`. Setiap klik menaikkan variabel yang sama persis, bukan salinan. Tidak perlu variabel global, tidak perlu atribut data di HTML.

## Coba sendiri dalam lima menit

Buka console browser dan ketik ini, lalu tebak hasilnya sebelum menekan enter:

```js
function salam(nama) {
  const sapaan = "Halo";
  return function () {
    return sapaan + ", " + nama + "!";
  };
}

const sapaBudi = salam("Budi");
const sapaSari = salam("Sari");
console.log(sapaBudi());
console.log(sapaSari());
```

Setiap closure membawa "ransel"-nya sendiri berisi variabel dari lingkungannya. `sapaBudi` membawa `nama = "Budi"`, `sapaSari` membawa `nama = "Sari"`, dan keduanya tidak pernah tertukar. Kalau kamu bisa menjelaskan kenapa hasilnya seperti itu tanpa ragu, kamu sudah paham closure lebih baik dari sebagian besar pelamar kerja junior.

## Intinya satu kalimat

Fungsi di JavaScript tidak pernah benar-benar "lupa" dari mana ia berasal. Ia membawa serta variabel di sekitarnya ke mana pun ia dipanggil. Begitu kamu melihat kode dengan kacamata ini, closure berhenti jadi istilah menakutkan dan berubah jadi alat yang kamu pakai setiap hari tanpa sadar.
