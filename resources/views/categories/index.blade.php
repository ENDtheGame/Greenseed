@extends('layouts.app')

@section('content')
    <h1 class="text-2xl font-bold mb-4">Data Kategori</h1>

    <a href="{{ route('categories.create') }}" class="bg-green-600 text-white px-4 py-2 rounded">
        + Tambah Kategori
    </a>

    <div class="mt-4 space-y-2">
        @foreach ($categories as $category)
            <div class="bg-white p-4 rounded shadow flex justify-between">
                <span>{{ $category->name }}</span>

                <div class="flex gap-2">
                    <a href="{{ route('categories.edit', $category->id) }}" class="text-blue-600">Edit</a>

                    <form action="{{ route('categories.destroy', $category->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="text-red-600">Hapus</button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>
@endsection
