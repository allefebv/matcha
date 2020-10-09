import { addTag, getAllTag } from '../model/tagRepositories';

export async function addNewTag(tagList: string[]) {
	let tagListFilter: Set<string> | string[] = new Set(tagList);
	tagListFilter = [...tagListFilter];
	const allTag = await getAllTag();
	const allTagName = allTag.map((tag) => tag.tag);
	const addListTag = tagListFilter.filter((item) => {
		return !allTagName.includes(item);
	});
	if (addListTag && addListTag.length) {
		await Promise.all(
			addListTag.map((tag) => {
				addTag(tag);
			})
		);
	}
}
