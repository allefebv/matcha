/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/09 15:48:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/21 11:44:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction } from "redux";
import { actionProfilesList_getRecco } from "./action";
import { getType } from "typesafe-actions";

const initialState = {
	recommendations: null,
	search: null,
	matches: null,
};

export function profilesListReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case getType(actionProfilesList_getRecco):
			console.log(action.payload.profiles);
			return {
				...state,
				recommendations: action.payload.profiles,
			};
		default:
			return state;
	}
}
