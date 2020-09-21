/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/21 15:36:11 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createAction } from 'typesafe-actions';
import { user } from '../../types/types';

export const actionUser_userLogin = createAction('USER.USERLOGIN')<user>();
