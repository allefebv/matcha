import { profile } from '../../types/types';
import { getUsageLocation } from '../model/locationRepositories';
import { getTagProfile } from '../model/tagRepositories';

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
