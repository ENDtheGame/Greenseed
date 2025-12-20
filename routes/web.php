<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductUserController;
use App\Http\Controllers\WelcomeController;
use Inertia\Inertia;

// 1. GUEST
// File: routes/web.php

Route::get('/', function () {
    if (auth()->check()) {
        // Paksa redirect ke URL yang berbeda agar Inertia mereset state
        return auth()->user()->role === 'admin'
            ? redirect('/dashboard')
            : redirect('/katalog');
    }
    // Jika belum login, baru panggil Controller
    return app(App\Http\Controllers\WelcomeController::class)->index();
})->name('welcome');

// 2. AUTHENTICATED (ADMIN & USER)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/katalog', [ProductUserController::class, 'index'])->name('katalog.index');
});

// 3. KHUSUS ADMIN
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::post('/admin/category', [CategoryController::class, 'store'])->name('category.store');
    Route::delete('/admin/category/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}/delete', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::post('/products/{product}/update', [ProductController::class, 'update'])->name('products.custom_update');
    Route::get('/products-download', [ProductController::class, 'downloadPDF'])->name('products.pdf');
});

require __DIR__.'/auth.php';
