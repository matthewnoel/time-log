export const THEME_STORAGE_KEY = 'theme';

export const getActivityData = (
    storage: Storage = window.localStorage,
): Record<string, string> => {
    const data: Record<string, string> = {};
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key == null || key === THEME_STORAGE_KEY) continue;
        const value = storage.getItem(key);
        if (value == null) continue;
        data[key] = value;
    }
    return data;
};

export const clearActivityDataPreservingTheme = (
    storage: Storage = window.localStorage,
): void => {
    const theme = storage.getItem(THEME_STORAGE_KEY) ?? '';
    storage.clear();
    storage.setItem(THEME_STORAGE_KEY, theme);
};
