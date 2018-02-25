import { h } from 'preact'
import { inject, observer } from 'mobx-preact'

import style from './style.scss'

export default inject('uiStore')(observer(({ uiStore: { header } }) => header ? (

	// appearance can be normal || expanded || tiny || hidden
	<header class={style.this} appearance={header.appearance}>
		
		{/* appearance can be hamburger || arrow */}
		<button class={style.navbtn} appearance={header.buttonAppearance} onClick={header.mainAction}>
			<span />
			<span />
			<span />
		</button>

		<h2>{header.title}</h2>

	</header>
) : null))