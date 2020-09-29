/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileValidation.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/17 15:50:20 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/29 10:04:13 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Response } from 'express';

import { profile } from '../../types/types';

const usernameValidation = (
	userId: number,
	username: string,
	profile: profile
): string => {
	if (username.length > 16) {
		return 'Username is too long';
	}
	if (profile && profile.id !== userId) {
		return 'Username already exsist';
	}
	return null;
};

const ageValidation = (age: number) => (age < 18 ? 'Age under 18' : null);

const genreValidation = (genre: string) =>
	genre === 'male' || genre === 'female'
		? null
		: 'Genre invalid select male or female';

const sexualOrientationValidation = (sexualOrientation: string) => {
	const genreList = ['homosexual', 'lesbian', 'bisexual', 'heterosexual'];
	const result = genreList.filter((item) => item === sexualOrientation);
	return result.length === 1
		? null
		: `Sexual orientation; ${sexualOrientation} doen't exsist`;
};

export const profileValidation = async (
	body: profile,
	res: Response,
	id: number,
	profile: profile
) => {
	let result: string[] = [];

	result.push(usernameValidation(id, body.username, profile));
	result.push(ageValidation(body.age));
	result.push(genreValidation(body.genre));
	result.push(sexualOrientationValidation(body.sexualOrientation));
	result = result.filter((item) => item);
	if (result.length) {
		res.status(400).send(result);
		return false;
	}
	return true;
};
