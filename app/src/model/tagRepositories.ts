import { tag, tagProfile } from '../../types/types';
import { dataBase } from '../app';

export function getTag(tag: string): Promise<tag | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM tag WHERE tag = '${tag}'`;
		dataBase.query(sql, (error: string, result: tag[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function getTagById(id: number): Promise<tag | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM tag WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result: tag[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function getTagProfile(id: number): Promise<{ tag: string }[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT tag.tag FROM tagProfile INNER JOIN tag WHERE tagProfile.profileId = ${id}`;
		dataBase.query(sql, (error: string, result: { tag: string }[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result);
		});
	});
}

export function addTag(tag: string): Promise<tag | null> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO tag (
			tag
		) VALUES (
			'${tag}'
		)`;
		dataBase.query(sql, (error: string, result: tag) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result);
		});
	});
}

export function addTagProfile(profileId: number, tagId: number): Promise<tagProfile | null> {
	return new Promise((resolve, reject) => {
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
				reject(null);
			}
			resolve(result);
		});
	});
}

export function deleteTagProfile(tagId: number, profileId: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM tagProfile WHERE tagId = ${tagId} AND profileId = ${profileId}`;
		dataBase.query(sql, (error: string, result: tagProfile) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}
