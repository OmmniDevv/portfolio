---
title: "List Comprehension Python: Satu Baris, Banyak Kerja"
date: 2026-10-26
excerpt: List comprehension mengubah loop pembentuk list jadi satu baris yang ringkas. Pelajari bentuk dasarnya, kondisinya, dan kapan tetap pakai loop biasa.
tags: python, tutorial, programming, coding
image: https://softuni.bg/content/images/common/programs/software-engineer-python.webp
---

Kalau kamu sering menulis Python, pola ini pasti pernah kamu temui: mulai dari list kosong, lalu loop untuk mengisi satu per satu.

```python
kuadrat = []
for angka in range(1, 6):
    kuadrat.append(angka ** 2)
```

Kode itu benar dan mudah dibaca. Tapi Python punya cara yang lebih ringkas untuk pola yang sama, namanya list comprehension. Hasilnya sama persis, tulisannya jauh lebih pendek:

```python
kuadrat = [angka ** 2 for angka in range(1, 6)]
print(kuadrat)  # [1, 4, 9, 16, 25]
```

Strukturnya selalu sama: buka kurung siku, tulis ekspresi yang jadi isi list, lalu loop `for` di belakangnya. Begitu polanya nempel di kepala, kamu akan membacanya hampir secepat membaca kalimat biasa.

## Dari loop biasa ke comprehension

Ambil contoh yang sering muncul di pekerjaan nyata, misalnya mengubah daftar nama jadi huruf kecil semua:

```python
nama = ["Dina", "BUDI", "Sari", "AGUS"]
nama_kecil = [n.lower() for n in nama]
print(nama_kecil)  # ['dina', 'budi', 'sari', 'agus']
```

Versi loopnya butuh tiga baris dan satu list kosong sebagai penampung. Versi comprehension langsung menyatakan maksudnya: buat list baru berisi setiap nama yang sudah diubah jadi huruf kecil. Tidak ada penampung sementara yang perlu dilacak.

Pola yang sama berlaku saat kamu mengambil satu field dari kumpulan data, misalnya daftar harga dari daftar produk:

```python
produk = [
    {"nama": "kopi", "harga": 15000},
    {"nama": "teh", "harga": 8000},
    {"nama": "susu", "harga": 12000},
]
harga = [p["harga"] for p in produk]
print(harga)  # [15000, 8000, 12000]
```

## Menambahkan kondisi di dalamnya

Comprehension juga bisa menyaring. Letakkan `if` di akhir untuk hanya mengambil item yang memenuhi syarat:

```python
angka = range(1, 21)
genap = [a for a in angka if a % 2 == 0]
print(genap)  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

Kamu juga bisa memakai `if` dan `else` sekaligus, tapi posisinya pindah ke bagian ekspresi di depan:

```python
label = ["genap" if a % 2 == 0 else "ganjil" for a in range(1, 6)]
print(label)  # ['ganjil', 'genap', 'ganjil', 'genap', 'ganjil']
```

Perbedaan posisi ini sering membingungkan di awal. Patokannya begini: `if` di belakang `for` berarti menyaring item, sedangkan `if` dan `else` di depan berarti memilih nilai untuk setiap item. Dua duanya sah, dan keduanya bisa digabung kalau memang perlu, misalnya memberi label hanya untuk angka tertentu.

![Kode Python yang tampil di layar laptop](https://static.vecteezy.com/system/resources/thumbnails/054/088/461/small_2x/laptop-displaying-python-code-on-screen-programming-and-software-development-concept-png.png)

## Contoh yang lebih dekat dengan proyek nyata

Misalkan kamu membaca daftar nilai siswa dan ingin daftar siswa yang lulus saja, lengkap dengan namanya:

```python
siswa = [
    {"nama": "Dina", "nilai": 85},
    {"nama": "Budi", "nilai": 55},
    {"nama": "Sari", "nilai": 90},
]
lulus = [s["nama"] for s in siswa if s["nilai"] >= 70]
print(lulus)  # ['Dina', 'Sari']
```

Atau kamu membersihkan data mentah yang masih berisi string kosong:

```python
mentah = ["kopi", "", "teh", "  ", "susu"]
bersih = [m.strip() for m in mentah if m.strip()]
print(bersih)  # ['kopi', 'teh', 'susu']
```

Perhatikan bahwa `m.strip()` ditulis dua kali di contoh terakhir. Untuk data kecil tidak masalah, tapi untuk ekspresi yang mahal, cara ini membuang kerja. Di situasi seperti itu, loop biasa atau langkah pembersihan terpisah justru lebih jujur dan mudah dibaca.

## Saudara kandungnya: dict dan set comprehension

Pola yang sama berlaku untuk dict dan set, tinggal ganti tanda kurungnya. Dict comprehension memakai kurung kurawal dengan pasangan kunci dan nilai:

```python
harga = {"kopi": 15000, "teh": 8000, "susu": 12000}
diskon = {nama: harga_awal - 2000 for nama, harga_awal in harga.items()}
print(diskon)  # {'kopi': 13000, 'teh': 6000, 'susu': 10000}
```

Set comprehension juga memakai kurung kurawal, tapi tanpa pasangan kunci nilai, dan hasilnya otomatis membuang duplikat:

```python
angka = [1, 2, 2, 3, 3, 3, 4]
unik = {a * 10 for a in angka}
print(unik)  # {10, 20, 30, 40}
```

## Kapan sebaiknya tidak dipakai

List comprehension bukan palu untuk semua paku. Ada beberapa situasi di mana loop biasa lebih baik. Kalau badan loopmu punya efek samping, misalnya menulis ke file atau mengirim permintaan jaringan di setiap iterasi, pakai loop biasa supaya langkahnya terlihat jelas. Kalau logikanya sudah bercabang banyak, comprehension yang dipaksakan jadi satu baris panjang justru lebih sulit dibaca daripada loop lima baris yang rapi.

Aturan praktis yang aman: kalau comprehensionmu masih bisa dibaca dalam satu tarikan napas, pakai. Kalau kamu harus membacanya tiga kali untuk paham maksudnya, pecah jadi loop biasa atau jadi beberapa langkah kecil. Kode yang ringkas tapi membingungkan bukan kode yang bagus, ia cuma kode yang pendek.

Mulai dari pola paling sederhana, biasakan membaca comprehension dari kiri ke kanan sebagai kalimat: hasil apa, dari mana, dengan syarat apa. Setelah itu, hampir semua list comprehension yang kamu temui di codebase orang lain akan terasa seperti bacaan biasa, bukan teka teki.
