<script lang="ts">
    import { appState } from '../data/appState.svelte'

    const loadMoreImages = (e: HTMLLIElement) => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                appState.shouldLoadMoreImages = true
            } else {
                appState.shouldLoadMoreImages = false
            }
        })
        observer.observe(e)
    }
</script>

<li id="image_loader" use:loadMoreImages></li>

<style>
    #image_loader {
        background-color: transparent;
        grid-column-end: span 1;
        grid-row-end: span 1;
    }
</style>
