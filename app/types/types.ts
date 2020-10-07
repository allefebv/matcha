/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:20 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/06 15:43:32 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface user {
	id: number;
	email: string;
	password: string;
	registrationDate: Date;
	activated: boolean;
	activationKey: string;
}

export interface profile {
	id: number;
	userId: number;
	age: number;
	popularityScore: string;
	username: string;
	firstname: string;
	lastname: string;
	genre: string;
	sexualOrientation: string | null;
	geoLocationAuthorization: boolean;
	bio: string | null;
	img0: string | null;
	img1: string | null;
	img2: string | null;
	img3: string | null;
	img4: string | null;
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
	tagId: number;
}

export interface view {
	profileSeenId: number;
	viewerProfileId: number;
}

export interface pts {
	lat: number;
	lng: number;
}

export interface location {
	city: string | null;
	postCode: string | null;
	countryCode: string | null;
	country: string | null;
	isFromGeolocation: boolean;
	lat: number;
	lng: number;
}
