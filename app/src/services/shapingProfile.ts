/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shapingProfile.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:01 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:07:01 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from '../../types/types';
import { getUsageLocation } from '../model/locationRepositories';
import { getTagProfile } from '../model/tagProfileRepositories';

export async function shapingProfile(profile: profile) {
	const tagProfileList = await getTagProfile(profile.userId);
	const location = await getUsageLocation(profile.userId);
	const listTag: string[] = [];
	await Promise.all(
		tagProfileList &&
			tagProfileList.length &&
			tagProfileList.map((tag) => {
				if (!listTag.includes(tag.tag)) {
					listTag.push(tag.tag);
				}
			})
	);
	return { profile: profile, tag: listTag, location: location };
}
