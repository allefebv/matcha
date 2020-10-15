/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileValidation.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 13:56:59 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 14:27:49 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from '../../../types/types';

export function addProfileValidation(body: profile) {
	return new Promise((resolve, reject) => {
		if (!body.dob || !body.username || !body.firstname || !body.lastname) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		if (Date.now() - body.dob < 567648000000) {
			reject({ code: 400, message: "Error: dob invalid" });
		}
		if (body.gender && body.gender !== "male" && body.gender !== "female") {
			reject({ code: 400, message: "Error: gender invalid" });
		}
		if (
			body.sexualOrientation &&
			body.sexualOrientation !== "gay" &&
			body.sexualOrientation !== "lesbian" &&
			body.sexualOrientation !== "bisexual" &&
			body.sexualOrientation !== "heterosexual"
		) {
			reject({ code: 400, message: "Error: sexualOriantation invalid" });
		}
		resolve();
	});
}
