/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/10 15:07:41 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/10 17:14:40 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';
import { user } from '../types/userType';
import { generateActivationKey } from '../services/generateActivationKey';

export function getUser(username: string): Promise<user | number> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM user WHERE username = '${username}'`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				reject(500);
			}
			resolve(result.length === 1 ? result[0] : 400);
		});
	});
}

export function addUser(username: string, password: string, email: string): Promise<user | number> {
	return new Promise((resolve, reject) => {
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const activated = 'FALSE';
		const activationKey = generateActivationKey();
		const sql = `INSERT INTO user (username, email, password, registrationDate, activated, activationKey) VALUES ('${username}', '${email}', '${password}', '${date}', ${activated}, '${activationKey}')`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				reject(500);
			}
			const result = await getUser(username);
			resolve(result);
		});
	});
}

export async function deleteUser(username: string, password: string): Promise<number> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM user WHERE username = '${username}'`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				reject(500);
			}
			resolve(200);
		});
	});
}

/* ******************************** DEV ************************************ */

export function getAllUser() {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM user`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				reject(500);
			}
			resolve(result);
		});
	});
}
