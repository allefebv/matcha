/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ExtendedProfileStepper.tsx                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 09:26:17 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { ProfileOptional1 } from "./ProfileOptional1";
import { ProfileOptional2 } from "./ProfileOptional2";
import { ProfileOptional3 } from "./ProfileOptional3";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_geolocation,
	actionUser_setProfile,
} from "../../store/user/action";
import {
	submitPictures,
	updateProfile,
	submitTags,
	submitUsageLocation,
} from "../../services/profileUtils";
import { useGeolocation } from "../../services/useGeolocation";
import { handleGeoLocationAPI } from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
	profile: state.user.profile,
	tagList: state.user.tagList,
	usagelocation: state.user.usagelocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ExtendedProfileStepperComponent(props: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [imgs, setImgs] = useState<(string | null)[]>([
		null,
		null,
		null,
		null,
		null,
	]);

	const geolocation = useGeolocation();

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

	function getSteps() {
		return [0, 1, 2];
	}

	const handleSubmit = async () => {
		setLoading(true);
		await Promise.all([
			updateProfile(props.profile, props.loggedIn, props.dispatch),
			submitTags(props.tagList, props.loggedIn, props.dispatch),
			submitPictures(imgs, props.loggedIn, props.dispatch),
			submitUsageLocation(props.usagelocation, props.loggedIn, props.dispatch),
		]);
		setLoading(false);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setDisabled(true);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setDisabled(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		props.dispatch(
			actionUser_setProfile({ profile: { ...props.profile, [name]: value } })
		);
	};

	function getStepContent() {
		switch (activeStep) {
			case 0:
				return (
					<ProfileOptional1
						handleChange={handleChange}
						setDisabled={setDisabled}
					/>
				);
			case 1:
				return (
					<ProfileOptional2
						handleChange={handleChange}
						setDisabled={setDisabled}
						imgs={imgs}
						setImgs={setImgs}
					/>
				);
			case 2:
				return (
					<ProfileOptional3
						handleChange={handleChange}
						setDisabled={setDisabled}
					/>
				);
			default:
				return <Typography color="primary">All steps completed</Typography>;
		}
	}

	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress size={80} color="primary" />
			) : (
				<React.Fragment>
					<Grid item xs={12}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, key) => (
								<Step key={key}>
									<StepLabel></StepLabel>
								</Step>
							))}
						</Stepper>
					</Grid>
					<Grid
						item
						container
						xs={12}
						justify="center"
						alignItems="center"
						alignContent="center"
					>
						{getStepContent()}
					</Grid>
					<Grid item xs={12} md={6}>
						<Button disabled={activeStep === 0} onClick={handleBack} fullWidth>
							Back
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="contained"
							color="primary"
							onClick={
								activeStep === steps.length - 1 ? handleSubmit : handleNext
							}
							fullWidth
							disabled={disabled}
						>
							{activeStep === steps.length - 1 ? "Finish" : "Continue"}
						</Button>
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

export const ExtendedProfileStepper = withReduxProps(
	ExtendedProfileStepperComponent
);
