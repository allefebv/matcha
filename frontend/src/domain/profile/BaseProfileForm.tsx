/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseProfileForm.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 09:13:29 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { handleGeoLocationAPI } from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_geolocation } from "../../store/user/action";
import { useGeolocation } from "../../services/useGeolocation";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { BaseProfileFormContent } from "./BaseProfileFormContent";
import { IbaseProfile } from "../../types/types";
import { createProfile } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function BaseProfileFormComponent(props: Props) {
	const [profile, setProfile] = useState<IbaseProfile>({
		firstname: "",
		lastname: "",
		username: "",
		dob: null,
	});
	const geolocation = useGeolocation();
	const date = new Date();

	useEffect(() => {
		if (geolocation) {
			props.dispatch(
				actionUser_geolocation({
					geolocation: geolocation,
				})
			);
			handleGeoLocationAPI(geolocation, props.loggedIn).catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocation]);

	const handleSubmit = async () => {
		await Promise.all([createProfile(profile, props.loggedIn, props.dispatch)]);
	};

	const isDisabled = () => {
		return (
			profile.firstname === "" ||
			profile.lastname === "" ||
			profile.username === "" ||
			profile.dob === null
		);
	};

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<BaseProfileFormContent setProfile={setProfile} profile={profile} />
			</Grid>
			<Grid item xs={12} md={6}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					fullWidth
					disabled={isDisabled()}
				>
					Submit
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export const BaseProfileForm = withReduxProps(BaseProfileFormComponent);
