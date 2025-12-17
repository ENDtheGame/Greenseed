<h1>Tambah Kategori</h1>

<form action="{{ route('categories.store') }}" method="POST">
    @csrf
    <input type="text" name="name" placeholder="Nama kategori">
    <button type="submit">Simpan</button>
</form>
