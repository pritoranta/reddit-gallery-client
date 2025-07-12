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
            post.secure_media?.reddit_video
                ? {
                      type: 'video',
                      linkToPost: post.permalink,
                      url: post.secure_media!.reddit_video!.fallback_url,
                      height: post.secure_media!.reddit_video!.height,
                      width: post.secure_media!.reddit_video!.width,
                  }
                : post.preview?.reddit_video_preview
                ? {
                      type: 'gif',
                      linkToPost: post.permalink,
                      url: post.preview!.reddit_video_preview!.fallback_url,
                      height: post.preview!.reddit_video_preview!.height,
                      width: post.preview!.reddit_video_preview!.width,
                  }
                : post.preview!.images.map((image) => ({
                      type: 'image',
                      linkToPost: post.permalink,
                      url: post.url,
                      height: image.source.height,
                      width: image.source.width,
                  })),
        )
    } catch {
        return null
    }
}
