import { Request, Response } from 'express';

import {
	addLikedProfile,
	deleteLikedProfile,
	getProfileMatch,
	getUserHasBeenLikedById
} from '../model/likeRepositories';
import {
	getProfileByUserId,
	getProfileByUsername
} from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';

export async function addlikedProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		if (profileHasBeenLiked) {
			const addLike = await addLikedProfile(
				jwt.decoded.id,
				profileHasBeenLiked.userId
			);
			if (addLike) {
				res.status(200).json("Liked successful");
				return;
			}
		}
	}
	res.status(400).send("An error occured");
}

export async function deletelikedProfileController(
	req: Request,
	res: Response
) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		if (profileHasBeenLiked) {
			const deleteLike = await deleteLikedProfile(
				jwt.decoded.id,
				profileHasBeenLiked.userId
			);
			if (deleteLike) {
				res.status(200).json("Delete like successful");
				return;
			}
		}
	}
	res.status(400).send("An error occured");
}

export async function likedProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		if (profileHasBeenLiked) {
			const addLike = await addLikedProfile(
				jwt.decoded.id,
				profileHasBeenLiked.userId
			);
			if (addLike) {
				res.status(200).json("Liked successful");
				return;
			}
		}
	}
	res.status(400).send("An error occured");
}

export async function getProfileLikeController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const listLike = await getUserHasBeenLikedById(jwt.decoded.id);
		const profileList = await Promise.all(
			listLike &&
				listLike.map(async (item) => {
					const profile = await getProfileByUserId(item.profileHasBeenLikedId);
					return profile;
				})
		);
		if (profileList.length) {
			res.status(200).json(profileList);
			return;
		}
	}
	res.status(400).send("An error occured");
}

export async function getProfileMatchController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const listLike = await getProfileMatch(jwt.decoded.id);
		const matchListId = await Promise.all(
			listLike.filter(
				(item) =>
					listLike.filter(
						(item2) =>
							item.profileLikesId === item2.profileHasBeenLikedId &&
							item.profileHasBeenLikedId === item2.profileLikesId &&
							item.profileLikesId === jwt.decoded.id
					).length
			)
		);
		const matchListProfile = await Promise.all(
			matchListId &&
				matchListId.map(async (item) => {
					const profileHasBeenLikedId = await getProfileByUserId(
						item.profileHasBeenLikedId
					);
					return profileHasBeenLikedId;
				})
		);
		if (matchListProfile.length) {
			res.status(200).json(matchListProfile);
			return;
		}
	}
	res.status(400).send("An error occured");
}
