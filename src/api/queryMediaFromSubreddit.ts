import type media from '../models/media'
import type mediaQueryResult from './mediaQueryResult'

export default async function queryMediaFromSubreddit(
    subredditId: string,
): Promise<media[] | null> {
    try {
        const response = await fetch(
            `https://api.reddit.com/r/${subredditId}/top.json?t=all`,
        )
        if (response.status >= 400) return null
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
        return postsWithMedia.flatMap((post) =>
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
    } catch {
        return null
    }
}
