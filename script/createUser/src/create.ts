/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:26 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/08 19:00:36 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import crypto from 'crypto';

import { addUsageLocation } from '../../../app/src/model/locationRepositories';
import {
	addProfile, getProfileByUserId
} from '../../../app/src/model/profileRepositories';
import {
	addTag, addTagProfile, getTag
} from '../../../app/src/model/tagRepositories';
import {
	addUser, getUserByEmail
} from '../../../app/src/model/userRepositories';
import { location, profile, tag, user } from '../../../app/types/types';
import {
	femaleSexualOrientation, maleSexualOrientation, tag1, tag2, tag3, tag4
} from './const';
import { getApiLocationUser } from './getApi';

export function createUser(email: string, password: string): Promise<user> {
	return new Promise(async (resolve, rejects) => {
		const hashPassword = crypto
			.createHash("sha512")
			.update(password)
			.digest("hex");
		const isCreate = await addUser(email, hashPassword);
		if (isCreate) {
			const user = getUserByEmail(email);
			resolve(user);
		}
		rejects(null);
	});
}

export function createProfile(infoApi, user: user): Promise<profile> {
	return new Promise(async (resolve, rejects) => {
		const profileInfo = {
			age: infoApi.dob.age,
			firstname: infoApi.name.first,
			popularityScore: Math.floor(Math.random() * Math.floor(100)),
			lastname: infoApi.name.last,
			genre: infoApi.gender,
			sexualOrientation:
				infoApi.gender === "male"
					? maleSexualOrientation[
							Math.floor(Math.random() * maleSexualOrientation.length)
					  ]
					: femaleSexualOrientation[
							Math.floor(Math.random() * femaleSexualOrientation.length)
					  ],
			geoLocationAuthorization: true,
			username: infoApi.login.username,
			bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
			Suspendisse egestas vulputate enim viverra vehicula.`,
		};

		const isCreate = await addProfile(profileInfo as profile, user.id);
		if (isCreate) {
			const profile = await getProfileByUserId(user.id);
			resolve(profile);
		}
		rejects(null);
	});
}

export function createTag(infoApi: any, user: user): Promise<tag> {
	return new Promise(async (resolve, rejects) => {
		const tagList = [
			tag1[Math.floor(Math.random() * tag1.length)],
			tag2[Math.floor(Math.random() * tag2.length)],
			tag3[Math.floor(Math.random() * tag3.length)],
			tag4[Math.floor(Math.random() * tag4.length)],
		];
		const tagResult = [];
		await Promise.all(
			tagList.map(async (tagItem) => {
				let tag = await getTag(tagItem);
				if (!tag) {
					const newTag = await addTag(tagItem);
					if (newTag) {
						tag = await getTag(tagItem);
					}
				}
				if (tag) {
					const result = await addTagProfile(user.id, tag.id);
					if (result) {
						tagResult.push(tag.tag);
					}
				}
			})
		);
	});
}

export function createLocation(infoApi: any, user: user): Promise<location> {
	return new Promise(async (resolve, rejects) => {
		const result: any = await getApiLocationUser(
			"France," + infoApi.location.city.toString()
		);
		const location = {
			city: infoApi.location.city as string,
			postCode: result.results[0].components.postcode
				? result.results[0].components.postcode.toString()
				: "unknown",
			countryCode: result.results[0].components.country_code,
			country: result.results[0].components.country,
			lat: result.results[0].geometry.lat as number,
			lng: result.results[0].geometry.lng as number,
		};
		await addUsageLocation(user.id, location);
	});
}
