/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   imageController.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:41 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/16 13:04:15 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";

import { getProfileByUserId } from "../model/profileRepositories";
import { jwtVerify } from "../services/validation/jwt";

export async function handleImageController(req: Request, res: Response) {
	const tabNameimg = ["img0", "img1", "img2", "img3", "img4"];

	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profile = await getProfileByUserId(jwt.decoded.id);
		const tabImg = [];

		console.log("Hello ?", req.files);
		for (let i in req.files) {
			console.log(i);
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
		res.status(200).send("Images add");
	} catch (error) {
		res.status(400).send(error);
	}
}
