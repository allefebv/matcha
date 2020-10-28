/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notificationRepositories.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:16 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/28 12:31:12 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { notification } from '../../types/types';
import { dataBase } from '../app';

export function addNotification(
	profileNotifedId: number,
	notifierProfileId: number,
	notification: string
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO notificationProfile (
			profileNotifedId,
			notifierProfileId,
			date,
			notification
		) VALUES (
			${profileNotifedId},
			${notifierProfileId},
			'${Date.now()}',
			'${notification}'
		)`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function deleteNotification(
	id: number,
	profileNotifedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM notificationProfile WHERE id = ${id} AND profileNotifedId = ${profileNotifedId}`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function deleteAllNotification(
	notifierProfield: number,
	profileNotifiedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM notificationProfile WHERE notifierProfileId = ${notifierProfield} AND profileNotifiedId = ${profileNotifiedId}`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function getNotification(id: number): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			notificationProfile.*,
			profile.*
		FROM 
			notificationProfile
		JOIN 
			profile ON profile.userId = notificationProfile.notifierProfileId
		WHERE
			notificationProfile.profileNotifedId = ${id}
		`;
		dataBase.query(sql, (error: string, result: notification[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result);
		});
	});
}
