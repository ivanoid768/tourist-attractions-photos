import React from 'react';
import './css/no_photos_found.css'

export default (props) => {
	let text = `No any photo found for search request '${props.search}' :( Try search something else.`;

	return (
		<div className="no_photos_found_cntr">
			<span className="no_photos_found_text">{text}</span>
		</div>
	)
}