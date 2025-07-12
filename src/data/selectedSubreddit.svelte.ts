import type subreddit from '../models/subreddit'

export const selectedSubreddit: subreddit = $state({
    id: 'popular',
    over18: false,
})
