import { profile, pts } from '../../types/types';

const EARTH_RAY = 6367.445;
/*
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
		let profileFilter: profile[];
		await Promise.all(
			(profileFilter = profileList.filter(
				(profileCompare) =>
					calculateLocation(
						{ lat: profileLocation.lat, lng: profileLocation.lng },
						{ lat: profileCompare.lat, lng: profileCompare.lng }
					) > distanceInKm
			))
		);
		resolve(profileFilter);
	});
}
*/
