<script lang="ts">
    import { isDarkMode } from "$lib/stores";
    import { Moon, Sun } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
</script>

<button
    type="button"
    class="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary-lighter focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    on:click={() => ($isDarkMode = !$isDarkMode)}
>
    <span class="sr-only">Toggle dark mode</span>
    {#if !$isDarkMode}
        <Icon src={Sun} class="block h-6 w-6" solid ariaHidden />
    {:else}
        <Icon src={Moon} class="block h-6 w-6" solid ariaHidden />
    {/if}
</button>
