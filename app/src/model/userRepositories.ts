/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:30 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:06:30 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { rejects } from 'assert';

import { user } from '../../types/types';
import { dataBase } from '../app';
import { generateActivationKey } from '../services/generateString';

export function getUserById(id: number): Promise<user> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM user WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				throw error;
			}
			if (!result || result.length !== 1) {
				reject("Error: user does not exist");
			}
			resolve(result[0]);
		});
	});
}

export function getUserByEmail(email: string): Promise<user> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM user WHERE email = '${email}'`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				throw error;
			}
			if (!result || result.length !== 1) {
				reject("Error: user does not exist");
			}
			resolve(result[0]);
		});
	});
}

export function changePassword(id: number, password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE user SET password = '${password}' WHERE id = ${id}`;
		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				throw error;
			}
			if (result.affectedRows) {
				resolve("Password has beeen change");
			}
			reject("Error: password not change");
		});
	});
}

export function changeEmail(id: number, email: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE user SET email = '${email}' WHERE id = ${id}`;
		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				reject("Error: email already exsist");
			}
			if (result && result.affectedRows) {
				resolve("Email has been change");
			}
			reject("Error: email already exsist");
		});
	});
}

export function addUser(email: string, password: string): Promise<user> {
	return new Promise((resolve, reject) => {
		const date = Date.now();
		const activationKey = generateActivationKey();
		const sql = `INSERT INTO user (
			email,
			password,
			registrationDate,
			activationKey
		) SELECT 
			'${email}',
			'${password}',
			'${date}',
			'${activationKey}'
			WHERE NOT EXISTS(SELECT * FROM user WHERE email='${email}')`;
		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				throw error;
			}
			if (result.affectedRows) {
				const user = await getUserByEmail(email);
				resolve(user);
			}
			reject("Error: email already exsist");
		});
	});
}

export async function activateUser(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE user SET activated = TRUE WHERE id = ${id}`;
		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				throw error;
			}
			if (result.affectedRows) {
				resolve("User activated");
			}
			reject("Error: user has not been activated");
		});
	});
}

export async function deleteUser(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM user WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result) => {
			if (error) {
				throw error;
			}
			if (result.affectedRows) {
				resolve("User delete");
			}
			reject("Error: user has been deleted");
		});
	});
}
