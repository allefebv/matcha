/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileUtils.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 17:29:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/21 10:55:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { actionUi_showSnackbar } from "../store/ui/action";
import {
	actionUser_setProfile,
	actionUser_setTagList,
	actionUser_usagelocation,
} from "../store/user/action";
import { Iaddress, IbaseProfile, IextendedProfile } from "../types/types";
import {
	createProfileAPI,
	getProfileAPI,
	handleUsageLocationAPI,
	postPicturesAPI,
	postTagsAPI,
	updateProfileAPI,
} from "./apiCalls";

export const getProfileLevel = (
	profile: IextendedProfile,
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
	profile: IextendedProfile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 0;
};

export const isProfileBase = (
	profile: IextendedProfile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 1;
};

export const isProfileComplete = (
	profile: IextendedProfile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 2;
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
	profile: IextendedProfile,
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
	profile: IbaseProfile,
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	return createProfileAPI(profile, token)
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
	return postTagsAPI({ tagList: [...tags] }, token).catch((error) => {
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
				dispatch(actionUser_setTagList({ tagList: response.tag }));
				dispatch(
					actionUser_usagelocation({ usagelocation: response.location })
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
