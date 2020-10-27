/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blackListController.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/27 09:58:32 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/27 13:57:36 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import {
	addProfileBlackList, deleteProfileBlackList, getOneProfileBlackList,
	getProfileBlackList
} from '../model/blackListRepositories';
import { getProfileByUsername } from '../model/profileRepositories';
import { jwtVerify } from '../services/validation/jwt';

export async function getProfileBlackListController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const list = await getProfileBlackList(jwt.decoded.id);
		res.status(200).json(list);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function addProfileInBlackListController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileBlock = await getProfileByUsername(req.body.username);
		await getOneProfileBlackList(jwt.decoded.id, profileBlock.userId);
		await addProfileBlackList(jwt.decoded.id, profileBlock.userId);
		res.status(200).json("Profile add to blacklist");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deleteProfileInBlackListController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileBlock = await getProfileByUsername(req.body.username);
		await deleteProfileBlackList(jwt.decoded.id, profileBlock.userId);
		res.status(200).json("Profile delete to blacklist");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
