import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
    // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
    // for more information about preprocessors
    preprocess: vitePreprocess(),
    onwarn: (warning, handler) => {
        // ignore certain warnings during build
        if (
            warning.code === 'a11y_consider_explicit_label' ||
            warning.code === 'a11y_missing_attribute'
        )
            return
        // show rest of the warnings as normal
        handler(warning)
    },
}
