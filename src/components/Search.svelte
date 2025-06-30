<script lang="ts">
    import querySubreddits from '../api/querySubreddits'
    import { subredditSearchState } from '../data/subredditSearchState.svelte'

    $effect(() => {
        subredditSearchState.isLoading = true
        querySubreddits(subredditSearchState.searchPhrase)
            .then((subreddits) => {
                subredditSearchState.searchResults = subreddits ?? []
            })
            .catch((error) => {
                console.error('Error fetching subreddits:', error)
                subredditSearchState.searchResults = []
            })
            .finally(() => {
                subredditSearchState.isLoading = false
            })
    })
</script>

<input
    type="text"
    placeholder="Search for subreddits..."
    bind:value={subredditSearchState.searchPhrase}
/>
