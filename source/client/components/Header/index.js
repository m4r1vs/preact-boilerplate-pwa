import { h } from 'preact'
import { inject, observer } from 'mobx-preact'

import style from './style.scss'

export default inject('uiStore')(observer(({ uiStore: { title } }) => (
	<header class={style.this}>
		<h2>{title}</h2>
	</header>
)))