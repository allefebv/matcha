/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:05:16 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/20 14:58:56 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import { getProfileByUsername } from '../model/profileRepositories';
import {
	addView, getView, getViewByViewerProfileId, updateView
} from '../model/viewRepositories';
import { jwtVerify } from '../services/validation/jwt';

export async function getViewController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const viewList = await getView(jwt.decoded.id);
		res.status(200).json(viewList);
	} catch (error) {
		res.status(400).send("ERROR_OCCURED");
	}
}

export async function addViewController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileSeen = await getProfileByUsername(req.body.username);
		const viewExsist = await getViewByViewerProfileId(
			profileSeen.userId,
			jwt.decoded.id
		);
		if (viewExsist) {
			const isUpdate = await updateView(profileSeen.userId, jwt.decoded.id);
			if (isUpdate) {
				res.status(200).send("Update view");
				return;
			}
		}
		if (profileSeen) {
			const add = await addView(profileSeen.userId, jwt.decoded.id);
			if (add) {
				res.status(200).send("Add view");
				return;
			}
		}
	}
	res.status(400).send("ERROR_OCCURED");
}
