import { describe, expect, it } from 'vitest';

// Smoke test for the mount entrypoint. The real main.js mounts App into
// document.body at import time, so simply importing it inside jsdom will
// throw if Svelte's mount API, the rollup/TypeScript toolchain, or any of
// the top-level imports are broken.
describe('main entrypoint', () => {
    it('mounts the app into the document without throwing', async () => {
        const mod = await import('../src/main.js');
        expect(mod.default).toBeDefined();
        expect(
            document.body.querySelector('h1')?.textContent,
        ).toBe('Time Log');
    });
});
