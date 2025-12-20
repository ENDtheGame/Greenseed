<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class WelcomeController extends Controller
{
    public function index()
    {
        // 3. Tampilkan Landing Page dengan membawa data produk
        return Inertia::render('Welcome', [
            'products' => Product::latest()->take(3)->get()
        ]);
    }
}
