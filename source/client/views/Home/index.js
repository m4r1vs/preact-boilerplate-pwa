import { h, Component } from 'preact'
import { observer, inject } from 'mobx-preact'

import style from './style.scss'

@inject('uiStore') @observer
export default class Home extends Component {
	
	chngTitle = () => this.props.uiStore.setTitle('Hello World')

	render = ({ uiStore }) => (
		<div class={style.this}>
			<h1>{uiStore.title}</h1>
			<button onClick={uiStore.inc}>{uiStore.counter}</button>
			<button onClick={this.chngTitle}>Change title</button>
		</div>
	)

}