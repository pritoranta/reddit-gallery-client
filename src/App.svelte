<script lang="ts">
    import queryMediaFromSubreddit from './api/queryMediaFromSubreddit'
    import MediaGrid from './components/MediaGrid.svelte'
    import NavBar from './components/NavBar.svelte'
    import { selectedSubreddit } from './data/selectedSubreddit.svelte'
    import type media from './models/media'

    let images: media[] = $state([])
    $effect(() => {
        queryMediaFromSubreddit(selectedSubreddit.id) // this state read triggers effect
            .then((results) => {
                images = results ?? []
            })
            .catch(() => {
                images = []
            })
    })
</script>

<main>
    <NavBar />
    <MediaGrid {images} />
</main>

<style>
    main {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>
