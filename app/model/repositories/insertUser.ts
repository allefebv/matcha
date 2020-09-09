/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   insertUser.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:08:05 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/09 18:03:20 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../../app';
import { newUser, user } from '../entities/userType';

export async function insertNewUser(newUser: newUser, activationKey: string) {
	return new Promise((resolve, reject) => {
		const sqlUserRegister =
			"INSERT INTO user (username, email, password, registrationDate, activated, activationKey) VALUES ('" +
			newUser.username +
			"', '" +
			newUser.email +
			"', '" +
			newUser.password +
			"', '" +
			new Date().toISOString().slice(0, 19).replace('T', ' ') +
			"', " +
			'FALSE' +
			", '" +
			activationKey +
			"')";
		dataBase.query(sqlUserRegister, (error: string, result: user) => {
			if (error) {
				console.log(error);
				reject(error);
			}
			resolve(result);
		});
	});
}
