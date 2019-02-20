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
					<a href="https://pixabay.com/">
						<img src="/imgs/logo_square.png" alt="" className="logo_img" />
					</a>

				</div>
				<div className="logo">
					<a href="https://unsplash.com/">
						<img src="/imgs/tbvbvipimh2camf5nb2q.webp" alt="" className="logo_img" />
					</a>
				</div>
				<div className="logo">
					<a href="https://www.pexels.com/">
						<img src="/imgs/Pexels_log.svg" alt="" className="logo_img" />
					</a>
				</div>
			</div>
		</div>
	)
}