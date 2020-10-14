/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   imageController.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:41 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/14 12:02:29 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { profile } from '../../types/types';
import {
	getProfileByUserId, getProfileByUsername
} from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';

export async function handleImageController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const tabNameimg = ["img0", "img1", "img2", "img3", "img4"];
		const profile = await getProfileByUserId(jwt.decoded.id);
		const tabImg = [];

		for (let i in req.files) {
			if (tabNameimg.includes(i)) {
				tabImg.push([i, req.files[i]]);
			}
		}
		tabImg.map((img) => {
			const mimetype = img[1].mimetype.split("/");
			const path =
				"./images/" + profile.username + "/" + img[0] + "." + mimetype[1];
			img[1].mv(path);
		});
		res.send("ok");
	}
}

function getFile(file: string, profile: profile): Promise<string> {
	return new Promise((resolve) => {
		const pathImage = path.join(
			__dirname,
			"../../public/images/",
			profile.username,
			file
		);
		fs.readFile(pathImage, (error, data) => {
			if (error) {
				resolve(null);
			}
			resolve(pathImage);
		});
	});
}

export async function getImageController(req: Request, res: Response) {
	const files = ["img0", "img1", "img2", "img3", "img4"];
	const extImg = [".png", ".jpg", ".jpeg"];
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profile = await getProfileByUserId(jwt.decoded.id);
		const index = parseInt(req.body.imgNumber.toString());
		while (extImg.length) {
			const pathImgage = await getFile(files[index] + extImg.shift(), profile);
			if (pathImgage) {
				res.status(200).sendFile(pathImgage);
				return;
			}
		}
		res.status(400).send("Error: photo does not exist");
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function getImageByUsernameController(
	req: Request,
	res: Response
) {
	const files = ["img0", "img1", "img2", "img3", "img4"];
	const extImg = [".png", ".jpg", ".jpeg"];
	try {
		await jwtVerify(req.headers.token, res);
		const profile = await getProfileByUsername(req.body.username);
		const index = parseInt(req.body.imgNumber.toString());
		while (extImg.length) {
			const pathImgage = await getFile(files[index] + extImg.shift(), profile);
			if (pathImgage) {
				res.status(200).sendFile(pathImgage);
				return;
			}
		}
		res.status(400).send("Error: photo does not exist");
	} catch (error) {
		res.status(400).send(error);
	}
}
