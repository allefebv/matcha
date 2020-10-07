import { location, notification, profile } from '../../types/types';
import { dataBase } from '../app';

export function addGeoLocation(userId: number, location: location): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO geoLocation (
			userId,
			city,
			postCode,
			countryCode,
			country,
			lat,
			lng
		) VALUES (
			${userId},
			'${location.city}',
			'${location.postCode}',
			'${location.countryCode}',
			'${location.country}',
			${location.lat},
			${location.lng}
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

export function updateGeoLocation(userId: number, location: location): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE geoLocation SET
		city = ${location.city},
		postCode = ${location.postCode},
		countryCode = ${location.countryCode},
		country = ${location.country},
		lat = ${location.lat},
		lng = ${location.lng}
		WHERE userId = ${userId}`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function addUsageLocation(userId: number, location: location): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO usageLocation (
			userId,
			city,
			postCode,
			countryCode,
			country,
			lat,
			lng
		) VALUES (
			${userId},
			'${location.city}',
			'${location.postCode}',
			'${location.country}',
			'${location.countryCode}',
			${location.lat},
			${location.lng},
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

export function getGeoLocation(id: number): Promise<notification[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM geoLocation WHERE userId = ${id}`;
		dataBase.query(sql, (error: string, result: notification[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result.length ? result : null);
		});
	});
}

export function getUsageLocation(id: number): Promise<notification[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM usageLocation WHERE userId = ${id}`;
		dataBase.query(sql, (error: string, result: notification[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result);
		});
	});
}
