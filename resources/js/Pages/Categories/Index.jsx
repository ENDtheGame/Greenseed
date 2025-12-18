import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import Swal from 'sweetalert2';

// ... import tetap sama ...

export default function Index(props) {
    // Kita pecah props-nya di sini biar kelihatan mana yang masuk
    const { categories, auth, flash } = props;

    // Log ini sangat penting untuk diagnosa
    console.log("Cek seluruh Props:", props);

    useEffect(() => {
        // Jika flash masih undefined di sini, berarti masalah ada di Middleware Laravel
        if (flash?.success) {
            Swal.fire({
                title: 'Berhasil!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#16a34a',
            });
        }
    }, [flash]);

    // ... sisa kode tetap sama ...

    // 1. Fungsi Tambah Kategori
    const handleAddCategory = () => {
        Swal.fire({
            title: 'Tambah Kategori Baru',
            input: 'text',
            inputPlaceholder: 'Masukkan nama kategori...',
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            confirmButtonColor: '#16a34a',
            cancelButtonText: 'Batal',
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage('Nama kategori tidak boleh kosong!');
                }
                return value;
            }
        }).then((result) => {
            if (result.isConfirmed) {
              router.post(`/categories/${category.id}`, {
    _method: 'PUT',
    name: result.value
}, {
    onSuccess: () => {
        // Biarkan kosong, ini memicu props untuk diperbarui
    },
    preserveScroll: true,
});
            }
        });
    };

    // 2. Fungsi Edit Kategori
    const handleEdit = (category) => {
        Swal.fire({
            title: 'Edit Nama Kategori',
            input: 'text',
            inputValue: category.name,
            showCancelButton: true,
            confirmButtonText: 'Simpan Perubahan',
            confirmButtonColor: '#16a34a',
            cancelButtonText: 'Batal',
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage('Nama tidak boleh kosong!');
                }
                return value;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Menggunakan Method Spoofing agar stabil di semua environment
                router.post(`/categories/${category.id}`, {
                    _method: 'PUT',
                    name: result.value
                }, {
                    preserveScroll: true,
                });
            }
        });
    };

    // 3. Fungsi Hapus Kategori
    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Hapus Kategori ${name}?`,
            text: "Pastikan kategori tidak memiliki produk terkait.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/categories/${id}`, {
                    _method: 'DELETE',
                }, {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kategori Benih" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Kategori</h1>
                        <p className="text-gray-500 mt-1 font-medium">Organisir benih GreenSeed dengan mudah.</p>
                    </div>

                    <button
                        onClick={handleAddCategory}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-green-100 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        <span>Kategori Baru</span>
                    </button>
                </div>

                {/* Grid Kategori */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                                    <Tag size={24} />
                                </div>

                                <h3 className="text-2xl font-black text-gray-800 mb-1 capitalize">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-400 mb-8">
                                    <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded-md uppercase tracking-tighter">
                                        ID: {cat.id}
                                    </span>
                                    <span className="text-xs font-medium">Produk Terkait</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 py-3 rounded-xl font-bold text-sm transition-all border border-transparent"
                                    >
                                        <Pencil size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id, cat.name)}
                                        className="flex items-center justify-center bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 py-3 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} /> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
