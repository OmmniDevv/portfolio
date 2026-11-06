---
title: "Python Pathlib: Kelola File Tanpa Pusing Slash"
date: 2026-10-29
excerpt: "Menggabung path dengan string plus dan slash rawan salah di Windows dan Linux. Pathlib menggantinya dengan objek Path yang bisa digabung, dibaca, dan diperiksa."
tags: python, tutorial, programming, coding
image: https://thepythoncode.com/media/articles/compress-files.PNG
---

Kalau kamu pernah menulis kode Python untuk membaca file, kamu mungkin pernah menulis baris seperti ini:

```python
path = "data/" + folder + "/" + filename
```

Sekilas tidak ada masalah. Tapi begitu kode itu pindah dari Linux ke Windows, atau foldernya ternyata sudah diakhiri slash, hasilnya bisa berantakan: slash ganda, slash tercampur, atau path yang tidak ditemukan. Masalah kecil seperti ini sering menghabiskan waktu debugging yang tidak perlu.

Pathlib menyelesaikan masalah itu dengan cara yang berbeda. Alih-alih mengolah path sebagai string mentah, pathlib mengubah path menjadi objek. Objek itu tahu cara menggabungkan bagian path, memeriksa apakah file ada, membaca isi, dan menulis hasil, semuanya dengan metode yang jelas.

## Kenalan dengan Path

Modulnya bernama `pathlib`, dan kelas utamanya bernama `Path`. Kamu mengimpornya seperti modul biasa, lalu membuat objek dari string path:

```python
from pathlib import Path

p = Path("data/laporan.txt")
print(p.name)    # laporan.txt
print(p.suffix)  # .txt
print(p.parent)  # data
print(p.stem)    # laporan
```

Empat atribut itu saja sudah menjawab pertanyaan yang dulu harus dipecah manual dengan string. `name` memberi nama file lengkap, `suffix` memberi ekstensinya, `parent` memberi folder induknya, dan `stem` memberi nama tanpa ekstensi. Tidak ada lagi pemotongan string dengan `split("/")` yang rapuh.

Menggabungkan path pun berubah total. Operator slash di Path bukan pembagian, melainkan penggabung path:

```python
base = Path("data")
file_path = base / "2026" / "laporan.txt"
print(file_path)  # data/2026/laporan.txt
```

Di Windows, Path akan memakai backslash secara otomatis. Di Linux dan macOS, ia memakai slash. Kamu tidak perlu menulis percabangan berdasarkan sistem operasi, dan tidak perlu khawatir ada slash ganda karena satu bagian sudah diakhiri pemisah.

## Membaca dan menulis tanpa open yang bertele-tele

Untuk file teks kecil, Path menyediakan jalan pintas yang sangat enak dipakai. Membaca seluruh isi file cukup satu baris:

```python
teks = Path("data/catatan.txt").read_text(encoding="utf-8")
print(teks)
```

Menulis pun sama singkatnya:

```python
Path("data/hasil.txt").write_text("Selesai diproses.\n", encoding="utf-8")
```

Argumen `encoding="utf-8"` layak selalu ditulis. Tanpa itu, Python memakai encoding default sistem, dan file berisi huruf Indonesia seperti "é" atau tanda baca khusus bisa berubah menjadi karakter aneh di komputer lain. Menulis encoding secara eksplisit menghilangkan satu kelas bug yang sulit dilacak.

Tentu saja, `read_text` dan `write_text` bukan pengganti `open` untuk semua kasus. Kalau file berukuran besar, membaca seluruh isinya sekaligus akan memakan memori. Untuk file besar, tetap pakai `open` dan baca baris per baris. Tapi untuk file konfigurasi, catatan kecil, dan hasil ringkas, jalan pintas Path ini membuat kode jauh lebih pendek dan mudah dibaca.

![Contoh kode program di layar laptop](https://thelivingplanner.com/wp-content/uploads/2022/08/Cyber-mohammad-rahmani-CygdSoUmmqg-unsplash.jpg)

## Memeriksa file sebelum dipakai

Satu kesalahan umum dalam skrip pemrosesan file adalah langsung membaca tanpa memeriksa apakah file itu ada. Program pun berhenti dengan error yang membingungkan pengguna. Path memberi metode pemeriksaan yang namanya langsung jelas maksudnya:

```python
p = Path("data/laporan.txt")

if not p.exists():
    print("File tidak ditemukan, periksa folder data.")
elif p.is_dir():
    print("Itu folder, bukan file.")
else:
    print("Siap dibaca, ukurannya:", p.stat().st_size, "byte")
```

`exists()` menjawab apakah path itu ada, `is_dir()` menjawab apakah itu folder, dan `is_file()` menjawab apakah itu file biasa. `stat().st_size` memberi ukuran file dalam byte. Dengan pemeriksaan seperti ini, pesan error yang kamu tampilkan bisa memakai bahasa manusia, bukan traceback mentah.

Membuat folder juga tidak kalah mudah. Dulu kamu harus memeriksa dulu apakah folder sudah ada, baru membuatnya. Sekarang cukup:

```python
out = Path("hasil/2026/10")
out.mkdir(parents=True, exist_ok=True)
```

`parents=True` berarti folder induk yang belum ada ikut dibuat, dan `exist_ok=True` berarti tidak error kalau folder sudah ada. Dua argumen itu menghilangkan pola cek lalu buat yang dulu ditulis berulang di mana-mana.

## Mencari banyak file dengan glob

Tugas yang sering muncul adalah memproses semua file dengan pola tertentu, misalnya semua file CSV di satu folder. Path punya metode `glob` untuk itu:

```python
folder = Path("data")
for f in folder.glob("*.csv"):
    print(f.name)
```

Pola `*.csv` cocok dengan semua file berekstensi csv di folder itu. Kalau kamu perlu mencari sampai ke subfolder, pakai `rglob`:

```python
for f in folder.rglob("*.csv"):
    print(f)
```

`rglob` menelusuri seluruh pohon folder di bawahnya. Hati-hati dengan folder yang sangat besar, karena penelusuran rekursif bisa memakan waktu. Untuk proyek kecil dan menengah, pola ini jauh lebih nyaman daripada menulis loop `os.walk` manual.

Contoh yang menggabungkan beberapa hal di atas: skrip kecil yang menghitung total baris semua file teks di satu folder.

```python
from pathlib import Path

folder = Path("data")
total = 0

for f in folder.glob("*.txt"):
    total += len(f.read_text(encoding="utf-8").splitlines())

print(f"Total baris di {folder}: {total}")
```

Skrip ini tidak memakai satu pun penggabungan string untuk path, tidak memakai `open` manual, dan tetap mudah dibaca dari atas ke bawah.

## Kapan tetap memakai string atau os.path

Pathlib bukan alat untuk segala hal. Kalau kamu memakai library lama yang hanya menerima string, ubah Path menjadi string dengan `str(p)`. Kalau kamu bekerja dengan path yang benar-benar hanya label, bukan file di disk, string biasa sudah cukup.

Yang penting adalah konsistensi di dalam satu proyek. Campuran `os.path.join` dan Path di file yang sama membuat kode sulit diikuti. Kalau proyek sudah memakai pathlib, lanjutkan dengan pathlib. Kalau proyek lama masih memakai `os.path`, tidak ada keharusan untuk mengubah semuanya sekaligus. Mulai dari skrip baru, rasakan bedanya, lalu putuskan.

Pathlib tidak mengubah apa yang bisa dilakukan Python terhadap file. Ia mengubah cara kamu mengungkapkannya: dari merangkai string yang rawan salah, menjadi memakai objek yang tahu aturan path di sistem apa pun. Untuk skrip harian, perbedaan itu terasa setiap hari, terutama saat kode pindah dari laptopmu ke komputer lain.
