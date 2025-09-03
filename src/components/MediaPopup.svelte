<script>
    import { appState } from '../data/appState.svelte'
</script>

<button
    id="dialogue"
    popover
    popovertarget="dialogue"
    onkeyup={() => (appState.selectedImage = null)}
>
    {#if appState.selectedImage?.isVideo}
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
    <a
        id="dialogue_footer"
        href={`https://reddit.com${appState.selectedImage?.postPermalink}`}
        target="_blank"
        ><img id="reddit_logo" src="reddit.png" />
        <h2>{appState.selectedImage?.postTitle}</h2></a
    >
</button>

<style>
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
        max-height: 90%;
        max-width: 90%;
    }
    #dialogue_footer {
        align-items: center;
        background-color: var(--background-color);
        border-color: var(--color);
        border-width: 1px;
        border-radius: 20px;
        border-style: solid;
        color: var(--color);
        display: flex;
        gap: 20px;
        margin: 5px;
        padding: 10px;
    }
    #reddit_logo {
        height: 2rem;
    }
</style>
