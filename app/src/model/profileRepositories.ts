/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileRepositories.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:19 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/14 14:59:18 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from '../../types/types';
import { dataBase } from '../app';

export function getProfileByUserId(id: number): Promise<profile | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM profile WHERE userId = ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				throw error;
			}
			if (!result || result.length !== 1) {
				reject("Error: profile does not exist");
			}
			resolve(result[0]);
		});
	});
}

export function getProfileByUsername(
	username: string
): Promise<profile | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM profile WHERE username = '${username}'`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				throw error;
			}
			if (!result || result.length !== 1) {
				reject("Error: profile does not exist");
			}
			resolve(result[0]);
		});
	});
}

export function getAllProfile(id: number): Promise<profile[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM profile WHERE userId != ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				throw error;
			}
			if (!result || result.length === 0) {
				reject("Error: profile list is empty");
			}
			resolve(result);
		});
	});
}

export function getProfileBySexualOriantation(
	id: number,
	sexualOriantation: string
): Promise<profile[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM profile WHERE sexualOrientation = '${sexualOriantation}' AND userId != ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				throw error;
			}
			if (!result || result.length === 0) {
				reject("Error: profile list is empty");
			}
			resolve(result);
		});
	});
}

export function addProfile(profile: profile, userId: number): Promise<profile> {
	return new Promise((resolve, reject) => {
		const gender = profile.gender ? `'${profile.gender}'` : null;
		const bio = profile.bio ? `'${profile.bio}'` : null;
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
			${gender},
			${profile.geoLocationAuthorization},
			'${profile.sexualOrientation || "bisexual"}',
			${bio})`;
		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject("Error: username or profile already exsist");
				}
				reject(error);
			}
			if (result && result.affectedRows) {
				const profileResult = await getProfileByUsername(profile.username);
				resolve(profileResult);
			}
			reject("Error: an error occured");
		});
	});
}

export function updateProfile(
	profile: profile,
	userId: number
): Promise<profile> {
	return new Promise((resolve, reject) => {
		const gender = profile.gender ? `'${profile.gender}'` : null;
		const bio = profile.bio ? `'${profile.bio}'` : null;
		const sql = `UPDATE profile SET
			dob = ${profile.dob},
			username = '${profile.username}',
			firstname = '${profile.firstname}',
			lastname= '${profile.lastname}',
			gender = ${gender},
			geoLocationAuthorization = ${profile.geoLocationAuthorization},
			sexualOrientation = '${profile.sexualOrientation}',
			bio = ${bio}
		WHERE userId = ${userId}`;
		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject("Error: username already exsist");
				}
				reject(error);
			}
			if (result && result.affectedRows) {
				const profileResult = await getProfileByUsername(profile.username);
				resolve(profileResult);
			}
			reject("Error: username already exsist");
		});
	});
}
