<script lang="ts">
    import type media from '../models/media'

    const { images }: { images: media[] } = $props()
</script>

<ul id="media_grid">
    {#each images as i}
        <li>
            {#if i.type === 'video'}
                <img src={i.thumbnail_url} loading="lazy" />
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
        grid-template-columns: repeat(4, 1fr);
        padding: 0;
        margin: 0;
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
</style>
