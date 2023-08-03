<script>
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";

    const MILLISECONDS_TO_MINUTES_MAGIC_NUMBER = 60000;

    const getDataFromStorage = () => Object.assign({}, window.localStorage);
    const updateCurrentData = () => currentData = getDataFromStorage();
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
        window.localStorage.setItem(key, value);
        updateCurrentData();
    };
    const formatLogTimeCell = (key) => {
        const reconstructed = new Date(
            key * MILLISECONDS_TO_MINUTES_MAGIC_NUMBER
        );
        const hours = reconstructed.getHours();
        const minutes = reconstructed.getMinutes();
        const padding = (`${minutes}`.length === 1) ? 0 : '';
        return `${hours}:${padding}${minutes}`;
    };
    const formatDurationCell = (current, previous) => (previous == null) ? 'N/A' : `${current - previous} min`;

    let value;
    let currentData = getDataFromStorage();
    $: entries = Object.entries(currentData).map((e) => ({ key: e[0], value: e[1] }));
</script>

<SvelteToast />
<form action="" on:submit|preventDefault={handleActivityFormSubmit}>
    <input type="text" bind:value name="Activity" id="activity" />
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

<style>
    input {
        display: block;
        margin: 0.5rem auto;
    }
    table {
        margin: auto;
    }
</style>
