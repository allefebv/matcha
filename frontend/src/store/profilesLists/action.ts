/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/23 17:43:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createAction } from "typesafe-actions";

export const actionProfilesList_getRecco = createAction(
	"PROFILESLIST.GETRECCO"
)<{ profiles: any[] }>();

export const actionProfilesList_getSearch = createAction(
	"PROFILESLIST.GETSEARCH"
)<{ profiles: any[] }>();
