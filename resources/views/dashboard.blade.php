@extends('layouts.app')

@section('content')
    <h1 class="text-2xl font-bold mb-6">Dashboard Admin</h1>

    <div class="grid grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded shadow">
            <p class="text-gray-500">Total Kategori</p>
            <h2 class="text-3xl font-bold">{{ $totalCategories }}</h2>
        </div>

        <div class="bg-white p-6 rounded shadow">
            <p class="text-gray-500">Total Produk</p>
            <h2 class="text-3xl font-bold">{{ $totalProducts }}</h2>
        </div>

        <div class="bg-white p-6 rounded shadow">
            <p class="text-gray-500">Total Stok</p>
            <h2 class="text-3xl font-bold">{{ $totalStock }}</h2>
        </div>
    </div>
@endsection
