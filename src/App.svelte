<script lang="ts">
    import Search from './components/Search.svelte'
    import { subredditSearchState } from './data/subredditSearchState.svelte'
</script>

<main>
    <Search />
    <div>{subredditSearchState.searchResults?.map((sr) => sr.id)}</div>
</main>

<style>
</style>
