import type media from '../models/media'
import type mediaList from '../models/mediaList'
import type mediaQueryResult from './mediaQueryResult'

export default async function queryMediaFromSubreddit(
    subredditId: string,
    pageId?: string,
): Promise<mediaList | null> {
    try {
        let url = `https://api.reddit.com/r/${subredditId}/top.json?t=all`
        if (pageId) url += `&after=${pageId}`
        const response = await fetch(url)
        if (response.status >= 400) {
            window.alert(
                `Error fetching media from r/${subredditId}. Reddit API replied with status ${response.status} "${response.statusText}". Sorry!`,
            )
            return null
        }
        const body: mediaQueryResult = await response.json()
        const postsWithMedia =
            body?.data?.children
                ?.map((post) => post?.data)
                .filter(
                    (post) =>
                        post.post_hint === 'image' ||
                        post.post_hint?.includes('video') ||
                        (post.post_hint === 'link' &&
                            post.url.includes('imgur.com') &&
                            post.preview?.reddit_video_preview),
                ) ?? []
        const posts: media[] = postsWithMedia.flatMap((post) =>
            post.secure_media?.oembed?.type === 'video'
                ? {
                      is_video: true,
                      post_permalink: post.permalink,
                      post_subreddit_id: post.subreddit,
                      post_title: post.title,
                      url: post.secure_media_embed?.media_domain_url ?? '',
                      height: post.secure_media_embed?.height ?? 0,
                      width: post.secure_media_embed?.width ?? 0,
                      thumbnail_url: post.thumbnail,
                      is_original_content: post.is_original_content,
                      is_over_18: post.over_18,
                  }
                : post.preview?.reddit_video_preview
                ? {
                      post_permalink: post.permalink,
                      post_subreddit_id: post.subreddit,
                      post_title: post.title,
                      url: post.preview!.reddit_video_preview!.fallback_url,
                      height: post.preview!.reddit_video_preview!.height,
                      width: post.preview!.reddit_video_preview!.width,
                      is_original_content: post.is_original_content,
                      is_over_18: post.over_18,
                  }
                : post.preview!.images.map((image) => ({
                      post_permalink: post.permalink,
                      post_subreddit_id: post.subreddit,
                      post_title: post.title,
                      url: post.url,
                      height: image.source.height,
                      width: image.source.width,
                      is_original_content: post.is_original_content,
                      is_over_18: post.over_18,
                  })),
        )
        return {
            media: posts,
            next_page_id: body?.data?.after,
        }
    } catch (e) {
        window.alert(
            `Error fetching media from r/${subredditId}. Read your browser's console for more details.\n\nThis might be caused by browser settings that block third-party websites' content, or an overly eager adblocker. Please try again later, or try whitelisting this website in your browser's settings.`,
        )
        return null
    }
}
