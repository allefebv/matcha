import { Request, Response } from 'express';

import {
	getAllProfile,
	getProfileByUserId,
	getProfileListByLocation
} from '../model/profileRepositories';
import { recommendationAlgorithm } from '../services/ recommendationAlgorithm';
import { jwtVerify } from '../services/jwt';

// import { locationAlgorithm } from '../services/locationAlgorithm';

export async function recommendationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		try {
			const profile = await getProfileByUserId(jwt.decoded.id);
			let profileList = await getAllProfile(jwt.decoded.id);
			//profileList = await locationAlgorithm(profile, profileList, 100);
			profileList = await recommendationAlgorithm(profileList);
			profileList = profileList.sort();
			res.send(profileList);
		} catch {
			res.send("an error occured");
		}
	}
}
