import { observable, action } from 'mobx'
import Header from './Header'
import Route from './Route'

export default new class UiStore {
	@observable header = new Header()
	@observable route = new Route()

	@action handleRouteChange = details => {
		this.route.change({
			background: details.background,
			path: details.path,
			primaryColor: details.primaryColor
		})
		this.header.change({
			title: details.header.title,
			appearance: details.header.appearance,
			buttonAppearance: details.header.buttonAppearance
		})
	}
}