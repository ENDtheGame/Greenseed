import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ShoppingCart, Leaf, Search, Box, X, MessageCircle } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Katalog({ auth, products, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchTerm, setSearchTerm] = useState('');

    // State untuk Modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'Semua' || product.category?.name === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Fungsi untuk kirim WA otomatis
    const orderViaWA = (product) => {
        const message = `Halo Admin GreenSeed, saya ingin memesan benih: *${product.name}* sebanyak 1 pack. Apakah masih tersedia?`;
        const waUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`; // Ganti no WA kamu
        window.open(waUrl, '_blank');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Katalog Benih GreenSeed" />

            <div className="max-w-7xl mx-auto">
                {/* 1. HEADER & SEARCH (Tetap sama) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Katalog Benih</h1>
                        <p className="text-gray-500 mt-2 text-lg">Pilih benih unggul untuk hasil panen maksimal.</p>
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Cari nama benih..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-white border-none shadow-sm rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-green-500 transition-all shadow-green-100/20"
                        />
                        <Search className="absolute left-4 top-4 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                    </div>
                </div>

                {/* 2. TAB FILTER KATEGORI (Tetap sama) */}
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
                    <div className="flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-2xl">
                        <button
                            onClick={() => setSelectedCategory('Semua')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'Semua' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Semua
                        </button>
                        {categories.map((cat) => (
                            <button key={cat.id} onClick={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat.name ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. GRID PRODUK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProduct(product)} // Klik card untuk buka modal
                            className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-green-100 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="relative h-56 overflow-hidden bg-slate-50">
                                {product.image ? (
                                    <img src={`/storage/${product.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300"><Leaf size={48} /></div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-green-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">{product.category?.name}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-green-600 transition-colors">{product.name}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-black text-green-600">Rp{product.price.toLocaleString('id-ID')}</span>
                                    <div className="bg-gray-50 p-2 rounded-xl text-gray-400 group-hover:bg-green-600 group-hover:text-white transition-all">
                                        <ShoppingCart size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. MODAL DETAIL PRODUK */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
                        <div className="bg-white rounded-[3rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-20">
                                <X size={20} />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 h-72 md:h-auto bg-gray-100">
                                    <img src={selectedProduct.image ? `/storage/${selectedProduct.image}` : ''} className="w-full h-full object-cover" />
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{selectedProduct.category?.name}</span>
                                    <h2 className="text-3xl font-black text-gray-900 mt-2">{selectedProduct.name}</h2>
                                    <p className="text-2xl font-bold text-green-600 mt-2">Rp{selectedProduct.price.toLocaleString('id-ID')}</p>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center gap-3 text-gray-600 font-medium">
                                            <Box size={20} className="text-green-500" />
                                            <span>Stok Tersedia: {selectedProduct.stock} pack</span>
                                        </div>
                                        <p className="text-gray-500 leading-relaxed italic">
                                            "Benih pilihan berkualitas tinggi, dirawat dengan standar GreenSeed untuk hasil panen yang memuaskan."
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => orderViaWA(selectedProduct)}
                                        className="w-full mt-8 bg-green-600 hover:bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-100"
                                    >
                                        <MessageCircle size={22} />
                                        Pesan via WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
