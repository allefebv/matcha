/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/12 14:05:22 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createConnection } from 'mysql';

import { location, profile, tag, user } from '../../app/types/types';
import { HOW_MANY_CREATE_USER } from './src/const';
import {
	createLocation, createProfile, createTag, createUser
} from './src/create';
import { getApiRandonUser } from './src/getApi';

var fs = require("fs");

async function main() {
	const userApiList: any = await getApiRandonUser();
	const list = [];
	let i = 0;
	if (userApiList) {
		await Promise.all(
			userApiList.results.map(async (infoApi) => {
				// User
				const user = await createUser(infoApi.email);
				if (user) {
					const profile = await createProfile(infoApi, user.token);
					console.log(profile);
					if (profile) {
						const tag = await createTag(infoApi, user.token);
						const location = await createLocation(infoApi, user.token);
						const userProfile = {
							user: user.user,
							profile: profile,
							location: location,
							tag: tag,
						};
						i++;
						list.push(userProfile);
						console.log(`--> user num* ${i} / ${HOW_MANY_CREATE_USER} push`);
					}
				}
			})
		);
		fs.writeFile("userList.json", JSON.stringify(list), () => {
			console.log(`Finish ${list.length} user create`);
		});
	} else {
		console.log("userApiList null");
	}
}

main();
