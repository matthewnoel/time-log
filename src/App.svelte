<script lang="ts">
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";
    import {
        formatDurationCell,
        formatLogTimeCell,
        minuteKeyFromTimestamp,
        normalizeActivity,
        toSortedEntries,
    } from "./lib/time";
    import {
        clearActivityData,
        getActivityData,
        LEGACY_THEME_STORAGE_KEY,
    } from "./lib/storage";

    // One-time cleanup of the key left behind by the removed dark-mode
    // feature, before the initial getActivityData() read below.
    window.localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);

    let value = $state("");
    let isActivityInputInFocus = $state(false);
    let currentData = $state(getActivityData());
    let activityInput: HTMLInputElement | null = $state(null);

    const entries = $derived(toSortedEntries(currentData));
    const latest = $derived(entries[entries.length - 1]);
    const previous = $derived(entries[entries.length - 2]);

    const refresh = () => (currentData = getActivityData());

    const handleNewDayClick = () => {
        clearActivityData();
        refresh();
        toast.push("Cleared yesterday's activities!");
    };

    const submitActivity = (activityValue: string): boolean => {
        const key = minuteKeyFromTimestamp(Date.now());
        if (window.localStorage.getItem(key) != null) {
            toast.push("Cannot update twice per-minute.");
            return false;
        }
        if (!activityValue.trim()) {
            toast.push("Activity cannot be empty.");
            return false;
        }
        if (
            latest != null &&
            normalizeActivity(latest.value as string) ===
                normalizeActivity(activityValue)
        ) {
            window.localStorage.removeItem(latest.key);
        }
        window.localStorage.setItem(key, activityValue);
        refresh();
        return true;
    };

    const handleActivityFormSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        if (submitActivity(value)) value = "";
    };

    const handleIbidClick = () => {
        if (latest == null) return;
        submitActivity(latest.value as string);
    };

    const handleGoToInputClick = () => activityInput?.focus();

    const handleActivityFocus = (event: FocusEvent) => {
        isActivityInputInFocus = true;
        (event.currentTarget as HTMLInputElement).select();
    };

    const handleActivityBlur = () => {
        isActivityInputInFocus = false;
    };
</script>

<SvelteToast />
<h1>Time Log</h1>
<div class="form-wrapper">
    <form onsubmit={handleActivityFormSubmit}>
        <div>
            <label for="activity">&nbsp;Activity:</label>
            <br />
            <input
                type="text"
                bind:value
                bind:this={activityInput}
                name="Activity"
                id="activity"
                onfocus={handleActivityFocus}
                onblur={handleActivityBlur}
            />
        </div>
        <div class="button-row">
            {#if latest != null}
                <input
                    type="button"
                    value="Ibid"
                    aria-label={`Repeat last activity: ${latest.value}`}
                    onclick={handleIbidClick}
                />
            {/if}
            <input type="submit" disabled={!value.trim()} value="Log Time" />
        </div>
    </form>
</div>
{#if entries.length > 1 && latest && previous}
    <h2>Latest Log</h2>
    <table>
        <thead>
            <tr>
                <th colspan="1">Log Time</th>
                <th colspan="1">Duration</th>
                <th colspan="1">Activity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{formatLogTimeCell(latest.key)}</td>
                <td>{formatDurationCell(latest.key, previous.key)}</td>
                <td>{latest.value}</td>
            </tr>
        </tbody>
    </table>
{/if}
{#if entries.length > 0}
    <h2>Full Summary</h2>
    <table>
        <thead>
            <tr>
                <th colspan="1">Log Time</th>
                <th colspan="1">Duration</th>
                <th colspan="1">Activity</th>
            </tr>
        </thead>
        <tbody>
            {#each entries as entry, i (entry.key)}
                <tr>
                    <td>{formatLogTimeCell(entry.key)}</td>
                    <td>{formatDurationCell(entry.key, entries[i - 1]?.key)}</td>
                    <td>{entry.value}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    <input type="button" value="New Day" onclick={handleNewDayClick} />
{/if}
{#if !isActivityInputInFocus}
    <input
        class="floating"
        type="button"
        value="🖋️"
        onclick={handleGoToInputClick}
    />
{/if}
<footer>
    <a href="https://github.com/matthewnoel/time-log" target="_blank"
        >The Code</a
    >
    <a
        href="https://raw.githubusercontent.com/matthewnoel/time-log/main/third-party-licenses.txt"
        target="_blank">Third-Party Licenses</a
    >
</footer>

<style>
    h1,
    h2 {
        text-align: center;
    }
    input[type="button"],
    input[type="submit"] {
        appearance: none;
        font: inherit;
        background-color: var(--color-bg);
        color: var(--color-fg);
        border: 1px solid var(--color-fg);
        border-radius: 3px;
        padding: 0.35rem 0.9rem;
        cursor: pointer;
    }
    input[type="button"]:hover,
    input[type="submit"]:hover:enabled,
    input[type="button"]:active,
    input[type="submit"]:active:enabled {
        background-color: var(--color-fg);
        color: var(--color-bg);
    }
    input[type="button"]:focus-visible,
    input[type="submit"]:focus-visible,
    input[type="text"]:focus-visible {
        outline: 2px solid var(--color-fg);
        outline-offset: 1px;
    }
    input[type="button"] {
        display: block;
        margin: 0.5rem auto;
    }
    input[type="submit"] {
        margin: 0.5rem auto;
        background-color: var(--color-fg);
        color: var(--color-bg);
    }
    input[type="button"]:disabled,
    input[type="submit"]:disabled {
        background-color: var(--color-bg);
        color: #767676;
        border-color: #767676;
        background-color: #dcdcdc;
        cursor: default;
    }
    input[type="text"] {
        appearance: none;
        font: inherit;
        display: block;
        margin: auto;
        width: 95%;
        box-sizing: border-box;
        background-color: var(--color-bg);
        color: var(--color-fg);
        border: 1px solid var(--color-fg);
        border-radius: 3px;
        padding: 0.4rem 0.5rem;
    }
    table {
        margin: auto;
    }
    form {
        display: inline-block;
        padding: 0;
        border: 1px solid var(--color-fg);
        border-radius: 3px;
        width: 100%;
        max-width: 20rem;
    }
    form > div {
        text-align: left;
        padding: 0.5rem;
    }
    a {
        text-align: center;
        display: block;
    }
    footer {
        margin: 2rem 0 1rem 0;
    }
    .form-wrapper {
        text-align: center;
    }
    .button-row {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }
    .button-row input[type="button"],
    .button-row input[type="submit"] {
        display: inline-block;
        margin: 0;
    }
    input[type="button"].floating {
        background-color: var(--color-fg);
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        font-size: 2em;
        width: 3.5rem;
        height: 3.5rem;
        padding: 0;
        border-radius: 50%;
        line-height: 1;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
</style>
