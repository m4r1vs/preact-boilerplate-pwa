import { h, Component } from 'preact'

import Header from './components/Header'
import Router from './views'

import './global.scss'

export default class App extends Component {

	render = () => (
		<div>
			<Header />
			<Router />
		</div>
	)
}