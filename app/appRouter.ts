/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   appRouter.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/21 11:03:25 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import {
	addUserController,
	loginUserController,
	deleteUserController,
	activateUserController,
} from './controller/userController';
import {
	addProfileController,
	getProfileController,
	getAllProfileController,
	getProfileByUsernameController,
} from './controller/profileController';
import {
	addlikedProfileController,
	getProfileLikeController,
	getProfileMatchController,
} from './controller/likeController';
import { addNotificationController, getNotificationController } from './controller/notificationController';
import { addTagProfileController } from './controller/tagController';

export function appRoutes(app) {
	app.get('/user/activateUser', (req: Request, res: Response) => activateUserController(req, res));
	app.post('/user/addUser', (req: Request, res: Response) => addUserController(req, res));
	app.post('/user/loginUser', (req: Request, res: Response) => loginUserController(req, res));
	app.post('/user/deleteUser', (req: Request, res: Response) => deleteUserController(req, res));

	app.get('/profile/getProfile', (req: Request, res: Response) => getProfileController(req, res));
	app.get('/profile/getAllProfile', (req: Request, res: Response) => getAllProfileController(req, res));
	app.get('/profile/getProfileByUsername', (req: Request, res: Response) => getProfileByUsernameController(req, res));
	app.post('/profile/addProfile', (req: Request, res: Response) => addProfileController(req, res));

	app.get('/like/getProfileLike', (req: Request, res: Response) => getProfileLikeController(req, res));
	app.get('/like/getProfileMatch', (req: Request, res: Response) => getProfileMatchController(req, res));
	app.post('/like/addLikedProfile', (req: Request, res: Response) => addlikedProfileController(req, res));

	app.get('/notification/getNotification', (req: Request, res: Response) => getNotificationController(req, res));
	app.post('/notification/addNotification', (req: Request, res: Response) => addNotificationController(req, res));

	app.post('/tag/addTagProfile', (req: Request, res: Response) => addTagProfileController(req, res));

	app.use((req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).json({ code: 404, error: 'Page not found' });
	});
}
