/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 17:29:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/07 18:30:33 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const renameKey = (object: any, key: any, newKey: any) => {
	const clonedObj = { ...object };
	const tmp = clonedObj[key];
	delete clonedObj[key];
	clonedObj[newKey] = tmp;
	return clonedObj;
};

export const isBaseProfileComplete = (profile: any) => {
	return (
		profile !== null &&
		profile.username &&
		profile.firstName &&
		profile.lastName
	);
};
