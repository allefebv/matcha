/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DEV_HANDLE_TABLE.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/14 11:11:35 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/16 18:12:52 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createConnection } from 'mysql';

let dataBase = null;

function initMysql() {
	dataBase = createConnection({
		host: 'fj199397-001.dbaas.ovh.net',
		port: 35833,
		user: 'jfleury',
		database: 'matcha',
		password: 'Matcha1234',
	});
	dataBase.connect((error) => {
		if (error) {
			throw error;
		}
		console.log('\x1b[33m' + 'mysql connected' + '\x1b[0m');
	});
}

export function addTableUser() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE user (
			id					INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			email				TEXT NOT NULL,
			password			TEXT NOT NULL,
			registrationDate	TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
			activated			BOOLEAN DEFAULT 0 NOT NULL,
			activationKey		CHAR(32) NOT NULL
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log('Table user created');
			resolve();
		});
	});
}

export function addTableProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE profile (
			userId							INTEGER NOT NULL,
			age								INTEGER NOT NULL,
			popularityScore					INTEGER DEFAULT 4000 NOT NULL,
			username	 					VARCHAR(32) NOT NULL,
			firstname						TEXT NOT NULL,
			lastname						TEXT NOT NULL,
			genre							TEXT NOT NULL,
			sexualOrientation				TEXT,
			location						TEXT,
			bio								TEXT,
			tag								TEXT,
			img0							TEXT,
			img1							TEXT,
			img2							TEXT,
			img3							TEXT,
			img4							TEXT,
			FOREIGN KEY (userId) 			REFERENCES user(id)
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log('Table profile created');
			resolve();
		});
	});
}

export function addTableLike() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE likeProfile (
			profileLikesId							INTEGER NOT NULL,
			profileHasBeenLikedId					INTEGER NOT NULL,
			FOREIGN KEY (profileLikesId) 			REFERENCES profile(userId),
			FOREIGN KEY (profileHasBeenLikedId) 	REFERENCES profile(userId)
		)`;
		console.log(sql);
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log('Table likeProfile created');
			resolve();
		});
	});
}

export function dropTable(nameTable: string) {
	return new Promise((resolve) => {
		const sql = `DROP TABLE ${nameTable}`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log(`Table ${nameTable} deleted`);
			resolve();
		});
	});
}

function main() {
	initMysql();
	addTableLike();
}
main();
