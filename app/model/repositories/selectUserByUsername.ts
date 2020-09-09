/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   selectUserByUsername.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:11:13 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/09 18:02:31 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../../app';
import { user } from '../entities/userType';

export async function selectUserByUsername(username: string): Promise<user[] | null> {
	return new Promise((resolve, reject) => {
		dataBase.query(`SELECT * FROM user WHERE username = '${username}'`, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result.length ? result : null);
		});
	});
}
