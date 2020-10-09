/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:26 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/09 12:10:45 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fetch from 'node-fetch';

import {
	femaleSexualOrientation, maleSexualOrientation, tag1, tag2, tag3, tag4
} from './const';

//import { getApiLocationUser } from './getApi';

export function createUser(email: string) {
	return new Promise(async (resolve, rejects) => {
		const args = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: "Matcha1234",
			}),
		};

		await fetch("http://localhost:3001/user/addUser", args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				resolve(response.json());
			})
			.catch((error) => {
				rejects(null);
			});
	});
}

export function createProfile(infoApi: any, token: string) {
	return new Promise(async (resolve, rejects) => {
		const args = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			body: JSON.stringify({
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
			}),
		};

		await fetch("http://localhost:3001/profile/handleProfile", args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				resolve(response.text());
			})
			.catch((error) => {
				rejects(null);
			});
	});
}

/*
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
*/
