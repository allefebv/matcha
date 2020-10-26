/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*    recommendationAlgorithm.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:37 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/23 11:04:14 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { location, profile, tag, userProfile } from '../../../types/types';
import { shapingProfile } from '../formatter/shapingProfile';

function tagScore(tagReco: string[], tag: string[]): number {
	let score = 0;

	for (let i = 0; i < tagReco.length; i++) {
		if (tag.includes(tagReco[i])) {
			score += 20;
		}
	}
	return score;
}

function profileScore(profileReco, profile): number {
	if (profileReco.popularityScore > profile.popularityScore) {
		return 50;
	} else if (profileReco.popularityScore === profile.popularityScore) {
		return 100;
	} else {
		return 0;
	}
}

export async function recommendationAlgorithm(
	profileListLocation: any[],
	userProfile: userProfile
) {
	const resultTab = [];

	await Promise.all(
		profileListLocation.map((profileLocation) => {
			const tag = userProfile.tag
				? tagScore(profileLocation.tag.split(","), userProfile.tag)
				: 0;

			const popularityScore = profileScore(
				profileLocation.popularityScore,
				userProfile.profile
			);

			resultTab.push({
				profile: shapingProfile(profileLocation),
				score: tag * 3 + popularityScore,
			});
		})
	);

	return resultTab.sort((a, b) => b.score - a.score);
}
