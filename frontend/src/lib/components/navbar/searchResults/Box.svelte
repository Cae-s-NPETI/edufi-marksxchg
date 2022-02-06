<script lang="ts">
    // TODO
    import Result from "./Result.svelte";

    export let query: string;

    let totalChoices = 2;
    let choice = 0;
    let results = [];

    export function moveUp() {
        if (choice <= 0) return;
        choice -= 1;
    }

    export function moveDown() {
        if (choice >= totalChoices) {
            choice = 0;
            return;
        }
        choice += 1;
    }

    export function choose() {}
</script>

<div
    class="p-3 bg-brown-700 text-gray-200 shadow-lg rounded text-sm"
    on:keydown={() => console.log("tese")}
>
    <ul class="list-result space-y-4 items-center" role="listbox">
        <li>
            <div class="inline-block rounded-lg bg-primary-lighter px-3 text-xs">Search Map</div>
            {query}
        </li>
        <li>
            <div class="inline-block rounded-lg bg-primary-lighter px-3 text-xs">Search Author</div>
            {query}
        </li>
        {#each results as result}
            <li>
                <div class="inline-block rounded-lg bg-primary-lighter px-3 text-xs">Map</div>
                {query}
            </li>
        {/each}
    </ul>
</div>

<style lang="postcss">
    .list-result > li {
        @apply truncate items-center;
    }
</style>
