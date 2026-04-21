import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
        }),
    ],
    resolve: {
        conditions: ['browser'],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        include: ['tests/**/*.{test,spec}.{ts,js}'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,js,svelte}'],
            exclude: ['src/main.js', 'src/global.d.ts'],
            reporter: ['text', 'html'],
        },
    },
});
