import { Component } from 'preact'
import { route } from 'preact-router'

export default class Redirect extends Component {

	componentWillMount() {
		if (this.props.to.substring(0, 1) !== '/') route(location.pathname + (location.pathname.slice(-1) === '/' ? '' : '/') + this.props.to, true)
		else route(this.props.to, true)
	}

	render() {
		return null
	}
}
