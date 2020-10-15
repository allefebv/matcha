/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagController.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:05:07 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 15:25:34 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import { getProfileByUserId } from '../model/profileRepositories';
import { addTagProfile, getTagProfile } from '../model/tagProfileRepositories';
import { getTag, getTagAutocomplete } from '../model/tagRepositories';
import { addNewTag } from '../services/addNewTag';
import { jwtVerify } from '../services/validation/jwt';
import {
	addTagValidation, getTagAutocompleteValidation
} from '../services/validation/tagValidation';

export async function addTagProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await addTagValidation(req.body);
		await getProfileByUserId(jwt.decoded.id);
		await addNewTag(req.body.tagList);
		const tagProfile = await getTagProfile(jwt.decoded.id);
		const tagProfileFilter = tagProfile.map((item) => item.tag);
		const tagList: string[] =
			req.body.tagList &&
			req.body.tagList.length &&
			req.body.tagList.filter(
				(item: string) => !tagProfileFilter.includes(item)
			);
		const result = await Promise.all(
			tagList.map(async (item) => {
				const tag = await getTag(item);
				const result = await addTagProfile(jwt.decoded.id, tag.id);
				return tag.tag;
			})
		);
		res.status(200).json(result);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getTagAutocompleteController(
	req: Request,
	res: Response
) {
	try {
		//const jwt = await jwtVerify(req.headers.token, res);
		await getTagAutocompleteValidation(req.body);
		const tagList = await getTagAutocomplete(req.body.partial, req.body.limit);
		if (tagList.length) {
			const list = tagList.map((tag) => tag.tag);
			res.status(200).json(list);
		}
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deleteTagProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		res.status(200).json();
	} catch (error) {
		res.status(400).send(error);
	}
}
