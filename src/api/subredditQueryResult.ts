export default interface subredditQueryResult {
    data: {
        children: {
            kind: 't5'
            data: {
                created: number
                created_utc: number
                display_name: string
                display_name_prefixed: string
                id: string
                name: string
                public_description: string
                subreddit_type: string
                over18: boolean
            }
        }[]
    }
}
