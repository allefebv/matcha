/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:20 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/16 14:45:47 by jfleury          ###   ########.fr       */
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

export interface newUser {
	email: string;
	password: string;
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
	userLikesId: number;
	userHasBeenLikeId: number;
}
