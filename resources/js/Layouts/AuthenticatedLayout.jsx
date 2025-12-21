import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { LayoutDashboard, Box, FolderTree, LogOut, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AuthenticatedLayout({ header, children }) {
    const { props } = usePage();
    const user = props.auth?.user || null;

    // State untuk kontrol buka/tutup sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);

    const allNavigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, role: 'admin' },
        { name: 'Katalog', href: '/katalog', icon: Leaf },
        { name: 'Produk Benih', href: '/products', icon: Box, role: 'admin' },
        { name: 'Kategori', href: '/categories', icon: FolderTree, role: 'admin' },
    ];

    const filteredNavigation = allNavigation.filter(item => {
        if (item.role === 'admin') {
            return user?.role === 'admin';
        }
        return true;
    });

    const handleLogout = (e) => {
        if (e) e.preventDefault();
        router.post('/logout', {}, {
            onSuccess: () => window.location.replace('/'),
            onFinish: () => window.location.href = '/',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Toaster position="top-right" />

            {/* SIDEBAR */}
            <aside
                className={`bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out ${
                    isCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                {/* Logo & Toggle Button */}
                {/* Logo & Toggle Button */}
<div className="p-6 flex items-center h-16 relative">
    {/* Logo: Hilang total saat collapsed */}
    {!isCollapsed && (
        <div className="flex items-center gap-2 font-bold text-green-600 text-xl animate-in fade-in">
            <Leaf size={28} />
            <span>GreenSeed</span>
        </div>
    )}

    {/* Tombol: Jadi di tengah saat collapsed */}
    <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`p-1.5 rounded-lg bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all ${
            isCollapsed ? 'mx-auto' : 'ml-auto'
        }`}
    >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
    </button>
</div>

                {/* Navigasi Links */}
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {filteredNavigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={isCollapsed ? item.name : ""}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                window.location.pathname === item.href
                                ? 'bg-green-50 text-green-600 font-bold'
                                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                            }`}
                        >
                            <item.icon size={20} className="shrink-0" />
                            <span className={`transition-opacity duration-300 whitespace-nowrap ${
                                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                            }`}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        title={isCollapsed ? "Logout" : ""}
                        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition font-medium text-left"
                    >
                        <LogOut size={20} className="shrink-0" />
                        <span className={`transition-opacity duration-300 ${
                            isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                        }`}>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0">
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
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
