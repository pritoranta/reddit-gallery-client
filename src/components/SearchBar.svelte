<script lang="ts">
    import { selectedSubreddit } from '../data/selectedSubreddit.svelte'
    import Search from './Search.svelte'
</script>

<nav>
    <h1>{`r/${selectedSubreddit.id}`}</h1>
    <Search />
</nav>

<style>
    h1 {
        font-size: 1.5rem;
        padding-left: 10px;
        width: 25%;
        word-break: keep-all;
        word-wrap: break-all;
    }
    nav {
        align-items: center;
        justify-content: space-between;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
    }
</style>
