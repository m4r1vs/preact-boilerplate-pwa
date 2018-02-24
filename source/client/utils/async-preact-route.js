import { h, Component } from 'preact'

/**
 * @example
 * <AsyncRoute loadFunction={() => import('./component').then(module => module.default)} />
 */
export default class AsyncRoute extends Component {

	constructor() {
		super()
		this.state = {
			componentData: null,
			location: undefined
		}
	}

	loadComponent = () => {

		const componentData = this.props.loadFunction(this.props.url, ({ component }) => {

			if (component) {
				this.setState({
					componentData: component
				})
			}

		}, Object.assign({}, this.props, this.props.matches))

		if (componentData && componentData.then) {

			((url) => {
				componentData.then(component => {
					if (url !== this.props.url) {
						this.setState({ componentData: null }, () => {
							this.loadComponent()
						})
						return
					}
					this.setState({
						componentData: component
					})
				})
			})(this.props.url)
		}
	}

	componentDidMount = () => {
		this.loadComponent()
	}

	componentWillReceiveProps = () => {
		if (document.location.href !== this.state.location) {
			this.setState({ location: document.location.href })
			this.loadComponent()
		}
	}

	render = () => {
		if (this.state.componentData) {
			return h(this.state.componentData, this.props) // smarter to use h() than JSX here
		} else if (this.props.loading) {
			const loadingComponent = this.props.loading()
			return loadingComponent
		}
		return null
	}
}
