import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

// Patch matchMedia immediately on module load so any top-level component
// imports (e.g. svelte-toast's motion helpers) that touch it succeed.
if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
}

// jsdom lacks Element.animate, which svelte-toast calls when a toast is
// pushed. Provide a minimal no-op implementation so toast-triggering code
// paths can run under test.
if (
    typeof Element !== 'undefined' &&
    typeof Element.prototype.animate !== 'function'
) {
    Element.prototype.animate = function animate() {
        return {
            cancel: () => undefined,
            finish: () => undefined,
            play: () => undefined,
            pause: () => undefined,
            reverse: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            onfinish: null,
            oncancel: null,
            finished: Promise.resolve(),
        } as unknown as Animation;
    };
}

beforeEach(() => {
    window.localStorage.clear();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    window.localStorage.clear();
});
