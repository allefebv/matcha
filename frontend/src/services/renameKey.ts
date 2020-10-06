/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   renameKey.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 17:29:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/05 17:35:56 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const renameKey = (object: any, key: any, newKey: any) => {
	const clonedObj = { ...object };
	const tmp = clonedObj[key];
	delete clonedObj[key];
	clonedObj[newKey] = tmp;
	return clonedObj;
};
