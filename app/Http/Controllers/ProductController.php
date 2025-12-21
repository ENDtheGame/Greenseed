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
    $query = Product::with('category');

    if ($request->search) {
        $query->where('name', 'like', "%{$request->search}%");
    }

    if ($request->category) {
        $query->whereHas('category', function($q) use ($request) {
            $q->where('name', $request->category);
        });
    }

    // WAJIB: Pastikan pakai paginate() bukan get()
    $products = $query->latest()->paginate(12)->withQueryString();

    return Inertia::render('Products/Index', [
        'products'   => $products, // Ini sekarang adalah Object (bukan Array)
        'categories' => Category::all(),
        'filters'    => $request->only(['search', 'category']),
        'auth' => [
            'user' => [
                'name'  => auth()->user()->name,
                'role'  => auth()->user()->role,
                'phone' => auth()->user()->phone,
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $attr['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($attr);

        return back();
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
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->back();
    }

    public function downloadPDF()
    {
        $products = Product::with('category')->latest()->get();
        $pdf = \Pdf::loadView('pdf.products', compact('products'));
        return $pdf->stream('laporan-stok-benih.pdf');
    }
}
