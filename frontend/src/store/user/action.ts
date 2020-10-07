/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/07 19:27:28 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Iaddress, user } from "../../types/types";
import { createAction } from "typesafe-actions";

export const actionUser_signin = createAction("USER.USERSIGNIN")<{
	user: user | null;
	token: string | null;
}>();

export const actionUser_signup = createAction("USER.USERSIGNUP")<{
	user: user | null;
	token: string | null;
}>();

export const actionUser_validate = createAction("USER.USERVALIDATE")<{
	token: string | null;
}>();

export const actionUser_getProfile = createAction("USER.GETPROFILE")<{
	profile: any;
}>();

export const actionUser_logout = createAction("USER.USERLOGOUT")<{}>();

export const actionUser_geolocation = createAction("USER.USERGEOLOCATION")<{
	geolocation: any;
}>();
