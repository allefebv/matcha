/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   appRouter.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 17:49:59 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';
import {
	getUserController,
	getUserByUsernameController,
	getUserByEmailController,
	getAllUserController,
	addUserController,
	loginUserController,
	deleteUserController,
	addProfileController,
	activateUserController,
} from './controller/userController';
import { addTableProfile, dropTable, addTableUser } from './model/handleDataBase';

export function appRoutes(app) {
	app.get('/user/getUser', (req: Request, res: Response) => getUserController(req, res));
	app.get('/user/getUserByUsername', (req: Request, res: Response) => getUserByUsernameController(req, res));
	app.get('/user/getUserByEmail', (req: Request, res: Response) => getUserByEmailController(req, res));
	app.get('/user/activateUser', (req: Request, res: Response) => activateUserController(req, res));
	app.post('/user/addUser', (req: Request, res: Response) => addUserController(req, res));
	app.post('/user/addProfile', (req: Request, res: Response) => addProfileController(req, res));
	app.post('/user/loginUser', (req: Request, res: Response) => loginUserController(req, res));
	app.post('/user/deleteUser', (req: Request, res: Response) => deleteUserController(req, res));

	/* ******************************** DEV ************************************ */

	app.get('/user/getAllUser', (req: Request, res: Response) => getAllUserController(req, res));

	/* ******************************* ERROR *********************************** */

	app.use((req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).json({ code: 404, error: 'Page not found' });
	});
}
