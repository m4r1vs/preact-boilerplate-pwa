import { observable, action } from 'mobx'

export default class Header {
	@observable background
	@observable path
	@observable primaryColor

	@action change = details => {
		this.background = details.background
		this.path = details.path
		this.primaryColor = details.primaryColor
		
		const themeColor = document.querySelector('meta[name=theme-color]')
		themeColor.setAttribute('content', this.primaryColor)

		document.documentElement.style.setProperty(`--background-color`, this.background)
		document.documentElement.style.setProperty(`--primary-color`, this.primaryColor)
	}
}