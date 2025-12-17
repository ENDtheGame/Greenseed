<h1>Tambah Produk</h1>

<form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <select name="category_id">
        @foreach ($categories as $category)
            <option value="{{ $category->id }}">{{ $category->name }}</option>
        @endforeach
    </select>

    <input type="text" name="name" placeholder="Nama produk">
    <input type="number" name="price" placeholder="Harga">
    <input type="number" name="stock" placeholder="Stok">
    <input type="file" name="image">

    <button type="submit">Simpan</button>
</form>
