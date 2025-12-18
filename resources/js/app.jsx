import './bootstrap';
import '../css/app.css'; // Pastikan path CSS ini benar

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    // Menentukan judul tab browser otomatis
    title: (title) => `${title} - GreenSeed`,

   resolve: (name) =>
    resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob('./Pages/**/*.jsx') // Pastikan ada titik (.) di depan /Pages
    ),

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#22c55e', // Warna loading bar (hijau)
    },
});
