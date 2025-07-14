<script lang="ts">
    import SearchInput from './SearchInput.svelte'

    const { subredditId }: { subredditId: string } = $props()
</script>

<nav>
    <h1>{`r/${subredditId}`}</h1>
    <SearchInput />
    <div></div>
</nav>

<style>
    h1 {
        font-size: min(3vw, 1.5rem);
        width: 25%;
        word-break: keep-all;
        word-wrap: break-all;
    }
    div {
        width: 25%;
    }
    nav {
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        display: flex;
        flex-wrap: nowrap;
        padding-left: 2vw;
        padding-right: 2vw;
        width: 100%;
    }
</style>
