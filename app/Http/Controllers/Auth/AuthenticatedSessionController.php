<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{

    protected function authenticated(Request $request, $user)
{
    if ($request->user()->role === 'admin') {
    return redirect()->intended(route('dashboard'));
}
// Jika bukan admin, kirim ke katalog
return redirect()->intended(route('katalog.index'));
    }


    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
   public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    // Ambil user
    $user = $request->user();

    // JANGAN pakai intended() di sini kalau mau maksa redirect berdasarkan role
    if ($user->role === 'admin') {
        return redirect()->route('dashboard');
    }

    return redirect()->route('katalog.index');
}

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
