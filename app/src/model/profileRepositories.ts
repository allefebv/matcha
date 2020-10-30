/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileRepositories.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:19 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/30 16:00:13 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from 'mysql';

import { profile } from '../../types/types';
import { dataBase } from '../app';

export function getCompleteProfileByUserId(id: number): Promise<any> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			profile.*,
			usageLocation.city,
			usageLocation.country,
			usageLocation.countryCode,
			usageLocation.lat,
			usageLocation.lng,
			usageLocation.postCode,
			usageLocation.isFromGeolocation,
			GROUP_CONCAT( tag.tag SEPARATOR ',' ) AS tag
		FROM
			profile
		LEFT JOIN 
			usageLocation ON usageLocation.userId = profile.userId
		LEFT JOIN 
			tagProfile ON tagProfile.profileId = profile.userId
		LEFT JOIN 
			tag ON tagProfile.tagId = tag.id
		WHERE
			profile.userId = ${escape(id)}
		GROUP BY
			profile.userId,
			usageLocation.city,
			usageLocation.country,
			usageLocation.countryCode,
			usageLocation.lat,
			usageLocation.lng,
			usageLocation.postCode,
			usageLocation.isFromGeolocation`;

		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Profile does not exist" });
				return;
			}
			resolve(result[0]);
		});
	});
}

export function getCompleteProfileByUsername(username: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			profile.*,
			usageLocation.city,
			usageLocation.country,
			usageLocation.countryCode,
			usageLocation.lat,
			usageLocation.lng,
			usageLocation.postCode,
			usageLocation.isFromGeolocation,
			GROUP_CONCAT( tag.tag SEPARATOR ',' ) AS tag
		FROM
			profile
			JOIN usageLocation ON usageLocation.userId = profile.userId
			JOIN tagProfile ON tagProfile.profileId = profile.userId
			JOIN tag ON tagProfile.tagId = tag.id
		WHERE
			profile.username = ${escape(username)}
		GROUP BY
			profile.userId,
			usageLocation.city,
			usageLocation.country,
			usageLocation.countryCode,
			usageLocation.lat,
			usageLocation.lng,
			usageLocation.postCode,
			usageLocation.isFromGeolocation`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Profile does not exist" });
				return;
			}
			resolve(result[0]);
		});
	});
}

export function getProfileByUserId(id: number): Promise<profile | null> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			profile
		WHERE
			userId = ${escape(id)}`;

		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Profile does not exist" });
				return;
			}
			resolve(result[0]);
		});
	});
}

export function getProfileByUsername(
	username: string
): Promise<profile | null> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			profile
		WHERE
			username = ${escape(username)}`;

		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Profile does not exist" });
				return;
			}
			resolve(result[0]);
		});
	});
}

export function getAllProfile(id: number): Promise<profile[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			profile
		WHERE
			userId != ${escape(id)}`;

		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length === 0) {
				reject({ code: 200, message: "Profile list is empty" });
				return;
			}
			resolve(result);
		});
	});
}

export function getProfileBySexualOriantation(
	id: number,
	sexualOriantation: string,
	gender: string
): Promise<any> {
	return new Promise((resolve, reject) => {
		let genderFilter = null;
		if (sexualOriantation === "heterosexual" && gender === "male") {
			genderFilter = "AND profile.gender = 'female'";
		}
		if (sexualOriantation === "heterosexual" && gender === "female") {
			genderFilter = "AND profile.gender = 'male'";
		}
		const sql = `
		SELECT
			profile.*,
			usageLocation.city,
			usageLocation.country,
			usageLocation.countryCode,
			usageLocation.lat,
			usageLocation.lng,
			usageLocation.postCode,
			usageLocation.isFromGeolocation,
			GROUP_CONCAT( tag.tag SEPARATOR ',' ) AS tag
		FROM
			profile
			JOIN usageLocation ON usageLocation.userId = profile.userId
			JOIN tagProfile ON tagProfile.profileId = profile.userId
			JOIN tag ON tagProfile.tagId = tag.id
		WHERE
			profile.sexualOrientation = ${escape(sexualOriantation)}
		AND
			profile.userId != ${escape(id)}
		${genderFilter}
		GROUP BY
			profile.userId,
			usageLocation.city,
			usageLocation.country,
			usageLocation.countryCode,
			usageLocation.lat,
			usageLocation.lng,
			usageLocation.postCode,
			usageLocation.isFromGeolocation`;

		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length === 0) {
				reject({ code: 200, message: "Profile list is empty" });
				return;
			}
			resolve(result);
		});
	});
}

export function addProfile(profile: profile, userId: number): Promise<profile> {
	return new Promise((resolve, reject) => {
		const gender = profile.gender ? `'${profile.gender}'` : null;
		const bio = profile.bio ? `'${profile.bio}'` : null;
		const geoLocationAuthorization = profile.geoLocationAuthorization
			? `${profile.geoLocationAuthorization}`
			: false;
		const sql = `
		INSERT INTO 
			profile (
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
			${escape(userId)},
			${escape(profile.dob)},
			${escape(profile.username)},
			${escape(profile.firstname)},
			${escape(profile.lastname)},
			${escape(gender)},
			${escape(geoLocationAuthorization)},
			${escape(profile.sexualOrientation || "bisexual")}',
			${escape(bio)})`;

		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject({
						code: 400,
						message: "Error: username or profile already exsist",
					});
					return;
				}
				reject({ code: 500, message: error });
				return;
			}
			if (result && result.affectedRows) {
				const profileResult = await getProfileByUsername(profile.username);
				resolve(profileResult);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function updateProfile(
	profile: profile,
	userId: number
): Promise<profile> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE 
			profile
		SET
			dob = ${escape(profile.dob)},
			username = ${escape(profile.username)},
			firstname = ${escape(profile.firstname)},
			lastname= ${escape(profile.lastname)},
			gender = ${escape(profile.gender)},
			geoLocationAuthorization = ${escape(profile.geoLocationAuthorization)},
			sexualOrientation = ${escape(profile.sexualOrientation)},
			bio = ${escape(profile.bio)}
		WHERE
			userId = ${escape(userId)}`;

		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject({
						code: 400,
						message: "Error: username or profile already exsist",
					});
					return;
				}
				reject({ code: 500, message: error });
				return;
			}
			if (result && result.affectedRows) {
				const profileResult = await getProfileByUsername(profile.username);
				resolve(profileResult);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}
