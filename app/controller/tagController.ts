/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagController.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/18 16:04:38 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/21 17:12:27 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { jwtVerify } from '../services/jwt';
import { addTag, addTagProfile, getTag, getTagProfile } from '../model/tagRepositories';

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
