/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileController.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/15 11:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/16 12:32:35 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { addProfile, getAllProfile, getProfileByUserId, getProfileByUsername } from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';

export async function getProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUserId(jwt.decoded.id);
		if (profile) {
			res.status(200).json(profile);
		} else {
			res.status(400).send("Profile doesn't exsist");
		}
	}
}

export async function getProfileByUsernameController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUsername(req.query.username as string);
		if (profile) {
			res.status(200).json(profile);
		} else {
			res.status(400).send("Profile doesn't exsist");
		}
	}
}

export async function getAllProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileList = await getAllProfile(jwt.decoded.id);
		if (profileList && profileList.length) {
			res.status(200).json(profileList);
		} else {
			res.status(400).send('Profile list is empty');
		}
	}
}

export async function addProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const result = await addProfile(req.body, jwt.decoded.id);
		if (result) {
			res.status(200).send('Profile has been created');
		} else {
			res.status(400).send('An error occured');
		}
	}
}
