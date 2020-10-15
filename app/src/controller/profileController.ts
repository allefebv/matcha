/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileController.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:59 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 14:28:07 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import {
	addProfile, getAllProfile, getProfileByUserId, getProfileByUsername,
	updateProfile
} from '../model/profileRepositories';
import { shapingProfile } from '../services/formatter/shapingProfile';
import { jwtVerify } from '../services/validation/jwt';
import { addProfileValidation } from '../services/validation/profileValidation';

export async function getProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profile = await getProfileByUserId(jwt.decoded.id);
		const profileShaping = await shapingProfile(profile);
		res.status(200).json(profileShaping);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getProfileByUsernameController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profile = await shapingProfile(
			await getProfileByUsername(req.query.username.toString())
		);
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getAllProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		try {
			const profileList = await getAllProfile(jwt.decoded.id);
			res.status(200).json(profileList);
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	}
}

export async function addProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await addProfileValidation(req.body);
		const profile = await addProfile(req.body, jwt.decoded.id);
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function updateProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await addProfileValidation(req.body);
		const profile = await updateProfile(req.body, jwt.decoded.id);
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
