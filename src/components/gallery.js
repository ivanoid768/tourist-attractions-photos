import React, { Component } from 'react'
import { List, Card, Pagination, Input } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { connect } from 'react-redux';
import { getPhotoDescription } from '../App'
import NoPhotosFound from './notices/NoPhotosFound'
import './css/gallary.css'

class Gallary extends Component {

	constructor(props) {
		super(props)

		console.log(props);

		this.prev_page = props.match.params.page;

		this.paginationItemRender = this.paginationItemRender.bind(this)
	}

	render() {
		if (this.props.photos && this.props.photos.length > 0) {
			// console.log('Photos: ', this.props.photos);

			return (
				<div style={{ textAlign: 'initial' }} >
					<div>
						<Pagination
							onChange={(page) => {
								// console.log('Pagination_onChange: ', page);
							}}
							current={this.props.paginationCurrent}
							pageSize={this.props.paginationPerPage}
							total={this.props.paginationTotal}
							itemRender={this.paginationItemRender}
							className="pagination-cntr"
						/>
						<List
							grid={{
								gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 3, xxl: 3,
							}}
							dataSource={this.props.photos}
							// rowKey={record => record.id}
							renderItem={item => (
								<List.Item>
									<Link to={`/photo/${item.source}:${item.id}`}>
										<Card hoverable title={<span title={item.name}>{item.name}</span>} >
											<div
												style={{
													backgroundImage: `url(${item.thumbnail})`
												}}
												className="photo_cntr">
											</div>
										</Card>
									</Link>
								</List.Item>
							)}
						/>
						<Pagination
							current={this.props.paginationCurrent}
							pageSize={this.props.paginationPerPage}
							total={this.props.paginationTotal}
							itemRender={this.paginationItemRender}
							className="pagination-cntr"
						/>
					</div>
				</div >
			)

		} else {
			return (
				<div style={{ textAlign: 'initial' }} >
					<div>
						<NoPhotosFound search={this.props.search} />
					</div>
				</div>
			)
		}
	}

	componentDidMount() {
		// console.log(this.props);

		let page = this.props.match.params.page;

		this.props.onGallaryPageChange(page)

	}

	componentDidUpdate() {
		// console.log('Gallary:componentDidUpdate', this.props.match.params.page);
		let page = this.props.match.params.page;

		if (page !== this.prev_page) {
			this.prev_page = page;
			// this.paginationCurrent = parseInt(page);
			this.props.onGallaryPageChange(page)
		}

	}

	paginationItemRender(page, type, origEl) {
		// console.log(page, type, origEl);
		if (page > 0) {
			if (type === 'page') {
				return (
					<Link to={`/gallary/${page}`} ><div className="pagination-page-cntr">{page}</div></Link>
				);
			} else if (['next', 'prev'].indexOf(type) !== -1) {
				return <Link to={`/gallary/${page}`} className="ant-pagination-item-link" >{origEl.props.children}</Link>
			}
			else {
				// console.log(page, type, origEl, origEl.props.children);
				// origEl.href = `/gallary/${page}`;
				return (
					<Link to={`/gallary/${page}`} >{origEl.props.children}</Link>
				)
			}
		} else {
			return origEl;
		}

	}


}

const GQLGallary = (props) => {
	// console.log(props);

	return (
		<Query
			variables={{
				page: props.paginationCurrent,
				per_page: props.per_page,
				search: props.search
			}}
			query={gql`
		query Photos($page: Int = 1, $per_page: Int = 3, $search: String = ""){
			photos(page: $page, per_page: $per_page, search: $search) {
				total
			  	results {
					id
					name
					source
					thumbnail
			  	}
			}
		}
	  `}
		>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;

				return <Gallary {...props} photos={data.photos.results} paginationTotal={data.photos.total} />
			}}
		</Query>
	)
};


export default connect(store => {
	return {
		search: store.photoReducer.search
	}
})(GQLGallary);