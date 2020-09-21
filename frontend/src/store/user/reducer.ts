/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/21 15:44:20 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { combineReducers } from 'redux';
import { actionUser_userLogin } from './action';
import { user } from '../../types/types';
import { getType } from 'typesafe-actions';

function userLogin(state = null, action: { type: string; payload: user }) {
	switch (action.type) {
		case getType(actionUser_userLogin):
			return action.payload;
		default:
			return state;
	}
}

export const userReducer = combineReducers({
	userLogin,
});
