import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { getProfileByUserId } from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';

export async function handleImagesController(req: Request, res: Response) {
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
		console.log(tabImg);
		tabImg.map((img) => {
			const mimetype = img[1].mimetype.split("/");
			const path =
				"./images/" + profile.username + "/" + img[0] + "." + mimetype[1];
			img[1].mv(path);
		});
		res.send("ok");
	}
}

export async function getImagesController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUserId(jwt.decoded.id);
		const files = ["img0", "img1", "img2", "img3", "img4"];

		const getFile = (file: string): Promise<string> => {
			return new Promise((resolve) => {
				const pathImage = path.join(
					__dirname,
					"../../images/",
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
		};

		const extImg = [".png", ".jpg", ".jpeg"];
		const index = parseInt(req.query.imgNumber.toString());
		while (extImg.length) {
			const pathImgage = await getFile(files[index] + extImg.shift());
			if (pathImgage) {
				res.status(200).sendFile(pathImgage);
				return;
			}
		}
		res.status(400).send("An error occured");
	}
}
