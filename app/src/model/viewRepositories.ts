/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:33 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/27 15:23:31 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { view } from 'types/types';

import { dataBase } from '../app';

export async function getView(profileSeenId: number): Promise<view[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM viewProfile WHERE profileSeenId = ${profileSeenId}`;
		dataBase.query(sql, (error: string, result: view[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export async function getViewByViewerProfileId(
	profileSeenId: number,
	viewerProfileId: number
): Promise<view | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM viewProfile WHERE profileSeenId = ${profileSeenId} AND viewerProfileId = ${viewerProfileId} `;
		dataBase.query(sql, (error: string, result: view[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length ? result[0] : null);
		});
	});
}

export async function addView(
	profileSeenId: number,
	viewerProfileId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `INSERT INTO viewProfile (
			profileSeenId,
			viewDate,
			viewerProfileId
		) VALUES (
			${profileSeenId},
			${Date.now().toString()},
			${viewerProfileId}
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export async function updateView(
	profileSeenId: number,
	viewerProfileId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE viewProfile SET viewDate = '${Date.now().toString()}' WHERE profileSeenId = ${profileSeenId} AND viewerProfileId = ${viewerProfileId}`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function deleteViewProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM viewProfile WHERE profileSeenId = ${profileLikedId} AND viewerProfileId = ${profileHasBeenLikedId}`;
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
