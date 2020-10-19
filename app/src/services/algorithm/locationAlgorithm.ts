/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   locationAlgorithm.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:49 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/19 18:02:45 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { location, profile, pts } from '../../../types/types';
import { getUsageLocation } from '../../model/locationRepositories';

const EARTH_RAY = 6367445;

const radianConversion = (degree: number) => degree * (Math.PI / 180);

const distanceConversion = (a: number, b: number, c: number, d: number) =>
	EARTH_RAY *
	Math.acos(
		Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c - d)
	);

const calculateLocation = (profileLocation: pts, profileCompare: pts) =>
	distanceConversion(
		radianConversion(profileLocation.lat),
		radianConversion(profileCompare.lat),
		radianConversion(profileLocation.lng),
		radianConversion(profileCompare.lng)
	);

export async function locationAlgorithm(
	profileLocation: location,
	profileRecoList: any[],
	distanceInKm: number
) {
	return await Promise.all(
		profileRecoList.filter((profileReco) => {
			if (profileReco.lat && profileReco.lng) {
				const result =
					calculateLocation(
						{ lat: profileLocation.lat, lng: profileLocation.lng },
						{
							lat: profileReco.lat,
							lng: profileReco.lng,
						}
					) / 1000;
				return result < distanceInKm;
			}
		})
	);
}
