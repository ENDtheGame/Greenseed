import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Leaf, ArrowRight, ShieldCheck, Zap, BarChart3, ShoppingBag } from 'lucide-react';

export default function Welcome({ products }) {

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <Head title="Selamat Datang di GreenSeed" />

 {/* Navbar Transparan */}
<nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-green-600 text-xl animate-in fade-in">
                    <Leaf size={28} />
                    <span>GreenSeed</span>
                </div>
        <div className="flex gap-6">
  <a href="/login" className="font-bold text-slate-800 hover:text-green-600 my-auto drop-shadow-sm">
    Masuk
</a>

<a href="/register" className="px-6 py-3 bg-green-600/90 hover:bg-green-600 text-white rounded-full font-bold transition shadow-lg backdrop-blur-sm ml-4">
    Daftar Gratis
</a>
        </div>
    </div>
</nav>

{/* Hero Section dengan Background Lebih Terang */}
<section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    {/* Background Wrapper */}

       <div className="absolute inset-0 z-0">
    <img
        src="/images/hero-bg.jpg"
        className="w-full h-full object-cover opacity-70" // Naikkan sedikit opacity gambarnya
    />
        {/* Layer Halus agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
    </div>

    {/* Content Wrapper */}
    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-8">
            🌱 Solusi Digital untuk Petani Modern
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
            Kelola Benih Unggul dengan <br />
            <span className="text-green-600">Teknologi Cerdas.</span>
        </h1>

        <p className="text-lg text-white font-medium mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
    GreenSeed membantu Anda memanajemen katalog benih, memantau stok produk, dan mempermudah akses informasi pertanian hanya dalam satu platform terintegrasi.
</p>

        <Link href="/katalog" className="inline-flex items-center gap-3 px-10 py-5 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 shadow-xl transition-all hover:scale-105 mb-20">
            Lihat Katalog Produk <ArrowRight />
        </Link>

        {/* Grid Produk Melayang dengan Opacity & Jarak Ekstra */}
{/* Container Grid Produk - Ditambah mt-32 agar lebih geser ke bawah */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mt-32 mb-40 relative z-20">
            {products.map((product) => (
                <div key={product.id} className="group relative bg-white/30 backdrop-blur-xl rounded-[45px] p-8 border border-white/40 shadow-2xl transition-all duration-500 hover:-translate-y-4">

                    <div className="relative">
                        {/* Mengambil path gambar dari database, jika kosong pakai gambar default */}
                        <img
    // Gunakan /storage/ diikuti nama acak dari database
    src={`/storage/${product.image}`}
    alt={product.name}
    className="w-48 h-48 mx-auto -mt-24 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
    onError={(e) => {
        // Jika tetap tidak muncul, arahkan ke gambar default di public/images
        e.target.src = "/images/default-seed.png";
    }}
/>
                    </div>

                    <div className="mt-8 text-left flex justify-between items-end">
                        <div>
                           {/* Nama Produk */}
<h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>

{/* Deskripsi Produk */}
<p className="text-sm text-slate-600 line-clamp-2 mb-4">
    {product.description ? product.description : "Deskripsi belum ditambahkan."}
</p>

{/* Harga dan Stok */}
<div className="flex justify-between items-center">
    <span className="text-green-600 font-bold">Rp {product.price.toLocaleString()}</span>
    </div>
{/* Badge Stok */}
<div className="flex gap-2 mb-2">
    {product.stock === 0 ? (
        <span className="px-2 py-1 text-[10px] font-bold bg-red-100 text-red-600 rounded-full uppercase">
            Habis
        </span>
    ) : product.stock < 10 ? (
        <span className="px-2 py-1 text-[10px] font-bold bg-amber-100 text-amber-600 rounded-full uppercase">
            Stok Terbatas: {product.stock}
        </span>
    ) : (
        <span className="px-2 py-1 text-[10px] font-bold bg-green-100 text-green-600 rounded-full uppercase">
            Ready Stock
        </span>
    )}
</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <FeatureItem
                        icon={<Zap size={40} />}
                        title="Manajemen Cepat"
                        desc="Update stok dan kategori benih secara real-time hanya dalam hitungan detik."
                    />
                    <FeatureItem
                        icon={<ShieldCheck size={40} />}
                        title="Keamanan Data"
                        desc="Seluruh data katalog produk terenkripsi aman dan terorganisir dengan rapi."
                    />
                    <FeatureItem
                        icon={<BarChart3 size={40} />}
                        title="Analisa Produk"
                        desc="Pantau benih mana yang paling populer dan dibutuhkan oleh para petani."
                    />
                </div>
            </div>
        </div>
    );
}

// Komponen Kecil agar rapi
function FeatureItem({ icon, title, desc }) {
    return (
        <div className="p-10 bg-slate-50 rounded-[35px] hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-green-100 group">
            <div className="text-green-600 mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-800">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
        </div>
    );
}
