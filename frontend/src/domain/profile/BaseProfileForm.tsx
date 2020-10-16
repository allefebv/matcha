/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseProfileForm.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/16 14:06:20 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {
	createProfileAPI,
	handleGeoLocationAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_geolocation,
	actionUser_setProfile,
} from "../../store/user/action";
import { DatePicker } from "@material-ui/pickers";
import { useGeolocation } from "../../services/useGeolocation";
import { Iprofile } from "../../types/types";
import { actionUi_showSnackbar } from "../../store/ui/action";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	handleLoad: React.Dispatch<React.SetStateAction<boolean>>;
} & ReduxProps;

function BaseProfileFormComponent(props: Props) {
	const [dob, setDob] = useState<Date | null>(null);
	const [profile, setProfile] = useState({
		firstname: "",
		lastname: "",
		username: "",
		dob: null as null | number,
	});
	const geolocation = useGeolocation();
	const date = new Date();

	function handleChangeDob(date: Date | null) {
		if (date) {
			const tmpProfile = { ...profile };
			tmpProfile.dob = date.valueOf();
			setDob(date);
			setProfile(tmpProfile);
		}
	}

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

	async function submitProfile() {
		return createProfileAPI(profile, props.loggedIn)
			.then((json: any) => {
				props.dispatch(actionUser_setProfile({ profile: json }));
				props.dispatch(
					actionUi_showSnackbar({
						message: "Your profile has been created",
						type: "success",
					})
				);
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
	}

	const handleSubmit = async () => {
		props.handleLoad(true);
		await Promise.all([submitProfile()]);
		props.handleLoad(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
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
				<TextField
					label="First Name"
					variant="filled"
					margin="dense"
					fullWidth
					name="firstname"
					value={profile.firstname}
					onChange={handleChange}
					required
				/>
				<TextField
					label="Last Name"
					variant="filled"
					margin="dense"
					fullWidth
					name="lastname"
					value={profile.lastname}
					onChange={handleChange}
					required
				/>
				<TextField
					label="Username"
					variant="filled"
					margin="dense"
					fullWidth
					name="username"
					value={profile.username}
					onChange={handleChange}
					required
				/>
				<DatePicker
					views={["year", "month", "date"]}
					margin="normal"
					label="Date of birth"
					value={dob}
					onChange={handleChangeDob}
					fullWidth
					disableFuture
					minDate={new Date("1950-01-01")}
					maxDate={date.setFullYear(date.getFullYear() - 17)}
					openTo="year"
				/>
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
