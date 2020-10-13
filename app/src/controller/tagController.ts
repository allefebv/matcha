import { Request, Response } from 'express';

import { getProfileByUserId } from '../model/profileRepositories';
import {
	addTagProfile, deleteTagProfile, getTagProfile
} from '../model/tagProfileRepositories';
import {
	addTag, getAllTag, getTag, getTagById
} from '../model/tagRepositories';
import { addNewTag } from '../services/addNewTag';
import { jwtVerify } from '../services/jwt';

export async function addTagProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
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
		res.status(400).send(error);
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
