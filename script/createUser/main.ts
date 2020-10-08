/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/08 18:58:51 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from 'fs';
import { createConnection } from 'mysql';

import { location, profile, tag, user } from '../../app/types/types';
import { HOW_MANY_CREATE_USER } from './src/const';
import {
	createLocation, createProfile, createTag, createUser
} from './src/create';
import { getApiRandonUser } from './src/getApi';

interface list {
	user: user;
	profile: profile;
	tag: tag;
	location: location;
}

function initMysql() {
	return new Promise((resolve) => {
		let dataBase = createConnection({
			host: "fj199397-001.dbaas.ovh.net",
			port: 35833,
			user: "jfleury",
			database: "matcha",
			password: "Matcha1234",
		});
		dataBase.connect((error: string) => {
			if (error) {
				throw error;
			}
			console.log("\x1b[33m" + "mysql connected" + "\x1b[0m");
			resolve();
		});
	});
}

async function main() {
	await initMysql();
	const userApiList: any = await getApiRandonUser();
	const list: list[] = [];
	let i = 0;
	while (i < userApiList.length) {
		const infoApi = userApiList[i];
		// User
		const user = await createUser(infoApi.email, infoApi.login.password);
		user.password = infoApi.login.password;
		// Profile
		const profile = await createProfile(infoApi, user);
		// Tag
		const tag = await createTag(infoApi, user);
		// Location
		const location = await createLocation(infoApi, user);
		// Store
		const userProfile = {
			user: user,
			profile: profile,
			location: location,
			tag: tag,
		};
		list.push(userProfile);
		console.log(`${i} / ${HOW_MANY_CREATE_USER}`);
	}
	fs.writeFile("userList.json", JSON.stringify(list), () => {
		console.log("Finish");
	});
}

main();
