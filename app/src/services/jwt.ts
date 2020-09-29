import { Response } from 'express';
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   jwt.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/11 11:21:05 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/16 11:21:21 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
import jwt from 'jsonwebtoken';

import { user } from '../../types/types';

export const JWT_SIGN_SECRET = 'p4msh40n39f7nf037rhg0sa24gt90374gohdgwh3i8';

export function generateTokenForUser(user: user) {
	return jwt.sign(
		{
			id: user.id,
			activated: user.activated,
		},
		JWT_SIGN_SECRET,
		{
			expiresIn: '1h',
		}
	);
}

export async function jwtVerify(
	token: string | string[],
	res: Response
): Promise<{
	isLogin: boolean;
	decoded: { id: number; activated: number };
} | null> {
	return new Promise((resolve) => {
		let isLogin: boolean = false;

		jwt.verify(
			typeof token === 'string' ? token : null,
			JWT_SIGN_SECRET,
			(error, decoded: { id: number; activated: number }) => {
				isLogin = error ? false : true;

				if (isLogin === false) {
					res.status(401).send({
						code: 401,
						error: 'Token error or the user is not connected',
					});
					resolve(null);
				}
				resolve({
					isLogin: isLogin,
					decoded: { id: decoded.id, activated: decoded.activated },
				});
			}
		);
	});
}
