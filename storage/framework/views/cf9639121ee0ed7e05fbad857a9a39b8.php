<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <title><?php echo e(config('app.name', 'GreenSeed')); ?></title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script src="https://unpkg.com/lucide@latest"></script>

    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.jsx']); ?>
</head>

<body class="font-sans text-gray-900 antialiased">
    <div
        class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-green-50 via-white to-green-100">

        <div class="mb-4 flex flex-col items-center">
            <a href="/" class="flex items-center gap-2">
                <i data-lucide="leaf" class="text-green-600 w-12 h-12"></i>
                <span class="text-4xl font-extrabold text-green-700 tracking-tight">GreenSeed</span>
            </a>
            <p class="text-gray-500 mt-2 font-medium">Platform Manajemen Benih Terbaik</p>
        </div>

        <div
            class="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-sm border border-slate-100 overflow-hidden sm:rounded-2xl">
            <?php echo e($slot); ?>

        </div>

        <footer class="mt-8 text-gray-400 text-sm">
            &copy; <?php echo e(date('Y')); ?> GreenSeed Team. All rights reserved.
        </footer>
    </div>

    <script>
        // Inisialisasi icon Lucide
        lucide.createIcons();
    </script>
</body>

</html>
<?php /**PATH C:\xampp\htdocs\Greenseed\resources\views/layouts/guest.blade.php ENDPATH**/ ?>