/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   hydrationDatabase.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/28 11:39:54 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/08 13:18:25 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import crypto from 'crypto';
import fs from 'fs';
import { createConnection } from 'mysql';
import fetch from 'node-fetch';
import { isTaggedTemplateExpression } from 'typescript';

import { addUsageLocation } from '../src/model/locationRepositories';
import {
	addProfile,
	getProfileByUserId
} from '../src/model/profileRepositories';
import { addUser, getUserByEmail } from '../src/model/userRepositories';
import { profile } from '../types/types';

let dataBase = null;
const HOW_MANY_CREATE = 1;

function initMysql() {
	return new Promise((resolve) => {
		dataBase = createConnection({
			host: "fj199397-001.dbaas.ovh.net",
			port: 35833,
			user: "jfleury",
			database: "matcha",
			password: "Matcha1234",
		});
		dataBase.connect((error) => {
			if (error) {
				throw error;
			}
			console.log("\x1b[33m" + "mysql connected" + "\x1b[0m");
			resolve();
		});
	});
}

function getData() {
	return new Promise((resolve) => {
		fetch(`https://randomuser.me/api/?results=${HOW_MANY_CREATE}&nat=fr`)
			.then((res) => {
				return res.text();
			})
			.then((body) => {
				resolve(JSON.parse(body));
			});
	});
}

function getDataLocation(param: string) {
	return new Promise((resolve) => {
		fetch(`https://api.opencagedata.com/geocode/v1/json?q=${param}&key=351942e01c514c05abe71bdb2fbd5811`)
			.then((res) => {
				return res.json();
			})
			.then((body) => {
				console.log(body);
				resolve(body);
			});
	});
}

const maleSexualOrientation = ["homosexual", "bisexual", "heterosexual"];
const femaleSexualOrientation = ["lesbian", "bisexual", "heterosexual"];

(async function main() {
	await initMysql();
	const userApiList: any = await getData();
	const userList = [];
	await Promise.all(
		userApiList.results.map(async (userApi) => {
			const userInfo = {
				email: userApi.email,
				password: userApi.login.password,
			};
			const hashPassword = crypto.createHash("sha512").update(userInfo.password).digest("hex");
			if (userInfo.email && hashPassword) {
				await addUser(userInfo.email, hashPassword);
				const user = await getUserByEmail(userInfo.email);
				if (user) {
					user.password = userApi.login.password;
					const profileInfo = {
						age: userApi.dob.age,
						firstname: userApi.name.first,
						lastname: userApi.name.last,
						genre: userApi.gender,
						sexualOrientation:
							userApi.gender === "male"
								? maleSexualOrientation[Math.floor(Math.random() * maleSexualOrientation.length)]
								: femaleSexualOrientation[Math.floor(Math.random() * femaleSexualOrientation.length)],
						geoLocationAuthorization: true,
						username: userApi.login.username,
						bio:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas vulputate enim viverra vehicula. Vestibulum porta tempus orci, nec finibus nisi. Proin blandit, lacus sit amet sagittis elementum, leo lorem porttitor justo, porttitor pretium sapien tellus sed enim.",
					};
					/*
						img0: userApi.picture.large,
						img1: userApi.picture.medium,
						img2: userApi.picture.thumbnail,
					*/
					await addProfile(profileInfo as profile, user.id);
					const profile = await getProfileByUserId(user.id);
					if (profile) {
						const result: any = await getDataLocation("France," + userApi.location.city.toString());
						const location = {
							city: userApi.location.city as string,
							postCode: userApi.location.postcode.toString() as string,
							countryCode: "fr",
							country: userApi.location.country as string,
							lat: result.results[0].geometry.lat as number,
							lng: result.results[0].geometry.lng as number,
						};
						await addUsageLocation(user.id, location);
						const userProfile = {
							[profile.username]: {
								user: user,
								profile: profile,
								location: location,
							},
						};
						userList.push(userProfile);
					}
				}
			}
		})
	);
	fs.writeFile("userList.json", JSON.stringify(userList), () => {
		console.log("Finish");
	});
})();
