import { tag, tagProfile } from '../../types/types';
import { dataBase } from '../app';

export function getTag(tag: string): Promise<tag | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag WHERE tag = '${tag}'`;
		dataBase.query(sql, (error: string, result: tag[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length ? result[0] : null);
		});
	});
}

export function getAllTag(): Promise<{ tag: string }[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag`;
		dataBase.query(sql, (error: string, result: { tag: string }[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function getTagById(id: number): Promise<tag | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result: tag[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function getTagProfile(id: number): Promise<{ tag: string }[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag INNER JOIN tagProfile WHERE tagProfile.profileId = ${id} AND tag.id = tagProfile.tagId`;
		dataBase.query(sql, (error: string, result: { tag: string }[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function addTag(tag: string): Promise<tag | null> {
	return new Promise((resolve) => {
		/*
		const sql = `INSERT INTO tag (
			tag
		) VALUES (
			'${tag}'
		) WHERE NOT EXISTS (
			SELECT tag FROM tag WHERE tag = ${tag}
		)`;
		*/
		const sql = `
		BEGIN
			IF NOT EXSISTS (SELECT * FROM tag WHERE tag = '${tag}')
			BEGIN
				INSERT INTO tag (tag) VALUES ('${tag}')
			END
		END`;
		dataBase.query(sql, (error: string, result: tag) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function addTagProfile(
	profileId: number,
	tagId: number
): Promise<tagProfile | null> {
	return new Promise((resolve) => {
		const sql = `INSERT INTO tagProfile (
			tagId,
			profileId
		) VALUES (
			${tagId},
			${profileId}
		)`;
		dataBase.query(sql, (error: string, result: tagProfile) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function deleteTagProfile(
	tagId: number,
	profileId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `DELETE FROM tagProfile WHERE tagId = ${tagId} AND profileId = ${profileId}`;
		dataBase.query(sql, (error: string, result: tagProfile) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}
