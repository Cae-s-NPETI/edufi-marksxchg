<script lang="ts">
    import { tradesSvc } from "$lib/axios";
    import Main from "$lib/components/Main.svelte";
    import { title } from "$lib/stores";
    import type { OldTrade } from "$lib/structures/trades";
    import { ArrowLeft, SwitchHorizontal, UserCircle } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { onDestroy, onMount } from "svelte";
    import Time from "svelte-time";

    $title = "Trade History";

    let tradeHistory = [] as OldTrade[];

    const upd = async () => {
        try {
            const resp = await tradesSvc.get("/tradeHistory");
            //console.dir(resp)
            tradeHistory = resp.data as OldTrade[];
        } catch (e) {
            console.error(e);
        }
    };

    onMount(() => {
        upd();
        const interval = setInterval(upd, 5000);
        return () => {
            clearInterval(interval);
        };
    });

</script>

<Main>
    <h3 class="text-center">Trade History</h3>

    <!-- Credits: https://tailwindcomponents.com/component/feed-grid -->
    <div class="grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8">
        {#each tradeHistory as hInfo}
            <div class="max-w-xl mx-auto px-4 py-4 site-bg-secondary shadow-md rounded-lg w-5/12">
                <div class="py-2 flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center">
                        <Icon src={UserCircle} class="inline h-7 w-7" />
                        <p class="ml-2 text-base font-medium">Author ID {hInfo.tradeAuthor.authorId}</p>
                    </div>
                    <Icon src={ArrowLeft} class="inline h-4 w-4" />
                    <div class="flex flex-row items-center">
                        <Icon src={UserCircle} class="inline h-7 w-7" />
                        <p class="ml-2 text-base font-medium">
                            Fulfiller ID {hInfo.tradeFulfil.authorId}
                        </p>
                    </div>
                    <div class="flex flex-row items-center">
                        <p class="text-xs font-semibold text-gray-500">
                            <Time relative timestamp={hInfo.dateFulfilled} />
                        </p>
                    </div>
                </div>
                <div class="py-2">
                    <div>Fulfilled the trade:</div>
                    {hInfo.tradeAuthor.offerTokenQuantity}
                    {hInfo.tradeAuthor.offerTokenType}
                    <Icon src={SwitchHorizontal} class="inline h-4 w-4" />
                    {hInfo.tradeAuthor.returnTokenQuantity}
                    {hInfo.tradeAuthor.returnTokenType}
                </div>
            </div>
        {/each}
    </div>
</Main>
