import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App.svelte';
import { MILLISECONDS_PER_MINUTE, formatLogTimeCell } from '../src/lib/time';
import { THEME_STORAGE_KEY } from '../src/lib/storage';

// Freeze time at a predictable minute so every test gets deterministic
// formatted timestamps regardless of the real clock.
const BASE_DATE = new Date(2024, 0, 2, 9, 30, 0, 0);
const baseMinute = Math.floor(BASE_DATE.getTime() / MILLISECONDS_PER_MINUTE);

const seedEntries = (entries: Array<{ minutesAgo?: number; minutesAfter?: number; key?: number; value: string }>) => {
    for (const entry of entries) {
        let key: number;
        if (entry.key != null) key = entry.key;
        else if (entry.minutesAgo != null) key = baseMinute - entry.minutesAgo;
        else if (entry.minutesAfter != null) key = baseMinute + entry.minutesAfter;
        else key = baseMinute;
        window.localStorage.setItem(`${key}`, entry.value);
    }
};

const getSummaryTable = () => {
    const heading = screen.getByRole('heading', { name: 'Full Summary' });
    return heading.nextElementSibling as HTMLTableElement;
};

const getRows = (table: HTMLTableElement) =>
    within(table).getAllByRole('row').slice(1); // skip header row

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(BASE_DATE);
});

afterEach(() => {
    vi.useRealTimers();
});

describe('App – initial rendering', () => {
    it('shows the app heading and activity form', () => {
        render(App);
        expect(
            screen.getByRole('heading', { level: 1, name: 'Time Log' }),
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/Activity/)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Log Time' }),
        ).toBeDisabled();
    });

    it('hides the Latest Log and Full Summary tables when no data exists', () => {
        render(App);
        expect(
            screen.queryByRole('heading', { name: 'Latest Log' }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: 'Full Summary' }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: 'New Day' }),
        ).not.toBeInTheDocument();
    });

    it('does not render the theme key as an activity', () => {
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        seedEntries([{ minutesAgo: 10, value: 'coding' }]);
        render(App);
        // theme should never appear as a row value
        expect(screen.queryByText('dark')).not.toBeInTheDocument();
        expect(screen.getByText('coding')).toBeInTheDocument();
    });

    it('ignores the theme key when deciding whether to show tables', () => {
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
        render(App);
        expect(
            screen.queryByRole('heading', { name: 'Full Summary' }),
        ).not.toBeInTheDocument();
    });
});

describe('App – rendering existing entries', () => {
    it('renders a single-entry summary without a Latest Log section', () => {
        seedEntries([{ minutesAgo: 15, value: 'email' }]);
        render(App);

        expect(
            screen.queryByRole('heading', { name: 'Latest Log' }),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Full Summary' }),
        ).toBeInTheDocument();

        const table = getSummaryTable();
        const rows = getRows(table);
        expect(rows).toHaveLength(1);
        const cells = within(rows[0]).getAllByRole('cell');
        expect(cells[0]).toHaveTextContent(
            formatLogTimeCell(baseMinute - 15),
        );
        expect(cells[1]).toHaveTextContent('N/A');
        expect(cells[2]).toHaveTextContent('email');
    });

    it('shows Latest Log + Full Summary when there are 2+ entries', () => {
        seedEntries([
            { minutesAgo: 30, value: 'standup' },
            { minutesAgo: 10, value: 'coding' },
        ]);
        render(App);

        const latestHeading = screen.getByRole('heading', {
            name: 'Latest Log',
        });
        const latestTable = latestHeading.nextElementSibling as HTMLTableElement;
        const latestRow = within(latestTable).getAllByRole('row')[1];
        const latestCells = within(latestRow).getAllByRole('cell');
        expect(latestCells[0]).toHaveTextContent(
            formatLogTimeCell(baseMinute - 10),
        );
        expect(latestCells[1]).toHaveTextContent('20 min');
        expect(latestCells[2]).toHaveTextContent('coding');

        const rows = getRows(getSummaryTable());
        expect(rows).toHaveLength(2);
        expect(
            within(rows[0]).getAllByRole('cell')[2],
        ).toHaveTextContent('standup');
        expect(
            within(rows[0]).getAllByRole('cell')[1],
        ).toHaveTextContent('N/A');
        expect(
            within(rows[1]).getAllByRole('cell')[1],
        ).toHaveTextContent('20 min');
    });

    it('sorts entries numerically, not lexicographically', () => {
        seedEntries([
            { key: 2, value: 'second' },
            { key: 10, value: 'tenth' },
            { key: 100, value: 'hundredth' },
        ]);
        render(App);
        const rows = getRows(getSummaryTable());
        const activities = rows.map(
            (row) => within(row).getAllByRole('cell')[2].textContent?.trim(),
        );
        expect(activities).toEqual(['second', 'tenth', 'hundredth']);
    });

    it('shows the New Day button only when there is at least one entry', () => {
        seedEntries([{ minutesAgo: 5, value: 'lunch' }]);
        render(App);
        expect(
            screen.getByRole('button', { name: 'New Day' }),
        ).toBeInTheDocument();
    });
});

describe('App – logging new activities', () => {
    it('stores the activity at the current minute key and clears the input', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(App);

        const input = screen.getByLabelText(/Activity/) as HTMLInputElement;
        await user.type(input, 'coding');
        await user.click(screen.getByRole('button', { name: 'Log Time' }));

        expect(window.localStorage.getItem(`${baseMinute}`)).toBe('coding');
        expect(input.value).toBe('');
        expect(screen.getByText('coding')).toBeInTheDocument();
    });

    it('enables and disables the submit button based on input content', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(App);

        const submit = screen.getByRole('button', { name: 'Log Time' });
        expect(submit).toBeDisabled();

        await user.type(screen.getByLabelText(/Activity/), 'work');
        expect(submit).toBeEnabled();
    });

    it('refuses a second log in the same minute and keeps the original value', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        seedEntries([{ key: baseMinute, value: 'coding' }]);
        render(App);

        const input = screen.getByLabelText(/Activity/) as HTMLInputElement;
        await user.type(input, 'something else');
        await user.click(screen.getByRole('button', { name: 'Log Time' }));

        expect(window.localStorage.getItem(`${baseMinute}`)).toBe('coding');
    });

    it('merges into the previous entry when the activity matches (case/whitespace-insensitive)', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        seedEntries([{ key: baseMinute - 5, value: 'coding' }]);
        render(App);

        await user.type(screen.getByLabelText(/Activity/), '  CODING  ');
        await user.click(screen.getByRole('button', { name: 'Log Time' }));

        // Previous entry removed, new entry keyed at current minute.
        expect(window.localStorage.getItem(`${baseMinute - 5}`)).toBeNull();
        expect(window.localStorage.getItem(`${baseMinute}`)).toBe(
            '  CODING  ',
        );
    });

    it('does not merge when the previous activity differs', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        seedEntries([{ key: baseMinute - 5, value: 'standup' }]);
        render(App);

        await user.type(screen.getByLabelText(/Activity/), 'coding');
        await user.click(screen.getByRole('button', { name: 'Log Time' }));

        expect(window.localStorage.getItem(`${baseMinute - 5}`)).toBe(
            'standup',
        );
        expect(window.localStorage.getItem(`${baseMinute}`)).toBe('coding');
    });
});

describe('App – new day reset', () => {
    it('clears activities but preserves the theme setting', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        seedEntries([
            { minutesAgo: 30, value: 'standup' },
            { minutesAgo: 10, value: 'coding' },
        ]);
        render(App);

        await user.click(screen.getByRole('button', { name: 'New Day' }));

        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
        expect(window.localStorage.length).toBe(1);
        expect(
            screen.queryByRole('heading', { name: 'Full Summary' }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: 'New Day' }),
        ).not.toBeInTheDocument();
    });
});

describe('App – floating pen button', () => {
    it('is visible when the activity input is not focused', () => {
        render(App);
        expect(
            screen.getByRole('button', { name: '🖋️' }),
        ).toBeInTheDocument();
    });

    it('focuses the activity input on click', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(App);

        const input = screen.getByLabelText(/Activity/);
        expect(input).not.toHaveFocus();

        await user.click(screen.getByRole('button', { name: '🖋️' }));
        expect(input).toHaveFocus();
    });

    it('hides when the activity input gains focus', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(App);

        await user.click(screen.getByLabelText(/Activity/));
        expect(
            screen.queryByRole('button', { name: '🖋️' }),
        ).not.toBeInTheDocument();
    });
});

describe('App – Ibid button', () => {
    it('is hidden when there are no entries', () => {
        render(App);
        expect(
            screen.queryByRole('button', { name: /Repeat last activity/ }),
        ).not.toBeInTheDocument();
    });

    it('is shown when at least one entry exists', () => {
        seedEntries([{ minutesAgo: 5, value: 'golf' }]);
        render(App);
        expect(
            screen.getByRole('button', {
                name: 'Repeat last activity: golf',
            }),
        ).toBeInTheDocument();
    });

    it('resubmits the latest activity at the current minute, coalescing the previous entry', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        // Latest entry is 'golf' from 15 minutes ago.
        seedEntries([{ minutesAgo: 15, value: 'golf' }]);
        render(App);

        await user.click(
            screen.getByRole('button', { name: /Repeat last activity/ }),
        );

        // Previous 'golf' key removed (coalesced into the new one).
        expect(window.localStorage.getItem(`${baseMinute - 15}`)).toBeNull();
        // New entry written at the current minute with the same value.
        expect(window.localStorage.getItem(`${baseMinute}`)).toBe('golf');
    });

    it('extends the duration of the latest activity (Ibid scenario)', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        // Original anchor 30 min before now; 'golf' submitted 15 min before now.
        seedEntries([
            { minutesAgo: 30, value: 'work' },
            { minutesAgo: 15, value: 'golf' },
        ]);
        render(App);

        // Pre-Ibid: latest 'golf' shows a 15 min duration.
        const latestHeading = screen.getByRole('heading', { name: 'Latest Log' });
        let latestRow = within(
            latestHeading.nextElementSibling as HTMLTableElement,
        ).getAllByRole('row')[1];
        expect(within(latestRow).getAllByRole('cell')[1]).toHaveTextContent(
            '15 min',
        );

        await user.click(
            screen.getByRole('button', { name: /Repeat last activity/ }),
        );

        // After Ibid: the 'golf' entry has been moved to the current minute,
        // so its duration is now measured against 'work' 30 min ago.
        latestRow = within(
            latestHeading.nextElementSibling as HTMLTableElement,
        ).getAllByRole('row')[1];
        const cells = within(latestRow).getAllByRole('cell');
        expect(cells[0]).toHaveTextContent(formatLogTimeCell(baseMinute));
        expect(cells[1]).toHaveTextContent('30 min');
        expect(cells[2]).toHaveTextContent('golf');
    });

    it('refuses to act when the current minute already has an entry', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        seedEntries([
            { minutesAgo: 10, value: 'standup' },
            { key: baseMinute, value: 'golf' },
        ]);
        render(App);

        await user.click(
            screen.getByRole('button', { name: /Repeat last activity/ }),
        );

        // Nothing changed.
        expect(window.localStorage.getItem(`${baseMinute - 10}`)).toBe(
            'standup',
        );
        expect(window.localStorage.getItem(`${baseMinute}`)).toBe('golf');
    });
});

describe('App – footer links', () => {
    it('exposes the source code and third-party licenses links', () => {
        render(App);
        const codeLink = screen.getByRole('link', { name: 'The Code' });
        expect(codeLink).toHaveAttribute(
            'href',
            'https://github.com/matthewnoel/time-log',
        );
        const licensesLink = screen.getByRole('link', {
            name: 'Third-Party Licenses',
        });
        expect(licensesLink).toHaveAttribute(
            'href',
            'https://raw.githubusercontent.com/matthewnoel/time-log/main/third-party-licenses.txt',
        );
    });
});
