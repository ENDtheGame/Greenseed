<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Categories/Index', [
            // Pakai latest() biar kategori baru muncul di paling depan/atas
            'categories' => Category::latest()->get(),
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    // Fungsi Tambah Kategori Baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

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

        // Tambahkan flash success biar SweetAlert di React muncul
        return back()->with('success', 'Kategori berhasil diperbarui!');
    }

public function destroy($id)
{
    try {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('message', 'Kategori berhasil dihapus!');
    } catch (QueryException $e) {
        // Cek jika error disebabkan karena data masih digunakan (Foreign Key Constraint)
        if ($e->getCode() === "23000") {
            return redirect()->back()->withErrors([
                'delete' => 'Kategori tidak bisa dihapus karena masih digunakan oleh produk lain!'
            ]);
        }

        return redirect()->back()->withErrors(['delete' => 'Terjadi kesalahan sistem.']);
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
