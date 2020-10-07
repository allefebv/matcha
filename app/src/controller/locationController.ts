import { Request, Response } from 'express';

import {
	addGeoLocation,
	getGeoLocation,
	updateGeoLocation
} from '../model/locationRepositories';
import { getProfileByUserId } from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';

export async function handleGeoLocationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);

	if (jwt && jwt.isLogin) {
		const location = await getGeoLocation(jwt.decoded.id);
		if (!location) {
			// Add
			try {
				await addGeoLocation(jwt.decoded.id, req.body);
				res.status(200).send("GeoLocation add");
			} catch {
				res.status(400).send("ERROR");
			}
		} else {
			// Update
			try {
				await updateGeoLocation(jwt.decoded.id, req.body);
				res.status(200).send("GeoLocation update");
			} catch {
				res.status(400).send("ERROR");
			}
		}
	}
}

export async function getGeoLocationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);

	if (jwt && jwt.isLogin) {
		try {
			const location = await getGeoLocation(jwt.decoded.id);
			res.status(200).json(location);
		} catch {
			res.status(400).send("ERROR");
		}
	}
}
