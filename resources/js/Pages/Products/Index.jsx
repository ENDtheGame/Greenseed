import { Head, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Plus, Pencil, Trash2, X, Upload, Package } from 'lucide-react';



export default function Index({ products, categories, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category_id: '',
        price: '',
        stock: '',
        image: null,
    });
    const submit = (e) => {
    e.preventDefault();
    post('/products', {
        onSuccess: () => {
            reset();
            // Tutup modal di sini
        },
    });
};

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get('/products', { search: value }, {
            preserveState: true,
            replace: true,
        });
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Konfigurasi Toast
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const url = data.id ? `/products/${data.id}/update` : '/products';

    post(url, {
        forceFormData: true,
        onSuccess: () => {
            setShowModal(false);
            reset();
            Toast.fire({
                icon: 'success',
                title: data.id ? 'Berhasil diperbarui!' : 'Berhasil ditambah!'
            });
        },
    });
};

  const handleDelete = (id) => {
    Swal.fire({
        title: 'Hapus Produk?',
        text: "Data yang dihapus tidak bisa dikembalikan loh!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16a34a', // Warna hijau success
        cancelButtonColor: '#ef4444',  // Warna merah danger
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
        borderRadius: '20px',
    }).then((result) => {
        if (result.isConfirmed) {
            router.post(`/products/${id}/delete`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        title: 'Terhapus!',
                        text: 'Produk benih berhasil dibuang.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            });
        }
    });
};
    const closeModal = () => {
        setShowModal(false);
        reset();
        clearErrors();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Produk Benih" />

            {/* Header & Search */}
            {/* Header & Search Area */}
<div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
    <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Daftar Produk Benih</h1>
        <p className="text-gray-500 mt-1">Kelola inventaris benih GreenSeed.</p>
    </div>

    <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
            <input
                type="text"
                placeholder="Cari nama benih..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 transition-all font-medium"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
                <Package size={20} />
            </div>
        </div>

        {/* Tombol Cetak PDF */}
        <a
            href="/products-download"
            target="_blank"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl transition-all font-bold shadow-lg shadow-red-200"
        >
            <Upload size={18} className="rotate-180" />
            Cetak PDF
        </a>

        {/* Tombol Tambah */}
        <button
            onClick={() => {
                reset(); // Pastikan form kosong
                setShowModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl transition-all font-bold shadow-lg shadow-green-200"
        >
            <Plus size={20} /> Tambah
        </button>
    </div>
</div>

            {/* Tabel */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-5">Produk</th>
                            <th className="px-6 py-5">Kategori</th>
                            <th className="px-6 py-5">Harga</th>
                            <th className="px-6 py-5 text-center">Stok</th>
                            <th className="px-6 py-5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.data.length > 0 ? products.data.map((product) => (
                            <tr key={product.id} className="hover:bg-green-50/50 transition-colors group">
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                        <img
                                            src={product.image ? `/storage/${product.image}` : 'https://placehold.co/100x100?text=Seed'}
                                            className="w-full h-full object-cover"
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="font-bold text-gray-900">{product.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                        {product.category?.name || 'Umum'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-green-700">
                                    Rp {Number(product.price).toLocaleString('id-ID')}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black ${product.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                        {product.stock} PCS
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

<button
    onClick={() => {
        // Isi data form dengan data produk yang diklik
        setData({
            id: product.id, // Tambahkan ID untuk proses update
            name: product.name,
            category_id: product.category_id,
            price: product.price,
            stock: product.stock,
            image: null,
        });
        setShowModal(true); // Buka modal yang sama
    }}
    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
>
    <Pencil size={18} />
</button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="px-6 py-20 text-center opacity-30 italic font-bold text-xl">Data Kosong</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-between items-center px-2">
                <div className="text-sm text-gray-500 font-medium">
                    Total: <span className="font-bold text-gray-900">{products.total}</span> Produk
                </div>
                <div className="flex gap-2">
                    {products.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && (window.location.href = link.url)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${link.active ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'} ${!link.url ? 'opacity-30' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Tambah */}
            {showModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[30px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold">Tambah Produk</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nama Produk</label>
                                <input className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-green-500 mt-1" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Kategori</label>
                                <select className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-green-500 mt-1" value={data.category_id} onChange={e => setData('category_id', e.target.value)}>
                                    <option value="">Pilih Kategori</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Harga</label>
                                    <input type="number" className="w-full bg-gray-50 border-none rounded-xl p-3 mt-1" value={data.price} onChange={e => setData('price', e.target.value)} />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Stok</label>
                                    <input type="number" className="w-full bg-gray-50 border-none rounded-xl p-3 mt-1" value={data.stock} onChange={e => setData('stock', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Gambar</label>
                                <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                                    <Upload className="text-gray-400 mr-2" size={20} />
                                    <span className="text-sm text-gray-500 font-medium">{data.image ? data.image.name : 'Upload Foto Produk'}</span>
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-50 mt-4">
                                {processing ? 'MENYIMPAN...' : 'SIMPAN PRODUK'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
