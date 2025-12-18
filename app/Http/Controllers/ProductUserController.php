<?php

namespace App\Http\Controllers;
use Inertia\Inertia;


use Illuminate\Http\Request;
use App\Models\Product; 


class ProductUserController extends Controller
{
  public function index()
{
    // 1. Ambil data produk
    $products = \App\Models\Product::with('category')->get();

    // 2. Ambil data user yang sedang login
    $user = auth()->user();

    // 3. Kirim ke Inertia
    return \Inertia\Inertia::render('Katalog/Index', [
        'products' => $products,
        // KITA PAKSA KIRIM DATA AUTH DI SINI JUGA
        'auth' => [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
            ] : null,
        ],
    ]);
}
}

