/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleDataBase.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/14 11:11:35 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 15:43:19 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';

export function addTableUser() {
	return new Promise((resolve, reject) => {
		const sql = `CREATE TABLE user (
			id					INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			username			TEXT NOT NULL,
			email				TEXT NOT NULL,
			password			TEXT NOT NULL,
			registrationDate	TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
			activated			BOOLEAN DEFAULT 0 NOT NULL,
			activationKey		CHAR(32) NOT NULL
		)`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log('Table user created');
		});
	});
}

export function addTableProfile() {
	return new Promise((resolve, reject) => {
		const sql = `CREATE TABLE profile (
			id						INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			userId 					INTEGER NOT NULL,
			pseudo					TEXT NOT NULL,
			firstname				TEXT NOT NULL,
			lastname				TEXT NOT NULL,
			genre					TEXT NOT NULL,
			sexualOrientation		TEXT NOT NULL,
			bio						TEXT,
			tag						TEXT,
			FOREIGN KEY (userId)	REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log('Table profile created');
			resolve();
		});
	});
}

export function addImageTable() {
	return new Promise((resolve, reject) => {
		const sql = `CREATE TABLE image (
			id							INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			profileId					INTEGER NOT NULL,
			img0						TEXT,
			img1						TEXT,
			img2						TEXT,
			img3						TEXT,
			img4						TEXT,
			FOREIGN KEY (profileId)		REFERENCES profile(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log('Table image created');
		});
	});
}

export function dropTable(nameTable: string) {
	return new Promise((resolve, reject) => {
		const sql = `DROP TABLE ${nameTable}`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log(`Table ${nameTable} deleted`);
		});
	});
}
