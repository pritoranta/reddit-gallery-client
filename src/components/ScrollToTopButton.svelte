<script lang="ts">
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<button onclick={scrollToTop}>⬆</button>

<style>
    button {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        height: 3.5rem;
        width: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        font-weight: bold;
        background-color: var(--background-color);
        color: var(--color);
        border-radius: 50%;
        cursor: pointer;
    }
</style>
