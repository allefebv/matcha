/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   appRouter.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/10 16:34:49 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	getUserController,
	getAllUserController,
	addUserController,
	loginUserController,
	deleteUserController,
} from './controller/userController';
import { Request, Response } from 'express';

export function appRoutes(app) {
	app.get('/user/getUser', (req: Request, res: Response) => getUserController(req, res));
	app.post('/user/addUser', (req: Request, res: Response) => addUserController(req, res));
	app.post('/user/loginUser', (req: Request, res: Response) => loginUserController(req, res));
	app.post('/user/deleteUser', (req: Request, res: Response) => deleteUserController(req, res));

	/* ******************************** DEV ************************************ */

	app.get('/user/getAllUser', (req: Request, res: Response) => getAllUserController(req, res));

	/* ******************************* ERROR *********************************** */

	app.use((req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).send('Error 404: Page not found!');
	});
}
