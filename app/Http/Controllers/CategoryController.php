<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Categories/Index', [
            // PENTING: Tambahkan withCount('products') agar React tahu jumlah produknya
            'categories' => Category::withCount('products')->latest()->get(),
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        // Gunakan 'success' agar sesuai dengan useEffect di React kamu
        return back()->with('success', 'Kategori baru berhasil ditambahkan!');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return back()->with('success', 'Kategori berhasil diperbarui!');
    }

   public function destroy($id): RedirectResponse
{
    try {
        // Cari kategorinya
        $category = Category::findOrFail($id);

        // Cek apakah ada produk (keamanan berlapis)
        if ($category->products()->count() > 0) {
            return redirect()->back()->withErrors([
                'delete' => 'Gagal! Kategori masih memiliki produk.'
            ]);
        }

        // Proses hapus
        $category->delete();

        // Kirim flash 'success' agar SweetAlert di React muncul
        return redirect()->back()->with('success', 'Kategori berhasil dihapus selamanya!');

    } catch (\Exception $e) {
        return redirect()->back()->withErrors([
            'delete' => 'Terjadi kesalahan: ' . $e->getMessage()
        ]);
    }
}

    public function show(Category $category)
    {
        return inertia('Categories/Show', [
            'category' => $category,
            'products' => $category->products()->with('category')->paginate(12),
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}
