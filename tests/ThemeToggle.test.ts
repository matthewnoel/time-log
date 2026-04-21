import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeToggle from '../src/components/ThemeToggle.svelte';
import { THEME_STORAGE_KEY } from '../src/lib/storage';

const stubMatchMedia = (prefersDark: boolean) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: prefersDark && query.includes('dark'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;
};

beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
});

describe('ThemeToggle – initial theme resolution', () => {
    it('uses the saved theme from localStorage when present', () => {
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        stubMatchMedia(false);
        render(ThemeToggle);

        expect(document.documentElement.getAttribute('data-theme')).toBe(
            'dark',
        );
        // Icon shows the opposite (what clicking will change to).
        expect(
            screen.getByRole('button', { name: 'Change to light theme.' }),
        ).toBeInTheDocument();
    });

    // NOTE: The current implementation coalesces a missing theme to `''` and
    // then checks `!== null`, which short-circuits the system-preference
    // fallback. These tests lock in that observable behavior so dependency
    // bumps don't silently change it; if the fallback is intentionally fixed
    // later, update these tests.
    it('defaults to an empty theme attribute when nothing is stored (system prefers dark)', () => {
        stubMatchMedia(true);
        render(ThemeToggle);
        expect(document.documentElement.getAttribute('data-theme')).toBe('');
    });

    it('defaults to an empty theme attribute when nothing is stored (system prefers light)', () => {
        stubMatchMedia(false);
        render(ThemeToggle);
        expect(document.documentElement.getAttribute('data-theme')).toBe('');
        // Falls through to the light-leaning icon because '' !== 'dark'.
        expect(
            screen.getByRole('button', { name: 'Change to dark theme.' }),
        ).toBeInTheDocument();
    });
});

describe('ThemeToggle – click behavior', () => {
    it('flips light → dark and persists the choice', async () => {
        const user = userEvent.setup();
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
        stubMatchMedia(false);
        render(ThemeToggle);

        await user.click(screen.getByRole('button'));

        expect(document.documentElement.getAttribute('data-theme')).toBe(
            'dark',
        );
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
        expect(
            screen.getByRole('button', { name: 'Change to light theme.' }),
        ).toBeInTheDocument();
    });

    it('flips dark → light and persists the choice', async () => {
        const user = userEvent.setup();
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        stubMatchMedia(true);
        render(ThemeToggle);

        await user.click(screen.getByRole('button'));

        expect(document.documentElement.getAttribute('data-theme')).toBe(
            'light',
        );
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    });

    it('toggles back and forth correctly across multiple clicks', async () => {
        const user = userEvent.setup();
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
        stubMatchMedia(false);
        render(ThemeToggle);

        const button = screen.getByRole('button');
        await user.click(button);
        await user.click(button);
        expect(document.documentElement.getAttribute('data-theme')).toBe(
            'light',
        );
        await user.click(button);
        expect(document.documentElement.getAttribute('data-theme')).toBe(
            'dark',
        );
    });

    it('exposes an accessible aria-label describing the next action', () => {
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
        stubMatchMedia(false);
        render(ThemeToggle);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Change to dark theme.');
        expect(button).toHaveAttribute('data-theme-toggle', '');
    });
});
