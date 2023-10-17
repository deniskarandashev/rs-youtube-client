export interface SearchItem {
    kind: string,
    etag: string,
    id: string,
    snippet: Snippet,
    statistics: Statistics
}

interface Snippet {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: Thumbnails,
    channelTitle: string,
    tags: string[],
    categoryId: string,
    liveBroadcastContent: string,
    localized: {
        title: string,
        description: string
    },
    defaultAudioLanguage: string
}

interface Statistics {
    viewCount: string,
    likeCount: string,
    dislikeCount: string,
    favoriteCount: string,
    commentCount: string
}

interface Thumbnails {
    default: Thumbnail,
    medium: Thumbnail,
    high: Thumbnail,
    standard: Thumbnail,
    maxres: Thumbnail
}

interface Thumbnail {
    url: string,
    width: number,
    height: number
}