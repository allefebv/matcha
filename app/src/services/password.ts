/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   password.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:55 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:06:56 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import crypto from 'crypto';

export const hashPassword = (password: string): string =>
	crypto.createHash("sha512").update(password).digest("hex");

export function checkPassword(password: string, hash: string) {
	return new Promise((resolve, reject) => {
		if (hashPassword(password) === hash) {
			resolve();
		} else {
			reject("Password invalid");
		}
	});
}
