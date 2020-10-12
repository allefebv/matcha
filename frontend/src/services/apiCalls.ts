import { fetchApi } from "./fetchApi";
import * as constants from "../services/constants";
import { user, Iprofile } from "../types/types";

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
	return fetchApi<{ profile: Iprofile }>(
		constants.URL + constants.URI_GET_PROFILE,
		{
			method: constants.GET_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
		}
	);
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
			"Content-Type": "multipart/form-data",
			token: token,
		},
		body: details,
		credentials: "include",
	});
};

export const handleProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_HANDLE_PROFILE, {
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
		//TODO: hardcode
		body: JSON.stringify({ tagList: ["moto", "voiture"] }),
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
