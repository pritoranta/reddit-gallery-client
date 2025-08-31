<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import { getLargeImageIndices } from '../utils/getLargeImageIndices'
    import ImageLoader from './ImageLoader.svelte'
    import MediaItem from './MediaItem.svelte'

    let innerWidth = $state(0)
    const columns = $derived(Math.floor(innerWidth / 204)) // close enough approximation of CSS
    const indexShouldBeLarge: boolean[] = $derived(
        getLargeImageIndices(columns, appState.images.length),
    )
</script>

<svelte:window bind:innerWidth />

<ul id="media_grid">
    {#each appState.images as image, index}
        <MediaItem {image} shouldBeLarge={indexShouldBeLarge[index]} />
    {/each}
    <ImageLoader />
</ul>

<style>
    #media_grid {
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        padding: 0;
        margin: 0;
        width: 100%;
    }
</style>
