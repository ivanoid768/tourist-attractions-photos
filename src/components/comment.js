import React from 'react';
import './css/comment.css'

export default function Comment(props) {

	let comment = props.commentData;

	return (
		<li className="comment">
			<div className="comment_attrs">
				<div className="comment_author">{comment.author.name}</div>
				<div className="comment_created_at">{comment.createdAt}</div>
			</div>
			<div className="comment_message">{comment.raw_message}</div>
			{comment.parent && (<div className="comment_replay">
				<b>The replay to the: </b>
				<a href={`#${comment.parent.id}`}>{comment.parent.id}</a>
			</div>)}
		</li>
	)
}