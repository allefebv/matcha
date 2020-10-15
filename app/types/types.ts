/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:20 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 11:18:53 by jfleury          ###   ########.fr       */
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
	dob: number;
	popularityScore: number;
	username: string;
	firstname: string;
	lastname: string;
	gender: string;
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
	isFromGeolocation: boolean;
	city: string | null;
	postCode: string | null;
	countryCode: string | null;
	country: string | null;
	lat: number;
	lng: number;
}
