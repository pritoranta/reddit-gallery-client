import type mediaList from './models/mediaList'

export default async function queryMedia(
    subredditId: string,
    pageId?: string,
): Promise<mediaList | null> {
    try {
        let url = `${
            import.meta.env.VITE_API_URL
        }/media?subredditId=${subredditId}`
        if (pageId) url += `&pageId=${pageId}`
        const response = await fetch(url)
        if (response.status >= 400) {
            window.alert(
                `Error fetching media from r/${subredditId}. API replied with "${await response.json()}". Sorry!`,
            )
            return null
        }
        const body: mediaList = await response.json()
        return body
    } catch (e) {
        window.alert(`Error fetching media from r/${subredditId}`)
        return null
    }
}
