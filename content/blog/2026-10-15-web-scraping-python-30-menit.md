---
title: "Web Scraping Python: Ambil Data Website dalam 30 Menit"
date: 2026-10-15
excerpt: "Tutorial praktis web scraping dengan Python: dari install requests dan BeautifulSoup sampai menyimpan data ke CSV, plus trik membaca tabel HTML."
tags: python, tutorial, web-scraping
image: "https://oxylabs.io/oxylabs-web/ZpBhlx5LeNNTxEcW_eba26704-d9e7-4562-aaf4-0375a6bb9693_Python-Web-Scraping-1200x600.png?auto=format%2Ccompress&rect=0%2C0%2C1200%2C600&w=1200&h=600"
---

Ada momen di mana kamu butuh data dari sebuah website, tapi situs itu tidak menyediakan API. Daftar harga, kumpulan quotes, atau data tabel yang cuma tampil di HTML. Solusinya: web scraping, alias mengambil data langsung dari halaman web dengan kode. Python adalah bahasa paling nyaman untuk ini, dan kamu cuma butuh dua library: `requests` untuk mengambil halaman, `BeautifulSoup` untuk membacanya.

Kita latihan di quotes.toscrape.com, situs yang memang dibuat untuk latihan scraping, jadi aman dan tidak akan ada yang marah.

## Siapkan peralatan

```bash
pip install requests beautifulsoup4
```

Satu aturan main sebelum mulai: scraping itu soal etika juga. Cek file `robots.txt` situs target, jangan kirim request bertubi-tubi, dan hormati syarat penggunaan situsnya. Kalau situsnya menyediakan API resmi, pakai itu dulu.

## Ambil halaman dan cek responsnya

```python
import requests

url = "https://quotes.toscrape.com/"
response = requests.get(url, headers={"User-Agent": "belajar-scraping"})

print(response.status_code)  # 200 berarti sukses
```

Header `User-Agent` itu sopan santun dasar: kamu memperkenalkan diri sebagai siapa. Banyak situs memblokir request tanpa User-Agent karena menganggapnya bot jahat.

## Baca HTML-nya dengan BeautifulSoup

```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(response.text, "html.parser")

for quote in soup.find_all("div", class_="quote"):
    teks = quote.find("span", class_="text").get_text()
    penulis = quote.find("small", class_="author").get_text()
    print(f"{teks} - {penulis}")
```

![Ilustrasi web scraping](https://oboe-storage.s3.amazonaws.com/dev/covers/v1/sequence-28842/543146b3-0336-4cf9-acd1-b00dc7a4b58f.jpeg)

Pola kerjanya selalu sama: buka halaman di browser, klik kanan lalu Inspect untuk melihat struktur HTML, catat tag dan class yang membungkus data yang kamu mau, lalu tiru di kode dengan `find` atau `find_all`. Kalau lebih nyaman dengan sintaks CSS, pakai `soup.select(".quote .text")`, hasilnya sama.

## Simpan hasilnya ke CSV

Data yang cuma tampil di terminal belum berguna. Simpan ke file CSV biar bisa dibuka di Excel atau diolah lagi.

```python
import csv

hasil = []
for quote in soup.find_all("div", class_="quote"):
    hasil.append({
        "teks": quote.find("span", class_="text").get_text(),
        "penulis": quote.find("small", class_="author").get_text(),
    })

with open("quotes.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["teks", "penulis"])
    writer.writeheader()
    writer.writerows(hasil)
```

## Ambil banyak halaman sekaligus

Situs latihan ini punya 10 halaman. Polanya gampang ditebak: `/page/1/`, `/page/2/`, dan seterusnya. Tinggal loop dan beri jeda antar request.

```python
import time

semua = []
for halaman in range(1, 11):
    r = requests.get(
        f"https://quotes.toscrape.com/page/{halaman}/",
        headers={"User-Agent": "belajar-scraping"},
    )
    s = BeautifulSoup(r.text, "html.parser")
    for quote in s.find_all("div", class_="quote"):
        semua.append(quote.find("span", class_="text").get_text())
    time.sleep(1)  # jeda 1 detik, jangan serakah

print(f"Terkumpul {len(semua)} quotes")
```

`time.sleep(1)` itu penting. Scraping yang sopan memberi jeda antar request supaya server target tidak terbebani.

## Bonus: membaca tabel HTML

Banyak data di internet tampil sebagai tabel: daftar harga, klasemen, jadwal. Polanya mirip, cuma targetnya baris (`tr`) dan sel (`td`).

```python
tabel = soup.find("table")
for baris in tabel.find_all("tr")[1:]:  # lewati baris header
    sel = [c.get_text(strip=True) for c in baris.find_all("td")]
    print(sel)
```

`get_text(strip=True)` membersihkan spasi dan baris baru yang biasanya menempel di sel tabel. Trik kecil ini menghemat banyak waktu bersih-bersih data belakangan. Dari sini datanya bisa langsung dimasukkan ke CSV dengan pola yang sama seperti sebelumnya.

## Kalau halamannya pakai JavaScript berat

Teknik di atas bekerja untuk halaman yang HTML-nya sudah jadi di server. Kalau datanya dimuat belakangan oleh JavaScript (misal infinite scroll), `requests` akan dapat halaman kosong. Untuk kasus itu kamu butuh browser otomatis seperti Selenium atau Playwright. Itu topik lanjutan, tapi pola pikirnya sama: ambil, baca, ekstrak, simpan.

Dalam 30 menit kamu sudah punya skill yang dipakai data analyst dan researcher tiap hari. Mulai dari situs latihan, lalu terapkan ke data publik yang memang boleh diambil. Ingat batasnya: data pribadi dan konten berbayar bukan wilayahmu.

Tantangan berikutnya yang bagus: ambil 20 judul teratas dari situs berita favoritmu, atau kumpulkan harga satu produk dari beberapa toko online untuk dibandingkan. Setiap situs punya struktur HTML berbeda, jadi tiap target baru melatih kemampuan membaca HTML-mu. Itu inti skill scraping yang sesungguhnya. Bukan hafal kode, melainkan cepat beradaptasi dengan struktur yang baru.
