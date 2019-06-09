import { UPDATE_SEARCH_STRING } from "../../constants";

export function updateSearch(search) {
	console.log(search);

	return {
		type: UPDATE_SEARCH_STRING,
		search
	}
}