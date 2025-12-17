<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $totalCategories = Category::count();
        $totalProducts   = Product::count();
        $totalStock      = Product::sum('stock');

        return view('dashboard', compact(
            'totalCategories',
            'totalProducts',
            'totalStock'
        ));
    }
}
