import { observable, useStrict } from 'mobx'
import { enableLogging } from 'mobx-logger'
useStrict()

// debugging:
if (process.env.CONFIG.logLevel === 'DEBUG') enableLogging()

import UiStore from './UserInterface'

// don't forget to add the routes to <Provider /> as well!
export default new class Stores {
	@observable uiStore = UiStore
}
