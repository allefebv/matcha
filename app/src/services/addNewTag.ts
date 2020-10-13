import { addTag, getAllTag } from '../model/tagRepositories';

export function addNewTag(tagList: string[]) {
	return new Promise((resolve) => {
		let tagSet: Set<string> = new Set(tagList);
		const tagListFilter = [...tagSet];
		getAllTag()
			.then((allTag) => {
				const allTagName = allTag.map((tag) => tag.tag);
				const addListTag = tagListFilter.filter(
					(item) => !allTagName.includes(item)
				);
				if (addListTag && addListTag.length) {
					addListTag.map((tag) => addTag(tag));
				}
				resolve();
			})
			.catch((error) => {
				resolve();
			});
	});
}
