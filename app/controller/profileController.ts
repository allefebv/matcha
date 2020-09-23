/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileController.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/15 11:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/23 14:52:55 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import {
	addProfile,
	getAllProfile,
	getProfileByUserId,
	getProfileByUsername,
	updateProfile,
} from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';
import { addProfileValidation, updateProfileValidation } from '../services/profileValidation';
import { getTagById, getTagProfile } from '../model/tagRepositories';

export async function getProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUserId(jwt.decoded.id);
		const tagProfileList = await getTagProfile(jwt.decoded.id);
		const tagList = await Promise.all(
			tagProfileList.map(async (item) => {
				const tag = await getTagById(item.tagId);
				return tag.tag;
			})
		);
		if (profile) {
			res.status(200).json({ profile: profile, tag: tagList });
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
			return;
		}
	}
	res.status(400).send('Profile list is empty');
}

export async function addProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	const validation = await addProfileValidation(
		req.body.age,
		req.body.username,
		req.body.genre,
		req.body.sexualOrientation
	);
	if (jwt && jwt.isLogin && !validation) {
		const result = await addProfile(req.body, jwt.decoded.id);
		if (result) {
			res.status(200).send('Profile has been created');
			return;
		}
	}
	res.status(400).send({ message: 'An error occured', error: validation });
}

export async function updateProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	let validation = null;
	if (jwt && jwt.isLogin) {
		validation = await updateProfileValidation(
			req.body.age,
			req.body.username,
			req.body.genre,
			req.body.sexualOrientation,
			jwt.decoded.id
		);
		if (!validation) {
			const result = await updateProfile(req.body, jwt.decoded.id);
			if (result) {
				res.status(200).send('Profile has been update');
				return;
			}
		}
	}
	res.status(400).send({ message: 'An error occured', error: validation });
}
