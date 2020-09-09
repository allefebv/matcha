/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:08:24 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/09 18:11:19 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { selectUserByUsername } from '../model/repositories/selectUserByUsername';
import { selectAllUser } from '../model/repositories/selectAllUser';
import { userRegisterValidation } from '../services/userRegisterValidation';
import { generateActivationKey } from '../services/generateActivationKey';
import { insertNewUser } from '../model/repositories/insertUser';

export async function getAllUser(req: Request, res: Response) {
	const userTab = await selectAllUser();
	if (userTab) {
		res.json(userTab);
	} else {
		res.status(400).send('User list is empty');
	}
}

export async function getUserByUsername(req: Request, res: Response) {
	const user = await selectUserByUsername(req.query.username as string);
	if (user) {
		res.json(user);
	} else {
		res.status(400).send("User doesn't exsist");
	}
}

export async function postUserRegister(req: Request, res: Response) {
	const userValidInformation = await userRegisterValidation(req.body);

	if (userValidInformation === true) {
		const newUser = await insertNewUser(req.body, generateActivationKey());
		res.json(newUser);
	} else {
		res.status(400).send(userValidInformation);
	}
}
