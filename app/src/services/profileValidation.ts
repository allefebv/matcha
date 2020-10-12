import { Response } from 'express';

import { profile } from '../../types/types';
import { getProfileByUsername } from '../model/profileRepositories';

const usernameValidation = async (
	userId: number,
	username: string
): Promise<string> => {
	const profile = await getProfileByUsername(username);
	if (username.length > 36) {
		return "Username is too long";
	}
	if (profile && profile.userId !== userId) {
		return "Username already exsist";
	}
	return null;
};

const ageValidation = (dob: number) =>
	Date.now() - dob < 567648000000 ? "Age under 18" : null;

const genreValidation = (genre: string) =>
	genre === "male" || genre === "female" || genre === null
		? null
		: "Genre invalid select male, female or null";

const sexualOrientationValidation = (sexualOrientation: string) => {
	const genreList = ["gay", "lesbian", "bisexual", "heterosexual"];
	const result = genreList.filter((item) => item === sexualOrientation);
	return result.length === 1
		? null
		: `Sexual orientation; ${sexualOrientation} doen't exsist`;
};

export const profileValidation = async (
	body: profile,
	res: Response,
	id: number
) => {
	let result: string[] = [];

	result.push(await usernameValidation(id, body.username));
	result.push(ageValidation(body.dob));
	result.push(genreValidation(body.gender));
	result.push(sexualOrientationValidation(body.sexualOrientation));
	result = result.filter((item) => item);
	if (result.length) {
		console.log("-> profileValidation id:" + id + "error: ", result);
		res.status(400).send(result);
		return false;
	}
	return true;
};
