import 'regenerator-runtime/runtime'
import { h, render } from 'preact'
import polyfill from 'dynamic-polyfill'
import { Provider } from 'mobx-preact'

// own imports
import initializeState from './state/initialize-state'
import App from './app'
import Stores from './state/stores'

if (process.env.NODE_ENV === 'development') require('preact/debug')

if (process.env.NODE_ENV === 'production') console.log('%cDo not paste anything in here unless you know what it means!', 'font: 3em sans-serif; color: red; background-color: white; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;')
else console.log(`%cWelcome to the development build of ATTACH web platform version ${process.env.APP_VERSION}. Logging is enabled. In order to switch to the production build, set DEBUG to false.`, 'font: 2em sans-serif; color: #66a001;')

/**
 * Mount the application to document.body.
 */
const mountApp = () => initializeState() && render(
	<Provider {...Stores}>
		<App />
	</Provider>,
	document.body
)

/**
 * If NODE_ENV production add polyfills depending on browser used.
 */
if (process.env.NODE_ENV === 'production') {
	polyfill({
		fills: process.env.CONFIG.polyfills,
		rum: false,
		afterFill: () => mountApp()
	})
} else mountApp()
