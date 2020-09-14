/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   jwt.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/11 11:21:05 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 18:32:25 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import jwt from 'jsonwebtoken';
import { user } from '../types/types';

export const JWT_SIGN_SECRET = 'p4msh40n39f7nf037rhg0sa24gt90374gohdgwh3i8';

export function generateTokenForUser(user: user) {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		JWT_SIGN_SECRET,
		{
			expiresIn: '1h',
		}
	);
}
