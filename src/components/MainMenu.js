import React from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'antd';
import './css/main_menu.css'

export default (props) => {
	return (
		<div className={props.className}>
			{/* <div className="menu_item_cntr"> */}
			<Link to="/" className="menu_item menu_home">
				<Icon style={{ fontSize: '25px' }} theme="filled" type="home" />
			</Link>
			<Link to="/about" className="menu_item menu_about">About</Link>
			{/* </div> */}
		</div>
	)
}