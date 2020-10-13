/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:09 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:06:11 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { like } from '../../types/types';
import { dataBase } from '../app';

export function addLikedProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `INSERT INTO likeProfile (
			profileLikesId,
			profileHasBeenLikedId
		) VALUES (
			${profileLikedId},
			${profileHasBeenLikedId}
		)`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function deleteLikedProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `DELETE FROM likeProfile WHERE profileLikesId = ${profileLikedId} AND profileHasBeenLikedId = ${profileHasBeenLikedId}`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function getUserHasBeenLikedById(id: number): Promise<like[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM likeProfile WHERE profileLikesId = ${id}`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result : null);
		});
	});
}

export function getProfileMatch(id: number): Promise<like[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM likeProfile WHERE profileLikesId = ${id} OR profileHasBeenLikedId = ${id}`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result : null);
		});
	});
}
