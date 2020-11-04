/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileUtils.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 17:29:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/03 20:12:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
	actionProfilesList_getRecco,
	actionProfilesList_getSearch,
} from "../store/profilesLists/action";
import { actionUi_showSnackbar } from "../store/ui/action";
import {
	actionUser_setProfile,
	actionUser_setTagList,
	actionUser_usagelocation,
} from "../store/user/action";
import { Iaddress, Iprofile } from "../types/types";
import {
	createProfileAPI,
	getAllProfilesAPI,
	getProfileAPI,
	getRecommendationAPI,
	handleUsageLocationAPI,
	postPicturesAPI,
	postTagsAPI,
	updateProfileAPI,
} from "./apiCalls";

export const getProfileLevel = (
	profile: Iprofile,
	location: Iaddress | null,
	tagList: string[]
) => {
	if (
		!profile ||
		!profile.username ||
		!profile.firstname ||
		!profile.lastname ||
		!profile.dob
	) {
		return 0;
	} else if (
		!profile.gender ||
		!profile.sexualOrientation ||
		!profile.bio ||
		!location ||
		!tagList ||
		tagList.length === 0
	) {
		return 1;
	} else {
		return 2;
	}
};

export const isProfileEmpty = (
	profile: Iprofile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 0;
};

export const isProfileBase = (
	profile: Iprofile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 1;
};

export const isProfileComplete = (
	profile: Iprofile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 2;
};

export const getAge = (dob: number) => {
	const diff = Date.now() - new Date(dob).getTime();
	const age = new Date(diff);
	return Math.abs(age.getUTCFullYear() - 1970);
};

export const submitPictures = async (
	imgs: (string | null)[],
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	const data = new FormData();
	await Promise.all(
		imgs.map(async (img, index) => {
			if (img !== null) {
				await fetch(img)
					.then((response) => response.blob())
					.then((blob) => {
						data.append(
							"img" + index,
							new File([blob], "img" + index, {
								type: "image/jpg",
							})
						);
					});
			}
		})
	);

	if (imgs.some((img) => img !== null)) {
		return postPicturesAPI(data, token).catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
	}
};

export const updateProfile = async (
	profile: Iprofile,
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	return updateProfileAPI(profile, token)
		.then((json: any) => {
			dispatch(actionUser_setProfile({ profile: json }));
			dispatch(
				actionUi_showSnackbar({
					message: "Your profile has been updated",
					type: "success",
				})
			);
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};

export const createProfile = async (
	profile: Iprofile,
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	const {
		geoLocationAuthorization,
		gender,
		sexualOrientation,
		bio,
		...rest
	} = profile;
	return createProfileAPI(rest, token)
		.then((json: any) => {
			dispatch(actionUser_setProfile({ profile: json }));
			dispatch(
				actionUi_showSnackbar({
					message: "Your profile has been created",
					type: "success",
				})
			);
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};

export const submitTags = async (
	tags: string[],
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	return postTagsAPI({ tagList: [...tags] }, token)
		.then((tagList) => {
			dispatch(actionUser_setTagList({ tagList: tagList }));
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};

export const submitUsageLocation = async (
	location: Iaddress,
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	return handleUsageLocationAPI(location, token)
		.then((response) => {
			dispatch(actionUser_usagelocation({ usagelocation: response }));
			getSearchList(token, dispatch);
			getRecommendationList(token, dispatch);
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};

export const getProfileHydrateRedux = async (
	dispatch: Dispatch<AnyAction>,
	token: string
) => {
	return getProfileAPI(token)
		.then((response: any) => {
			if (response) {
				dispatch(actionUser_setProfile({ profile: response.profile }));
				response.tag &&
					dispatch(actionUser_setTagList({ tagList: response.tag }));
				dispatch(
					actionUser_usagelocation({
						usagelocation: response.location,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};

export const profileHasImages = (username: string) => {
	let count = 0;
	for (let i = 0; i++; i < 5) {
		try {
			require("http://localhost:3001/images/" + username + "img" + i);
		} catch (e) {
			count++;
		}
	}
	return count < 5;
};

export const getSearchList = (token: string, dispatch: Dispatch<AnyAction>) => {
	getAllProfilesAPI(token)
		.then((json) => {
			if (json && json.length) {
				const withAge = json.map((entry) => {
					entry.profile.age = entry.profile.dob
						? getAge(entry.profile.dob)
						: null;
					return entry;
				});
				dispatch(actionProfilesList_getSearch({ profiles: withAge }));
			}
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};

export const getRecommendationList = (
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	getRecommendationAPI(token)
		.then((json) => {
			if (json && json.length) {
				const withAge = json.map((entry) => {
					if (entry.profile.dob) {
						entry.profile.age = entry.profile.dob
							? getAge(entry.profile.dob)
							: null;
					}
					return entry;
				});
				dispatch(actionProfilesList_getRecco({ profiles: withAge }));
			}
		})
		.catch((error) => {
			dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
};
