import axios from 'axios';

const baseQuery = `tourist+attraction`;

export default {
	usplash: fromUnsplash(),
	pexels: fromPexels(),
	pixabay: fromPixabay()
}

export { getPhotos as get_photos };

function fromUnsplash() {
	const access_key = '0f349dea9c68a0c54614aa914b044480402bb816fa0cc21820ab83dcaa371b40';
	const axi = axios.create({
		baseURL: 'https://api.unsplash.com/search/photos',
		// baseURL: 'http://localhost:5000/unsplash_tourist_attraction.json',
		params: {
			query: baseQuery, // 'tourist%20attraction'
			order_by: 'popular' // Added for consistancy because Pixabay returns photos ordered by popularity (but there is no info how ordered photos from Pexels)
		},
		headers: {
			common: {
				Authorization: 'Client-ID ' + access_key
			}
		}
	})

	axi.photo_list_name = 'results';
	// axi.photo_img_name = 'urls.thumb';
	axi.photo_img_name = 'urls.small';
	axi.total_photos = 'total';

	return axi;
}

function fromPexels() {
	const access_key = '563492ad6f9170000100000187d04447c7094a5c96e0dfd7119b3e7a';
	const axi = axios.create({
		baseURL: 'https://api.pexels.com/v1/search',
		// baseURL: 'http://localhost:5000/pexels_tourist_attraction.json',
		params: {
			query: `"tourist attraction"` // 'tourist%20attraction'
		},
		headers: {
			common: {
				Authorization: access_key
			}
		}
	})

	axi.photo_list_name = 'photos';
	axi.photo_img_name = 'src.tiny';
	axi.total_photos = 'total_results';

	return axi;
}

function fromPixabay() {
	const access_key = '11215352-991ab9a42a02be2db12b85705';

	const axi = axios.create({
		baseURL: 'https://pixabay.com/api/',
		// baseURL: 'http://localhost:5000/pixabay_tourist_attraction.json',
		params: {
			key: access_key,
			q: baseQuery, // 'tourist%20attraction'
			image_type: 'photo'
		}
	})

	axi.photo_list_name = 'hits';
	// axi.photo_img_name = 'previewURL';
	axi.photo_img_name = 'webformatURL';
	axi.total_photos = 'total';

	return axi;
}

function getPhotos(source, page = 1, per_page = 20, search = null) {

	let total;

	let params = {
		page: page,
		per_page: per_page
	}

	if (search) {
		// console.log(source.defaults)
		let sParams = source.defaults.params;
		// let queryVal = sParams.query || sParams.q;
		let qName = sParams.query ? 'query' : 'q';
		// queryVal = queryVal.replace(/"$/ig, '')
		let s = search.replace(/\s+/gi, '+');
		// params[qName] = `${queryVal}+${s}"`;
		params[qName] = `${s}`;

		if (source.photo_img_name == 'src.tiny') {
			params[qName] = params[qName].replace(/\+/ig, ' ')
		}

		// console.log('Search query: ', params[qName]);
	}

	return source.get(null, {
		params: params
	})
		.then(result => {
			//console.log(result);
			total = result.data[source.total_photos];

			return result.data[source.photo_list_name];
		})
		.then(photos => {

			photos.forEach(photo => {
				setThumbnail(photo, source.photo_img_name)
				unifyPhotoInterface(photo)
			})

			return { photos, total: parseInt(total) };
		})
		.catch(err => {
			console.log('getPhoto:Error ', err)
			return { photos: [], total: 0 }
		})
}

function setThumbnail(photo, img_name) {

	let img_path = img_name.split('.');

	let thumb_img = img_path.reduce((prev, curr) => {
		return prev[curr];
	}, photo)

	photo.thumbnail_img = thumb_img

	return photo;
}

function unifyPhotoInterface(photo) {
	// let author_link
	// let author_name
	// let source_link
	// let source_name
	// let main_image_link

	if (photo.total_results)
		photo.total = photo.total_results;

	if (photo.photographer_url)
		photo.author_link = photo.photographer_url;
	else if (photo.user_id)
		photo.author_link = 'https://pixabay.com/en/users/' + photo.user_id;
	else if (photo.user && photo.user.links && photo.user.links.html)
		photo.author_link = photo.user.links.html;

	if (photo.photographer)
		photo.author_name = photo.photographer;
	else if (photo.user && typeof (photo.user) == 'string')
		photo.author_name = photo.user;
	else if (photo.user && typeof (photo.user) == 'object' && photo.user.name)
		photo.author_name = photo.user.name;

	if (photo.url)
		photo.source_link = photo.url;
	else if (photo.pageURL)
		photo.source_link = photo.pageURL; // str2.match(/\/([^/]+)(?:\/)$/i)[1]
	else if (photo.links && photo.links.html)
		photo.source_link = photo.links.html; //  str.match(/photos\/(.+)(?:\/|)$/i)[1]

	let source_name = photo.source_link.match(/http(?:s|):\/\/(?:www.|)([a-zA-Z]+).com/i)[1]
	photo.source_name = source_name.replace(source_name.charAt(0), source_name.charAt(0).toUpperCase());

	if (photo.src && photo.src.large2x)
		photo.main_image_link = photo.src.large2x;
	else if (photo.largeImageURL)
		photo.main_image_link = photo.largeImageURL;
	else if (photo.urls && photo.urls.regular)
		photo.main_image_link = photo.urls.regular;

	return photo;

}

export const ax_usplash = fromUnsplash();
export const ax_pexels = fromPexels();
export const ax_pixabay = fromPixabay();

export { unifyPhotoInterface }