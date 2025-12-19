@props(['disabled' => false])

<input
    {{ $attributes->merge(['class' => 'border-slate-300 focus:border-green-500 focus:ring-green-500 rounded-lg shadow-sm py-2.5 text-slate-700']) }}>
