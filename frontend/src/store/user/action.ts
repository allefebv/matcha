/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/25 14:40:14 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { user } from "../../types/types";
import { createAction } from 'typesafe-actions';

export const actionUser_signin = createAction('USER.USERSIGNIN')<{ user: user | null; token: string | null }>();