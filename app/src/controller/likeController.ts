/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:51 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/27 09:43:43 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import {
	addLikedProfile, deleteLikedProfile, getProfileMatch, getUserHasBeenLikedById
} from '../model/likeRepositories';
import { getProfileByUsername } from '../model/profileRepositories';
import { jwtVerify } from '../services/validation/jwt';

export async function addlikedProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		await addLikedProfile(jwt.decoded.id, profileHasBeenLiked.userId);
		res.status(200).json("Liked successful");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deletelikedProfileController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		const deleteLike = await deleteLikedProfile(
			jwt.decoded.id,
			profileHasBeenLiked.userId
		);
		res.status(200).json("Delete like successful");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getProfileLikeController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const listLike = await getUserHasBeenLikedById(jwt.decoded.id);
		const resultList =
			listLike &&
			listLike.length &&
			listLike.map((item) => {
				return {
					dob: item.dob,
					popularityScore: item.popularityScore,
					username: item.username,
					firstname: item.firstname,
					lastname: item.lastname,
					gender: item.gender,
					sexualOrientation: item.sexualOrientation,
					geoLocationAuthorization: item.geoLocationAuthorization
						? true
						: false,
					bio: item.bio,
				};
			});
		res.status(200).json(resultList);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getProfileMatchController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const listMatch = await getProfileMatch(jwt.decoded.id);
		const resultList =
			listMatch &&
			listMatch.length &&
			listMatch.map((item) => {
				return {
					dob: item.dob,
					popularityScore: item.popularityScore,
					username: item.username,
					firstname: item.firstname,
					lastname: item.lastname,
					gender: item.gender,
					sexualOrientation: item.sexualOrientation,
					geoLocationAuthorization: item.geoLocationAuthorization
						? true
						: false,
					bio: item.bio,
				};
			});
		res.status(200).json(resultList);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
