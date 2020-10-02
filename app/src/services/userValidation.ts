import { Response } from 'express';

import { getUserByEmail } from '../model/userRepositories';

const validationPassword = (password: string): Promise<string | null> =>
	new Promise((resolve) => {
		const passwordRegex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/);
		if (!passwordRegex.test(password)) {
			resolve("PASSWORD_INVALID");
		}
		resolve(null);
	});

const validationEmail = (email: string): Promise<string | null> =>
	new Promise(async (resolve) => {
		const newUserEmailExist = await getUserByEmail(email);
		const emailRegex = new RegExp(
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		);
		if (newUserEmailExist) {
			resolve("EMAIL_EXSIST");
		}
		if (!emailRegex.test(email)) {
			resolve("EMAIL_INVALID");
		}
		resolve(null);
	});

export const addUserValidation = async (
	email: string,
	password: string,
	res: Response
): Promise<boolean> => {
	const passwordValidation = validationPassword(password);
	const emailValidation = validationEmail(email);

	let result: string[] = await Promise.all([
		passwordValidation,
		emailValidation,
	]);
	result = result.filter((item) => item);
	if (result.length) {
		res.status(400).send(result);
		return false;
	}
	return true;
};
