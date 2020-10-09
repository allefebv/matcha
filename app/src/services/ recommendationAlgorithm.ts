import { couldStartTrivia } from 'typescript';

import { profile } from '../../types/types';

async function distanceScore(profile: profile): Promise<number> {
	return new Promise((resolve) => {
		resolve(100);
	});
}

async function tagScore(profile: profile): Promise<number> {
	return new Promise((resolve) => {
		resolve(100);
	});
}

async function profileScore(profile: profile): Promise<number> {
	return new Promise((resolve) => {
		resolve(100);
	});
}

export async function recommendationAlgorithm(
	profileList: profile[]
): Promise<profile[]> {
	const resultTab: { profile: profile; score: number }[] = [];

	await Promise.all(
		profileList.map(async (profile) => {
			const tab = await Promise.all([
				distanceScore(profile),
				tagScore(profile),
				profileScore(profile),
			]);
			resultTab.push({
				profile: profile,
				score: tab[0] + tab[1] * 3 + tab[2],
			});
		})
	);
	await Promise.all(resultTab.sort((a, b) => a.score - b.score));
	const profileListResult: profile[] = [];
	await Promise.all(
		resultTab.map((result) => {
			profileListResult.push(result.profile);
		})
	);
	return profileListResult;
}
