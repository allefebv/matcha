/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:24:37 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/19 18:14:55 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface Ilocation {
	geoLocation: Iaddress | null;
	usageLocation: Iaddress | null;
}

export interface Iaddress {
	city: string | null;
	postCode: string | null;
	countryCode: string | null;
	country: string | null;
	isFromGeolocation: boolean;
	lat: number | null;
	lng: number | null;
	userId?: number;
}

export interface Icoordinates {
	latitude: number;
	longitude: number;
}

export interface user {
	id: number;
	email: string;
	password: string;
	registrationDate: number;
	activated: boolean;
	activationKey: string;
}
export interface IextendedProfile extends IbaseProfile {
	userId: number;
	popularityScore: number;
	geoLocationAuthorization: number;
	gender: string | null;
	sexualOrientation: string | null;
	bio: string | null;
}

export interface IbaseProfile {
	username: string;
	firstname: string;
	lastname: string;
	dob: number | null;
}

export interface like {
	profileLikesId: number;
	profileHasBeenLikedId: number;
}

export interface notification {
	profileNotifedId: number;
	notifierProfileId: number;
	date: number;
	notification: string;
}

export interface tag {
	id: number;
	tag: string;
}

export interface tagProfile {
	idProfile: number;
	idTag: number;
}
