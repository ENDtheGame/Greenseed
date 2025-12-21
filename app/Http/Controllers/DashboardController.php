<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Click;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Ambil data klik 6 bulan terakhir untuk grafik
        // Kita mengelompokkan berdasarkan bulan
        $clicksData = Click::select(
            DB::raw('COUNT(*) as total'),
            DB::raw("DATE_FORMAT(created_at, '%b') as month")
        )
        ->where('created_at', '>=', now()->subMonths(5))
        ->groupBy('month')
        ->orderBy('created_at', 'asc')
        ->get();

        // 2. Ambil 5 Produk Terpopuler berdasarkan jumlah klik
        $topProducts = Product::withCount('clicks')
            ->orderBy('clicks_count', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            // Statistik Card
            'totalProducts'   => Product::count(),
            'totalCategories' => Category::count(),
            'lowStockCount'   => Product::where('stock', '<', 10)->count(),
            'totalUsers'      => User::where('role', 'user')->count(),
            'out_of_stock'    => Product::where('stock', 0)->count(),

            // List produk stok rendah untuk tabel
            'low_stock_products' => Product::where('stock', '<=', 10)
                ->with('category')
                ->limit(5)
                ->get(),

            // Data Grafik Real
            'chartData' => [
                'labels' => $clicksData->pluck('month')->toArray(), // Contoh: ['Oct', 'Nov', 'Dec']
                'datasets' => [
                    [
                        'label' => 'Klik WA (Minat)',
                        'data' => $clicksData->pluck('total')->toArray(),
                        'borderColor' => '#16a34a',
                        'backgroundColor' => 'rgba(22, 163, 74, 0.1)',
                        'fill' => true,
                        'tension' => 0.4
                    ],
                ],
            ],

            // Produk terpopuler untuk sidebar dashboard
            'topProducts' => $topProducts,

            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'role' => $user->role,
                ]
            ],
            'inventory' => Product::with('category')
            ->orderBy('stock', 'asc') // Munculkan yang stoknya paling sedikit dulu
            ->limit(10)
            ->get(),
        ]);
    }
}
