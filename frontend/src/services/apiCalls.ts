import { fetchApi } from "./fetchApi";
import * as constants from "../services/constants";
import { user, Iaddress, IextendedProfile } from "../types/types";
import { throttle } from "lodash";

export const signupAPI = (details: Object) => {
	return fetchApi<{ user: user; token: string }>(
		constants.URL + constants.URI_SIGNUP,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
			},
			body: details,
		}
	);
};

export const signinAPI = (details: Object) => {
	return fetchApi<{ user: user; token: string }>(
		constants.URL + constants.URI_SIGNIN,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
			},
			body: details,
		}
	);
};

export const deleteAPI = (details: Object, token: string) => {
	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_DELETE_ACCOUNT,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			body: details,
			credentials: "include",
		}
	);
};

export const getProfileAPI = (token: string) => {
	return fetchApi<{
		profile: IextendedProfile;
		tag: string[] | [];
		location: Iaddress | null;
	}>(constants.URL + constants.URI_GET_PROFILE, {
		method: constants.GET_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
	});
};

export const getRecommendationAPI = (token: string) => {
	return fetchApi<
		{
			profile: {
				profile: IextendedProfile;
				tag: string[] | [];
				location: Iaddress | null;
			};
			score: number;
		}[]
	>(constants.URL + constants.URI_GET_RECOMMENDATIONS, {
		method: constants.GET_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
	});
};

export const modifyEmailAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_UPDATE_EMAIL, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		body: details,
		credentials: "include",
	});
};

export const modifyPasswordAPI = (details: Object, token: string) => {
	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_MODIFY_PASSWORD,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
			body: details,
		}
	);
};

export const postPicturesAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_POST_PICTURES, {
		method: constants.POST_METHOD,
		headers: {
			token: token,
		},
		body: details,
		credentials: "include",
	});
};

export const createProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_CREATE_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const updateProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_UPDATE_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const postTagsAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_POST_TAGS, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const activateAccountAPI = (details: Object) => {
	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_ACTIVATE_ACCOUNT,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
			},
			body: details,
		}
	);
};

export const handleGeoLocationAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_HANDLE_GEOLOCATION, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const handleUsageLocationAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_HANDLE_USAGELOCATION, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const getTagAutocompleteAPI = (details: Object, token: string) => {
	return fetchApi<string[]>(
		constants.URL + constants.URI_GET_TAG_AUTOCOMPLETE,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
			body: details,
		}
	);
};

const createAddressFromBody = (body: any[]): Iaddress[] | null => {
	if (body && body.length) {
		const filtered: any[] = body.filter((entry) => entry && entry.address);
		return filtered.map((entry: any) => {
			const { address } = entry;
			return {
				city: address.name ? address.name : null,
				countryCode: address.country_code ? address.country_code : null,
				postCode: address.postcode ? address.postcode : null,
				country: address.country ? address.country : null,
				isFromGeolocation: false,
				lat: null,
				lng: null,
			};
		});
	}
	return null;
};

export const autocompleteLocationAPI = async (input: string) => {
	return fetchApi<any[]>(
		constants.URI_AUTOCOMPLETE_API +
			constants.LOCATION_IQ_API_KEY +
			"&q=" +
			encodeURIComponent(input) +
			"&" +
			constants.PARAMETERS_AUTOCOMPLETE_API,
		{
			method: constants.GET_METHOD,
		}
	).then((json: any[]) => {
		return createAddressFromBody(json);
	});
};
