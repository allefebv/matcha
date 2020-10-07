import { couldStartTrivia } from 'typescript';

import { profile } from '../../types/types';

async function distanceScore(profile: profile): Promise<number> {
	return new Promise((resolve, reject) => {
		resolve(100);
	});
}

async function tagScore(profile: profile): Promise<number> {
	return new Promise((resolve, reject) => {
		resolve(100);
	});
}

async function profileScore(profile: profile): Promise<number> {
	return new Promise((resolve, reject) => {
		resolve(100);
	});
}

export async function recommendationAlgorithm(profileList: profile[]): Promise<profile[]> {
	const resultTab = [];

	await Promise.all(
		profileList.map(async (profile) => {
			const tab = await Promise.all([distanceScore(profile), tagScore(profile), profileScore(profile)]);
			resultTab.push({
				profile: profile,
				score: tab[0] + tab[1] * 3 + tab[2],
			});
		})
	);
	return resultTab;
}
