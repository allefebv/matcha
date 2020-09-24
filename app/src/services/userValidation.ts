/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userValidation.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:07:50 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 14:35:33 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Response } from 'express';
import { getUserByEmail } from '../model/userRepositories';

const validationPassword = (password: string): Promise<string | null> =>
	new Promise((resolve) => {
		const passwordRegex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/);
		if (!passwordRegex.test(password)) {
			resolve('Password invalid');
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
			resolve('Email already exsist');
		}
		if (!emailRegex.test(email)) {
			resolve('Email invalid');
		}
		resolve(null);
	});

export const addUserValidation = async (email: string, password: string, res: Response): Promise<boolean> => {
	const passwordValidation = await validationPassword(password);
	const emailValidation = await validationEmail(email);

	if (passwordValidation || emailValidation) {
		res.status(400).json({ email: emailValidation, password: passwordValidation });
		return false;
	}
	return true;
};
