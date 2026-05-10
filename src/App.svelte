<script lang="ts">
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";
    import ThemeToggle from "./components/ThemeToggle.svelte";
    import {
        formatDurationCell,
        formatLogTimeCell,
        minuteKeyFromTimestamp,
        normalizeActivity,
        toSortedEntries,
    } from "./lib/time";
    import {
        clearActivityDataPreservingTheme,
        getActivityData,
    } from "./lib/storage";

    let value = $state("");
    let isActivityInputInFocus = $state(false);
    let currentData = $state(getActivityData());
    let activityInput: HTMLInputElement | null = $state(null);

    const entries = $derived(toSortedEntries(currentData));
    const latest = $derived(entries[entries.length - 1]);
    const previous = $derived(entries[entries.length - 2]);

    const refresh = () => (currentData = getActivityData());

    const handleNewDayClick = () => {
        clearActivityDataPreservingTheme();
        refresh();
        toast.push("Cleared yesterday's activities!");
    };

    const handleActivityFormSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        const key = minuteKeyFromTimestamp(Date.now());
        if (window.localStorage.getItem(key) != null) {
            toast.push("Cannot update twice per-minute.");
            return;
        }
        if (!value.trim()) {
            toast.push("Activity cannot be empty.");
            return;
        }
        if (
            latest != null &&
            normalizeActivity(latest.value as string) ===
                normalizeActivity(value)
        ) {
            window.localStorage.removeItem(latest.key);
        }
        window.localStorage.setItem(key, value);
        value = "";
        refresh();
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
        <input type="submit" disabled={!value.trim()} value="Log Time" />
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
<div id="theme-wrapper">
    <ThemeToggle />
</div>
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
    input[type="button"] {
        display: block;
        margin: 0.5rem auto;
    }
    input[type="submit"] {
        margin: 0.5rem auto;
    }
    input[type="text"] {
        display: block;
        margin: auto;
        width: 95%;
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
    .floating {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        font-size: 2em;
    }
    #theme-wrapper {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
    }
</style>
