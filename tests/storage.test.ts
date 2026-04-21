import { beforeEach, describe, expect, it } from 'vitest';
import {
    THEME_STORAGE_KEY,
    clearActivityDataPreservingTheme,
    getActivityData,
} from '../src/lib/storage';

describe('getActivityData', () => {
    beforeEach(() => window.localStorage.clear());

    it('returns an empty object when localStorage is empty', () => {
        expect(getActivityData()).toEqual({});
    });

    it('returns all entries when no theme is set', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem('2', 'lunch');
        expect(getActivityData()).toEqual({ '1': 'coding', '2': 'lunch' });
    });

    it('never includes the reserved theme key', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        const data = getActivityData();
        expect(data).toEqual({ '1': 'coding' });
        expect(data).not.toHaveProperty(THEME_STORAGE_KEY);
    });

    it('tolerates a storage that only contains the theme key', () => {
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
        expect(getActivityData()).toEqual({});
    });

    it('accepts a custom Storage so callers can inject stubs', () => {
        const fake: Storage = {
            length: 2,
            clear: () => undefined,
            getItem: (key) => (key === 'a' ? '1' : key === 'b' ? '2' : null),
            key: (i) => (i === 0 ? 'a' : i === 1 ? 'b' : null),
            removeItem: () => undefined,
            setItem: () => undefined,
        };
        expect(getActivityData(fake)).toEqual({ a: '1', b: '2' });
    });
});

describe('clearActivityDataPreservingTheme', () => {
    beforeEach(() => window.localStorage.clear());

    it('removes activity data but keeps the saved theme', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem('2', 'meeting');
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        clearActivityDataPreservingTheme();
        expect(window.localStorage.getItem('1')).toBeNull();
        expect(window.localStorage.getItem('2')).toBeNull();
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    });

    it('sets theme to an empty string when no theme was set', () => {
        window.localStorage.setItem('1', 'coding');
        clearActivityDataPreservingTheme();
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('');
        expect(window.localStorage.getItem('1')).toBeNull();
    });
});
