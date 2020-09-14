/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userType.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 12:25:20 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 18:23:36 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface user {
	id: number;
	username: string;
	email: string;
	password: string;
	registrationDate: Date;
	activated: boolean;
	activationKey: string;
}

export interface newUser {
	username: string;
	email: string;
	password: string;
}

export interface profile {
	id: number;
	isUser: number;
	pseudo: string;
	firestname: string;
	lastname: string;
	age: number;
	genre: string;
	sexualOrientation: string | null;
	bio: string | null;
	tag: string[] | null;
}
