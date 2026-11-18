# 🛡️ STOPBULLY | Website AntiPerundungan

**Platform Pelaporan dan Edukasi Anti-Perundungan**

<img src="bullying.png"/>

[![Website](https://img.shields.io/badge/Website-STOPBULLY-blue?style=for-the-badge)](https://antibullying.hafzdev.web.id/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=flat-square&logo=mysql)](https://www.mysql.com/)

STOPBULLY adalah sebuah platform berbasis website yang dirancang untuk meningkatkan kesadaran terhadap perundungan (*bullying*), menyediakan sarana pelaporan, serta memberikan edukasi mengenai berbagai bentuk perundungan.

Website ini bertujuan menciptakan lingkungan sekolah yang lebih aman, nyaman, dan bebas dari tindakan perundungan.

**Live Website:** https://antibullying.hafzdev.web.id/

---

## 📌 Latar Belakang

Perundungan merupakan salah satu permasalahan sosial yang dapat terjadi di lingkungan sekolah maupun masyarakat. Tindakan ini dapat memberikan dampak negatif terhadap kondisi psikologis, sosial, dan pendidikan seseorang.

Melalui STOPBULLY, pengguna dapat memperoleh informasi mengenai perundungan, mempelajari cara menghadapinya, serta memanfaatkan fitur pelaporan untuk menyampaikan kejadian yang dialami atau disaksikan.

Website ini dikembangkan sebagai proyek tugas mata pelajaran Pendidikan Pancasila dan Kewarganegaraan (PPKn).

## ✨ Fitur Utama

### 1. 🏠 Beranda
- Informasi umum mengenai perundungan.
- Pengenalan layanan STOPBULLY.
- Statistik dan informasi perlindungan perempuan dan anak.
- Navigasi menuju fitur utama website.

### 2. 📚 Edukasi Anti-Perundungan
Menyediakan informasi mengenai berbagai jenis perundungan:

- **Cyberbullying:** Perundungan melalui media digital dan internet.
- **Bullying Fisik:** Tindakan kekerasan secara fisik.
- **Bullying Verbal:** Perundungan melalui perkataan, hinaan, dan ancaman.
- **Bullying Sosial:** Pengucilan dan tindakan merusak hubungan sosial seseorang.

### 3. 📝 Pelaporan Perundungan
Pengguna dapat menyampaikan laporan mengenai kejadian perundungan melalui formulir pelaporan.

Informasi yang dapat dimasukkan meliputi:
- Jenis perundungan.
- Kronologi kejadian.
- Identitas pelapor (opsional).
- Informasi kontak.
- Bukti pendukung.

Tersedia pilihan pelaporan anonim untuk memberikan fleksibilitas kepada pelapor.

### 4. 🔎 Cek Status Laporan
Pengguna dapat memeriksa perkembangan laporan menggunakan kode laporan yang diberikan.

### 5. 📊 Angket
Fitur angket digunakan untuk mengumpulkan informasi mengenai pengalaman dan kondisi perundungan, seperti:
- Kelas.
- Pengalaman mengalami perundungan.
- Jenis perundungan.
- Lokasi kejadian.

### 6. 🔐 Admin Dashboard
Area administrator untuk mendukung pengelolaan laporan dan informasi yang berkaitan dengan sistem pelaporan.

### 7. ⚖️ Edukasi Hukum dan Perlindungan
Menyediakan informasi mengenai perlindungan perempuan dan laki-laki serta dasar hukum yang berkaitan dengan kekerasan dan diskriminasi.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Next.js 16 | Framework aplikasi web |
| React 19 | Library antarmuka pengguna |
| TypeScript | Pengembangan aplikasi |
| Tailwind CSS 4 | Styling antarmuka |
| Prisma ORM 6.19.3 | Pengelolaan database |
| MySQL 8 | Database relasional |
| Aiven | Layanan database cloud |
| Vercel | Hosting dan deployment |
| bcryptjs | Pengelolaan password |
| Framer Motion | Animasi antarmuka |
| Recharts | Visualisasi data |

## 📂 Struktur Project

```text
anti_bully/
│
├── app/
│   ├── actions/
│   ├── admin/
│   │   └── dashboard/
│   ├── angket/
│   ├── api/
│   │   └── cek-status/
│   ├── cek-status/
│   ├── components/
│   ├── hukum/
│   ├── lapor/
│   ├── login/
│   ├── panduan/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│   └── img/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Instalasi dan Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/anti_bully.git
```

Masuk ke direktori project:

```bash
cd anti_bully
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` pada direktori utama project.

Tambahkan konfigurasi database:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/defaultdb?ssl-mode=REQUIRED"
```

Sesuaikan USER, PASSWORD, HOST, dan PORT dengan informasi koneksi dari Aiven.

**Penting:** Jangan membagikan file `.env` atau memasukkan kredensial database ke repository publik.

### 4. Validasi Prisma

```bash
npx prisma validate
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Database Migration

Setelah database MySQL berhasil dihubungkan, jalankan:

```bash
npx prisma migrate deploy
```

Perintah tersebut digunakan untuk menerapkan migration yang sudah tersedia ke database.

### 7. Menjalankan Development Server

```bash
npm run dev
```

Buka browser dan kunjungi:

```text
http://localhost:3000
```

---

## 🗄️ Database Schema

Project ini menggunakan Prisma ORM dengan provider MySQL.

Terdapat tiga model utama:

| Model | Deskripsi |
|---|---|
| Laporan | Menyimpan informasi laporan perundungan |
| Admin | Menyimpan data administrator |
| Angket | Menyimpan hasil pengisian angket |

### Laporan
Menyimpan informasi seperti kode laporan, jenis perundungan, kronologi, identitas pelapor, status laporan, dan waktu pembuatan.

### Admin
Menyimpan informasi akun administrator berupa username dan password yang telah di-hash.

### Angket
Menyimpan informasi mengenai pengalaman perundungan, jenis perundungan, kelas, dan lokasi kejadian.

---

## ☁️ Deployment

Website STOPBULLY menggunakan Vercel sebagai platform hosting.

**Alamat website:**

https://antibullying.hafzdev.web.id/

Database direncanakan menggunakan Aiven for MySQL sebagai layanan database cloud.

Untuk deployment dengan database, konfigurasi `DATABASE_URL` harus ditambahkan melalui:

```text
Vercel Dashboard
    └── Project
        └── Settings
            └── Environment Variables
```

Tambahkan variabel `DATABASE_URL` dengan kredensial database Aiven yang sesuai.

Setelah konfigurasi selesai, lakukan redeployment.

---

## 🔒 Keamanan

Beberapa hal yang perlu diperhatikan dalam pengembangan dan penggunaan website:

- Menjaga kerahasiaan informasi pelapor.
- Tidak menyimpan password dalam bentuk teks biasa.
- Melindungi kredensial database.
- Melakukan validasi input pengguna.
- Membatasi akses ke halaman administrator.
- Menangani bukti laporan secara aman.
- Melindungi data pribadi yang dikumpulkan melalui formulir.

## 🎯 Tujuan Pengembangan

STOPBULLY dikembangkan dengan beberapa tujuan:

1. Meningkatkan kesadaran masyarakat mengenai perundungan.
2. Memberikan akses informasi dan edukasi mengenai bullying.
3. Menyediakan sarana pelaporan perundungan.
4. Membantu pengguna memantau perkembangan laporan.
5. Mendorong terciptanya lingkungan yang aman dan saling menghargai.

---

## 👨‍💻 Developer

**Fajri**

Project: STOPBULLY | Website AntiPerundungan

Project ini dikembangkan sebagai bagian dari tugas mata pelajaran Pendidikan Pancasila dan Kewarganegaraan (PPKn).

---

## 📄 Lisensi

Project ini merupakan proyek edukasi. Penggunaan, pengembangan, dan distribusi kode dapat disesuaikan dengan ketentuan yang ditetapkan oleh pemilik repository.

---

**STOPBULLY**

*Berani Bicara, Berani Melawan Perundungan.*

