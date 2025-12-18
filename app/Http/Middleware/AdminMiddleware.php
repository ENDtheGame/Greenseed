<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Cek apakah user sudah login
        // 2. Cek apakah role user adalah 'admin'
        if (!Auth::check() || Auth::user()->role !== 'admin') {

            // Jika request datang dari Inertia/Ajax, Laravel akan otomatis
            // menangani redirect dengan benar.
            return redirect('/')->with('error', 'Akses ditolak! Anda bukan admin.');
        }

        return $next($request);
    }
}
