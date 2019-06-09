import React, { Component } from 'react';
// import { Icon } from 'antd';
// import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import Header from './components/header'
import Content from './components/content';
import Footer from './components/footer'
import axi, { get_photos } from './request/Axios.conf'

class App extends Component {

	constructor(props) {
		super(props)

		let per_page = 9;

		this.state = {
			gallary: {
				photos: [{}],
				// search: null,
				paginationCurrent: 1,
				paginationTotal: null,
				paginationPerPage: per_page * 3,
				per_page: per_page
			}
		}

		this.gallary = {}
		// this.shouldUpdateTotal = true;
		this.prev_search = true;

		this.gallary.onGallaryPageChange = this.onGallaryPageChange.bind(this)
		this.onSearch = this.onSearch.bind(this)
		this.onChange = this.onChange.bind(this)

	}

	render() {
		return (
			<div className="App">
				<div>
					<Header onSearch={this.onSearch} onChange={this.onChange} ></Header>
					<Content
						gallaryHandlers={this.gallary}
						gallary={this.state.gallary}
						className="Content"
					></Content>
					<Footer></Footer>
				</div>
			</div>
		);
	}

	onGallaryPageChange(page) {

		let paginationCurrent = parseInt(page);
		let g = this.state.gallary;
		g.paginationCurrent = paginationCurrent;

		this.setState({
			gallary: g
		})

		// this.getPhotos(page)
	}

	getPhotos(page = 1) {

		let totalArr = [];
		let per_page = this.state.gallary.per_page;

		Promise.all([
			get_photos(axi.usplash, page, per_page, this.state.gallary.search),
			get_photos(axi.pexels, page, per_page, this.state.gallary.search),
			get_photos(axi.pixabay, page, per_page, this.state.gallary.search)
		])
			.then(dataArr => {
				// console.log("dataArr", dataArr);
				let photosArr = dataArr.map(item => item.photos)
				totalArr = dataArr.map(item => item.total)

				return this.mixPhotosFromDiffSources(photosArr)
			})
			.then(photos => {
				let g = this.state.gallary;
				g.photos = photos;

				let total = this.getTotal(totalArr, per_page)
				if (this.state.gallary.search !== this.prev_search) {
					g.paginationTotal = total;
					this.prev_search = this.state.gallary.search;
				}

				g.paginationPerPage = per_page * totalArr.length;

				this.setState({
					gallary: g
				})
				// this.onPhotosChange(photos)
			})
	}

	onSearch(value) {
		console.log(value, this.props);
		let g = this.state.gallary;

		// if (g.search == value)
		// 	this.shouldUpdateTotal = true;
		// else
		// 	this.shouldUpdateTotal = false;

		g.search = value;

		this.setState({
			gallary: g
		})
		if (this.props.location.pathname === '/gallary/1') {
			// this.getPhotos()
		} else {
			if (value && value != '')
				this.props.history.push(`/gallary/1?search=${value}`)
			else
				this.props.history.push('/gallary/1')
		}

	}

	onChange(e) {
		console.log('onInputChangeEvent ', e);

		if (e.target && e.target.value === "") {
			console.log(e.target.value);

			let g = this.state.gallary;
			g.search = null;

			this.setState({
				gallary: g
			})
			// Redirect to page 1
			// this.getPhotos()
		}
	}

	mixPhotosFromDiffSources(photosArr) {
		let len = Math.max(...photosArr.map(arr => arr.length))
		let mixedPhotos = [];

		for (let i = 0; i < len; i++) {
			photosArr.forEach(photos => {
				if (photos[i]) {
					if (photos[i].id) {
						if (typeof (photos[i].id) !== 'string') {
							photos[i].id = photos[i].id.toString();
						}
					}
					mixedPhotos.push(photos[i])
				}
			})

		}

		return mixedPhotos;
	}

	getDesc(item) {

		let desc = ' ';
		if (item.url && typeof (item.url) == "string")
			desc = item.url.match(/photo\/([\w-]+)-\d+/i)[1].replace(/-/ig, ' ')
		if (item.tags && typeof (item.tags) == "string")
			desc = item.tags.replace(/,/ig, '');
		if (item.description)
			desc = item.description

		return desc === ' ' ? desc : desc.charAt(0).toUpperCase() + desc.slice(1);
	}

	getTotal(totalArr) {
		return totalArr.reduce((sum, total) => sum + total, 0);
	}

}

// className="App"

export default App;

let getPhotoDescription = new App().getDesc;
console.log('new Gallary().getDesc');
export { getPhotoDescription }