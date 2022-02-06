import adapterStatic from '@sveltejs/adapter-static';
import adapterNode from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const isGhPages = process.env.TO_GITHUB === "true";
const isForDev = process.env.FOR_DEV === "true";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: !isForDev ? adapterStatic({
			pages: !isGhPages ? 'build' : 'build-gh',
			assets: !isGhPages ? 'build' : 'build-gh',
			fallback: null
		}) : adapterNode({
			out: 'build-node',
		}),

		// hydrate the <div id="svelte"> element in src/app.html
		//target: '#svelte',

		paths: {
			// Deployment to GH-pages
			base: isGhPages ? '/edufi-marksxch' : '',
		},
	}
};

export default config;
