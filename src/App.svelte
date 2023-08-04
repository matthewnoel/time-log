<script>
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";

    const MILLISECONDS_TO_MINUTES_MAGIC_NUMBER = 60000;

    const getDataFromStorage = () => Object.assign({}, window.localStorage);
    const updateCurrentData = () => (currentData = getDataFromStorage());
    const handleNewDayClick = () => {
        window.localStorage.clear();
        updateCurrentData();
        toast.push(`Cleared yesterday's activities!`);
    };
    const handleActivityFormSubmit = () => {
        const key = `${Math.floor(
            Date.now() / MILLISECONDS_TO_MINUTES_MAGIC_NUMBER
        )}`;
        if (window.localStorage.getItem(key) != null) {
            toast.push(`Cannot update twice per-minute.`);
            return;
        }
        const previousNormalizedValue = entries[entries.length - 1]?.value
            ?.toLowerCase()
            .trim();
        const normalizedValue = value.toLowerCase().trim();
        if (previousNormalizedValue == normalizedValue) {
            window.localStorage.removeItem(entries[entries.length - 1].key);
        }
        window.localStorage.setItem(key, value);
        value = "";
        updateCurrentData();
    };
    const handleGoToInputClick = () => {
        const matches = document.querySelectorAll("input[type=text]");
        if (matches.length < 1) return;
        matches[0].focus();
    };
    const formatLogTimeCell = (key) => {
        const reconstructed = new Date(
            key * MILLISECONDS_TO_MINUTES_MAGIC_NUMBER
        );
        const hours = reconstructed.getHours();
        const minutes = reconstructed.getMinutes();
        const padding = `${minutes}`.length === 1 ? 0 : "";
        return `${hours}:${padding}${minutes}`;
    };
    const formatDurationCell = (current, previous) =>
        previous == null ? "N/A" : `${current - previous} min`;
    const useEventListeners = (node) => {
        const handleFocus = (event) => {
            isActivityInputInFocus = true;
            node && typeof node.select === "function" && node.select();
        };
        const handleBlur = (event) => {
            isActivityInputInFocus = false;
        };
        node.addEventListener("focus", handleFocus);
        node.addEventListener("blur", handleBlur);
        return {
            destroy() {
                node.removeEventListener("focus", handleFocus);
                node.removeEventListener("blur", handleBlur);
            },
        };
    };

    let value;
    let isActivityInputInFocus;
    let currentData = getDataFromStorage();
    $: entries = Object.entries(currentData)
        .map((e) => ({
            key: e[0],
            value: e[1],
        }))
        .sort((a, b) => a.key - b.key);
</script>

<SvelteToast />
<form action="" on:submit|preventDefault={handleActivityFormSubmit}>
    <input
        type="text"
        bind:value
        name="Activity"
        id="activity"
        use:useEventListeners
    />
    <input type="submit" disabled={!value} value="Log Time" />
</form>
<table>
    <thead>
        <tr>
            <th colspan="1">Log Time</th>
            <th colspan="1">Duration</th>
            <th colspan="1">Activity</th>
        </tr>
    </thead>
    <tbody>
        {#each entries as { key, value }, i}
            <tr>
                <td>{formatLogTimeCell(key)}</td>
                <td>{formatDurationCell(key, entries[i - 1]?.key)}</td>
                <td>{value}</td>
            </tr>
        {/each}
    </tbody>
</table>
<input type="button" value="New Day" on:click={handleNewDayClick} />
{#if !isActivityInputInFocus}
    <input
        class="floating"
        type="button"
        value="🖋️"
        on:click={handleGoToInputClick}
    />
{/if}

<style>
    input {
        display: block;
        margin: 0.5rem auto;
    }
    table {
        margin: auto;
    }
    .floating {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        font-size: 2em;
    }
</style>
