/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   selectAllUser.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 16:34:10 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/09 18:01:45 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../../app';
import { user } from '../entities/userType';

export async function selectAllUser(): Promise<user[] | null> {
	return new Promise((resolve, reject) => {
		dataBase.query('SELECT * FROM user ', (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			console.log(result);
			resolve(result.length ? result : null);
		});
	});
}
