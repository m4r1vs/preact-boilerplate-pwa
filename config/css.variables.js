/**
 *
 * These variables can be accesed within CSS like this:
 * color: var(--main-color)
 *
 * and within JavaScript like this:
 * style={{
 * 	color: process.env.colors['main-color']
 * }}
 *
 */

/**
 * @module CSSVariables - ALl CSS variables used in styles is collected here.
 */
module.exports = {
	'background-color': '#FAFAFA',
	'primary-color': '#175854',
	'accent-color': '#FFC730',

	'color--red': '#BA090C',
	'color--orange': '#FFC730',
	'color--green': '#2FC10B',
	'color--blue': '#2196F3',
	'color--grey': '#707173',
	'color--light-grey': '#A7A9AC',
	'color--dark-grey': '#2E2F31',

	'font-stack': '"Roboto Light", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',

	'text-color-light-primary': 'rgba(255,255,255,.87)',
	'text-color-light-secondary': 'rgba(255,255,255,.57)',
	'text-color-light-bold': '#fff',
	'text-color-dark-primary': '#2E2F31',
	'text-color-dark-secondary': '#A7A9AC',
	'text-color-dark-bold': '#2E2F31',

	'box-shadow-lvl-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
	'box-shadow-lvl-2': '0 5px 5px rgba(0, 0, 0, 0.16), 0 3px 3px rgba(0, 0, 0, 0.23)',
	'box-shadow-lvl-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
	'box-shadow-lvl-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
}
