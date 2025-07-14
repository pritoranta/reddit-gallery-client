import type subreddit from '../models/subreddit'
import type subredditQueryResult from './subredditQueryResult'

export default async function querySubreddits(
    searchPhrase: string,
    includeOver18 = false,
): Promise<subreddit[] | null> {
    try {
        const paddedSearchPhrase = searchPhrase.padStart(3, ' ') // Reddit wants this to be at least 3 characters long
        const response = await fetch(
            `https://api.reddit.com/search.json?type=sr&q=${paddedSearchPhrase}&include_over_18=${
                includeOver18 ? 'on' : 'off'
            }`,
        )
        if (response.status >= 400) return null
        const body: subredditQueryResult = await response.json()
        return body?.data?.children
            ?.filter((sr) => sr?.kind === 't5')
            .map((sr) => ({
                description: sr.data.public_description,
                id: sr.data.display_name,
                over18: sr.data.over18,
            }))
    } catch (e) {
        return null
    }
}
