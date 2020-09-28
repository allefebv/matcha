/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/28 17:15:48 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 17:54:33 by jfleury          ###   ########.fr       */
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
import { addView } from '../model/viewRepositories';
import { getProfileByUsername } from '../model/profileRepositories';

export async function addViewController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileSeen = await getProfileByUsername(req.body.username);
		if (profileSeen) {
			const add = await addView(profileSeen.userId, jwt.decoded.id);
			if (add) {
				res.status(200).send('Add view');
				return;
			}
		}
	}
	res.status(400).send('ERROR_OCCURED');
}
