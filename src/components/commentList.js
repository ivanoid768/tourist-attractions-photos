import React from 'react';
import Comment from '../components/comment';
import './css/comment-list.css'

export default function (props) {

	let comments = props.comments.map((comment, idx) => {
		return (
			<Comment commentData={comment} key={idx} ></Comment>
		)
	})

	return (
		<ul className="comments_cntr">
			{comments}
		</ul>
	)
}