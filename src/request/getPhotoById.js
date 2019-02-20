import axi from './Axios.conf'
import { unifyPhotoInterface } from './Axios.conf'

export default function getPhotoById(id, source_name) {

	// axi.usplash.defaults.params = {

	// };
	// axi.pexels.defaults.params = {};

	// axi.usplash.defaults.baseURL = 'https://api.unsplash.com/photos/';
	// axi.pexels.defaults.baseURL = 'https://api.pexels.com/v1/photos/';

	// axi.pixabay.defaults.params = {

	// };

	// axi.pixabay.defaults.baseURL = '';

	let s_name = source_name.toLowerCase();

	let s_m = {
		unsplash: {
			source: 'usplash',
			url: 'https://api.unsplash.com/photos/'
		},
		pexels: {
			source: 'pexels',
			url: 'https://api.pexels.com/v1/photos/'
		}
	}

	if (s_name == 'unsplash' || s_name == 'pexels') {
		return axi[s_m[s_name].source].request({
			url: s_m[s_name].url + id
		})
			.then(resp => {
				// console.log('unsplash: ', resp.data);
				return unifyPhotoInterface(resp.data);
			})
	} else if (s_name == 'pixabay') {
		return Promise.resolve(false);
	}



}