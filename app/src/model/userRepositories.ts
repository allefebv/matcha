import { user } from '../../types/types';
import { dataBase } from '../app';
import { generateActivationKey } from '../services/generateString';

export function getUserById(id: number): Promise<user | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM user WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function getUserByEmail(email: string): Promise<user | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM user WHERE email = '${email}'`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function changePassword(id: number, password: string): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE user SET password = '${password}' WHERE id = ${id}`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function changeEmail(id: number, email: string): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE user SET email = '${email}' WHERE id = ${id}`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function addUser(email: string, password: string): Promise<boolean> {
	return new Promise((resolve) => {
		const date = Date.now();
		const activationKey = generateActivationKey();
		const sql = `INSERT INTO user (
			email,
			password,
			registrationDate,
			activationKey
		) VALUES (
			'${email}',
			'${password}',
			'${date}',
			'${activationKey}'
		)`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export async function activateUser(id: number): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE user SET activated = TRUE WHERE id = ${id}`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export async function deleteUser(id: number): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `DELETE FROM user WHERE id = ${id}`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}
