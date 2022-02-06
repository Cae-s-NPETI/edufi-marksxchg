<script lang="ts">
    import Main from "$lib/components/Main.svelte";
    import TradeCardContainer from "$lib/components/TradeCardContainer.svelte";
    import TradeCard from "$lib/components/TradeCard.svelte";
    import { title } from "$lib/stores";
    import { onMount } from "svelte";
import { tradesSvc } from "$lib/axios";
import type { Trade } from "$lib/structures/trades";

    $title = "Trades";

    let trades = [] as Trade[];

    onMount(async () => {
        const resp = await tradesSvc.get("/trades");
        //console.dir(resp)
        trades = resp.data as Trade[];
    });
</script>

<Main>
    <h3 class="text-center">Trades</h3>
    <TradeCardContainer>
        {#each trades as tradeInfo}
            <TradeCard {tradeInfo} />
        {/each}
    </TradeCardContainer>
</Main>
