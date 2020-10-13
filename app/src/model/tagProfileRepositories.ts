/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagProfileRepositories.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:23 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:06:23 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { tag, tagProfile } from '../../types/types';
import { dataBase } from '../app';

export function getTagProfile(id: number): Promise<{ tag: string }[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM tag INNER JOIN tagProfile WHERE tagProfile.profileId = ${id} AND tag.id = tagProfile.tagId`;
		dataBase.query(sql, (error: string, result: { tag: string }[]) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}

export function addTagProfile(
	profileId: number,
	tagId: number
): Promise<tagProfile | null> {
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
				reject(error);
			}
			resolve(result);
		});
	});
}

export function deleteTagProfile(
	tagId: number,
	profileId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM tagProfile WHERE tagId = ${tagId} AND profileId = ${profileId}`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}
