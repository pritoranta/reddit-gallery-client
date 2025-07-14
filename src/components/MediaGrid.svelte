<script lang="ts">
    import type media from '../models/media'

    const { images }: { images: media[] } = $props()
</script>

<ul id="media_grid">
    {#each images as i}
        <li>
            {#if i.isVideo}
                <a
                    class="overlay"
                    href={i.url}
                    aria-label={i.url}
                    target="_blank"
                >
                    <img src={i.thumbnail_url} loading="lazy" />
                    <img class="play_button" src="play.png" />
                </a>
            {:else}
                <img src={i.url} loading="lazy" />
            {/if}
        </li>
    {/each}
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
    #media_grid li {
        aspect-ratio: 1;
        display: block;
        grid-column-end: span 1;
        grid-row-end: span 1;
    }
    #media_grid li img {
        box-sizing: border-box;
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
    }
    .overlay {
        cursor: pointer;
        opacity: 0.5;
        position: relative;
    }
    .overlay:hover {
        opacity: 1;
    }
    .play_button {
        overflow: visible;
        padding: 30%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
