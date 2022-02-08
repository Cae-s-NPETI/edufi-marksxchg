<script lang="ts">
    import { tradesSvc } from "$lib/axios";
    import Main from "$lib/components/Main.svelte";
    import OfferInput from "$lib/components/OfferInput.svelte";
    import TradeCard from "$lib/components/TradeCard.svelte";
    import TradeCardContainer from "$lib/components/TradeCardContainer.svelte";
    import { title } from "$lib/stores";
    import type { Trade } from "$lib/structures/trades";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    import { PlusCircle } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    $title = "Trades";

    let addExpanded = false;

    let trades = [] as Trade[];

    const upd = async () => {
        const resp = await tradesSvc.get("/trades");
        //console.dir(resp)
        trades = resp.data as Trade[];
    };
    onMount(upd);

    setInterval(upd, 5000);
</script>

<Main>
    <h3 class="text-center">Trades</h3>
    <button
        class="bg-gray-200 hover:bg-gray-100 text-grey-darkest font-bold py-2 px-4 my-2 rounded flex w-full items-center"
        on:click={() => {
            addExpanded = !addExpanded;
        }}
    >
        <Icon src={PlusCircle} class="mr-4  h-4 w-4" solid ariaHidden />
        <span>Add Trade</span>
    </button>

    {#if addExpanded}
        <div class="my-4" transition:slide><OfferInput type="add" /></div>
    {/if}
    <TradeCardContainer>
        {#each trades as tradeInfo}
            <TradeCard {tradeInfo} on:delete={upd} />
        {/each}
    </TradeCardContainer>
</Main>
