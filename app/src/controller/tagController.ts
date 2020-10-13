import { Request, Response } from 'express';

import { getProfileByUserId } from '../model/profileRepositories';
import {
	addTagProfile, deleteTagProfile, getTag, getTagProfile
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
	} catch {
		(error: string) => console.log(error);
	}
}

export async function deleteTagProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const tagProfilelist = await getTagProfile(jwt.decoded.id);
		const tagList: string[] = [];
		await Promise.all(
			tagProfilelist.map((tag) => {
				if (!tagList.includes(tag.tag)) {
					tagList.push(tag.tag);
				}
			})
		);
		const profile = await getProfileByUserId(jwt.decoded.id);
		const tag = await getTag(req.body.tag);
		if (tagList.length) {
			let isDeletedTagProfile = false;
			await Promise.all(
				tagList.map(async (tagProfile) => {
					if (tagProfile === tag.tag) {
						isDeletedTagProfile = await deleteTagProfile(
							tag.id,
							profile.userId
						);
						return;
					}
				})
			);
			if (isDeletedTagProfile) {
				res.status(200).send("delete tag successful");
				return;
			}
		}
	}
	res.status(400).send("An error occured");
}
