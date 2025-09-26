<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import { getLargeImageIndices } from '../utils/getLargeImageIndices'
    import ImageLoader from './ImageLoader.svelte'
    import MediaItem from './MediaItem.svelte'

    let innerWidth = $state(0)
    // pretty reliable way to check if mobile device:
    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
    const imageMinWidth = isMobileDevice ? 110 : 180
    const columns = $derived(Math.floor((innerWidth + 4) / (imageMinWidth + 4)))
    const indexShouldBeLarge: boolean[] = $derived(
        getLargeImageIndices(columns, appState.images.length),
    )
</script>

<svelte:window bind:innerWidth />

<ul id="media_grid" class={isMobileDevice ? 'mobile' : 'big-screen'}>
    {#each appState.images as image, index}
        <MediaItem {image} shouldBeLarge={indexShouldBeLarge[index]} />
    {/each}
    <ImageLoader />
</ul>

<style>
    #media_grid {
        display: grid;
        gap: 4px;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    .big-screen {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    .mobile {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    }
</style>
