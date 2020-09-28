/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   router.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 11:22:14 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Application, Request, Response } from 'express';
import {
	addUserController,
	loginUserController,
	deleteUserController,
	activateUserController,
	changePasswordController,
	resetPasswordController,
	changeEmailController,
	activateNewEmailController,
} from './controller/userController';
import {
	addProfileController,
	getProfileController,
	getAllProfileController,
	getProfileByUsernameController,
	updateProfileController,
} from './controller/profileController';
import {
	addlikedProfileController,
	deletelikedProfileController,
	getProfileLikeController,
	getProfileMatchController,
} from './controller/likeController';
import { addNotificationController, getNotificationController } from './controller/notificationController';
import { addTagProfileController } from './controller/tagController';

function userRouter(app: Application) {
	app.get('/user/activateUser', (req: Request, res: Response) => activateUserController(req, res));
	app.get('/user/activateNewEmail', (req: Request, res: Response) => activateNewEmailController(req, res));
	app.post('/user/addUser', (req: Request, res: Response) => addUserController(req, res));
	app.post('/user/changePassword', (req: Request, res: Response) => changePasswordController(req, res));
	app.post('/user/resetPassword', (req: Request, res: Response) => resetPasswordController(req, res));
	app.post('/user/loginUser', (req: Request, res: Response) => loginUserController(req, res));
	app.post('/user/deleteUser', (req: Request, res: Response) => deleteUserController(req, res));
	app.post('/user/changeEmail', (req: Request, res: Response) => changeEmailController(req, res));
}

function profileRouter(app: Application) {
	app.get('/profile/getProfile', (req: Request, res: Response) => getProfileController(req, res));
	app.get('/profile/getAllProfile', (req: Request, res: Response) => getAllProfileController(req, res));
	app.get('/profile/getProfileByUsername', (req: Request, res: Response) => getProfileByUsernameController(req, res));
	app.post('/profile/addProfile', (req: Request, res: Response) => addProfileController(req, res));
	app.post('/profile/updateProfile', (req: Request, res: Response) => updateProfileController(req, res));
}

function likeRouter(app: Application) {
	app.get('/like/getProfileLike', (req: Request, res: Response) => getProfileLikeController(req, res));
	app.get('/like/getProfileMatch', (req: Request, res: Response) => getProfileMatchController(req, res));
	app.post('/like/addLikedProfile', (req: Request, res: Response) => addlikedProfileController(req, res));
	app.post('/like/deleteLikedProfile', (req: Request, res: Response) => deletelikedProfileController(req, res));
}

function notificationRouter(app: Application) {
	app.get('/notification/getNotification', (req: Request, res: Response) => getNotificationController(req, res));
	app.post('/notification/addNotification', (req: Request, res: Response) => addNotificationController(req, res));
}

function tagRouter(app) {
	app.post('/tag/addTagProfile', (req: Request, res: Response) => addTagProfileController(req, res));
}

export function router(app: Application) {
	userRouter(app);
	profileRouter(app);
	likeRouter(app);
	notificationRouter(app);
	tagRouter(app);

	app.use((req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).json({ code: 404, error: 'Page not found' });
	});
}
