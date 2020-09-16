/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/15 17:27:07 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/16 18:12:05 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { jwtVerify } from '../services/jwt';
import { Request, Response } from 'express';
import { addLikedProfile, getUserHasBeenLikedById } from '../model/likeRepositories';
import { getProfileByUsername } from '../model/profileRepositories';

export async function addlikedProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		console.log('==> username = ', profileHasBeenLiked);
		if (profileHasBeenLiked) {
			const addLike = await addLikedProfile(jwt.decoded.id, profileHasBeenLiked.id);
			if (addLike) {
				res.status(200).json('Liked successful');
				return;
			}
		}
	}
	res.status(400).send('An error occured');
}

export async function getUserLikeController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const listLike = await getUserHasBeenLikedById(jwt.decoded.id);
		if (listLike) {
			res.status(200).json(listLike);
			return;
		}
	}
	res.status(400).send('An error occured');
}
