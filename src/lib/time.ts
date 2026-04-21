export const MILLISECONDS_PER_MINUTE = 60000;

export type LogEntry = {
    key: string;
    value: unknown;
};

export const minuteKeyFromTimestamp = (timestamp: number): string =>
    `${Math.floor(timestamp / MILLISECONDS_PER_MINUTE)}`;

export const formatLogTimeCell = (key: number | string): string => {
    const numericKey = typeof key === 'string' ? Number(key) : key;
    const reconstructed = new Date(numericKey * MILLISECONDS_PER_MINUTE);
    const hours = reconstructed.getHours();
    const minutes = reconstructed.getMinutes();
    const padding = `${minutes}`.length === 1 ? '0' : '';
    return `${hours}:${padding}${minutes}`;
};

export const formatDurationCell = (
    current: number | string,
    previous: number | string | null | undefined,
): string => {
    if (previous == null) return 'N/A';
    const currentNumeric = typeof current === 'string' ? Number(current) : current;
    const previousNumeric = typeof previous === 'string' ? Number(previous) : previous;
    return `${currentNumeric - previousNumeric} min`;
};

export const toSortedEntries = (data: Record<string, unknown>): LogEntry[] =>
    Object.entries(data)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => Number(a.key) - Number(b.key));

export const normalizeActivity = (value: string | null | undefined): string =>
    (value ?? '').toLowerCase().trim();
