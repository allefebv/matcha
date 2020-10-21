/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/21 11:30:47 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createAction } from "typesafe-actions";

export const actionProfilesList_getRecco = createAction(
	"PROFILESLIST.GETRECCO"
)<{ profiles: any[] }>();
