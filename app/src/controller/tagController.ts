/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagController.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/18 16:04:38 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 17:09:56 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { jwtVerify } from '../services/jwt';
import { addTag, addTagProfile, deleteTagProfile, getTag, getTagProfile } from '../model/tagRepositories';
import { getProfileByUserId } from '../model/profileRepositories';

export async function addTagProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		let tag = await getTag(req.body.tag);
		if (!tag) {
			const newTag = await addTag(req.body.tag);
			if (newTag) {
				tag = await getTag(req.body.tag);
			}
		}
		if (tag) {
			const tagProfile = await getTagProfile(tag.id);
			if (tagProfile.length === 0 || !tagProfile) {
				const result = await addTagProfile(jwt.decoded.id, tag.id);
				res.status(200).send('add tag successful');
				return;
			}
		}
	}
	res.status(400).send('An error occured');
}

export async function deleteTagProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const tagProfilelist = await getTagProfile(jwt.decoded.id);
		const profile = await getProfileByUserId(jwt.decoded.id);
		const tag = await getTag(req.body.tag);
		if (tagProfilelist && tagProfilelist.length) {
			let isDeletedTagProfile = false;
			await Promise.all(
				tagProfilelist.map(async (tagProfile) => {
					if (tagProfile.tagId === tag.id) {
						isDeletedTagProfile = await deleteTagProfile(tagProfile.tagId, profile.userId);
						return;
					}
				})
			);
			if (isDeletedTagProfile) {
				res.status(200).send('delete tag successful');
				return;
			}
		}
	}
	res.status(400).send('An error occured');
}
