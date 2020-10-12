import { profile } from '../../types/types';
import { dataBase } from '../app';

export function getProfileByUserId(id: number): Promise<profile | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM profile WHERE userId = ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length === 1 ? result[0] : null);
		});
	});
}

export function getProfileByUsername(
	username: string
): Promise<profile | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM profile WHERE username = '${username}'`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result[0] : null);
		});
	});
}

export function getAllProfile(id: number): Promise<profile[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM profile WHERE userId != ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result : null);
		});
	});
}

export function getProfileBySexualOriantation(
	id: number,
	sexualOriantation: string
): Promise<profile[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM profile WHERE sexualOrientation = '${sexualOriantation}' AND userId != ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result : null);
		});
	});
}

export function addProfile(profile: profile, userId: number): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `INSERT INTO profile (
			userId,
			dob,
			username,
			firstname,
			lastname,
			gender,
			geoLocationAuthorization,
			sexualOrientation,
			bio
		) VALUES (
			${userId},
			${profile.dob},
			'${profile.username}',
			'${profile.firstname}',
			'${profile.lastname}',
			'${profile.gender || null}',
			${profile.geoLocationAuthorization},
			'${profile.sexualOrientation || "bisexual"}',
			'${profile.bio || null}'
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

export function updateProfile(
	profile: profile,
	userId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE profile SET
			dob = ${profile.dob},
			username = '${profile.username}',
			firstname = '${profile.firstname}',
			lastname= '${profile.lastname}',
			gender = '${profile.gender}',
			geoLocationAuthorization = ${profile.geoLocationAuthorization},
			sexualOrientation = '${profile.sexualOrientation}',
			bio = '${profile.bio}'
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
