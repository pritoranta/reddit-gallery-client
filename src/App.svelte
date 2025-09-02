<script lang="ts">
    import queryMedia from './api/queryMedia'
    import MediaGrid from './components/MediaGrid.svelte'
    import MediaPopup from './components/MediaPopup.svelte'
    import NavBar from './components/NavBar.svelte'
    import { appState } from './data/appState.svelte'

    const closeSearchResults = (e: KeyboardEvent) => {
        if (e.key === 'Escape') appState.shouldSearchResultsShow = false
    }

    // initial images
    $effect(() => {
        queryMedia(appState.subredditId)
            .then((result) => {
                appState.nextPageId = result?.nextPageId
                appState.images = result?.media ?? []
            })
            .catch(() => {
                appState.images = []
            })
    })
    // more images
    $effect(() => {
        if (!appState.shouldLoadMoreImages || !appState.nextPageId) return
        queryMedia(appState.subredditId, appState.nextPageId).then((result) => {
            appState.nextPageId = result?.nextPageId
            appState.images = [...appState.images, ...(result?.media ?? [])]
        })
    })
</script>

<main>
    <NavBar />
    <MediaGrid />
    <MediaPopup />
</main>

<svelte:window on:keydown={closeSearchResults} />

<style>
    main {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>
