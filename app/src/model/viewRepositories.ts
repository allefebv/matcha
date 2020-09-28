/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/28 17:15:46 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 17:53:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';
import { user } from '../../types/types';
import { generateActivationKey } from '../services/generateString';

export async function addView(profileSeenId: number, viewerProfileId: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO viewProfile (
			profileSeenId,
			viewerProfileId
		) VALUES (
			${profileSeenId},
			${viewerProfileId}
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}
