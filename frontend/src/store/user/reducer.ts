/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 14:57:19 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction } from "redux";
import {
	actionUser_geolocation,
	actionUser_usagelocation,
	actionUser_setProfile,
	actionUser_signin,
	actionUser_signup,
	actionUser_activate,
	actionUser_setTagList,
	actionUser_setImages,
} from "./action";
import { getType } from "typesafe-actions";

const initialState = {
	isLoggedIn: false,
	isActivated: false,
	profile: null,
	user: null,
	signupToken: null,
	currentGeolocation: null,
	usagelocation: null,
	tagList: null,
	imgs: null,
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
				isActivated: action.payload.user.activated,
				user: action.payload.user,
			};
		case getType(actionUser_signup):
			return {
				...state,
				signupToken: action.payload.token,
				user: action.payload.user,
			};
		case getType(actionUser_activate):
			return {
				...state,
				isActivated: true,
				isLoggedIn: action.payload.token,
			};
		case getType(actionUser_setProfile):
			return {
				...state,
				profile: action.payload.profile,
			};
		case getType(actionUser_geolocation):
			return {
				...state,
				currentGeolocation: action.payload.geolocation,
			};
		case getType(actionUser_usagelocation):
			return {
				...state,
				usagelocation: action.payload.usagelocation,
			};
		case getType(actionUser_setTagList):
			return {
				...state,
				tagList: action.payload.tagList,
			};
		case getType(actionUser_setImages):
			return {
				...state,
				tagList: action.payload.tagList,
			};
		default:
			return state;
	}
}
