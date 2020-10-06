import { useState, useEffect } from "react";
import { Iaddress } from "../types/types";
import * as constants from "./constants";

export const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState<Iaddress | null>(null);

	useEffect(() => {
		fetch("https://ipinfo.io/geo?token=11e860581699f1")
			.then((response) => response.json())
			.then((json) => {
				const coordinates = json.loc.split(",");
				fetch(
					constants.URI_REVERSE_GEOCODING_API +
						constants.LOCATION_IQ_API_KEY +
						"&lat=" +
						coordinates[0] +
						"&lon=" +
						coordinates[1] +
						constants.PARAMETERS_REVERSE_GEOCODING_API
				)
					.then((response) => {
						return response.json();
					})
					.then((json) => {
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
					});
			});
	}, []);

	return { geolocation };
};
