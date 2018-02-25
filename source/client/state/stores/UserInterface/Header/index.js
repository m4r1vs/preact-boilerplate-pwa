import { observable, action, computed } from 'mobx'
import logger from '../../../../utils/logger'

export default class Header {
	@observable title
	@observable appearance
	@observable buttonAppearance

	@computed get mainAction() {
		if (!this.buttonAppearance) return null
		switch (this.buttonAppearance) {
			case 'hamburger':
				return window.navigationDrawer
					? window.navigationDrawer.open
					: () => logger.error('Shit. Navigation Drawer component did not uitlize the window.navigationDrawer property')
			case 'arrow':
				return () => window.history.back()
			default:
				logger.error('Unexpected button appearance passed to header state: ', this.buttonAppearance)
		}
	}

	@action change = details => {
		this.title = details.title
		this.appearance = details.appearance
		this.buttonAppearance = details.buttonAppearance
		switch (this.appearance) {
			case 'hidden':
				window.navigationDrawer.disabled = false
				document.documentElement.style.setProperty(`--app-margin-top`, '0px')
				break
			case 'expanded':
				window.navigationDrawer.disabled = true
				document.documentElement.style.setProperty(`--app-margin-top`, '132px')
				break
			case 'normal':
				window.navigationDrawer.disabled = false
				document.documentElement.style.setProperty(`--app-margin-top`, '56px')
				break
			default:
				logger.error('Unexpected appearance passed to header state: ', this.appearance)
		}
	}
}