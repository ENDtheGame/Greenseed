import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Box, FolderTree, LogOut, Leaf } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

export default function AuthenticatedLayout({ children }) {
    // Ambil semua props
    const props = usePage().props;

    // Kita cek satu-satu: apakah ada di props.auth? atau langsung di props?
    const auth = props.auth || {};
    const user = auth.user || props.user || null;
    const flash = props.flash || {};

    // DEBUG LAGI
    console.log("DATA USER DITEMUKAN:", user);

    const allNavigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, role: 'admin' },
        { name: 'Katalog', href: '/katalog', icon: Leaf },
        { name: 'Produk Benih', href: '/products', icon: Box, role: 'admin' },
        { name: 'Kategori', href: '/categories', icon: FolderTree, role: 'admin' },
    ];

    // Filter menu berdasarkan role
    const filteredNavigation = allNavigation.filter(item => {
        if (item.role === 'admin') {
            return user?.role === 'admin';
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Toaster position="top-right" />

            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
                <div className="p-6 flex items-center gap-2 font-bold text-green-600 text-xl">
                    <Leaf size={28} />
                    <span>GreenSeed</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {filteredNavigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                window.location.pathname === item.href
                                ? 'bg-green-50 text-green-600 font-bold'
                                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                            }`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        method="post"
                        href="/logout"
                        as="button"
                        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </Link>
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase">{user?.role || 'Guest'}</span>
                        </div>
                        <div className="w-9 h-9 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                </header>

                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
