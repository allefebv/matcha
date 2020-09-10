/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:08:24 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/10 18:25:49 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { getUser, getAllUser, addUser, deleteUser } from '../model/userRepositories';
import { userRegisterValidation } from '../services/userRegisterValidation';
import crypto from 'crypto';

export async function getUserController(req: Request, res: Response) {
	const resultGetUser = await getUser(req.query.username as string);
	if (typeof resultGetUser !== 'number') {
		res.status(200).json(resultGetUser);
	} else {
		res.status(400).send("User doesn't exsist");
	}
}

export async function addUserController(req: Request, res: Response) {
	let { username, password, email } = req.body;
	const userValidInformation = await userRegisterValidation(username, password, email);
	if (userValidInformation !== true) {
		res.status(400).send(userValidInformation);
		return;
	}
	password = crypto.createHash('sha512').update(password).digest('hex');
	const addUserResult = await addUser(username, password, email);
	typeof addUserResult !== 'number'
		? res.status(200).json(addUserResult)
		: res.status(addUserResult).send(`an error occurred`);
}

export async function loginUserController(req: Request, res: Response) {
	let { username, password } = req.body;
	password = crypto.createHash('sha512').update(password).digest('hex');
	const getUserResult = await getUser(username);
	if (
		typeof getUserResult !== 'number' &&
		username === getUserResult.username &&
		password === getUserResult.password
	) {
		res.status(200).json(getUserResult);
	}
}

export async function deleteUserController(req: Request, res: Response) {
	let { username, password } = req.body;
	const userResult = await getUser(username);
	password = crypto.createHash('sha512').update(password).digest('hex');
	if (typeof userResult !== 'number' && password === userResult.password) {
		const deleteResult = await deleteUser(username, password);
		res.status(deleteResult);
		deleteResult === 200 ? res.send(`${username} as deleted`) : res.send(`an error occurred`);
	}
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
