/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   recommendationController.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:05:04 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 14:26:36 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import {
	getProfileBySexualOriantation, getProfileByUserId
} from '../model/profileRepositories';
import {
	recommendationAlgorithm
} from '../services/algorithm/ recommendationAlgorithm';
import { locationAlgorithm } from '../services/algorithm/locationAlgorithm';
import { shapingProfile } from '../services/formatter/shapingProfile';
import { jwtVerify } from '../services/validation/jwt';

// import { locationAlgorithm } from '../services/locationAlgorithm';

export async function recommendationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		try {
			const profileResult = [];
			const profile = await getProfileByUserId(jwt.decoded.id);
			let profileList = await getProfileBySexualOriantation(
				jwt.decoded.id,
				profile.sexualOrientation
			);
			profileList = await locationAlgorithm(profile, profileList, 100);
			profileList = await recommendationAlgorithm(profileList);
			await Promise.all(
				profileList.map(async (profile) => {
					profileResult.push(await shapingProfile(profile));
				})
			);
			res.send(profileResult);
		} catch {
			res.send("an error occured");
		}
	}
}
