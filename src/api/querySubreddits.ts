import type subreddit from '../models/subreddit'
import type subredditQueryResult from './subredditQueryResult'

export default async function querySubreddits(
    searchPhrase: string,
    includeOver18 = false,
): Promise<subreddit[] | null> {
    try {
        if (!searchPhrase) return null
        const paddedSearchPhrase = searchPhrase.padStart(3, ' ') // Reddit wants this to be at least 3 characters long
        const response = await fetch(
            `https://api.reddit.com/search.json?type=sr&q=${paddedSearchPhrase}&include_over_18=${
                includeOver18 ? 'on' : 'off'
            }`,
        )
        if (response.status >= 400) {
            window.alert(
                `Error fetching subreddits with search phrase "${searchPhrase}". Reddit API replied with status ${response.status} "${response.statusText}". Sorry!`,
            )
            return null
        }
        const body: subredditQueryResult = await response.json()
        return body?.data?.children
            ?.filter((sr) => sr?.kind === 't5')
            .map((sr) => ({
                description: sr.data.public_description,
                id: sr.data.display_name,
                over18: sr.data.over18,
            }))
    } catch (e) {
        window.alert(
            `Error fetching subreddits with search phrase "${searchPhrase}". Read your browser's console for more details.\n\nThis is usually due to Reddit API blocking incoming requests for unknown reasons that are out of my control.\n\nYou can try disabling your VPN, or trying again later. Sorry!`,
        )
        return null
    }
}
