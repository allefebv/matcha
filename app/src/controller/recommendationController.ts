/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   recommendationController.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:05:04 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/20 14:45:06 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { userProfile } from 'types/types';

import {
	getCompleteProfileByUserId, getProfileBySexualOriantation, getProfileByUserId
} from '../model/profileRepositories';
import {
	recommendationAlgorithm
} from '../services/algorithm/ recommendationAlgorithm';
import { locationAlgorithm } from '../services/algorithm/locationAlgorithm';
import { shapingProfile } from '../services/formatter/shapingProfile';
import { jwtVerify } from '../services/validation/jwt';

// import { locationAlgorithm } from '../services/locationAlgorithm';

export async function recommendationController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const userProfile: userProfile = shapingProfile(
			await getCompleteProfileByUserId(jwt.decoded.id)
		);
		const profileRecoList = await getProfileBySexualOriantation(
			userProfile.profile.userId,
			userProfile.profile.sexualOrientation
		);
		const profileListLocation = await locationAlgorithm(
			userProfile.location,
			profileRecoList,
			100
		);
		const algoList = await recommendationAlgorithm(
			profileListLocation,
			userProfile
		);

		res.status(200).json(algoList);
	} catch (error) {
		res.status(400).json(error);
	}
}
