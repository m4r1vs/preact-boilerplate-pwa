import { h, Component, cloneElement } from 'preact'
import { observer, inject } from 'mobx-preact'

@inject('uiStore') @observer
export default class ViewWrapper extends Component {
	componentDidMount = () => this.props.uiStore.handleRouteChange(this.props)
	componentDidUpdate = prevProps => {
		if (prevProps.path !== this.props.path) this.props.uiStore.handleRouteChange(this.props)
	}
	render = ({ children, padding }) => <div transition="fadeIn" style={{
		padding: padding ? '12px 8px' : 'none'
	}}>{cloneElement(children[0], { ...this.props })}</div>
}