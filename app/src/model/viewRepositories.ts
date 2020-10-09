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
