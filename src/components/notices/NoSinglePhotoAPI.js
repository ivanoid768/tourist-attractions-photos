import React from 'react';
import './css/no_single_photo_from_pexels.css'

export default (props) => {

	let text = `Right now we can't request for the photo to the Pixabay`;
	let getThePageText = `To get the photo, please, visit `;

	//But you always can visit the photo's page on the pexels.com by link down below.`

	return (
		<div className="no_single_photo_from_pexels_cntr">
			<div className="no_single_photo_from_pexels_text_cntr">
				<div className="no_single_photo_from_pexels_text">{text}</div>
				<div className="nspfp_link_cntr">
					{getThePageText} <a href={props.href} rel="noopener noreferrer" target="_blank" className="no_single_photo_from_pexels_link">Pixabay.com</a>
				</div>
			</div>
		</div>
	)
}