import type subreddit from '../models/subreddit'

export const subredditSearchState = $state<{
    searchPhrase: string
    isLoading: boolean
    selectedSubreddit: subreddit | null
    searchResults: subreddit[]
}>({
    searchPhrase: '',
    isLoading: false,
    selectedSubreddit: null,
    searchResults: [],
})
