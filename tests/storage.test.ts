import { beforeEach, describe, expect, it } from 'vitest';
import {
    LEGACY_THEME_STORAGE_KEY,
    clearActivityData,
    getActivityData,
} from '../src/lib/storage';

describe('getActivityData', () => {
    beforeEach(() => window.localStorage.clear());

    it('returns an empty object when localStorage is empty', () => {
        expect(getActivityData()).toEqual({});
    });

    it('returns all entries', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem('2', 'lunch');
        expect(getActivityData()).toEqual({ '1': 'coding', '2': 'lunch' });
    });

    it('never includes the legacy theme key', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, 'dark');
        const data = getActivityData();
        expect(data).toEqual({ '1': 'coding' });
        expect(data).not.toHaveProperty(LEGACY_THEME_STORAGE_KEY);
    });

    it('tolerates a storage that only contains the legacy theme key', () => {
        window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, 'light');
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

describe('clearActivityData', () => {
    beforeEach(() => window.localStorage.clear());

    it('removes all activity data', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem('2', 'meeting');
        clearActivityData();
        expect(window.localStorage.getItem('1')).toBeNull();
        expect(window.localStorage.getItem('2')).toBeNull();
        expect(window.localStorage.length).toBe(0);
    });

    it('removes a lingering legacy theme key too', () => {
        window.localStorage.setItem('1', 'coding');
        window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, 'dark');
        clearActivityData();
        expect(window.localStorage.getItem('1')).toBeNull();
        expect(
            window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY),
        ).toBeNull();
    });
});
