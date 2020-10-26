/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   messageRepositories.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 12:07:19 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/23 13:52:29 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';

export function addMMessage(
	sender: string,
	receiver: string,
	timestamp: string,
	message: string
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO message (
			sender,
			receiver,
			timestamp,
			message
		) VALUES (
			'${sender}',
			'${receiver}',
			'${timestamp}',
			'${message}'
		)`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function getMessage(
	username1: string,
	username2: string
): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM message WHERE sender = '${username1}' and receiver = '${username2}' OR sender = '${username2}' and receiver = '${username1}'`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result);
		});
	});
}
