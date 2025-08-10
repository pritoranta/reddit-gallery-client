<script lang="ts">
    import { appState } from '../data/appState.svelte'
    import SearchInput from './SearchInput.svelte'
</script>

<nav>
    <h1>{`r/${appState.subredditId}`}</h1>
    <SearchInput />
    <a
        href="https://github.com/pritoranta/reddit-gallery-client"
        target="_blank"
    >
        <img class="logo" src="github.png" />
    </a>
</nav>

<style>
    h1 {
        font-size: min(3vw, 1.5rem);
        word-break: keep-all;
        word-wrap: break-all;
    }
    .logo {
        height: 2.5rem;
        filter: drop-shadow(0 0 1px var(--color));
    }
    nav {
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        display: flex;
        gap: 15px;
        flex-wrap: nowrap;
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }
</style>
