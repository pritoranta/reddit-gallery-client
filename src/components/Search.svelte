<script lang="ts">
    import querySubreddits from '../api/querySubreddits'
    import { subredditSearchState } from '../data/subredditSearchState.svelte'

    $effect(() => {
        subredditSearchState.isLoading = true
        querySubreddits(subredditSearchState.searchPhrase) // this state read triggers the effect rune
            .then((subreddits) => {
                subredditSearchState.results = subreddits ?? []
            })
            .catch(() => {
                subredditSearchState.results = []
            })
            .finally(() => {
                subredditSearchState.isLoading = false
            })
    })
</script>

<search>
    <input
        id="search_input"
        type="text"
        placeholder="Search for subreddits..."
        bind:value={subredditSearchState.searchPhrase}
        onfocusin={() =>
            document.getElementById('search_results')?.showPopover()}
        onfocusout={() =>
            document.getElementById('search_results')?.hidePopover()}
    />
    <ul id="search_results" popover="manual">
        {#if !subredditSearchState.results.length}
            {#if !subredditSearchState.searchPhrase}
                <li>Try searching for subreddits</li>
            {:else if subredditSearchState.isLoading}
                <li>Loading...</li>
            {:else}
                <li>No subreddits found</li>
            {/if}
        {:else}
            {#each subredditSearchState.results as subreddit}
                <li>
                    <button onmousedown={() => console.log(subreddit.id)}>
                        {subreddit.id}
                    </button>
                </li>
            {/each}
        {/if}
    </ul>
</search>

<style>
    search {
        margin: 10px;
        max-width: 30rem;
        width: 40%;
    }
    #search_input {
        padding: 5px;
        width: 100%;
    }
    #search_results:popover-open {
        border: 0;
        /* only set display: block when popover-open, because popovers use display: none to control visibility */
        display: block;
        /* removes space between li elements */
        font-size: 0;
        /* popover tag adds many annoying stylings we're removing */
        inset: auto;
        max-height: 20rem;
        max-width: 30rem;
        overflow-y: scroll;
        position: anchor;
        width: 40%;
    }
    li button {
        border: 0;
        padding: 5px;
        text-align: start;
        width: 100%;
    }
</style>
