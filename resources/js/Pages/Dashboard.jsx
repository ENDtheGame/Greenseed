import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Box, Leaf, ShoppingCart, Users, ArrowUpRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Registrasi komponen ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard(props) {
    // 1. Destructuring props dari Controller
    const { totalProducts, totalCategories, lowStockCount, totalUsers, chartData, topProducts } = props;

    // 2. Data Pengaman jika chartData kosong
    const safeChartData = chartData ?? {
        labels: [],
        datasets: [{ label: 'No Data', data: [], borderColor: '#ccc' }]
    };

    // 3. Susun data untuk card statistik
    const statsData = [
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
            value: totalUsers ?? 0,
            icon: Users, color: 'text-purple-600', bg: 'bg-purple-100'
        },
    ];

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard Admin" />

            <div className="space-y-8">
                {/* --- SECTION 1: HEADER --- */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Selamat Datang, {props.auth.user.name}!
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Berikut adalah ringkasan inventaris benih GreenSeed hari ini.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 no-print">


        {/* Tombol Print/PDF (Menggunakan cara window.print tadi) */}
        <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak PDF
        </button>
    </div>
                </div>

                {/* --- SECTION 2: STATS CARDS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsData.map((stat, index) => (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.name}</p>
                                <p className="text-2xl font-black text-gray-800 leading-none mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- SECTION 3: CHARTS & TOP PRODUCTS --- */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Area Grafik (Kiri - 75% Lebar) */}
                    <div className="xl:col-span-3 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-5 bg-green-500 rounded-full"></span>
                            Tren Minat Pelanggan (Klik WA)
                        </h3>
                        <div className="h-[350px] w-full">
                            <Line
                                data={safeChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: { color: '#f3f4f6' },
                                            ticks: { stepSize: 1 }
                                        },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Top Products (Kanan - 25% Lebar) */}
                    <div className="xl:col-span-1 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-5 bg-orange-500 rounded-full"></span>
                            Benih Terpopuler
                        </h3>

                        <div className="space-y-4 flex-grow">
                            {topProducts && topProducts.length > 0 ? (
                                topProducts.map((product, index) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors group">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100">
                                                #{index + 1}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-gray-700 truncate">
                                                    {product.name}
                                                </p>
                                                <p className="text-[10px] text-gray-400 uppercase">
                                                    {product.clicks_count} Interaksi
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10">
                                    <p className="text-gray-400 text-sm italic text-center">Belum ada data interaksi.</p>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/katalog"
                            className="mt-6 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-2xl text-xs font-bold hover:bg-black transition-all group"
                        >
                            Lihat Katalog
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
                {/* TABEL MANAJEMEN STOK CEPAT */}
<div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mt-8 no-print">
    <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-3">
            <div className="w-2 h-6 bg-red-500 rounded-full"></div>
            Kontrol Stok Benih
        </h3>
        <Link href="/products" className="text-xs font-bold text-green-600 hover:underline">
            Kelola Semua Produk →
        </Link>
    </div>

    <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-black">
                    <th className="px-4 py-2">Benih</th>
                    <th className="px-4 py-2">Kategori</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Sisa Stok</th>
                </tr>
            </thead>
            <tbody>
                {props.inventory?.map((item) => (
                    <tr key={item.id} className="bg-gray-50/50 hover:bg-white hover:shadow-md transition-all rounded-2xl group">
                        <td className="px-4 py-4 rounded-l-2xl border-y border-l border-transparent group-hover:border-gray-100">
                            <span className="text-sm font-bold text-gray-700">{item.name}</span>
                        </td>
                        <td className="px-4 py-4 border-y border-transparent group-hover:border-gray-100">
                            <span className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded-lg text-gray-500 font-bold uppercase">
                                {item.category?.name || 'Umum'}
                            </span>
                        </td>
                        <td className="px-4 py-4 text-center border-y border-transparent group-hover:border-gray-100">
                            {item.stock <= 0 ? (
                                <span className="text-[10px] text-red-600 font-black bg-red-100 px-3 py-1 rounded-full uppercase">Habis</span>
                            ) : item.stock < 10 ? (
                                <span className="text-[10px] text-orange-600 font-black bg-orange-100 px-3 py-1 rounded-full uppercase">Menipis</span>
                            ) : (
                                <span className="text-[10px] text-green-600 font-black bg-green-100 px-3 py-1 rounded-full uppercase">Aman</span>
                            )}
                        </td>
                        <td className="px-4 py-4 text-center rounded-r-2xl border-y border-r border-transparent group-hover:border-gray-100">
                            <div className="flex items-center justify-center gap-3 font-black text-gray-800">
                                {item.stock}
                                <span className="text-[10px] text-gray-400 font-normal">Pack</span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
            </div>
        </AuthenticatedLayout>
    );
}
