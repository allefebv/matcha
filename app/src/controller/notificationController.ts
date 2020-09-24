/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notificationController.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/18 11:36:03 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 12:52:36 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import { getProfileByUserId, getProfileByUsername } from '../model/profileRepositories';
import { jwtVerify } from '../services/jwt';
import { addNotification, getNotification } from '../model/notificationRepositories';
import { time } from 'console';

export async function addNotificationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	const profileNotified = await getProfileByUsername(req.body.usernameNotified);

	if (jwt && jwt.isLogin && profileNotified) {
		const notification = await addNotification(profileNotified.userId, jwt.decoded.id, req.body.notification);
		if (notification) {
			res.status(200).send('Notification add');
			return;
		}
	}
	res.status(400).send('An error occured');
}
/*
export async function deleteNotificationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const deleteNotification = await deleteNotification(
			profileNotified.userId,
			jwt.decoded.id,
			req.body.notification
		);
		if (notification) {
			res.status(200).send('Notification add');
			return;
		}
	}
	res.status(400).send('An error occured');
}
*/
export async function getNotificationController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);

	if (jwt && jwt.isLogin) {
		const notificationListId = await getNotification(jwt.decoded.id);
		const notificationList = [];
		await Promise.all(
			notificationListId.map(async (item) => {
				notificationList.push({
					notifierProfile: await getProfileByUserId(item.notifierProfileId),
					date: item.date,
					notification: item.notification,
				});
			})
		);
		res.status(200).send(notificationList);
		return;
	}
	res.status(400).send('An error occured');
}
