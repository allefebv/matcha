/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserProfilePage.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/06 20:56:29 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { ProfileCardsScroll } from "../component/ProfileCardsScroll";
import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";
import { connect, ConnectedProps } from "react-redux";
import { ProfilePictures } from "../component/ProfilePictures";
import { Iprofile } from "../types/types";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const UserProfilePageComponent = (props: Props) => {
	const [profile, setProfile] = useState<Iprofile>({
		firstName: "",
		lastName: "",
		userName: "",
		birthDay: null,
		gender: null,
		sexualOrientation: null,
		bio: null,
		location: {
			geoLocationAuthorization: false,
			geoLocation: null,
			usageLocation: null,
		},
		tagList: null,
		imgs: {
			img0: null,
			img1: null,
			img2: null,
			img3: null,
			img4: null,
		},
	});

	useEffect(() => {
		function handleProfile() {
			fetchApi<{ profile: Iprofile }>(
				constants.URL + constants.URI_GET_PROFILE,
				{
					method: constants.POST_METHOD,
					headers: {
						"Content-Type": "application/json",
						token: props.loggedIn,
					},
					credentials: "include",
				}
			)
				.then(({ profile }) => {
					setProfile(profile);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});

	return (
		<Grid item container direction="row" style={{ height: "100%" }}>
			<Grid container item xs={9} style={{ height: "100%" }}>
				<Grid
					item
					container
					wrap="nowrap"
					justify="flex-start"
					xs={12}
					md={6}
					style={{ height: "15%" }}
				>
					<ProfilePictures setProfile={setProfile} profile={profile} />
				</Grid>
			</Grid>
			<Grid container item xs={3} style={{ height: "100%" }} spacing={3}>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll />
				</Grid>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll />
				</Grid>
			</Grid>
		</Grid>
	);
};

export const UserProfilePage = withReduxProps(UserProfilePageComponent);
