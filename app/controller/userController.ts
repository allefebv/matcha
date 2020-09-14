/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:08:24 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 18:32:27 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import crypto from 'crypto';
import { Request, Response } from 'express';
import {
	getUserByUsername,
	getUserByEmail,
	getAllUser,
	addUser,
	deleteUser,
	activateUser,
} from '../model/userRepositories';
import { userRegisterValidation } from '../services/userRegisterValidation';
import { generateTokenForUser, JWT_SIGN_SECRET } from '../services/jwt';
import jwt from 'jsonwebtoken';
import { mailer } from '../services/mailer';

export async function getUserController(req: Request, res: Response) {
	jwt.verify(req.headers.token, JWT_SIGN_SECRET, async (error, decoded) => {
		if (error) {
			res.status(401).send({ code: 401, error: 'Unauthorized' });
			return;
		}
		const user = await getUserByUsername(decoded.username as string);
		if (typeof user !== 'number') {
			res.status(200).json({
				username: user.username,
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			});
		} else {
			res.status(400).send({ error: "User doesn't exsist" });
		}
	});
}

export async function getUserByUsernameController(req: Request, res: Response) {
	jwt.verify(req.headers.token, JWT_SIGN_SECRET, async (error, decoded) => {
		if (error) {
			res.status(401).send({ code: 401, error: 'Unauthorized' });
			return;
		}
		const user = await getUserByUsername(req.query.username as string);
		if (typeof user !== 'number') {
			res.status(200).json({
				username: user.username,
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			});
		} else {
			res.status(400).send({ error: "User doesn't exsist" });
		}
	});
}

export async function getUserByEmailController(req: Request, res: Response) {
	jwt.verify(req.headers.token, JWT_SIGN_SECRET, async (error, decoded) => {
		if (error) {
			res.status(401).send({ code: 401, error: 'Unauthorized' });
			return;
		}
		const user = await getUserByEmail(req.query.email as string);
		if (typeof user !== 'number') {
			res.status(200).json({
				username: user.username,
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			});
		} else {
			res.status(400).json({ error: "User doesn't exsist" });
		}
	});
}

export async function activateUserController(req: Request, res: Response) {
	let user = await getUserByUsername(req.query.username as string);
	if (typeof user !== 'number' && user.activationKey === req.query.activationKey) {
		const result = await activateUser(user.username);
		user = await getUserByUsername(req.query.username as string);
		res.status(result);
		result === 200 && typeof user !== 'number'
			? res.send('User activate')
			: res.json({ error: "User doesn't exsist" });
		return;
	}
	res.status(400).json({ code: user, error: 'an error occurred' });
}

export async function addUserController(req: Request, res: Response) {
	let { username, password, email } = req.body;

	const userValidation = await userRegisterValidation(username, password, email);
	if (userValidation !== true) {
		res.status(400).json(userValidation);
		return;
	}
	password = crypto.createHash('sha512').update(password).digest('hex');
	await addUser(username, password, email);
	const user = await getUserByUsername(username);
	if (typeof user !== 'number') {
		res.status(200).json({
			user: {
				username: user.username,
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			},
			token: generateTokenForUser(user),
		});
		mailer(
			user,
			`http://localhost:3001/user/activateUser?activationKey=${user.activationKey}&username=${user.username}`
		);
	} else {
		res.status(user).json({ code: user, error: 'an error occurred' });
	}
}

export function addProfileController(req: Request, res: Response) {
	jwt.verify(req.headers.token, JWT_SIGN_SECRET, async (error, decoded) => {
		if (error) {
			res.status(401).send({ code: 401, error: 'Unauthorized' });
			return;
		}

		console.log('---> decoded = ', decoded);
		if (decoded && decoded.username) {
			res.send(req.body);
		}
	});
}

export async function loginUserController(req: Request, res: Response) {
	let { username, password } = req.body;
	password = crypto.createHash('sha512').update(password).digest('hex');
	const getUserResult = await getUserByUsername(username);
	if (
		typeof getUserResult !== 'number' &&
		username === getUserResult.username &&
		password === getUserResult.password
	) {
		res.status(200).json({
			user: {
				username: getUserResult.username,
				email: getUserResult.email,
				registrationDate: getUserResult.registrationDate,
				activated: getUserResult.activated,
			},
			token: generateTokenForUser(getUserResult),
		});
		return;
	}
	res.status(400).json({ error: 'credentials invalid' });
}

export async function deleteUserController(req: Request, res: Response) {
	jwt.verify(req.headers.token, JWT_SIGN_SECRET, async (error, decoded) => {
		if (error) {
			res.status(401).send({ code: 401, error: 'Unauthorized' });
			return;
		}
		if (decoded && decoded.username) {
			const deleteResult = await deleteUser(decoded.username);
			res.status(deleteResult);
			deleteResult === 200 ? res.send(`${decoded.username} as deleted`) : res.send(`an error occurred`);
		}
	});
}

/* ******************************** DEV ************************************ */

export async function getAllUserController(req: Request, res: Response) {
	const userTab = await getAllUser();
	if (userTab) {
		res.json(userTab);
	} else {
		res.status(400).send('User list is empty');
	}
}
