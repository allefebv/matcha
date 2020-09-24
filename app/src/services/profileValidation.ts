/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileValidation.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/17 15:50:20 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/23 14:52:05 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Response } from 'express';
import { getProfileByUserId, getProfileByUsername } from '../model/profileRepositories';

interface Validation {
	age: string | null;
	username: string | null;
	genre: string | null;
	sexualOrientation: string | null;
}

async function usernameValidation(username: string, id?: number) {
	const profile = await getProfileByUsername(username);
	if (profile && id === profile.userId && username === profile.username) {
		return null;
	}
	if (profile || username.length > 16) {
		return 'the username already exists or is too long';
	}
	return null;
}

export async function addProfileValidation(
	age: number,
	username: string,
	genre: string,
	sexualOrientation: string
): Promise<Validation | null> {
	const validation = {
		age: null,
		username: null,
		genre: null,
		sexualOrientation: null,
	};

	validation.age = age > 17 ? null : 'User must be over 18 years old';
	validation.username = await usernameValidation(username);
	validation.genre = genre === 'man' || genre === 'woman' ? null : "Genre doesn't exsist select: man or woman";
	validation.sexualOrientation =
		sexualOrientation === 'heterosexual' ||
		sexualOrientation === 'gay' ||
		sexualOrientation === 'lesbian' ||
		sexualOrientation === 'bisexual'
			? null
			: "Sexual orientation doesn't exsist select: heterosexual, gay, lesbian or bisexual";
	for (const [key, value] of Object.entries(validation)) {
		if (value !== null) {
			return validation;
		}
	}
	return null;
}

export async function updateProfileValidation(
	age: number,
	username: string,
	genre: string,
	sexualOrientation: string,
	id: number
): Promise<Validation | null> {
	const validation = {
		age: null,
		username: null,
		genre: null,
		sexualOrientation: null,
	};

	validation.age = age > 17 ? null : 'User must be over 18 years old';
	validation.username = await usernameValidation(username, id);
	validation.genre = genre === 'man' || genre === 'woman' ? null : "Genre doesn't exsist select: man or woman";
	validation.sexualOrientation =
		sexualOrientation === 'heterosexual' ||
		sexualOrientation === 'gay' ||
		sexualOrientation === 'lesbian' ||
		sexualOrientation === 'bisexual'
			? null
			: "Sexual orientation doesn't exsist select: heterosexual, gay, lesbian or bisexual";
	for (const [key, value] of Object.entries(validation)) {
		if (value !== null) {
			return validation;
		}
	}
	return null;
}
