@extends('layouts.app')

@section('content')
    <h1 class="text-2xl font-bold mb-4">Data Produk</h1>

    <a href="{{ route('products.create') }}" class="bg-green-600 text-white px-4 py-2 rounded">
        + Tambah Produk
    </a>
    <form method="GET" class="mb-4">
        <input type="text" name="search" value="{{ $search }}" placeholder="Cari produk..."
            class="border rounded px-3 py-2 w-64">

        <button class="bg-green-600 text-white px-4 py-2 rounded">
            Cari
        </button>
    </form>

    <div class="grid grid-cols-3 gap-4 mt-4">
        @foreach ($products as $product)
            <div class="bg-white p-4 rounded shadow">
                @if ($product->image)
                    <img src="{{ asset('storage/' . $product->image) }}" class="h-32 w-full object-cover rounded mb-2">
                @endif

                <h2 class="font-semibold">{{ $product->name }}</h2>
                <p class="text-sm text-gray-600">
                    {{ $product->category->name }}
                </p>
                <p>Rp {{ number_format($product->price) }}</p>

                <div class="flex gap-2 mt-2">
                    <a href="{{ route('products.edit', $product->id) }}" class="text-blue-600 text-sm">Edit</a>

                    <form action="{{ route('products.destroy', $product->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="text-red-600 text-sm">Hapus</button>
                    </form>
                    <div class="mt-6">
                        {{ $products->links() }}
                    </div>

                </div>
            </div>
        @endforeach
    </div>
@endsection
