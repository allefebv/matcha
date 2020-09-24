/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addUserValidation.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: senz <senz@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:07:50 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 13:35:44 by senz             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Response } from 'express';
import { getUserByEmail } from '../model/userRepositories';

interface Validation {
	password: string | null;
	email: string | null;
}

function validationPassword(validation: Validation, password: string) {
	const passwordRegex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/);

	if (passwordRegex.test(password)) {
		validation.password = null;
	} else {
		validation.password = 'Invalid password';
	}
}

async function validationEmail(validation: Validation, email: string) {
	const newUserEmailExist = await getUserByEmail(email);
	if (typeof newUserEmailExist !== 'number') {
		validation.email = 'Email already exists';
	} else {
		const emailRegex = new RegExp(
			"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
		);
		validation.email = emailRegex.test(email) ? null : 'Email invalid';
	}
}

export async function addUserValidation(email: string, password: string, res: Response) {
	const validation: Validation = {
		password: null,
		email: null,
	};

	validationPassword(validation, password);
	validationEmail(validation, email);
	for (const [key, value] of Object.entries(validation)) {
		if (value !== null) {
			res.status(400).json(validation);
			return validation;
		}
	}
	return validation;
}
