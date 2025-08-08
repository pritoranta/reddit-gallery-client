<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import type media from '../models/media'
    import MediaItem from './MediaItem.svelte'

    const { images }: { images: media[] } = $props()
    let innerWidth = $state(0)
    const columns = $derived(Math.floor(innerWidth / 204)) // close enough approximation of CSS

    const indexShouldBeLarge: boolean[] = $derived.by(() => {
        const indices: boolean[] = new Array(images.length).fill(false)
        let currentRowIndex = 0
        let rowReservations: boolean[] = new Array(columns).fill(false)
        let nextRowReservations: boolean[] = new Array(columns).fill(false)
        for (let i = 0; i < images.length; i++) {
            // check if we have reached the next row
            if (currentRowIndex >= columns) {
                rowReservations = nextRowReservations
                nextRowReservations = new Array(columns).fill(false)
                currentRowIndex = 0
            }
            // check if current column is reserved
            if (rowReservations[currentRowIndex]) {
                i--
                currentRowIndex++
                continue
            }

            // check if this is the last column of row, or next one is reserved
            if (
                currentRowIndex + 1 === columns ||
                rowReservations[currentRowIndex + 1]
            ) {
                currentRowIndex++
            }
            // check rng
            else if (Math.random() < 0.8) {
                currentRowIndex++
            }
            // congratulations you are deemed big
            else {
                nextRowReservations[currentRowIndex] = true
                nextRowReservations[currentRowIndex + 1] = true
                currentRowIndex += 2
                indices[i] = true
            }
        }
        return indices
    })
</script>

<svelte:window bind:innerWidth />

<ul id="media_grid">
    {#each images as image, index}
        <MediaItem {image} shouldBeLarge={indexShouldBeLarge[index]} />
    {/each}
    <button
        id="dialogue"
        popover
        popovertarget="dialogue"
        onclick={() => (appState.selectedImage = null)}
    >
        {#if appState.selectedImage?.is_video}
            <iframe
                src={appState.selectedImage.url}
                height={appState.selectedImage.height}
                width={appState.selectedImage.width}
                loading="eager"
                sandbox="allow-scripts allow-same-origin"
            ></iframe>
        {:else}
            <img src={appState.selectedImage?.url} />
        {/if}
        <h2>{appState.selectedImage?.post_title}</h2>
    </button>
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
    #dialogue:popover-open {
        align-items: center;
        backdrop-filter: blur(1rem);
        background-color: transparent;
        border: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        margin: 0;
        padding: 0;
        width: 100%;
    }
</style>
