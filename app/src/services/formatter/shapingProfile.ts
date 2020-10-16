/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shapingProfile.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:01 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/16 15:55:41 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from '../../../types/types';
import { getUsageLocation } from '../../model/locationRepositories';
import { getTagProfile } from '../../model/tagProfileRepositories';

export function shapingProfile(profile: profile) {
	return new Promise(async (resolve) => {
		const tagProfileList = await getTagProfile(profile.userId);
		const location = await getUsageLocation(profile.userId);
		location.isFromGeolocation = location.isFromGeolocation ? true : false;
		const listTag: string[] = [];
		if (tagProfileList && tagProfileList.length) {
			await Promise.all(
				tagProfileList.map((tag) => {
					if (!listTag.includes(tag.tag)) {
						listTag.push(tag.tag);
					}
				})
			);
		}
		resolve({ profile: profile, tag: listTag, location: location });
	});
}
