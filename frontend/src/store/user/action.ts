/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: senz <senz@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/23 11:42:33 by senz             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createAction } from 'typesafe-actions';

export const actionUser_signin = createAction('USER.USERSIGNIN')<string | boolean>();