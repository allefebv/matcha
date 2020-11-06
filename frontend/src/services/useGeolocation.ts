/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   useGeolocation.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/12 16:35:59 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/06 12:52:54 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useCallback, useEffect, useState } from "react";
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
								coordinates[0] +
								"," +
								coordinates[1] +
								".JSON?key=" +
								constants.TOMTOM_API_KEY +
								"&entityType=Country,Municipality,MunicipalitySubdivision,PostalCodeArea"
						);
					} else {
						throw new Error("Geolocation error");
					}
				})
				.then(responseError)
				.then((json) => {
					if (json.addresses[0].address) {
						const { address } = json.addresses[0];
						const { position }: { position: string } = json.addresses[0];
						setGeolocation({
							city: address.municipality.split(",")[0],
							postCode: address.postalCode,
							countryCode: address.countryCode,
							country: address.country,
							isFromGeolocation: true,
							lat: parseFloat(position),
							lng: parseFloat(position.split(",")[1]),
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return geolocation;
};
