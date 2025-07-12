<script lang="ts">
    import querySubreddits from '../api/querySubreddits'
    import type subreddit from '../models/subreddit'

    let searchPhrase = $state('')
    let isLoading = $state(false)
    let selectedSubreddit: subreddit | null = $state(null)
    let results: subreddit[] = $state([])
    let shouldResultsShow = $state(false)

    const selectSubreddit = (sub: subreddit) => {
        selectedSubreddit = sub
        searchPhrase = ''
    }

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
        onfocusin={() => (shouldResultsShow = true)}
        onfocusout={() => (shouldResultsShow = false)}
    />
    {#if shouldResultsShow}
        <ul id="search_results">
            {#if !results.length}
                {#if isLoading}
                    <li>Loading...</li>
                {:else if !searchPhrase}
                    <li>Try searching for subreddits</li>
                {:else}
                    <li>No subreddits found</li>
                {/if}
            {:else}
                {#each results as subreddit}
                    <li>
                        <button onmousedown={() => selectSubreddit(subreddit)}>
                            {subreddit.id}
                        </button>
                    </li>
                {/each}
            {/if}
        </ul>
    {/if}
</search>

<style>
    search {
        margin: 10px;
        max-width: 25rem;
        width: 100%;
    }
    #search_input {
        padding: 5px;
        width: 100%;
    }
    #search_results {
        border: 0;
        display: block;
        /* removes space between li elements */
        font-size: 0;
        max-height: 20rem;
        max-width: calc(25rem + 14px);
        overflow-y: scroll;
        padding-left: 0;
        position: fixed;
        width: 100%;
        z-index: 1;
    }
    li button {
        border: 0;
        padding: 5px;
        text-align: start;
        width: 100%;
    }
</style>
