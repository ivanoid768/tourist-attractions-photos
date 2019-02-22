import React from 'react';
import './css/about.css'

export default (props) => {
	return (
		<div className="about_cntr">
			<div className="about_lang_cntr">
				<span className="about_lang">EN</span>
				<div className="about_description">
					The site lets you to search for the best photos of Tourist Attractions from three top free photo stock resouces <a
						href="https://unsplash.com" rel="noopener noreferrer" target="_blank" >Unsplash</a>, <a rel="noopener noreferrer" target="_blank" href="https://pixabay.com">Pixabay</a>, <a rel="noopener noreferrer" target="_blank" href="https://pexels.com">Pexels</a>.
					Also you can leave comment to some photo via <a rel="noopener noreferrer" target="_blank" href="https://disqus.com">Disqus</a>.
			</div>
			</div>
			<div className="about_lang_cntr">
				<span className="about_lang">RU</span>
				<div className="about_description">
					Данный сайт позволяет получить лучшие фотографии мировых достопремечательностей сразу с трёх источников <a rel="noopener noreferrer" target="_blank" href="https://unsplash.com">Unsplash</a>, <a
						href="https://pixabay.com" rel="noopener noreferrer" target="_blank" >Pixabay</a>, <a rel="noopener noreferrer" target="_blank" href="https://pexels.com">Pexels</a>.
				А так же позволяет оставлять свое мнение насчёт фотографии с помощью сервиса <a rel="noopener noreferrer" target="_blank" href="https://disqus.com">Disqus</a>.
				</div>
			</div>
			<div className="about_dev_cntr">
				<div className="about_photo"></div>
				<div className="about_desc_cont_cntr">
					<div className="about_dev_description_en">
						<span className="about_lang">EN</span>
						Hi, I'm Ivan. I'm software developer. I have developed many Web-App and Web-Services in last 3 years so I have a
						lot of experience. Programming is my profession my hobby and my passion. Contact me, and I'll bring you ideas to
						life!
				</div>
					<div className="about_dev_description_ru">
						<span className="about_lang">RU</span>
						Приветствую. Меня зовут Иван. Я разрабатываю Веб-приложения и Веб-сервисы уже более 3-х лет. Программирование для
						меня не только профессия, но и
						мое увлечение. Свяжитесь со мной по приведённым ниже контактам и ваша идея будет вполощена качественно и в срок.
				</div>
					<div className="about_dev_contacts">
						<div className="contact contacts_title">Contacts: </div>
						<a href="mailto:ivanoid256@india.com" className="contact">E-mail</a>
						<a href="https://github.com/ivanoid768" rel="noopener noreferrer" target="_blank" className="contact">Github</a>
					</div>
				</div>
			</div>
		</div>
	)
}