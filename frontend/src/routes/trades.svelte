<script lang="ts">
    import Main from "$lib/components/Main.svelte";
    import TradeCardContainer from "$lib/components/TradeCardContainer.svelte";
    import TradeCard from "$lib/components/TradeCard.svelte";
    import { title } from "$lib/stores";
    import { onMount } from "svelte";
import { tradesSvc } from "$lib/axios";
import type { Trade } from "$lib/structures/trades";
import OfferInput from "$lib/components/OfferInput.svelte";

    $title = "Trades";

    let trades = [] as Trade[];

    const upd = async () => {
        const resp = await tradesSvc.get("/trades");
        //console.dir(resp)
        trades = resp.data as Trade[];
    }
    onMount(upd);
</script>

<Main>
    <h3 class="text-center">Trades</h3>
    <OfferInput></OfferInput>
    <TradeCardContainer>
        {#each trades as tradeInfo}
            <TradeCard {tradeInfo} on:delete={upd} />
        {/each}
    </TradeCardContainer>
</Main>
