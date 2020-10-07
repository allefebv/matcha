import { Response } from 'express';

import { profile } from '../../types/types';
import { getProfileByUsername } from '../model/profileRepositories';

const usernameValidation = async (userId: number, username: string): Promise<string> => {
	const profile = await getProfileByUsername(username);
	if (username.length > 16) {
		return "Username is too long";
	}
	if (profile && profile.userId !== userId) {
		return "Username already exsist";
	}
	return null;
};

const ageValidation = (age: number) => (age < 18 ? "Age under 18" : null);

const genreValidation = (genre: string) =>
	genre === "male" || genre === "female" ? null : "Genre invalid select male or female";

const sexualOrientationValidation = (sexualOrientation: string) => {
	const genreList = ["homosexual", "lesbian", "bisexual", "heterosexual"];
	const result = genreList.filter((item) => item === sexualOrientation);
	return result.length === 1 ? null : `Sexual orientation; ${sexualOrientation} doen't exsist`;
};

export const profileValidation = async (body: profile, res: Response, id: number) => {
	let result: string[] = [];

	result.push(await usernameValidation(id, body.username));
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
