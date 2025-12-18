import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products, auth }) {
    const user = auth?.user;

    return (
        <AuthenticatedLayout>
            <Head title="Katalog Benih" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Katalog */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">Katalog Benih GreenSeed</h1>
                        <p className="text-gray-500 mt-2">Temukan benih kualitas unggul untuk kebunmu.</p>
                    </div>

                    {/* Grid Produk */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Foto Produk */}
                                <div className="h-48 bg-gray-100 overflow-hidden">
                                    <img
                                        src={product.image ? `/storage/${product.image}` : 'https://placehold.co/400x300?text=No+Image'}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Detail Produk */}
                                <div className="p-5">
                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">
                                        {product.category?.name || 'Umum'}
                                    </span>
                                   <h3 className="font-bold text-gray-800 mt-2 text-lg h-[3.5rem] line-clamp-2 leading-tight">
    {product.name}
</h3>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-green-700 font-bold text-xl">
                                            Rp {Number(product.price).toLocaleString('id-ID')}
                                        </span>
                                        <span className="text-xs text-gray-400">Stok: {product.stock}</span>
                                    </div>

                                    {/* Tombol Berdasarkan Role */}
                                    <div className="mt-5">
                                        {user?.role === 'admin' ? (
                                            <Link
                                                href={`/products?search=${product.name}`}
                                                className="block w-full text-center bg-blue-50 text-blue-600 py-3 rounded-2xl font-bold hover:bg-blue-100 transition border border-blue-100"
                                            >
                                                Edit Produk (Admin)
                                            </Link>
                                        ) : (
                                            <button className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-100 active:scale-95">
                                                Tambah ke Keranjang
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Jika Produk Kosong */}
                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 italic text-lg">Belum ada produk di katalog.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
