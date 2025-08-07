<script lang="ts">
    import querySubreddits from '../api/querySubreddits'
    import { appState } from '../data/appState.svelte'
    import type subreddit from '../models/subreddit'

    let searchPhrase = $state('')
    let isLoading = $state(false)
    let results: subreddit[] = $state([])
    let debounceTimer: number
    const debounceSearchPhrase = (s: string) => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            searchPhrase = s
        }, 300)
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
        onkeyup={(e) =>
            debounceSearchPhrase((e.target as HTMLInputElement).value)}
        onfocusin={() => (appState.shouldSearchResultsShow = true)}
        autocomplete="off"
    />
    {#if appState.shouldSearchResultsShow}
        <ul id="search_results">
            {#each results as subreddit}
                <li>
                    <a href={'?sub=' + subreddit.id}>
                        {subreddit.id}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</search>

<style>
    search {
        margin: 10px;
        max-width: 25rem;
        width: 50%;
    }
    #search_input {
        padding: 5px;
        width: 100%;
    }
    #search_results {
        background-color: var(--background-color);
        border: 0;
        display: block;
        margin: 0;
        max-height: 20rem;
        max-width: calc(25rem + 14px);
        overflow-y: auto;
        padding-left: 0;
        position: absolute;
        width: 100%;
        z-index: 1;
    }
    li a {
        border: 0;
        color: var(--color);
        padding: 5px;
        text-align: start;
        width: 100%;
    }
</style>
