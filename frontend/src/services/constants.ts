/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   constants.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:27 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:23:54 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const URL = "http://localhost:3001";
export const URI_SIGNIN = "/user/loginUser";
export const URI_SIGNUP = "/user/addUser";
export const URI_MODIFY_EMAIL = "";
export const URI_MODIFY_PASSWORD = "";

export const POST_METHOD = "POST";

export const LANDING_ROUTE = "/"
export const SEARCH_ROUTE = "/search"
export const ACCOUNT_SETTINGS_ROUTE = "/account-settings"

export const EMAIL_HELPER_ERROR = "Invalid Email"
export const PASSWORD_HELPER_ERROR = "Password must contain 8 characters, 1 digit, 1 uppercase, 1 lowercase"
export const PASSWORD_CONFIRM_HELPER_ERROR = "Passwords do not match"

export const REGEX_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export const REGEX_PASSWORD = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/