<script lang="ts">
    import querySubreddits from '../api/querySubreddits'
    import type subreddit from '../models/subreddit'

    let searchPhrase = $state('')
    let isLoading = $state(false)
    let selectedSubreddit: subreddit | null = $state(null)
    let results: subreddit[] = $state([])

    $effect(() => {
        isLoading = true
        querySubreddits(searchPhrase) // this state read triggers the effect rune
            .then((subreddits) => {
                results = subreddits ?? []
            })
            .catch(() => {
                results = []
            })
            .finally(() => {
                isLoading = false
            })
    })
</script>

<search>
    <input
        id="search_input"
        type="text"
        placeholder="Search for subreddits..."
        bind:value={searchPhrase}
        onfocusin={() =>
            document.getElementById('search_results')?.showPopover()}
        onfocusout={() =>
            document.getElementById('search_results')?.hidePopover()}
    />
    <ul id="search_results" popover="manual">
        {#if !results.length}
            {#if !searchPhrase}
                <li>Try searching for subreddits</li>
            {:else if isLoading}
                <li>Loading...</li>
            {:else}
                <li>No subreddits found</li>
            {/if}
        {:else}
            {#each results as subreddit}
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
        position: absolute;
        width: 40%;
    }
    li button {
        border: 0;
        padding: 5px;
        text-align: start;
        width: 100%;
    }
</style>
