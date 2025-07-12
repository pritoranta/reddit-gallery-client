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
                    reddit_video?: {
                        bitrate_kbps: number
                        duration: number
                        fallback_url: string
                        height: number
                        width: number
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
            }
        }[]
    }
}
