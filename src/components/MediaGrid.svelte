<script lang="ts">
    import type media from '../models/media'

    const { images }: { images: media[] } = $props()
    let selectedImage: media | null = $state(null)
</script>

<ul id="media_grid">
    {#each images as i}
        <li>
            <button
                onclick={() => (selectedImage = i)}
                popovertarget="dialogue"
            >
                {#if i.is_video}
                    <img src={i.thumbnail_url} loading="lazy" />
                {:else}
                    <img src={i.url} loading="lazy" />
                {/if}
            </button>
        </li>
    {/each}
    <button
        id="dialogue"
        popover
        popovertarget="dialogue"
        onclick={() => (selectedImage = null)}
    >
        {#if selectedImage?.is_video}
            <iframe
                src={selectedImage.url}
                height={selectedImage.height}
                width={selectedImage.width}
                loading="eager"
                sandbox="allow-scripts allow-same-origin"
            ></iframe>
        {:else}
            <img src={selectedImage?.url} />
        {/if}
        <h2>{selectedImage?.post_title}</h2>
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
    li {
        aspect-ratio: 1;
        display: block;
        grid-column-end: span 1;
        grid-row-end: span 1;
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
