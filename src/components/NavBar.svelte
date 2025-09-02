<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import SearchInput from './SearchInput.svelte'
</script>

<nav>
    <h1>
        <a
            href={`https://reddit.com/r/${appState.subredditId}/top/?t=all`}
            target="_blank">{`r/${appState.subredditId}`}</a
        >
    </h1>
    <div id="search">
        <SearchInput />
    </div>
    <div id="links">
        <a
            href="https://github.com/pritoranta/reddit-gallery-client"
            target="_blank"
        >
            <img class="logo" src="github.png" />
        </a>
    </div>
</nav>

<style>
    h1 {
        font-size: 1.3rem;
        margin-block: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 20%;
    }
    h1 a {
        color: var(--color);
    }
    #search {
        display: flex;
        justify-content: center;
        width: 60%;
    }
    #links {
        display: flex;
        justify-content: flex-end;
        width: 20%;
    }
    .logo {
        height: 2.5rem;
        filter: drop-shadow(0 0 1px var(--color));
    }
    nav {
        align-items: center;
        box-sizing: border-box;
        display: flex;
        gap: 5px;
        flex-wrap: nowrap;
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }
</style>
