import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Gallery from './gallery';
import ImagePage from '../pages/imagePage';
import './css/content.css'
import About from './About';

class Content extends Component {

	constructor(props) {
		super(props)

		let photoCache = window.localStorage.getItem('photoCache')

		if (photoCache)
			photoCache = JSON.parse(photoCache)
		else
			photoCache = {};

		this.state = {
			photos: [],
			photoCache: photoCache
		}

		this.onPhotosChange = this.onPhotosChange.bind(this)
		this.onPhotoCacheUpdate = this.onPhotoCacheUpdate.bind(this)

	}

	render() {
		return (
			<div className="content">
				{/* <h1>Content Body Main</h1> */}
				<Switch>
					<Redirect exact from='/' to='/gallary/1' />
					<Route path="/gallary/:page" render={props => <Gallery
						{...this.props.gallary}
						{...this.props.gallaryHandlers}
						{...props}
						onPhotosChange={this.onPhotosChange}
					/>} />
					<Route exact path="/gallary" render={props => <Gallery {...props} onPhotosChange={this.onPhotosChange} />} />
					<Route path="/photo/:id" render={props => <ImagePage
						{...props}
						photos={this.props.gallary.photos}
						onPhotoCacheUpdate={this.onPhotoCacheUpdate}
						photoCache={this.state.photoCache}
					/>} />
					<Route exact path="/" component={() => (<h1>Homepage</h1>)} />
					<Route exact path="/about" component={About} />
				</Switch>
			</div>
		);
	}

	onPhotosChange(photos) {
		this.setState({
			photos: photos
		})
	}

	onPhotoCacheUpdate(photo, id) {

		let phc = this.state.photoCache;
		phc[id] = photo;

		window.localStorage.setItem('photoCache', JSON.stringify(phc))

		this.setState({
			photoCache: phc
		})

		console.log(this.state.photoCache);

	}

	// componentDidMount() {
	// 	let photoCache = window.localStorage.getItem('photoCache')

	// 	if (photoCache) {
	// 		photoCache = JSON.parse(photoCache)

	// 		this.setState({
	// 			photoCache: photoCache
	// 		})
	// 	}

	// }

}

export default Content;