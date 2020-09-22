/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/22 18:05:15 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { combineReducers } from 'redux';
import { actionUser_login } from './action';
import { user } from '../../types/types';
import { getType } from 'typesafe-actions';

const initialState = {
	isLoggedIn: false
}

function login(state = initialState, action: { type: string; payload: string }) {
	switch (action.type) {
		case getType(actionUser_login):
			return {
				...state,
				isLoggedIn: action.payload};
		default:
			return state;
	}
}

export const userReducer = combineReducers({
	login,
});
