<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
{
    $products = Product::with('category')
        ->when($request->search, function($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Products/Index', [
        'products' => $products, // Ini isinya sekarang ada 'data', 'links', dll
        'categories' => Category::all(),
        'filters' => $request->only(['search']),
        // TETAP MASUKKAN INI BIAR SIDEBAR AMAN
        'auth' => [
            'user' => [
                'name' => auth()->user()->name,
                'role' => auth()->user()->role,
            ]
        ],
    ]);
}

   public function store(Request $request)
{
    $attr = $request->validate([
        'name' => 'required',
        'category_id' => 'required',
        'price' => 'required|numeric',
        'stock' => 'required|numeric',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Validasi foto
    ]);

    // Logika simpan foto
    if ($request->hasFile('image')) {
        $attr['image'] = $request->file('image')->store('products', 'public');
    }

    \App\Models\Product::create($attr);

    return back();
}

   public function destroy(Product $product)
{
    if ($product->image) {
        \Storage::disk('public')->delete($product->image);
    }
    $product->delete();
    return redirect()->back();
}

public function update(Request $request, Product $product)
{
    $data = $request->validate([
        'category_id' => 'required',
        'name' => 'required',
        'price' => 'required|numeric',
        'stock' => 'required|numeric',
        'image' => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('image')) {
        // Hapus foto lama jika ada foto baru
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $data['image'] = $request->file('image')->store('products', 'public');
    }

    $product->update($data);

    return redirect()->route('products.index');
}

public function downloadPDF()
{
    $products = Product::with('category')->latest()->get();

    // Kita panggil view khusus untuk desain PDF-nya
    $pdf = \Pdf::loadView('pdf.products', compact('products'));

    // Download filenya dengan nama laporan-produk.pdf
    return $pdf->stream('laporan-stok-benih.pdf');
}
}
