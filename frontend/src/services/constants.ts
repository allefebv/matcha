/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   constants.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:27 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/21 11:37:50 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const URL = "http://localhost:3001";
export const URI_SIGNIN = "/user/loginUser";
export const URI_SIGNUP = "/user/addUser";
export const URI_UPDATE_EMAIL = "/user/changeEmail";
export const URI_MODIFY_PASSWORD = "/user/changePassword";
export const URI_DELETE_ACCOUNT = "/user/deleteUser";
export const URI_GET_PROFILE = "/profile/getProfile";
export const URI_POST_PICTURES = "/images/handleImages";
export const URI_HANDLE_GEOLOCATION = "/location/handleGeoLocation";
export const URI_HANDLE_USAGELOCATION = "/location/handleUsageLocation";
export const URI_CREATE_PROFILE = "/profile/addProfile";
export const URI_UPDATE_PROFILE = "/profile/updateProfile";
export const URI_POST_TAGS = "/tag/addTagProfile";
export const URI_ACTIVATE_ACCOUNT = "/user/activateUser";
export const URI_GET_TAG_AUTOCOMPLETE = "/tag/getTagAutocomplete";
export const URI_GET_RECOMMENDATIONS = "/recommendation/getRecommendation";

export const LOCATION_IQ_API_KEY = "pk.043501281a35e7090602a19c4f522019";
export const URI_REVERSE_GEOCODING_API =
	"https://us1.locationiq.com/v1/reverse.php?key=";
export const PARAMETERS_REVERSE_GEOCODING_API =
	"&zoom=12&accept-language=fr&normalizeaddress=1&postaladdress=1&statecode=1&format=json";

export const URI_AUTOCOMPLETE_API =
	"https://api.locationiq.com/v1/autocomplete.php?key=";
export const PARAMETERS_AUTOCOMPLETE_API =
	"limit=5&tag=" + encodeURIComponent("place:city,place:town");

export const POST_METHOD = "POST";
export const GET_METHOD = "GET";

export const FRONT_URL = "http://localhost:3000";

export const LANDING_ROUTE = "/";
export const SEARCH_ROUTE = "/search";
export const ACCOUNT_SETTINGS_ROUTE = "/account-settings";
export const USER_PROFILE_ROUTE = "/my-profile";
export const PROFILE_CREATION_ROUTE = "/profile-creation";
export const CHAT_ROUTE = "/chat";

export const EMAIL_HELPER_ERROR = "Invalid Email";
export const PASSWORD_HELPER_ERROR =
	"Password must contain 8 characters, 1 digit, 1 uppercase, 1 lowercase";
export const PASSWORD_CONFIRM_HELPER_ERROR = "Passwords do not match";
export const DELETE_HELPER_TEXT =
	"type DELETE to be able to proceed with your account deletion";
export const AGE_HELPER_ERROR = "You must be at least 18 to use our platform";

export const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const REGEX_PASSWORD = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/;
