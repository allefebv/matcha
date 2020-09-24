/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notificationRepositories.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/18 11:36:01 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 12:52:55 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';
import { notification } from '../../types/types';

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
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}

export function getNotification(id: number): Promise<notification[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM notificationProfile WHERE profileNotifedId = ${id}`;
		dataBase.query(sql, (error: string, result: notification[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result);
		});
	});
}