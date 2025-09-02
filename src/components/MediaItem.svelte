<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import type media from '../api/models/media'

    const {
        image,
        shouldBeLarge,
    }: {
        image: media
        shouldBeLarge: boolean
    } = $props()
</script>

<li class={shouldBeLarge ? 'large' : 'small'}>
    <button
        onclick={() => (appState.selectedImage = image)}
        popovertarget="dialogue"
    >
        {#if image.isVideo}
            <img src={image.thumbnailUrl} loading="lazy" />
        {:else}
            <img src={image.url} loading="lazy" />
        {/if}
    </button>
</li>

<style>
    li {
        aspect-ratio: 1;
        animation: 0.5s fade-in normal;
        backdrop-filter: invert(15%);
        display: block;
    }
    li.small {
        grid-column-end: span 1;
        grid-row-end: span 1;
    }
    li.large {
        grid-column-end: span 2;
        grid-row-end: span 2;
    }
    li button {
        cursor: pointer;
        display: contents;
    }
    li button img {
        box-sizing: border-box;
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
