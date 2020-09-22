/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/22 18:10:15 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createAction } from 'typesafe-actions';

export const actionUser_login = createAction('USER.USERLOGIN')<string | boolean>();
