import type media from '../api/models/media'

interface appStateType {
    images: media[]
    nextPageId?: string
    shouldLoadMoreImages: boolean
    shouldSearchResultsShow: boolean
    selectedImage: media | null
    subredditId: string
}

export const appState: appStateType = $state({
    images: [],
    nextPageId: undefined,
    shouldLoadMoreImages: false,
    shouldSearchResultsShow: false,
    selectedImage: null,
    subredditId:
        new URLSearchParams(window.location.search)?.get('sub') ||
        'MostBeautiful',
})
