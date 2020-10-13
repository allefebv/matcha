import { rejects } from 'assert';
import { resolve } from 'path';

import { addTag, getAllTag } from '../model/tagRepositories';

export function addNewTag(tagList: string[]) {
	return new Promise(async (resolve, reject) => {
		let tagSet: Set<string> = new Set(tagList);
		const tagListFilter = [...tagSet];
		if (tagListFilter) {
			await Promise.all(
				tagListFilter.map(async (tag) => {
					await addTag(tag);
				})
			);
			resolve();
		} else {
			reject("Error: tagList empty");
		}
	});
}
