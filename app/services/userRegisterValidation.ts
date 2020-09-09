/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRegisterValidation.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:07:50 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/09 18:09:04 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { newUser } from '../model/entities/userType';
import { selectUserByUsername } from '../model/repositories/selectUserByUsername';

interface userErrorValidation {
	username: string | null;
	password: string | null;
	email: string | null;
}

function validationUsername(newUserAlreadyExist, validation: userErrorValidation, body: newUser) {
	if (newUserAlreadyExist) {
		validation.username = 'Username already exsist';
	} else {
		validation.username = body.username.length > 3 ? null : 'Username invalid';
	}
}

function validationPassword(validation: userErrorValidation, body: newUser) {
	const passwordRegex = new RegExp('/(?=.[A-Z])(?=.[a-z])(?=.d)(?=.[@?!*]).{8,}/');
	validation.password = passwordRegex.test(body.password) ? null : 'Password invalid';
}

function validationEmail(validation: userErrorValidation, body: newUser) {
	const emailRegex = new RegExp(
		"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
	);
	validation.email = emailRegex.test(body.email) ? null : 'Email invalid';
}

export async function userRegisterValidation(body: newUser) {
	const newUserAlreadyExist = await selectUserByUsername(body.username);
	const validation: userErrorValidation = {
		username: null,
		password: null,
		email: null,
	};

	validationUsername(newUserAlreadyExist, validation, body);
	validationPassword(validation, body);
	validationEmail(validation, body);
	for (const [key, value] of Object.entries(validation)) {
		if (value !== null) {
			return validation;
		}
	}
	return true;
}
