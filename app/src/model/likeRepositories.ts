/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/16 13:19:24 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 12:52:19 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';
import { like } from '../../types/types';

export function addLikedProfile(profileLikedId: number, profileHasBeenLikedId: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
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
				reject(false);
			}
			resolve(true);
		});
	});
}

export function deleteLikedProfile(profileLikedId: number, profileHasBeenLikedId: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM likeProfile WHERE profileLikesId = ${profileLikedId} AND profileHasBeenLikedId = ${profileHasBeenLikedId}`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}

export function getUserHasBeenLikedById(id: number): Promise<like[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM likeProfile WHERE profileLikesId = ${id}`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result.length ? result : null);
		});
	});
}

export function getProfileMatch(id: number): Promise<like[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM likeProfile WHERE profileLikesId = ${id} OR profileHasBeenLikedId = ${id}`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result.length ? result : null);
		});
	});
}
