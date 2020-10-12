/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   useGeolocation.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/12 16:35:59 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/12 19:57:53 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useCallback, useEffect, useState } from "react";
import * as constants from "../services/constants";
import { Iaddress } from "../types/types";
import { throttle } from "lodash";

function responseError(response: Response) {
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response.json();
}

export const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState<Iaddress | null>(null);

	const getLocation = useCallback(
		throttle(() => {
			console.log("WARNING");
			fetch("https://ipinfo.io/geo?token=11e860581699f1")
				.then(responseError)
				.then((json) => {
					if (json.loc) {
						const coordinates = json.loc.split(",");
						return fetch(
							constants.URI_REVERSE_GEOCODING_API +
								constants.LOCATION_IQ_API_KEY +
								"&lat=" +
								coordinates[0] +
								"&lon=" +
								coordinates[1] +
								constants.PARAMETERS_REVERSE_GEOCODING_API
						);
					} else {
						throw new Error("Geolocation error");
					}
				})
				.then(responseError)
				.then((json) => {
					if (json.address) {
						setGeolocation({
							city: json.address.city_district
								? json.address.city_district
								: json.address.city,
							postCode: json.address.postcode,
							countryCode: json.address.country_code,
							country: json.address.country,
							isFromGeolocation: true,
							lat: parseInt(json.lat),
							lon: parseInt(json.lon),
						});
					}
				})
				.catch((error: Error) => {
					console.log(error.message);
					return;
				});
		}, 5000),
		[]
	);

	useEffect(() => {
		getLocation();
	}, []);

	return geolocation;
};
