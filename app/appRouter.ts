/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   appRouter.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:43 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/09 16:37:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { getUserByUsername, postUserRegister, getAllUser } from './controller/userController';
import { Request, Response } from 'express';

export function appRoutes(app) {
	// user
	app.get('/user/allUser', (req: Request, res: Response) => getAllUser(req, res));
	app.get('/user/userByUsername', (req: Request, res: Response) => getUserByUsername(req, res));
	app.post('/user/userRegister', (req: Request, res: Response) => postUserRegister(req, res));

	// Error
	app.use((req: Request, res: Response, next) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).send('Error 404: Page not found!');
	});
}
