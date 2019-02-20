import { setCookie, getCookie } from '../utils/cookie_utils'

function redirectIfDisqusAccessToken() {

	let access_token = window.location.search.match(/access_token=([^\s=&]+)/i);

	if (access_token) {

		access_token = access_token[1];

		setCookie('disqus_access_token', access_token, { expires: 7 * 24 * 3600000 })

		let pathname = getCookie('pre_redirect_pathname')
		console.log('pre_redirect_pathname', pathname);


		if (pathname) {
			window.history.pushState(null, null, window.location.origin + pathname)
		}

	}

}

export { redirectIfDisqusAccessToken }