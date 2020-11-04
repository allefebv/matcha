/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeStatus.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/03 12:54:24 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/04 18:48:14 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from "../../types/types";
import { getStatueOfLike } from "../model/likeRepositories";

export async function matchStatus(profileA: profile, profileB: profile) {
	console.log(profileA.username, profileB.username);
	const result = await getStatueOfLike(profileA.userId, profileB.userId);
	if (result.length === 2) {
		return true;
	}
	return false;
}

export async function likeStatus(profileA: profile, profileB: profile) {
	const result = await getStatueOfLike(profileA.userId, profileB.userId);
	if (result.length === 2) {
		return { iLike: true, heLike: true };
	} else if (result.length === 1) {
		if (result[0].profileLikesId === profileA.userId) {
			return { iLike: true, heLike: false };
		} else {
			return { iLike: false, heLike: true };
		}
	}
	return { iLike: false, heLike: false };
}
