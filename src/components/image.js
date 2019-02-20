import React from 'react'
import './css/image.css'
import { getPhotoDescription } from '../App'

export default (props) => {
	return (
		<div>
			<div className="image_header_cntr">
				<div className="img_author_cntr">
					Photographed by <a href={props.author_link} className="image_author" rel="noopener noreferrer" target="_blank" >{props.author_name}</a>
				</div>
				<div className="img_source_cntr">
					Provided by <a className="image_source_link" href={props.source_link} rel="noopener noreferrer" target="_blank" ><b>{props.source_name}</b></a>
				</div>
			</div>
			<img border="0" className="main_image" alt={props.main_image_link} src={props.main_image_link}>
			</img><div className="img_description">{getPhotoDescription(props)}</div>
		</div>
	)
}