import React, { Component } from 'react'
import { List, Card, Pagination, Input } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { getPhotoDescription } from '../App'
import NoPhotosFound from './notices/NoPhotosFound'
import './css/gallary.css'

class Gallary extends Component {

	constructor(props) {
		super(props)

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
									<Link to={`/photo/${item.source_name}:${item.id}`}>
										<Card hoverable title={<span title={getPhotoDescription(item)}>{getPhotoDescription(item)}</span>} >
											<div
												style={{
													backgroundImage: `url(${item.thumbnail_img})`
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

export default Gallary;