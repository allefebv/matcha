/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:24:37 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/21 15:29:28 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface user {
	id: number;
	email: string;
	password: string;
	registrationDate: number;
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
	location: string | null;
	bio: string | null;
	tag: string | null;
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
	idTag: number;
}
