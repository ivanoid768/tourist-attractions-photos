import React, { Component } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie_utils'
import { api_key, disqus_forum_id } from './commentBox';
import './css/new_comment.css'

const { TextArea } = Input;

class NewComment extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isAuthenticated: false,
			comment_value: 'Please, type comment here...'
		}

		this.access_token = null;

		this.axi = axios.create({
			baseURL: 'https://disqus.com/api/3.0/',
			params: {
				api_key: 'LF7U6m6DmxNiw3JrNV3Q8PjITsukfXrihnHriEcyQd5nlbJH8VfbHPVI3PEAmHzZ',
			},
			method: 'post'
		})

		this.postComment = this.postComment.bind(this);
		this.createThread = this.createThread.bind(this);
		this.onCommentChange = this.onCommentChange.bind(this);

	}

	render() {

		// let must_auth_text = 'You must be authorized to live comments'

		return (
			<div>
				{this.state.isAuthenticated ? (
					<div className="new_comment_cntr">
						<TextArea
							value={this.state.comment_value}
							autosize={{ minRows: 2, maxRows: 8 }}
							cols="50"
							onChange={this.onCommentChange}
							onPressEnter={this.postComment}
							className="new_comment_textarea"
						/>
						<div className="new_comment_btn_cntr">
							<Button onClick={this.postComment} className="post_comment_btn">Post</Button>
						</div>
					</div>
				) : (
						<div className="new_comment_cntr">
							<div className="auth_redirect_cntr">
								<a onClick={this.AuthorizeRedirect} href="#" className="authorize_redirect">Sign In Disqus</a> to leave comments.
							</div>
						</div>
					)}
			</div>
		)
	}

	AuthorizeRedirect(e) {
		e.preventDefault()
		// console.log(document.cookie);
		let pathname = window.location.pathname;
		deleteCookie('pre_redirect_pathname')
		setCookie('pre_redirect_pathname', pathname, { expires: 24 * 3600 * 1000, path: '/' })
		// console.log(document.cookie);
		// debugger

		window.location.assign(`https://disqus.com/api/oauth/2.0/authorize/?client_id=${api_key}&scope=read,write&response_type=code&redirect_uri=http://localhost:4000/disqus_api/access_token/`)
	}

	createThread() {
		let id = this.props.photoId;

		return this.axi.request({
			url: 'threads/create',
			params: {
				access_token: this.access_token,
				forum: disqus_forum_id,
				title: id,
				identifier: id

			}
		})
			.then(resp => {
				if (resp.data.code == 0) {
					return resp.data.response;
				} else {
					return false;
				}

			})

	}

	postComment() {

		let self = this;

		function postComment(thread_id) {
			return self.axi.request({
				url: 'posts/create',
				params: {
					access_token: self.access_token,
					thread: thread_id,
					message: self.state.comment_value
				}
			})
				.then(resp => {
					if (resp.data.code == 0) {
						self.props.newCommentPosted(resp.data.response)
						self.setState({
							comment_value: ''
						})
						return resp.data.response;
					} else {
						return false;
					}

				})
		}

		if (!this.props.hasThread) {
			return this.createThread().then(response => {
				let thread_id = response.id;
				return postComment(thread_id)

			})
		} else {
			return postComment(this.props.threadId)
		}


	}

	onCommentChange(e) {
		this.setState({
			comment_value: e.target.value
		})
	}

	componentDidMount() {

		let access_token = getCookie('disqus_access_token')

		if (access_token) {
			this.access_token = access_token;
			this.setState({
				isAuthenticated: true
			})
		}

	}

}

export default NewComment;