# Hafalan Hero

Hafalan Hero adalah aplikasi hafalan Al-Qur'an interaktif berbasis web yang membantu pengguna memperkuat hafalan melalui berbagai mode kuis, murajaah audio, sistem level, XP, badge, dan leaderboard online.

## Demo

🌐 Demo Online:

https://websitewildan.my.id/projects/hafalan-hero/

## Fitur

### 📖 Hafalan Al-Qur'an

* Quiz Sambung Ayat
* Quiz Arti Ayat
* Quiz Nomor Ayat
* Quiz Tebak Surah
* Belajar ayat beserta transliterasi dan terjemahan
* Pilih surah tertentu untuk belajar

### 🎧 Murajaah Audio

* Murajaah berdasarkan surah
* Murajaah berdasarkan juz
* Pengulangan ayat otomatis
* Pilihan qari
* Pengaturan kecepatan audio

### 🏆 Gamifikasi

* Sistem XP
* Sistem Level
* Unlock Juz bertahap
* Badge Prestasi
* Progress Hafalan

### 🌍 Online Features

* Leaderboard Online
* Ganti Nama Pemain
* Progressive Web App (PWA)
* Offline Support (Service Worker)

## Teknologi

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* PHP
* MySQL / MariaDB
* AlQuran Cloud API
* Service Worker (PWA)

## Struktur Project

```text
hafalan-hero/
│
├── index.php
├── game.js
├── style.css
├── leaderboard.php
├── getLeaderboard.php
├── gantiNama.php
├── leaderboard.sql
├── manifest.json
├── sw.js
├── offline.html
├── hero.png
│
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Persyaratan

* PHP 7.4 atau lebih baru
* MySQL / MariaDB
* Web Server (Apache / Nginx)
* Koneksi internet untuk mengambil data Al-Qur'an dan audio

## Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/wildanzuhairi/hafalan-hero.git
```

Atau download ZIP dari GitHub.

### 2. Pindahkan ke Web Server

Contoh untuk XAMPP:

```text
C:\xampp\htdocs\hafalan-hero
```

### 3. Buat Database

Masuk ke phpMyAdmin lalu buat database baru:

```sql
hafalan_hero
```

### 4. Import Database

Import file:

```text
leaderboard.sql
```

melalui phpMyAdmin.

### 5. Konfigurasi Koneksi Database

Sesuaikan konfigurasi database pada file PHP yang digunakan untuk leaderboard.

Contoh:

```php
$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "hafalan_hero"
);
```

### 6. Jalankan Project

Buka browser:

```text
http://localhost/hafalan-hero/
```

atau jika sudah di hosting:

```text
https://domainanda.com/hafalan-hero/
```

## API yang Digunakan

### AlQuran Cloud API

Digunakan untuk:

* Data Surah
* Data Ayat
* Terjemahan
* Transliterasi
* Audio Murajaah

Website:

https://alquran.cloud/

## Progressive Web App (PWA)

Aplikasi dapat dipasang seperti aplikasi mobile melalui browser yang mendukung PWA.

Fitur:

* Install ke Home Screen
* Offline Page
* Caching Asset

## Roadmap

* [ ] Statistik Hafalan Harian
* [ ] Sinkronisasi Akun Cloud
* [ ] Achievement Tambahan
* [ ] Mode Ujian Hafalan
* [ ] Mode Multiplayer
* [ ] Target Hafalan Harian
* [ ] Export Progress

## Kontribusi

Kontribusi sangat terbuka.

Jika menemukan bug atau memiliki ide fitur baru:

1. Fork repository
2. Buat branch baru
3. Lakukan perubahan
4. Commit perubahan
5. Buat Pull Request

## Lisensi

Project ini menggunakan MIT License.

## Author

Wildan Zuhairi

GitHub:
https://github.com/wildanzuhairi

Website:
https://websitewildan.my.id/
