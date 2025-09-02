import type subreddit from './models/subreddit'

export default async function querySubreddits(
    searchPhrase: string,
    includeOver18 = false,
): Promise<subreddit[] | null> {
    try {
        if (!searchPhrase) return null
        const response = await fetch(
            `${
                import.meta.env.VITE_API_URL
            }/subreddits?searchPhrase=${searchPhrase}&shouldIncludeOver18=${includeOver18}`,
        )
        if (response.status >= 400) {
            window.alert(
                `Error fetching subreddits with search phrase "${searchPhrase}". API replied with "${await response.json()}". Sorry!`,
            )
            return null
        }
        const body: subreddit[] = await response.json()
        return body
    } catch (e) {
        window.alert(
            `Error fetching subreddits with search phrase "${searchPhrase}"`,
        )
        return null
    }
}
