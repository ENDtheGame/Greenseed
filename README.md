# 🌱 Website Manajemen Benih Tanaman

Project ini adalah **website manajemen benih tanaman** berbasis **Laravel**, dibuat sebagai **portofolio backend / fullstack**. Aplikasi ini memungkinkan admin untuk mengelola kategori benih, produk benih, stok, harga, serta gambar produk melalui dashboard.

---

## ✨ Fitur Utama

-   🔐 Autentikasi (Login & Register)
-   📊 Dashboard Admin
-   🗂️ CRUD Kategori Benih
-   🌾 CRUD Produk Benih
-   🖼️ Upload & manajemen gambar produk
-   🔗 Relasi Kategori ↔ Produk
-   🎨 Tampilan sederhana dengan Tailwind CSS

---

## 🛠️ Teknologi yang Digunakan

-   **Laravel** (Backend Framework)
-   **MySQL** (Database)
-   **Blade Template Engine**
-   **Tailwind CSS**
-   **Laravel Breeze** (Auth)

---

## 📷 Screenshot Aplikasi

> Tambahkan screenshot aplikasi di sini:

-   Dashboard Admin
-   Halaman Kategori
-   Halaman Produk

Contoh:

```
/screenshot/dashboard.png
/screenshot/products.png
```

---

## ⚙️ Cara Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/benih-tanaman.git
cd benih-tanaman
```

### 2️⃣ Install Dependency

```bash
composer install
npm install
```

### 3️⃣ Konfigurasi Environment

Copy file `.env`:

```bash
cp .env.example .env
```

Sesuaikan database di `.env`:

```env
DB_DATABASE=benih_tanaman
DB_USERNAME=root
DB_PASSWORD=
```

### 4️⃣ Generate Key & Migration

```bash
php artisan key:generate
php artisan migrate
php artisan storage:link
```

### 5️⃣ Jalankan Aplikasi

```bash
npm run dev
php artisan serve
```

Akses di browser:

```
http://127.0.0.1:8000
```

---

## 📌 Catatan

Project ini dibuat untuk pembelajaran dan portofolio. Struktur database menggunakan **Laravel Migration** sehingga mudah dikembangkan kembali.

---

## 👨‍💻 Author

**Diki Nuralim**
Laravel / Backend Developer

📫 GitHub: [https://github.com/username](https://github.com/username)

---

⭐ Jika project ini bermanfaat, jangan ragu untuk memberi star!
