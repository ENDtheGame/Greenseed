@extends('layouts.app')

@section('content')
    <div class="space-y-6">

        {{-- Header --}}
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <span class="text-sm text-gray-500">
                {{ now()->format('l, d F Y') }}
            </span>
        </div>

        {{-- Card Statistik --}}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            {{-- Total Kategori --}}
            <div class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Kategori</p>
                        <h2 class="text-4xl font-bold text-indigo-600">
                            {{ $totalCategories }}
                        </h2>
                    </div>
                    <div class="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                        📁
                    </div>
                </div>
            </div>

            {{-- Total Produk --}}
            <div class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Produk</p>
                        <h2 class="text-4xl font-bold text-green-600">
                            {{ $totalProducts }}
                        </h2>
                    </div>
                    <div class="bg-green-100 text-green-600 p-3 rounded-full">
                        📦
                    </div>
                </div>
            </div>

            {{-- Total Stok --}}
            <div class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Stok</p>
                        <h2 class="text-4xl font-bold text-orange-600">
                            {{ $totalStock }}
                        </h2>
                    </div>
                    <div class="bg-orange-100 text-orange-600 p-3 rounded-full">
                        📊
                    </div>
                </div>
            </div>

        </div>

    </div>
@endsection
