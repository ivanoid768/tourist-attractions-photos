import React from 'react';
import './css/main_title.css'

export default (props) => {

	let title = `Best Tourist Attractions photos from best free photo sites`;

	return (
		<div className="main_title">
			<div className="title_cntr">
				<div className="title">{title}</div>
			</div>
			<div className="logo_cntr">
				<div className="logo">
					<a href="https://pixabay.com/" rel="noopener noreferrer" target="_blank" >
						<img src="/tourist-attractions-photos/imgs/logo_square.png" alt="" className="logo_img" />
					</a>

				</div>
				<div className="logo">
					<a href="https://unsplash.com/" rel="noopener noreferrer" target="_blank" >
						<img src="/tourist-attractions-photos/imgs/tbvbvipimh2camf5nb2q.webp" alt="" className="logo_img" />
					</a>
				</div>
				<div className="logo">
					<a href="https://www.pexels.com/" rel="noopener noreferrer" target="_blank" >
						<img src="/tourist-attractions-photos/imgs/Pexels_log.svg" alt="" className="logo_img" />
					</a>
				</div>
			</div>
		</div>
	)
}