/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: senz <senz@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/23 11:41:52 by senz             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { combineReducers } from 'redux';
import { actionUser_signin } from './action';
import { getType } from 'typesafe-actions';

const initialState = {
	isLoggedIn: false
}

function signin(state = initialState, action: { type: string; payload: string }) {
	switch (action.type) {
		case getType(actionUser_signin):
			return {
				...state,
				isLoggedIn: action.payload};
		default:
			return state;
	}
}

export const userReducer = combineReducers({
	signin,
});
