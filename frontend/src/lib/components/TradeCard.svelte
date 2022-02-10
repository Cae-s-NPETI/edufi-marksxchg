<script lang="ts">
    import { tradesSvc } from "$lib/axios";
    import { studentId } from "$lib/stores";

    import type { Trade } from "$lib/structures/trades";
    import { PencilAlt, Trash } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import axios from "axios";
    import { createEventDispatcher } from "svelte";

    import { slide } from "svelte/transition";
    import OfferInput from "./OfferInput.svelte";

    export let tradeInfo: Trade;

    export let isExpanded = false;
    let editExpanded = false;

    const props = {};

    const dispatch = createEventDispatcher();

    let _studentId = $studentId;

    const status = {} as {
        type?: "success" | "error";
        msg: string;
    };

    function setStatus(statusOk: boolean, text: string) {
        status.type = statusOk ? "success" : "error";
        status.msg = text;
    }

    async function deleteTrade() {
        try {
            await tradesSvc.delete("/trades/" + tradeInfo.id, {
                headers: {
                    "student-id": _studentId,
                },
            });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setStatus(false, `${e.response.statusText}: ${e.response.data["message"]}`);
            } else {
                setStatus(false, `failed: ${e}`);
            }
            return;
        }

        dispatch("delete");
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
                <div class="flex-1">Author ID</div>
                <div class="flex px-3 f-semibold">
                    {tradeInfo.authorId}
                </div>
            </div>
            <div class="mt-1 flex items-center text-sm p-4">
                <div class="flex-1">Giving</div>
                <div class="flex px-3 f-semibold">
                    {tradeInfo.offerTokenQuantity}
                    {tradeInfo.offerTokenType}
                </div>
            </div>
            <div class="mt-1 flex items-center text-sm p-4">
                <div class="flex-1">For</div>
                <div class="flex px-3 f-semibold">
                    {tradeInfo.returnTokenQuantity}
                    {tradeInfo.returnTokenType}
                </div>
            </div>
            <div class="mt-1 flex items-center text-sm p-4">
                <div class="flex-1">Message</div>
                <div class="flex px-3 f-semibold">
                    {tradeInfo.message}
                </div>
            </div>
            <div class="mt-1 flex items-center text-sm p-4">
                <div class="flex-1">Modified at</div>
                <div class="flex px-3 f-semibold text-right">
                    {new Date(tradeInfo.dateModified)}
                </div>
            </div>
        </div>

        {#if isExpanded}
            <hr class="w-9/12 m-auto site-border-subtle" />
            <!-- breaking to the next row -->
            <div class="flex flex-col p-3" transition:slide|local={{ duration: 200 }}>
                <button
                    on:click={() => {
                        editExpanded = !editExpanded;
                    }}
                >
                    <Icon src={PencilAlt} class="inline h-4 w-4" />
                    [edit]
                </button>
                <button on:click={deleteTrade}>
                    <Icon src={Trash} class="inline h-4 w-4" />
                    [delete]</button
                >
            </div>
            {#if editExpanded}
                <div class="my-4" transition:slide|local={{ duration: 200 }}>
                    <OfferInput on:submitted type="modify" modifyId={tradeInfo.id} />
                </div>
            {/if}
            {#if status.type != null}
                <div class="text-red-500 flex flex-wrap px-3 mb-2 justify-center">
                    {status.msg}
                </div>
            {/if}
        {/if}
    </div>
</div>
