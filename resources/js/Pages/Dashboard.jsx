import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Leaf, Box, Users, ShoppingCart } from 'lucide-react';

// Hapus 'auth' dari parameter sini kalau kamu tidak memakainya di tempat lain
export default function Dashboard({ totalProducts, totalCategories, lowStockCount }) {

    const stats = [
        {
            name: 'Total Benih',
            value: totalProducts ?? 0,
            icon: Leaf, color: 'text-green-600', bg: 'bg-green-100'
        },
        {
            name: 'Kategori',
            value: totalCategories ?? 0,
            icon: Box, color: 'text-blue-600', bg: 'bg-blue-100'
        },
        {
            name: 'Stok Menipis',
            value: lowStockCount ?? 0,
            icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-100'
        },
        {
            name: 'Total Pengguna',
            value: 0, // Bisa kamu isi nanti
            icon: Users, color: 'text-purple-600', bg: 'bg-purple-100'
        },
    ];

    return (
        /* CUKUP TULIS SEPERTI INI SAJA, TIDAK PERLU user={auth.user} */
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Selamat Datang, Admin!</h1>
                    <p className="text-gray-500">Berikut adalah ringkasan inventaris benih GreenSeed hari ini.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 font-medium truncate">{stat.name}</p>
                                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
