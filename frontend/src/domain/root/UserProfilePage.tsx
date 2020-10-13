/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserProfilePage.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/14 22:05:03 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { ProfileCardsScroll } from "../../component/ProfileCardsScroll";
import { getProfileAPI } from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { ProfilePictures } from "../profile/ProfilePictures";
import {
	actionUser_setProfile,
	actionUser_setTagList,
	actionUser_usagelocation,
} from "../../store/user/action";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const UserProfilePageComponent = (props: Props) => {
	useEffect(() => {
		getProfileAPI(props.loggedIn)
			.then((response: any) => {
				if (response) {
					props.dispatch(actionUser_setProfile({ profile: response.profile }));
					props.dispatch(actionUser_setTagList({ tagList: response.tag }));
					props.dispatch(
						actionUser_usagelocation({ usagelocation: response.location })
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					{/* <ProfilePictures setProfile={setProfile} profile={profile} /> */}
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
