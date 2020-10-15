/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   locationValidation.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 13:56:46 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 13:56:53 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { location } from '../../../types/types';

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
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		resolve();
	});
}
