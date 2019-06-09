import { UPDATE_SEARCH_STRING } from "../../constants";

const initialState = {
	search: ''
}

export function photoReducer(state = initialState, action) {
	let { type, search } = action;
	console.log(state, type, search);

	switch (type) {
		case UPDATE_SEARCH_STRING:
			return {
				...state,
				search
			}

		default:
			return state;
	}
}