<script lang="ts">
    import { THEME_STORAGE_KEY } from "../lib/storage";

    const LIGHT = "light";
    const DARK = "dark";

    // NOTE: existing behavior, locked in by tests/ThemeToggle.test.ts —
    // a missing localStorage entry coerces to '' and short-circuits the
    // system-preference fallback. Preserved during the Svelte 5 migration.
    const resolveInitialTheme = (): string =>
        localStorage.getItem(THEME_STORAGE_KEY) ?? "";

    let currentTheme = $state(resolveInitialTheme());

    const icon = $derived(currentTheme === DARK ? "🌞" : "🌚");
    const ariaLabel = $derived(
        icon === "🌚" ? "Change to dark theme." : "Change to light theme.",
    );

    $effect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
    });

    const handleClick = () => {
        const next = currentTheme === DARK ? LIGHT : DARK;
        localStorage.setItem(THEME_STORAGE_KEY, next);
        currentTheme = next;
    };
</script>

<input
    type="button"
    data-theme-toggle
    aria-label={ariaLabel}
    value={icon}
    onclick={handleClick}
/>
