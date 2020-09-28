/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:08:24 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 11:35:14 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import crypto from 'crypto';

import { Request, Response } from 'express';
import { generatePassword } from '../services/generateString';
import {
	getUserById,
	addUser,
	deleteUser,
	activateUser,
	getUserByEmail,
	changePassword,
	changeEmail,
} from '../model/userRepositories';
import { addUserValidation } from '../services/userValidation';
import { generateTokenForUser, jwtVerify } from '../services/jwt';
import { activatedUserMailer, newEmailMailer, newPasswordMailer } from '../services/mailer';

export async function addUserController(req: Request, res: Response) {
	let { email, password } = req.body;

	const userValidation = await addUserValidation(email, password, res);
	if (userValidation) {
		password = crypto.createHash('sha512').update(password).digest('hex');
		await addUser(email, password);
		const user = await getUserByEmail(email);
		if (user) {
			res.status(200).json({
				user: {
					email: user.email,
					registrationDate: user.registrationDate,
					activated: user.activated,
				},
				token: generateTokenForUser(user),
			});
			activatedUserMailer(
				user,
				`http://localhost:3001/user/activateUser?activationKey=${user.activationKey}&id=${user.id}`
			);
			return;
		}
		res.status(400).send('ERROR_OCCURED');
	}
}

export async function loginUserController(req: Request, res: Response) {
	let { email, password } = req.body;

	password = crypto.createHash('sha512').update(password).digest('hex');
	const user = await getUserByEmail(email);
	if (user && email === user.email && password === user.password) {
		res.status(200).json({
			user: {
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			},
			token: generateTokenForUser(user),
		});
		return;
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function changePasswordController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const password = crypto.createHash('sha512').update(req.body.password).digest('hex');
		const user = await getUserById(jwt.decoded.id);
		if (user.password === password) {
			const newPassword = crypto.createHash('sha512').update(req.body.newPassword).digest('hex');
			const result = await changePassword(jwt.decoded.id, newPassword);
			if (result) {
				res.status(200).send('Password change');
				return;
			}
		}
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function changeEmailController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const password = crypto.createHash('sha512').update(req.body.password).digest('hex');
		const user = await getUserById(jwt.decoded.id);
		if (user.password === password) {
			newEmailMailer(
				user.email,
				`http://localhost:3001/user/activateNewEmail?email=${req.body.newEmail}&id=${user.id}`
			);
			res.status(200).send('Email send to new email');
			return;
		}
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function activateNewEmailController(req: Request, res: Response) {
	const userId = parseInt(req.query.id as string);
	const result = await changeEmail(userId, req.query.email as string);
	if (result) {
		res.status(200).send('Email as change');
		return;
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function resetPasswordController(req: Request, res: Response) {
	const user = await getUserByEmail(req.body.email);
	if (user) {
		const newPassword = generatePassword();
		const newPasswordHash = crypto.createHash('sha512').update(newPassword).digest('hex');
		const result = await changePassword(user.id, newPasswordHash);
		if (result) {
			newPasswordMailer(user, newPassword);
			res.status(200).send('New password send in email');
			return;
		}
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function activateUserController(req: Request, res: Response) {
	let user = await getUserById(parseInt(req.query.id as string, 10));
	if (user && user.activationKey === req.query.activationKey) {
		const result = await activateUser(parseInt(req.query.id as string, 10));
		user = await getUserById(parseInt(req.query.id as string, 10));
		if (user) {
			res.status(200).send('User activate');
			return;
		}
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function deleteUserController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const user = await getUserById(jwt.decoded.id);
		const password = crypto.createHash('sha512').update(req.body.password).digest('hex');
		if (password === user.password) {
			const deleteResult = await deleteUser(jwt.decoded.id);
			if (deleteResult) {
				res.status(200).send('User as deleted');
				return;
			}
		} else {
			res.status(400).send('PASSWORD_INVALID');
		}
	}
	res.status(400).send('ERROR_OCCURED');
}
