import { Request, Response } from 'express';

import {
	addProfile, getAllProfile, getProfileByUserId, getProfileByUsername,
	updateProfile
} from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';
import { profileValidation } from '../services/profileValidation';
import { shapingProfile } from '../services/shapingProfile';

export async function getProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		try {
			const profile = await shapingProfile(
				await getProfileByUserId(jwt.decoded.id)
			);
			res.status(200).json(profile);
		} catch {
			res.status(200).send(null);
		}
	}
}

export async function getProfileByUsernameController(
	req: Request,
	res: Response
) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		try {
			const profile = await shapingProfile(
				await getProfileByUsername(req.query.username.toString())
			);
			res.status(200).json(profile);
		} catch {
			res.status(200).send(null);
		}
	}
}

export async function getAllProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		try {
			const profileList = await getAllProfile(jwt.decoded.id);
			res.status(200).json(profileList);
		} catch {
			res.status(200).send(null);
		}
	}
}

export async function handleProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUserId(jwt.decoded.id);
		const validation = await profileValidation(req.body, res, jwt.decoded.id);
		if (validation) {
			if (!profile) {
				try {
					await addProfile(req.body, jwt.decoded.id);
					const profile = await getProfileByUserId(jwt.decoded.id);
					res.status(200).json(profile);
				} catch {
					res.status(400).send("ERROR");
				}
				return;
			} else {
				try {
					await updateProfile(req.body, jwt.decoded.id);
					const profile = await getProfileByUserId(jwt.decoded.id);
					const profileShaping = shapingProfile(profile);
					res.status(200).json(profileShaping);
				} catch {
					res.status(400).send("ERROR");
				}
			}
			return;
		}
		res.status(400).send(validation);
	}
}
