<script lang="ts">
    import queryMediaFromSubreddit from './api/queryMediaFromSubreddit'
    import MediaGrid from './components/MediaGrid.svelte'
    import NavBar from './components/NavBar.svelte'
    import { appState } from './data/appState'
    import type media from './models/media'

    const searchParams: URLSearchParams = new URLSearchParams(
        window.location.search,
    )
    const subredditId = searchParams?.get('sub') || 'MostBeautiful'
    let images: media[] = $state([])
    const closeSearchResults = (e: KeyboardEvent) => {
        if (e.key === 'Escape') appState.shouldSearchResultsShow = false
    }

    $effect(() => {
        queryMediaFromSubreddit(subredditId)
            .then((results) => {
                images = results ?? []
            })
            .catch(() => {
                images = []
            })
    })
</script>

<main>
    <NavBar {subredditId} />
    <MediaGrid {images} />
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
