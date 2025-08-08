import type media from '../models/media'

interface appStateType {
    shouldSearchResultsShow: boolean
    selectedImage: media | null
}

export const appState: appStateType = $state({
    shouldSearchResultsShow: false,
    selectedImage: null,
})
