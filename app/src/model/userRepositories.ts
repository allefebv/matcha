/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:30 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/30 11:25:35 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from 'mysql';

import { user } from '../../types/types';
import { dataBase } from '../app';
import { generateActivationKey } from '../services/generateString';

export function getUserById(id: number): Promise<user> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			user
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Error: user does not exist" });
			}
			resolve(result[0]);
		});
	});
}

export function getUserByEmail(email: string): Promise<user> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			user
		WHERE
			email = ${escape(email)}`;

		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Error: user does not exist" });
			}
			resolve(result[0]);
		});
	});
}

export function changePassword(id: number, password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE
			user
		SET
			password = ${escape(password)} 
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve("Password has beeen change");
			}
			reject({ code: 400, message: "Error: password not change" });
		});
	});
}

export function changeEmail(id: number, email: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE
			user
		SET
			email = ${escape(email)}
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject({ code: 200, message: "Email already exsist" });
				}
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve("Email has been change");
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function addUser(email: string, password: string): Promise<user> {
	return new Promise((resolve, reject) => {
		const date = Date.now();
		const activationKey = generateActivationKey();
		const sql = `
		INSERT INTO user (
			email,
			password,
			registrationDate,
			activationKey
		) SELECT 
			${escape(email)},
			${escape(password)},
			${escape(date)},
			${escape(activationKey)}
		WHERE NOT EXISTS (
			SELECT
				*
			FROM
				user
			WHERE
				email = ${escape(email)}
		)`;

		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject({ code: 200, message: "Email already exsist" });
				}
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				const user = await getUserByEmail(email);
				resolve(user);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export async function activateUser(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE
			user
		SET
			activated = TRUE
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve("User activated");
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export async function deleteUser(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			user
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve("User delete");
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}
