<script lang="ts">
    import { page } from "$app/stores";
    import { base } from "$app/paths";
    import { clickOutside } from "svelte-use-click-outside";
    import { slide } from "svelte/transition";
    import Container from "./Container.svelte";
    import HamburgerButton from "./navbar/HamburgerButton.svelte";
    import DarkModeButton from "./navbar/DarkModeButton.svelte";

    const navigation = [
        { name: "Home", path: "/" },
        { name: "Trades", path: "/trades" },
        { name: "Trade History", path: "/history" },
    ];

    /**
     * Whether the mobile navbar is open.
     */
    let isMobileOpen = false;
</script>

<nav class="bg-primary" use:clickOutside={() => (isMobileOpen = false)}>
    <Container>
        <div class="relative flex items-center justify-between h-16">
            <!-- Mobile menu button-->
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <HamburgerButton bind:isOpen={isMobileOpen} />
            </div>

            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a
                        href="{base}/"
                        class="text-white block px-3 py-2 rounded-md text-base font-medium"
                        aria-current="page"
                    >
                        Trades Xchange
                    </a>
                </div>

                <!-- Desktop menu -->
                <div class="hidden sm:flex sm:ml-6">
                    <div class="flex space-x-4 m-auto">
                        {#each navigation as { name, path }}
                            {#if $page.url.pathname === path}
                                <a
                                    href="{base}{path}"
                                    class="bg-primary-lighter text-white px-3 py-2 rounded-md text-sm font-medium"
                                    aria-current="page">{name}</a
                                >
                            {:else}
                                <a
                                    href="{base}{path}"
                                    class="text-gray-300 hover:bg-primary-lighter hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >{name}</a
                                >
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Night mode and  button -->
            <div
                class="absolute inset-y-0 right-0 flex flex-1 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3"
            >
                <!-- This is a free space -->
                <div class="ml-auto"></div>
                <DarkModeButton />
            </div>
        </div>
    </Container>

    <!-- Mobile menu, show/hide based on menu state. -->
    {#if isMobileOpen}
        <div class="sm:hidden" id="mobile-menu" transition:slide>
            <div class="px-2 pt-2 pb-3 space-y-1">
                {#each navigation as { name, path }}
                    {#if $page.url.pathname === path}
                        <a
                            href="{base}{path}"
                            class="bg-primary-lighter text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page">{name}</a
                        >
                    {:else}
                        <a
                            href="{base}{path}"
                            class="text-gray-300 hover:bg-primary-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >{name}</a
                        >
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</nav>
