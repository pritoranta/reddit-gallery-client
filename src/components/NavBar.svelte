<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import SearchInput from './SearchInput.svelte'
</script>

<nav>
    <h1>{`r/${appState.subredditId}`}</h1>
    <SearchInput />
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
        font-size: min(3vw, 1.5rem);
        width: 25%;
        word-break: keep-all;
        word-wrap: break-all;
    }
    #links {
        align-items: center;
        display: flex;
        justify-content: flex-end;
        width: 25%;
    }
    .logo {
        height: 2.5rem;
        will-change: filter;
    }
    .logo:hover {
        filter: drop-shadow(0 0 1px white);
    }
    nav {
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        display: flex;
        flex-wrap: nowrap;
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }
</style>
