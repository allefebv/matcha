/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   validation.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 10:53:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 11:28:52 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { location, profile } from '../../types/types';

export function addUserValidation(email: string, password: string) {
	return new Promise(async (resolve, reject) => {
		const emailRegex = new RegExp(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		);
		const passwordRegex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/);
		if (!emailRegex.test(email)) {
			reject("Email invalid");
		}
		if (!passwordRegex.test(password)) {
			reject("Password invalid");
		}
		resolve();
	});
}

export function profileValidation(body: profile) {
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
}

export function locationValidation(body: location) {
	return new Promise((resolve, reject) => {
		if (
			!body ||
			!body.isFromGeolocation ||
			!body.city ||
			!body.country ||
			!body.countryCode ||
			!body.lat ||
			!body.lng ||
			!body.postCode
		) {
			reject("Error: mandatory parameters are missing");
		}
		resolve();
	});
}
