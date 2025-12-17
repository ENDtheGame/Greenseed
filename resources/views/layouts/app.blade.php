<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Greenseed</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-100">

    <nav class="bg-green-700 text-white px-6 py-4">
        <div class="flex gap-6">
            <a href="{{ route('dashboard') }}" class="font-semibold">Dashboard</a>
            <a href="{{ route('categories.index') }}" class="font-semibold">Kategori</a>
            <a href="{{ route('products.index') }}" class="font-semibold">Produk</a>
        </div>
    </nav>
    
    <main class="p-6">
        @yield('content')
    </main>

</body>

</html>
