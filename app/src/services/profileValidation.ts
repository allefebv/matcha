/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileValidation.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:58 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:06:59 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Response } from 'express';

import { profile } from '../../types/types';
import { getProfileByUsername } from '../model/profileRepositories';

export const addProfileValidation = async (body: profile, id: number) => {
	return new Promise((resolve, reject) => {
		if (!body.dob || !body.username || !body.firstname || !body.lastname) {
			reject("Error: mandatory parameters are missing");
		}
		if (Date.now() - body.dob < 567648000000) {
			reject("Error: dob invalid");
		}
		if (body.gender && body.gender !== "male" && body.gender !== "female") {
			reject("Error: gender invalid");
		}
		if (
			body.sexualOrientation &&
			body.sexualOrientation !== "gay" &&
			body.sexualOrientation !== "lesbian" &&
			body.sexualOrientation !== "bisexual" &&
			body.sexualOrientation !== "heterosexual"
		) {
			reject("Error: sexualOriantation invalid");
		}
		resolve();
	});
};

export const updateProfileValidation = async (body: profile, id: number) => {
	return new Promise((resolve, reject) => {
		if (!body.dob || !body.username || !body.firstname || !body.lastname) {
			reject("Error: mandatory parameters are missing");
		}
		if (Date.now() - body.dob < 567648000000) {
			reject("Error: dob invalid");
		}
		if (body.gender && body.gender !== "male" && body.gender !== "female") {
			reject("Error: gender invalid");
		}
		if (
			body.sexualOrientation &&
			body.sexualOrientation !== "gay" &&
			body.sexualOrientation !== "lesbian" &&
			body.sexualOrientation !== "bisexual" &&
			body.sexualOrientation !== "heterosexual"
		) {
			reject("Error: sexualOriantation invalid");
		}
		resolve();
	});
};
