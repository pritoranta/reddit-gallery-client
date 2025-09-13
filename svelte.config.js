import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
    // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
    // for more information about preprocessors
    preprocess: vitePreprocess(),
    compilerOptions: {
        warningFilter: (warning) =>
            warning.code !== 'a11y_consider_explicit_label' &&
            warning.code !== 'a11y_missing_attribute',
    },
}
