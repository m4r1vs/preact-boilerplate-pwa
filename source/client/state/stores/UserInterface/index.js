import { observable, action } from 'mobx'

export default new class UiStore {
	@observable title = 'Welcome!'
	@observable counter = 0

	@action inc = () => {
		requestAnimationFrame(() => this.counter++)
	}

	@action setTitle(title) {
		requestAnimationFrame(() => this.title = title + '!')
	}
}