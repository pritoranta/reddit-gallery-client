import type subreddit from '../models/subreddit'

export const subredditSearchState = $state<{
    searchPhrase: string
    isLoading: boolean
    selectedSubreddit: subreddit | null
    results: subreddit[]
}>({
    searchPhrase: '',
    isLoading: false,
    selectedSubreddit: null,
    results: [],
})
