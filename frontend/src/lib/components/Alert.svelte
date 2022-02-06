<script lang="ts">
    import { Ban, CheckCircle, Exclamation, InformationCircle, X } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { createEventDispatcher } from "svelte";

    /**
     * Whether the alert is dismissable.
     */
    export let dismissable = true;

    /**
     * Whether the alert should hide itself. You may switch this to `false` to implement a custom behavior
     * to remove the alert.
     * Effective only with dismissable = `true`.
     */
    export let autoDismiss = true;

    /**
     * The type of this alert.
     */
    export let type: keyof typeof types = "info";

    const dispatch = createEventDispatcher();
    const types = {
        info: {
            icon: InformationCircle,
            bg: "bg-blue-50",
            text: "text-blue-900",
        },
        success: {
            icon: CheckCircle,
            bg: "bg-green-50",
            text: "text-green-900",
        },
        warn: {
            icon: Exclamation,
            bg: "bg-yellow-50",
            text: "text-yellow-900",
        },
        error: {
            icon: Ban,
            bg: "bg-red-50",
            text: "text-red-900",
        },
    };

    let isShown = true;

    function onDismiss() {
        if (!dismissable) return;
        if (autoDismiss) {
            isShown = false;
        }
        dispatch("dismiss");
    }
</script>

<!-- Style adapted from https://tailwindcomponents.com/component/tailwind-alerts -->

{#if !autoDismiss || isShown}
    <div class="rounded px-4 py-3 {types[type].bg} {types[type].text}" role="alert">
        <div class="flex items-center">
            <div>
                <Icon src={types[type].icon} class="h-7 w-7 mr-4 {types[type].text}" ariaHidden />
            </div>
            <div class="flex-1">
                <p class="text-sm {types[type].text}">
                    <slot />
                </p>
            </div>
            {#if dismissable}
                <div>
                    <button type="button" aria-label="Close" on:click={onDismiss}>
                        <Icon src={X} class="h-4 w-4 {types[type].text}" ariaHidden />
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
