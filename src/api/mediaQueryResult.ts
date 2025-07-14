export default interface mediaQueryResult {
    data: {
        children: {
            data: {
                preview?: {
                    images: {
                        source: {
                            url: string
                            height: number
                            width: number
                        }
                    }[]
                    reddit_video_preview?: {
                        bitrate_kbps: number
                        duration: number
                        fallback_url: string
                        height: number
                        width: number
                    }
                }
                secure_media?: {
                    type?: string
                    oembed?: {
                        height: number
                        width: number
                        thumbnail_url?: string
                        type: string
                    }
                }
                secure_media_embed?: {
                    media_domain_url: string
                    height: number
                    width: number
                }
                post_hint: string
                permalink: string
                url: string
                subreddit: string
                title: string
                thumbnail?: string
                is_original_content: boolean
                over_18: boolean
            }
        }[]
    }
}
