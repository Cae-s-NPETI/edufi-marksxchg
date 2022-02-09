<script lang="ts">
    import { tradesSvc } from "$lib/axios";
    import axios, { AxiosResponse } from "axios";
    import { createEventDispatcher } from "svelte";
    export let type: "add" | "modify";
    export let modifyId = null;

    type PartialTradeToken = { tokenType: string; quantity: number };
    interface PartialTradeParam {
        offerToken: PartialTradeToken;
        returnToken: PartialTradeToken;
        message?: string;
    }

    const dispatch = createEventDispatcher();

    let params = {
        offerToken: { quantity: 1 },
        returnToken: { quantity: 1 },
    } as PartialTradeParam;

    const status = {} as {
        type?: "success" | "error";
        msg: string;
    };

    function setStatus(statusOk: boolean, text: string) {
        status.type = statusOk ? "success" : "error";
        status.msg = text;
    }

    async function onSubmit() {
        let resp: AxiosResponse;
        try {
            switch (type) {
                case "add": {
                    resp = await tradesSvc.post("/trades", params);
                    break;
                }
                case "modify": {
                    resp = await tradesSvc.patch("/trades/" + modifyId, params);
                    break;
                }
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setStatus(false, `failed: ${e.response.data["description"]}`);
            } else {
                setStatus(false, `failed: ${e}`);
            }
            return;
        }

        dispatch("submitted");
        status.type = "success";
        status.msg = "Submitted!";

        params = {
            offerToken: { quantity: 1, tokenType: "OOAD" },
            returnToken: { quantity: 1, tokenType: "OOAD" },
        };
    }
</script>

<form class="mx-auto w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6 justify-center">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                Type
            </label>
            <div class="relative">
                <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    bind:value={params.offerToken.tokenType}
                >
                    <option>OOAD</option>
                    <option>WEB</option>
                    <option>MAD</option>
                </select>
            </div>
        </div>
        <div class="w-full md:w-1/3 px-3">
            <label
                class="block uppercase tracking-wide text-xs font-bold mb-2"
                for="grid-last-name"
            >
                Offer Quantity
            </label>
            <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="number"
                bind:value={params.offerToken.quantity}
            />
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6 justify-center">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                Type
            </label>
            <div class="relative">
                <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    bind:value={params.returnToken.tokenType}
                >
                    <option>OOAD</option>
                    <option>WEB</option>
                    <option>MAD</option>
                </select>
            </div>
        </div>
        <div class="w-full md:w-1/3 px-3">
            <label
                class="block uppercase tracking-wide text-xs font-bold mb-2"
                for="grid-last-name"
            >
                Return Quantity
            </label>
            <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="number"
                bind:value={params.returnToken.quantity}
            />
        </div>
    </div>
    {#if status.type != null}
        <div class="text-red-500 flex flex-wrap mb-2 justify-center">
            {status.msg}
        </div>
    {/if}
    <div class="flex items-center border-b border-teal-500 py-2 w-2/3 justify-center mx-auto">
        <input
            class="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Your message"
            bind:value={params.message}
        />
        <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            on:click={onSubmit}
        >
            Submit
        </button>
    </div>
</form>
