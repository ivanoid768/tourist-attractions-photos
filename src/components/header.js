import React from 'react';
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import { connect } from 'react-redux';
import { updateSearch } from '../redux/actions/photos'
import MainTitle from './MainTitle'
import MainMenu from './MainMenu'
import './css/header.css'

export const Header = (props) => {

	function onChange(e) {
		if (e.target && e.target.value === "") {
			props.onSearch(e.target.value);
		} else {
			props.onChange(e)
		}
	}

	return (
		<header>
			{/* <Link to='/gallary/1'></Link> */}
			<div className="header-description-bg-wide header-description">
				<MainTitle />
			</div>
			<div className="header-menu-bg-wide header-menu">
				<MainMenu className="main_menu" />
				<div className="search_cntr">
					<Input.Search
						placeholder="Search specific attractions by name, location etc. E.g. Eiffel Tower, Big Ben, Paris"
						onSearch={props.onSearch}
						onChange={onChange}
						size="large"
						allowClear
						enterButton
					></Input.Search>
				</div>
			</div>
		</header>
	)
};

export default connect(null, { onSearch: updateSearch })(Header)