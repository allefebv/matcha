/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRegisterValidation.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:07:50 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 14:49:21 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { getUserByUsername, getUserByEmail } from '../model/userRepositories';

interface Validation {
	username: string | null;
	password: string | null;
	email: string | null;
}

function validationPassword(validation: Validation, password: string) {
	const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

	if (passwordRegex.test(password)) {
		validation.password = null;
	} else {
		validation.password = 'Invalid password';
	}
}

async function validationEmail(validation: Validation, email: string) {
	const newUserEmailExist = await getUserByEmail(email);
	if (typeof newUserEmailExist !== 'number') {
		validation.username = 'Email already exists';
	} else {
		const emailRegex = new RegExp(
			"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
		);
		validation.email = emailRegex.test(email) ? null : 'Email invalid';
	}
}

export async function userRegisterValidation(username: string, password: string, email: string) {
	const newUserLoginExist = await getUserByUsername(username);
	const validation: Validation = {
		username: null,
		password: null,
		email: null,
	};

	if (typeof newUserLoginExist !== 'number') {
		validation.username = 'Username exsist or invalid';
	}
	validationPassword(validation, password);
	validationEmail(validation, email);
	for (const [key, value] of Object.entries(validation)) {
		if (value !== null) {
			return validation;
		}
	}
	return true;
}
