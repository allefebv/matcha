/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/06 21:00:02 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction, combineReducers } from "redux";
import {
	actionUser_signin,
	actionUser_signup,
	actionUser_validate,
} from "./action";
import { getType } from "typesafe-actions";

const initialState = {
	isLoggedIn: false,
	user: null,
	signupToken: null,
};

export function userReducer(
	state = initialState,
	action: AnyAction //TODO: Check avec Jeremy si ok
	//action: { type: string; payload: { user: user | null; token: string | null } }
) {
	switch (action.type) {
		case getType(actionUser_signin):
			return {
				...state,
				isLoggedIn: action.payload.token,
				user: action.payload.user,
			};
		case getType(actionUser_signup):
			return {
				...state,
				signupToken: action.payload.token,
				user: action.payload.user,
			};
		case getType(actionUser_validate):
			return {
				...state,
				isLoggedIn: action.payload.token,
			};
		default:
			return state;
	}
}
