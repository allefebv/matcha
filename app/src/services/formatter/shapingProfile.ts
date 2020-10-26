/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shapingProfile.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:01 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/23 11:24:16 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function shapingProfile(profile) {
	if (profile) {
		return {
			profile: {
				userId: profile.userId,
				dob: profile.dob,
				popularityScore: profile.popularityScore,
				username: profile.username,
				firstname: profile.firstname,
				lastname: profile.lastname,
				gender: profile.gender,
				sexualOrientation: profile.sexualOrientation,
				geoLocationAuthorization: profile.geoLocationAuthorization
					? true
					: false,
				bio: profile.bio,
			},
			location: {
				isFromGeolocation: profile.isFromGeolocation ? true : false,
				city: profile.city,
				postCode: profile.postCode,
				countryCode: profile.countryCode,
				country: profile.country,
				lat: profile.lat,
				lng: profile.lng,
			},
			tag: profile.tag ? profile.tag.split(",") : null,
		};
	}
}
