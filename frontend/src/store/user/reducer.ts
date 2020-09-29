/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 19:42:06 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction, combineReducers } from "redux";
import { actionUser_signin } from "./action";
import { getType } from "typesafe-actions";

const initialState = {
	isLoggedIn: false,
	user: null,
};

function signin(
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
		default:
			return state;
	}
}

export const userReducer = combineReducers({
	signin,
});
