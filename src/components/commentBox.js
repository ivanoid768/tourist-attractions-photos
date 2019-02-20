import React, { Component } from 'react';
import NewComment from './add_comment';
import CommentList from './commentList';
import axios from 'axios';
// import { getCookie } from '../utils/cookie_utils'

const api_key = 'LF7U6m6DmxNiw3JrNV3Q8PjITsukfXrihnHriEcyQd5nlbJH8VfbHPVI3PEAmHzZ';
const disqus_forum_id = 'tourist-attractions-photos';

class CommentBox extends Component {

	constructor(props) {
		super(props)

		this.axi = axios.create({
			baseURL: 'https://disqus.com/api/3.0/',
			params: {
				api_key: 'LF7U6m6DmxNiw3JrNV3Q8PjITsukfXrihnHriEcyQd5nlbJH8VfbHPVI3PEAmHzZ',
			},
			method: 'get'
		})

		// this.access_token = getCookie('disqus_access_token');
		// this.getComments(props.photoId)
		// 	.then(comments => {
		// 		console.log(comments);
		// 		if (comments) {
		// 			this.setState({
		// 				comments: comments
		// 			})
		// 		}

		// 	})

		this.state = {
			comments: [],
			hasThread: false,
			thread_id: null
		}

		this.commentsRequestDone = false;

		this.newCommentPosted = this.newCommentPosted.bind(this)

	}

	render() {
		return (
			<div className="comment_box">
				<NewComment
					threadId={this.state.thread_id}
					hasThread={this.state.hasThread}
					photoId={this.props.photoId}
					newCommentPosted={this.newCommentPosted}
				/>
				<CommentList comments={this.state.comments} />
			</div>
		)
	}

	newCommentPosted(comment) {
		console.log('new_comment', comment)

		let comments = this.state.comments;
		comments.push(comment)

		this.setState({
			comments: comments,
			hasThread: true
		})
	}

	getComments(photoId) {

		if (!this.state.thread_id) {
			return Promise.resolve(false)
		}

		return this.axi.get('posts/list.json', {
			params: {
				thread: this.state.thread_id
			}
		})
			.then(resp => {
				console.log('comments', resp.data.response);
				return resp.data.response
			})

	}

	getThread(photoId) {

		if (!this.props.photoId) {
			return Promise.resolve(false)
		}

		let params = {
			forum: disqus_forum_id
		}

		params["thread:ident"] = this.props.photoId;
		console.log(params);

		return this.axi.get(`threads/details.json`, {
			params: params
		}).then(resp => {
			console.log('thread', resp.data);
			return resp.data.response;
		})
			.catch(err => {
				let resp = err.response.data ? err.response.data.response : false;
				if (resp && resp.indexOf('Unable to find thread') != -1) {
					return false;
				}
			})

	}

	componentDidUpdate() {

		console.log('componentDidUpdate', this.state);

		if (!this.state.hasThread) {
			this.getThread(this.props.photoId)
				.then(thread => {
					if (thread) {
						this.setState({
							hasThread: thread.id ? true : false,
							thread_id: thread.id
						})
					}

				})
			// .catch(console.log)
		}

		if (!this.commentsRequestDone) {
			this.getComments()
				.then(comments => {
					if (comments) {
						this.commentsRequestDone = true;
						this.setState({
							comments: comments
						})
					}
				})
		}

	}

}

export default CommentBox;

export { api_key, disqus_forum_id }