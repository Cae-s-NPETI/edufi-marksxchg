const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const colors = require('tailwindcss/colors')

/**
 * Tailwind CSS default colors.
 *
 * @see https://tailwindcss.com/docs/customizing-colors#using-the-default-colors
 */
const defaultColors = {
	transparent: 'transparent',
	current: 'currentColor',
	...colors
};

const additionalColors = {
	brown: {
		50: '#EFEBE9',
		100: '#D7CCCB',
		200: '#BCAAA4',
		300: '#A1887F',
		400: '#8D6E63',
		500: '#795548',
		600: '#6D4C41',
		700: '#5D4037',
		800: '#4E342E',
		900: '#3E2723',
	},
}

/** @type { import('tailwindcss/tailwind-config').TailwindConfig } */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {
		extend: {
			boxShadow: {
				'border-sm': '0 0 2px 1px rgb(0 0 0 / 0.1)',
				'border-md': '0 0 8px 1px rgb(0 0 0 / 0.1)',
			}
		},
		container: {
			center: true,
		},
		colors: {
			...defaultColors,
			...additionalColors,
			'primary': '#400030',
			'primary-lighter': '#5e0047',
		},
	},

	plugins: [forms, typography]
};

module.exports = config;
