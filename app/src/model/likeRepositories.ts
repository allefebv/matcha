/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:09 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/20 14:40:16 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { like } from '../../types/types';
import { dataBase } from '../app';

export function addLikedProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO likeProfile (
			profileLikesId,
			profileHasBeenLikedId
		) VALUES (
			${profileLikedId},
			${profileHasBeenLikedId}
		)`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function deleteLikedProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM likeProfile WHERE profileLikesId = ${profileLikedId} AND profileHasBeenLikedId = ${profileHasBeenLikedId}`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function getUserHasBeenLikedById(id: number): Promise<any[] | null> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			likeProfile.*,
			profile.*
		FROM 
			likeProfile
		JOIN 
			profile ON profile.userId = likeProfile.profileLikesId
		WHERE
			likeProfile.profileLikesId = ${id}
		`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function getProfileMatch(id: number): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		select
			A.profileLikesId A,
			B.profileLikesId B,
			profile.*
		from
			likeProfile as A
		inner join 
			likeProfile as B
		inner join
			profile on profile.userId = B.profileLikesId on A.profileLikesId = B.profileHasBeenLikedId 
		where 
			A.profileLikesId = B.profileHasBeenLikedId 
			and 
			B.profileLikesId = A.profileHasBeenLikedId 
			and 
			A.profileLikesId = ${id}
		`;
		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}
