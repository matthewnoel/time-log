// Legacy key from the removed dark-mode feature. Kept only so a stale
// 'theme' entry left in localStorage is never rendered as an activity.
export const LEGACY_THEME_STORAGE_KEY = 'theme';

export const getActivityData = (
    storage: Storage = window.localStorage,
): Record<string, string> => {
    const data: Record<string, string> = {};
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key == null || key === LEGACY_THEME_STORAGE_KEY) continue;
        const value = storage.getItem(key);
        if (value == null) continue;
        data[key] = value;
    }
    return data;
};

export const clearActivityData = (
    storage: Storage = window.localStorage,
): void => {
    storage.clear();
};
