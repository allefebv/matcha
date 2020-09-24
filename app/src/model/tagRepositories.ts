/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagRepositories.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/18 16:04:36 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 12:51:41 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';
import { tag, tagProfile } from '../../types/types';

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

export function getTagProfile(id: number): Promise<tagProfile[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM tagProfile WHERE profileId = ${id}`;
		dataBase.query(sql, (error: string, result: tagProfile[]) => {
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
