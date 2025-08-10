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
    <button
        id="dialogue"
        popover
        popovertarget="dialogue"
        onkeyup={() => (appState.selectedImage = null)}
    >
        {#if appState.selectedImage?.is_video}
            <iframe
                class="content"
                src={appState.selectedImage.url}
                height={appState.selectedImage.height}
                width={appState.selectedImage.width}
                loading="eager"
                sandbox="allow-scripts allow-same-origin"
            ></iframe>
        {:else}
            <img class="content" src={appState.selectedImage?.url} />
        {/if}
        <div id="dialogue_footer">
            <a
                href={`https://reddit.com${appState.selectedImage?.post_permalink}`}
                target="_blank"><img id="reddit_logo" src="reddit.png" /></a
            >
            <h2>{appState.selectedImage?.post_title}</h2>
        </div>
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
    .content {
        height: 90%;
        max-width: 90%;
    }
    #dialogue_footer {
        align-items: center;
        display: flex;
        gap: 20px;
        height: 10%;
    }
    #reddit_logo {
        height: 2rem;
    }
</style>
