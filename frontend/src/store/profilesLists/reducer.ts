/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/09 15:48:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/27 19:04:29 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction } from "redux";
import {
	actionProfilesList_getRecco,
	actionProfilesList_getSearch,
	actionProfilesList_getMatches,
} from "./action";
import { getType } from "typesafe-actions";

const initialState = {
	recommendations: null,
	search: null,
	matches: null,
};

export function profilesListReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case getType(actionProfilesList_getRecco):
			return {
				...state,
				recommendations: action.payload.profiles,
			};
		case getType(actionProfilesList_getSearch):
			return {
				...state,
				search: action.payload.profiles,
			};
		case getType(actionProfilesList_getMatches):
			return {
				...state,
				matches: action.payload.profiles,
			};
		default:
			return state;
	}
}
