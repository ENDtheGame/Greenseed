import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ products = {}, categories = [], auth, filters = {} }) {

    console.log("Data Products dari Props:", products);

    const user = auth?.user;
    const { flash } = usePage().props;
    const [showToast, setShowToast] = useState(false);

    // State untuk Filter & Modal
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    // AMBIL DATA DARI OBJECT PAGINATION LARAVEL
    const productData = Array.isArray(products) ? products : (products.data || []);
    const paginationLinks = products.links || [];

    // Cek kebutuhan nomor telepon
    useEffect(() => {
        if (user && user.role === 'user' && !user.phone) {
            setShowPhoneModal(true);
        } else {
            setShowPhoneModal(false);
        }
    }, [user]);

    // Handle Pesanan WhatsApp
    const handleOrder = (product) => {
        router.post(`/track-click/${product.id}`, {}, {
            preserveScroll: true,
            onSuccess: () => console.log('Click tracked!')
        });

        const nomorWA = "6289509352499";
        const pesan = encodeURIComponent(
            `Halo GreenSeed, saya *${user?.name || 'Pelanggan'}* ingin memesan:\n\n🌱 *Produk:* ${product.name}\n💰 *Harga:* Rp${Number(product.price).toLocaleString('id-ID')}\n\nApakah stok masih tersedia?`
        );
        window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
    };

    // Handle Filter Kategori
    const handleCategoryClick = (categoryName) => {
        const newCategory = selectedCategory === categoryName ? '' : categoryName;
        setSelectedCategory(newCategory);
        router.get('/katalog',
            { search: search, category: newCategory },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    // Handle Pencarian
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get('/katalog',
            { search: search, category: selectedCategory },
            { preserveState: true, replace: true }
        );
    };

    // Simpan Nomor HP
    const savePhone = (e) => {
        e.preventDefault();
        router.put('/profile/phone', { phone: phoneNumber }, {
            onSuccess: () => setShowPhoneModal(false),
            preserveScroll: true
        });
    };

    // Flash Message Toast
    useEffect(() => {
        if (flash?.message) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);



    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Katalog Benih</h2>}
        >
            <Head title="Katalog Benih" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 px-4 sm:px-0">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Katalog GreenSeed</h1>
                            <p className="text-gray-500 mt-1 text-sm">Pilih benih terbaik untuk kebunmu.</p>
                        </div>
                        <form onSubmit={handleSearch} className="relative w-full max-w-sm group">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari benih favoritmu..."
                                className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm shadow-sm focus:ring-2 focus:ring-green-500 transition-all"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </form>
                    </div>

                    {/* Filter Kategori */}
                    <div className="flex flex-wrap gap-2 mb-8 px-4 sm:px-0">
                        <button
                            onClick={() => handleCategoryClick('')}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === '' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}
                        >
                            Semua
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat.name ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-green-500'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Grid Produk */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
                        {productData.length > 0 ? (
                            productData.map((product) => (
                                <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                    <div className="h-44 relative overflow-hidden group">
                                        <img src={product.image ? `/storage/${product.image}` : 'https://placehold.co/400x300?text=No+Image'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 left-3">
                                            <span className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase shadow-sm ${product.stock === 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                                {product.stock === 0 ? 'Habis' : 'Tersedia'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md w-fit uppercase tracking-tighter">{product.category?.name || 'Benih'}</span>
                                        <h3 className="font-bold text-gray-800 mt-2 text-md line-clamp-1">{product.name}</h3>
                                        <p className="text-[12px] text-gray-500 mt-2 line-clamp-3 italic min-h-[3rem]">{product.description || 'Benih kualitas super dari petani lokal.'}</p>

                                        <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Harga</span>
                                                <span className="text-green-700 font-extrabold text-lg leading-none">Rp{Number(product.price).toLocaleString('id-ID')}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">Stok: {product.stock}</span>
                                        </div>

                                        <div className="mt-4">
                                            {user?.role === 'admin' ? (
                                                <Link href={`/products?search=${product.name}`} className="block w-full text-center bg-blue-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition">Edit Data</Link>
                                            ) : (
                                                <button
                                                    disabled={product.stock === 0}
                                                    onClick={() => handleOrder(product)}
                                                    className={`w-full py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm ${product.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                                                >
                                                    {product.stock === 0 ? 'Stok Kosong' : 'Pesan via WhatsApp'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                                <span className="text-5xl mb-4">🌱</span>
                                <p className="text-gray-400 font-medium italic">Benih tidak ditemukan.</p>
                                <button onClick={() => { setSearch(''); setSelectedCategory(''); router.get('/katalog'); }} className="mt-4 px-6 py-2 bg-green-50 text-green-600 rounded-xl font-bold hover:bg-green-100 transition-colors shadow-sm">Reset Pencarian & Filter</button>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION LINK */}
                   {paginationLinks && paginationLinks.length > 0 && (
    <div className="mt-12 flex justify-center pb-10">
        <div className="flex flex-wrap gap-2 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            {paginationLinks.map((link, i) => (
                <button
                    key={i}
                    disabled={!link.url || link.active}
                    onClick={() => router.get(link.url, { search, category: selectedCategory }, { preserveScroll: true, preserveState: true })}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all
                        ${link.active ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-400 hover:bg-green-50'}
                        ${!link.url ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Input Nomor HP */}
            {showPhoneModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📱</div>
                            <h3 className="text-xl font-bold text-gray-900">Lengkapi Profil</h3>
                            <p className="text-gray-500 text-sm mt-2">Masukkan nomor WhatsApp aktifmu.</p>
                        </div>
                        <form onSubmit={savePhone} className="mt-6">
                            <input
                                type="number"
                                required
                                placeholder="Contoh: 08123456789"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            <button type="submit" className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg">Simpan Nomor</button>
                        </form>
                        <button onClick={() => setShowPhoneModal(false)} className="w-full mt-3 text-gray-400 text-xs hover:underline">Nanti saja</button>
                    </div>
                </div>
            )}

            {/* Toast Success Notification */}
            {showToast && (
                <div className="fixed top-5 right-5 z-[100]">
                    <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                        <span className="text-xl">✅</span>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">Sukses!</span>
                            <span className="text-xs opacity-90">{flash.message}</span>
                        </div>
                        <button onClick={() => setShowToast(false)} className="ml-4 text-white/50 hover:text-white">✕</button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
