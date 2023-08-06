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
<h1>Time Tracker</h1>
<div class="form-wrapper">
    <form action="" on:submit|preventDefault={handleActivityFormSubmit}>
        <div>
            <label for="activity">&nbsp;Activity:</label>
            <br>
            <input
                type="text"
                bind:value
                name="Activity"
                id="activity"
                use:useEventListeners
            />
        </div>
        <input type="submit" disabled={!value} value="Log Time" />
    </form>
</div>
{#if entries.length > 1}
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
                <td>{formatLogTimeCell(entries[entries.length - 1].key)}</td>
                <td>{formatDurationCell(entries[entries.length - 1].key, entries[entries.length - 2].key)}</td>
                <td>{entries[entries.length - 1].value}</td>
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
{/if}
{#if !isActivityInputInFocus}
    <input
        class="floating"
        type="button"
        value="🖋️"
        on:click={handleGoToInputClick}
    />
{/if}
<a href="https://raw.githubusercontent.com/matthewnoel/CO2T4/main/third-party-licenses.txt" target="_blank">Third-Party Licenses</a>

<style>
    h1, h2 {
        text-align: center;
    }
    input[type=button] {
        display: block;
        margin: 0.5rem auto;
    }
    input[type=submit] {
        margin: 0.5rem auto;
    }
    input[type=text] {
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
        border: 1px solid black;
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
</style>
