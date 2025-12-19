import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index(props) {
    const { categories, auth, flash } = props;

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                title: 'Berhasil!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#16a34a',
            });
        }
    }, [flash]);

    // 1. Fungsi Tambah
    const handleAddCategory = () => {
        Swal.fire({
            title: 'Tambah Kategori Baru',
            input: 'text',
            inputPlaceholder: 'Masukkan nama kategori',
            showCancelButton: true,
            confirmButtonText: 'Tambah Kategori',
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
                router.post('/admin/category', {
                    name: result.value
                }, {
                    preserveScroll: true,
                });
            }
        });
    };

    // 2. Fungsi Edit
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
                router.post(`/categories/${category.id}`, {
                    _method: 'PUT',
                    name: result.value
                }, {
                    preserveScroll: true,
                });
            }
        });
    };

    // 3. Fungsi Delete
  const handleDelete = (id) => {
    Swal.fire({
        title: 'Yakin hapus?',
        text: "Data akan hilang permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Ganti route('category.destroy', id) menjadi URL manual seperti ini:
            router.delete(`/admin/category/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Alert sukses akan muncul otomatis via useEffect
                },
                onError: (errors) => {
                    if (errors.delete) {
                        Swal.fire('Gagal!', errors.delete, 'error');
                    }
                }
            });
        }
    });
};  

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kategori Benih" />

            <div className="p-8 max-w-6xl mx-auto">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => ( // Pakai nama 'category' biar sinkron
                        <div key={category.id} className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                                    <Tag size={24} />
                                </div>

                                <h3 className="text-2xl font-black text-gray-800 mb-1 capitalize">
                                    {category.name}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-400 mb-8">
                                    <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded-md uppercase tracking-tighter">
                                        ID: {category.id}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 py-3 rounded-xl font-bold text-sm transition-all border border-transparent"
                                    >
                                        <Pencil size={16} /> Edit
                                    </button>

                                    <button
                                        disabled={category.products_count > 0}
                                        onClick={() => handleDelete(category.id)}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border border-transparent
                                            ${category.products_count > 0
                                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                    >
                                        <Trash2 size={16} /> Hapus
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
