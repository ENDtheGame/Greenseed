<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
{
    // Cek apakah user sudah login
    $user = auth()->user();

    return Inertia::render('Dashboard', [
        'totalProducts' => \App\Models\Product::count(),
        'totalCategories' => \App\Models\Category::count(),
        'lowStockCount' => \App\Models\Product::where('stock', '<', 10)->count(),

        // KITA PAKSA KIRIM DI SINI
        'auth' => [
            'user' => [
                'name' => $user->name,
                'role' => $user->role,
            ]
        ],
    ]);
}
}
