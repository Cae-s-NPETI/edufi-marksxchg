<script>
    import Container from "./Container.svelte";
</script>

<!--
@component
Sets the main content of a page enclosed in a container.
  -->
<main>
    <Container>
        <slot />
    </Container>
</main>
