<script lang="ts">
import type { Trade } from "$lib/structures/trades";

    import { slide } from "svelte/transition";

    export let tradeInfo: Trade;

    export let isExpanded = false;

    const props = {

    }
</script>

<!-- Style adapted from https://tailwindcomponents.com/component/full-responsive-video-cards (by amirrahman132132) -->

<!-- Defines the grid -->
<div class="mb-10 m-2">
    <!-- The actual card -->
    <div
        class="shadow-lg rounded overflow-hidden border-gray-800 site-bg-secondary hover:shadow-border-md hover:shadow-gray-400 transition hover:-translate-y-0.5"
    >
        <!-- Clickable container -->
        <div
            type="link"
            class="cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"
            aria-expanded={isExpanded}
            on:click={() => {
                isExpanded = !isExpanded;
            }}
        >

            <!-- props -->
            <div class="mt-1 flex items-center text-sm p-4">
                <div class="flex-1">
                    Author ID
                </div>
                <div class="flex px-3 f-semibold">
                    {tradeInfo.authorId}
                </div>
            </div>
            <div class="mt-1 flex items-center text-sm p-4">
                <div class="flex-1">
                    Author ID
                </div>
                <div class="flex px-3 f-semibold">
                    {tradeInfo.authorId}
                </div>
            </div>
        </div>

        {#if isExpanded}
            <hr class="w-9/12 m-auto site-border-subtle" />
            <!-- breaking to the next row -->
            <div class="flex flex-col p-3" transition:slide|local={{ duration: 200 }}>
                edit delete
            </div>
        {/if}
    </div>
</div>
