<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Click;

class ProductUserController extends Controller
{
    public function index(Request $request)
{
    // 1. Ambil semua kategori untuk tombol filter
    $categories = \App\Models\Category::all();

    // 2. Query produk (dengan filter search dan category)
    $query = Product::with('category');

    if ($request->search) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    if ($request->category) {
        $query->whereHas('category', function($q) use ($request) {
            $q->where('name', $request->category);
        });
    }

    $products = $query->latest()->get();

   $user = auth()->user();

return Inertia::render('Katalog/Index', [
    'products'   => $products,
    'categories' => $categories,
    'filters'    => $request->only(['search', 'category']),
    'auth'       => [
        'user' => $user ? [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'role'  => $user->role,
            'phone' => $user->phone, // <--- Tambahkan query kolom phone di sini
        ] : null,
    ],
]);
}
public function updatePhone(Request $request)
{
    // Coba debug: jika ini error, berarti request sampai sini
    $request->validate([
        'phone' => 'required|numeric',
    ]);

    $user = auth()->user();

    // Update data
    $user->phone = $request->phone;
    $user->save();

    return back()->with('message', 'Nomor WhatsApp berhasil disimpan!');
}

public function trackClick($id)
{
    Click::create([
        'product_id' => $id
    ]);

    return response()->json(['message' => 'Click tracked']);
}
}
