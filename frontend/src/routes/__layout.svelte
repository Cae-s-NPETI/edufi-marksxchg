<script lang="ts">
    import Alert from "$lib/components/Alert.svelte";
    import Container from "$lib/components/Container.svelte";
    import LoginPage from "$lib/components/LoginPage.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { isDarkMode, studentId, title } from "$lib/stores";
    import { onMount } from "svelte";
    import "../app.css";

    let finalTitle = "";
    $: {
        finalTitle = "";
        if ($title) {
            finalTitle += $title + " – ";
        }
        finalTitle += "Trades Xchange";
    }

    // populated on mount
    let domActions: {
        setDarkMode: (set: boolean) => void;
    } = null;
    onMount(() => {
        domActions = {
            setDarkMode: (set) => {
                if (set) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            },
        };
    });

    // Listen to dark mode preference
    $: domActions?.setDarkMode($isDarkMode);
</script>

<svelte:head>
    <title>
        {finalTitle}
    </title>
</svelte:head>

{#if $studentId != null}
    <header>
        <Navbar />
    </header>

    <!-- TODO: rmv -->
    <Container>
        <Alert>
            This site uses <a class="link" target="_blank" href="https://svelte.dev">Svelte</a> under
            the hood to bring you this content seamlessly.
        </Alert>
    </Container>

    <div class="pt-5">
        <slot />
    </div>
{:else}
    <LoginPage />
{/if}

<footer />
