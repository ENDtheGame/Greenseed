@extends('layouts.app')

@section('content')
    <div id="app"></div>

    <script>
        window.products = @json($products->values());
        window.categories = @json($categories);
    </script>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
@endsection
