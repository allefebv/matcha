import { Request, Response } from 'express';

import { getProfileByUserId } from '../model/profileRepositories';
import {
	addTag,
	addTagProfile,
	deleteTagProfile,
	getTag,
	getTagById,
	getTagProfile
} from '../model/tagRepositories';
import { jwtVerify } from '../services/jwt';

export async function addTagProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const tabResult = [];
		const tagProfileList = await getTagProfile(jwt.decoded.id);
		const tagList: string[] = [];
		await Promise.all(
			tagProfileList.map((tag) => {
				if (!tagList.includes(tag.tag)) {
					tagList.push(tag.tag);
				}
			})
		);
		await Promise.all(
			req.body.tagList.map(async (tagItem: string) => {
				let tag = await getTag(tagItem);
				if (!tag) {
					const newTag = await addTag(tagItem);
					if (newTag) {
						tag = await getTag(tagItem);
					}
				}
				if (tag) {
					if (!tagList.includes(tag.tag)) {
						const result = await addTagProfile(jwt.decoded.id, tag.id);
						if (result) {
							tabResult.push(tag.tag);
						}
						return;
					}
				}
			})
		);
		if (tabResult.length) {
			res.status(200).send(tabResult);
			return;
		}
	}
	res.status(400).send("An error occured");
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
						isDeletedTagProfile = await deleteTagProfile(tag.id, profile.userId);
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
