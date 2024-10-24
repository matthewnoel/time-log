<script lang="ts">
    // ts-ignore
    const getTheme = ({ localStorageTheme: string = localStorageTheme, systemSettingDark: MediaQueryList = systemSettingDark }) => {
        if (localStorageTheme !== null) return localStorageTheme;
        if (systemSettingDark.matches) return dark;
        return light;
    };
    const update = (theme: string) => {
        value = theme === dark ? "🌞" : "🌚";
        (document.querySelector("html") as HTMLElement).setAttribute("data-theme", theme);
    };
    const handleClick = () => {
        const newTheme = currentThemeSetting === dark ? light : dark;
        localStorage.setItem("theme", newTheme);
        update(newTheme);
        currentThemeSetting = newTheme;
    };
    const light = "light";
    const dark = "dark";
    const localStorageTheme = localStorage.getItem("theme") ?? '';
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    let currentThemeSetting = getTheme({
        localStorageTheme,
        systemSettingDark,
    });
    let value = $state("🌞");
    update(currentThemeSetting);
</script>

<input
    type="button"
    data-theme-toggle
    aria-label={value === "🌚"
        ? "Change to dark theme."
        : "Change to light theme."}
    {value}
    onclick={handleClick}
/>
