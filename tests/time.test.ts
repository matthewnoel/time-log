import { describe, expect, it } from 'vitest';
import {
    MILLISECONDS_PER_MINUTE,
    formatDurationCell,
    formatLogTimeCell,
    minuteKeyFromTimestamp,
    normalizeActivity,
    toSortedEntries,
} from '../src/lib/time';

describe('MILLISECONDS_PER_MINUTE', () => {
    it('is exactly 60,000 so stored keys remain stable across versions', () => {
        expect(MILLISECONDS_PER_MINUTE).toBe(60_000);
    });
});

describe('minuteKeyFromTimestamp', () => {
    it('floors the timestamp to a whole-minute key', () => {
        expect(minuteKeyFromTimestamp(60_000)).toBe('1');
        expect(minuteKeyFromTimestamp(119_999)).toBe('1');
        expect(minuteKeyFromTimestamp(120_000)).toBe('2');
    });

    it('returns a string so it can be used as a localStorage key directly', () => {
        expect(typeof minuteKeyFromTimestamp(Date.now())).toBe('string');
    });

    it('handles the epoch', () => {
        expect(minuteKeyFromTimestamp(0)).toBe('0');
    });
});

describe('formatLogTimeCell', () => {
    const minuteKey = (hours: number, minutes: number) => {
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return Math.floor(date.getTime() / MILLISECONDS_PER_MINUTE);
    };

    it('zero-pads single-digit minutes', () => {
        expect(formatLogTimeCell(minuteKey(9, 5))).toBe('9:05');
    });

    it('does not pad two-digit minutes', () => {
        expect(formatLogTimeCell(minuteKey(9, 45))).toBe('9:45');
    });

    it('renders midnight as 0:00', () => {
        expect(formatLogTimeCell(minuteKey(0, 0))).toBe('0:00');
    });

    it('renders 11:59 correctly', () => {
        expect(formatLogTimeCell(minuteKey(11, 59))).toBe('11:59');
    });

    it('accepts stringified keys (as stored in localStorage)', () => {
        const key = `${minuteKey(14, 7)}`;
        expect(formatLogTimeCell(key)).toBe('14:07');
    });
});

describe('formatDurationCell', () => {
    it('returns N/A when no previous entry exists', () => {
        expect(formatDurationCell(100, null)).toBe('N/A');
        expect(formatDurationCell(100, undefined)).toBe('N/A');
    });

    it('returns the minute difference in "N min" format', () => {
        expect(formatDurationCell(105, 100)).toBe('5 min');
    });

    it('supports stringified keys', () => {
        expect(formatDurationCell('150', '100')).toBe('50 min');
    });

    it('renders zero-minute differences', () => {
        expect(formatDurationCell(100, 100)).toBe('0 min');
    });

    it('renders negative differences without crashing', () => {
        // Defensive: if entries somehow get out of order, we should still render.
        expect(formatDurationCell(100, 105)).toBe('-5 min');
    });

    it('formats whole-hour durations without a minutes part', () => {
        expect(formatDurationCell(60, 0)).toBe('1 hr');
        expect(formatDurationCell(120, 0)).toBe('2 hr');
    });

    it('formats hour + minute durations', () => {
        expect(formatDurationCell(65, 0)).toBe('1 hr 5 min');
        expect(formatDurationCell(185, 0)).toBe('3 hr 5 min');
    });

    it('formats whole-day durations without hours or minutes', () => {
        expect(formatDurationCell(1440, 0)).toBe('1 day');
        expect(formatDurationCell(2880, 0)).toBe('2 day');
    });

    it('formats day + hour + minute durations', () => {
        expect(formatDurationCell(1505, 0)).toBe('1 day 1 hr 5 min');
    });

    it('skips zero-valued intermediate units', () => {
        expect(formatDurationCell(1445, 0)).toBe('1 day 5 min');
        expect(formatDurationCell(1500, 0)).toBe('1 day 1 hr');
    });

    it('keeps the negative sign on multi-unit durations', () => {
        expect(formatDurationCell(0, 1505)).toBe('-1 day 1 hr 5 min');
    });
});

describe('toSortedEntries', () => {
    it('sorts keys numerically rather than lexicographically', () => {
        const data = { '10': 'a', '2': 'b', '100': 'c' };
        expect(toSortedEntries(data).map((e) => e.key)).toEqual([
            '2',
            '10',
            '100',
        ]);
    });

    it('returns objects shaped { key, value }', () => {
        const data = { '1': 'hello' };
        expect(toSortedEntries(data)).toEqual([{ key: '1', value: 'hello' }]);
    });

    it('returns an empty array for empty data', () => {
        expect(toSortedEntries({})).toEqual([]);
    });
});

describe('normalizeActivity', () => {
    it('lowercases and trims', () => {
        expect(normalizeActivity('  Writing Code  ')).toBe('writing code');
    });

    it('handles null and undefined safely', () => {
        expect(normalizeActivity(null)).toBe('');
        expect(normalizeActivity(undefined)).toBe('');
    });

    it('treats visually identical strings as equal', () => {
        expect(normalizeActivity('EMAIL')).toBe(normalizeActivity(' email '));
    });
});
