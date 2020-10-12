/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:26 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/12 16:42:15 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fetch from 'node-fetch';

import { location, profile, tag, user } from '../../../app/types/types';
import {
	femaleSexualOrientation, maleSexualOrientation, tag1, tag2, tag3, tag4
} from './const';
import { getApiLocationUser } from './getApi';

export function createUser(
	email: string
): Promise<{ user: user; token: string } | null> {
	return new Promise(async (resolve) => {
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
				return response;
			})
			.then((response) => {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.indexOf("application/json") !== -1) {
					resolve(response.json());
				} else {
					resolve(null);
				}
			})
			.catch((error) => {
				console.log("-> addUser error");
				resolve(null);
			});
	});
}

export function createProfile(infoApi: any, token: string): Promise<profile> {
	return new Promise(async (resolve) => {
		const args = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			body: JSON.stringify({
				dob: new Date(infoApi.dob.date).getTime(),
				firstname: infoApi.name.first,
				popularityScore: Math.floor(Math.random() * Math.floor(100)),
				lastname: infoApi.name.last,
				gender: infoApi.gender,
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
				bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas vulputate enim viverra vehicula.`,
			}),
		};

		await fetch("http://localhost:3001/profile/handleProfile", args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response;
			})
			.then((response) => {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.indexOf("application/json") !== -1) {
					resolve(response.json());
				} else {
					resolve(null);
				}
			})
			.catch((error) => {
				console.log("-> addProfile error");
				resolve(null);
			});
	});
}

export function createTag(infoApi: any, token: string): Promise<tag> {
	return new Promise(async (resolve) => {
		const tagList = {
			tagList: [
				tag1[Math.floor(Math.random() * tag1.length)],
				tag2[Math.floor(Math.random() * tag2.length)],
				tag3[Math.floor(Math.random() * tag3.length)],
				tag4[Math.floor(Math.random() * tag4.length)],
			],
		};

		const args = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			body: JSON.stringify(tagList),
		};

		await fetch("http://localhost:3001/tag/addTagProfile", args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response;
			})
			.then((response) => {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.indexOf("application/json") !== -1) {
					resolve(response.json());
				} else {
					resolve(null);
				}
			})
			.catch((error) => {
				console.log("-> addTag error");
				resolve(null);
			});
	});
}

export function createLocation(infoApi: any, token: string): Promise<location> {
	return new Promise(async (resolve) => {
		const result: any = await getApiLocationUser(
			"France," + infoApi.location.city.toString()
		);
		if (result) {
			const args = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					token: token,
				},
				body: JSON.stringify({
					city: infoApi.location.city as string,
					postCode: result.results[0].components.postcode
						? result.results[0].components.postcode.toString()
						: null,
					countryCode: result.results[0].components.country_code,
					country: result.results[0].components.country,
					lat: result.results[0].geometry.lat as number,
					lng: result.results[0].geometry.lng as number,
				}),
			};

			await fetch("http://localhost:3001/location/handleUsageLocation", args)
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response;
				})
				.then((response) => {
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") !== -1) {
						resolve(response.json());
					} else {
						resolve(null);
					}
				})
				.catch((error) => {
					console.log("-> addLocation error");
					resolve(null);
				});
		} else {
			console.log("getApiLocationUser null");
			resolve(null);
		}
	});
}
