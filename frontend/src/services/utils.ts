/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 17:29:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/16 19:04:47 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Iprofile } from "../types/types";

export const renameKey = (object: any, key: any, newKey: any) => {
	const clonedObj = { ...object };
	const tmp = clonedObj[key];
	delete clonedObj[key];
	clonedObj[newKey] = tmp;
	return clonedObj;
};

export const getProfileLevel = (profile: Iprofile) => {
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
		!profile.location ||
		!profile.tagList
	) {
		return 1;
	} else {
		return 2;
	}
};

export const isProfileEmpty = (profile: any) => {
	return getProfileLevel(profile) === 0;
};

export const isProfileBase = (profile: any) => {
	return getProfileLevel(profile) === 1;
};

export const isProfileComplete = (profile: any) => {
	return getProfileLevel(profile) === 2;
};
