/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   constants.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:27 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/02 13:25:50 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const URL = "http://localhost:3001";
export const URI_SIGNIN = "/user/loginUser";
export const URI_SIGNUP = "/user/addUser";
export const URI_UPDATE_EMAIL = "/user/changeEmail";
export const URI_MODIFY_PASSWORD = "/user/changePassword";
export const URI_DELETE_ACCOUNT = "/user/deleteUser";
export const URI_GET_PROFILE = "/profile/getProfile";
export const URI_POST_PICTURES = "/profile/handleImage";
export const URI_POST_PROFILE = "/profile/addProfile";
export const URI_POST_TAGS = "/tag/addTagProfile";

export const POST_METHOD = "POST";

export const LANDING_ROUTE = "/";
export const SEARCH_ROUTE = "/search";
export const ACCOUNT_SETTINGS_ROUTE = "/account-settings";
export const USER_PROFILE_ROUTE = "/my-profile";
export const PROFILE_CREATION_ROUTE = "/profile-creation";

export const EMAIL_HELPER_ERROR = "Invalid Email";
export const PASSWORD_HELPER_ERROR =
	"Password must contain 8 characters, 1 digit, 1 uppercase, 1 lowercase";
export const PASSWORD_CONFIRM_HELPER_ERROR = "Passwords do not match";
export const DELETE_HELPER_TEXT =
	"type DELETE to be able to proceed with your account deletion";
export const AGE_HELPER_ERROR = "You must be at least 18 to use our platform";

export const REGEX_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const REGEX_PASSWORD = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/;
