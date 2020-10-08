import { profile, pts } from '../../types/types';
import { getUsageLocation } from '../model/locationRepositories';

const EARTH_RAY = 6367445;

const radianConversion = (degree: number) => degree * (Math.PI / 180);

const distanceConversion = (a: number, b: number, c: number, d: number) =>
	EARTH_RAY * Math.acos(Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c - d));

const calculateLocation = (profileLocation: pts, profileCompare: pts) =>
	distanceConversion(
		radianConversion(profileLocation.lat),
		radianConversion(profileCompare.lat),
		radianConversion(profileLocation.lng),
		radianConversion(profileCompare.lng)
	);

export function locationAlgorithm(
	profileLocation: profile,
	profileList: profile[],
	distanceInKm: number
): Promise<profile[]> {
	return new Promise(async (resolve) => {
		let profileFilter: profile[] = [];
		const locationProfile = await getUsageLocation(profileLocation.userId);
		await Promise.all(
			profileList.map(async (profileCompare) => {
				const locationProfileCompare = await getUsageLocation(profileCompare.userId);
				const result =
					calculateLocation(
						{ lat: locationProfile.lat, lng: locationProfile.lng },
						{ lat: locationProfileCompare.lat, lng: locationProfileCompare.lng }
					) / 1000;
				if (result < distanceInKm) {
					profileFilter.push(profileCompare);
				}
			})
		);
		resolve(profileFilter);
	});
}
