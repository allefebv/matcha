import { location, notification, profile } from '../../types/types';
import { dataBase } from '../app';

function getLocation(id: number, table: string): Promise<location> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM ${table} WHERE userId = ${id}`;
		dataBase.query(sql, (error: string, result: location[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result.length ? result[0] : null);
		});
	});
}

function addLocation(userId: number, location: location, table: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO ${table} (
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
export function updateLocation(userId: number, location: location, table: string): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE ${table} SET
		city = '${location.city}',
		postCode = '${location.postCode}',
		countryCode = '${location.countryCode}',
		country = '${location.country}',
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

// geoLocation table

export async function getGeoLocation(id: number) {
	return await getLocation(id, "geoLocation");
}

export async function addGeoLocation(userId: number, location: location) {
	return await addLocation(userId, location, "geoLocation");
}

export async function updateGeoLocation(userId: number, location: location) {
	return await updateLocation(userId, location, "geoLocation");
}

// usageLocation table

export async function getUsageLocation(id: number) {
	return await getLocation(id, "usageLocation");
}

export async function addUsageLocation(userId: number, location: location) {
	return await addLocation(userId, location, "usageLocation");
}

export async function updateUsageLocation(userId: number, location: location) {
	return await updateLocation(userId, location, "usageLocation");
}
