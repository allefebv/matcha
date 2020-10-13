/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ExtendedProfileStepper.tsx                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/15 16:12:13 by allefebv         ###   ########.fr       */
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
import {
	postPicturesAPI,
	updateProfileAPI,
	postTagsAPI,
	handleUsageLocationAPI,
	handleGeoLocationAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { useGeolocation } from "../../services/useGeolocation";
import {
	actionUser_geolocation,
	actionUser_setProfile,
	actionUser_usagelocation,
} from "../../store/user/action";
import { Iimgs } from "../../types/types";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
	profile: state.user.profile,
	imgs: state.user.imgs as Iimgs,
	tagList: state.user.tagList,
	usagelocation: state.user.usagelocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ExtendedProfileStepperComponent(props: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
	const geolocation = useGeolocation();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

	function getSteps() {
		return [0, 1, 2];
	}

	useEffect(() => {
		if (geolocation) {
			props.dispatch(
				actionUser_geolocation({
					geolocation: geolocation,
				})
			);
			handleGeoLocationAPI(geolocation, props.loggedIn);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocation]);

	async function submitPictures() {
		const data = new FormData();
		await Promise.all(
			Object.entries(props.imgs).map(async (entry) => {
				if (entry[1] !== null) {
					await fetch(entry[1])
						.then((response) => response.blob())
						.then((blob) => {
							data.append(
								entry[0],
								new File([blob], entry[0], {
									type: "image/jpg",
								})
							);
						});
				}
			})
		);

		for (var pair of data.entries()) {
			console.log(pair[0] + " - " + pair[1]);
		}

		if (Object.values(props.imgs).some((value) => value !== null)) {
			return postPicturesAPI(data, props.loggedIn).then(() => {});
		}
	}

	async function submitProfile() {
		return updateProfileAPI(props.profile, props.loggedIn)
			.then()
			.catch((error: Error) => console.log(error));
	}

	async function submitTags() {
		return postTagsAPI({ tagList: [...props.tagList] }, props.loggedIn)
			.then(() => {})
			.catch((error) => {});
	}

	async function submitUsageLocation() {
		return handleUsageLocationAPI(props.usagelocation, props.loggedIn).then(
			(response) => {
				props.dispatch(actionUser_usagelocation({ usagelocation: response }));
			}
		);
	}

	const handleSubmit = async () => {
		setLoading(true);
		await Promise.all([
			submitProfile(),
			submitTags(),
			submitPictures(),
			submitUsageLocation(),
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
						activeStep={activeStep}
						steps={steps}
						handleChange={handleChange}
						setDisabled={setDisabled}
					/>
				);
			case 1:
				return (
					<ProfileOptional2
						activeStep={activeStep}
						steps={steps}
						handleChange={handleChange}
						setDisabled={setDisabled}
					/>
				);
			case 2:
				return (
					<ProfileOptional3
						activeStep={activeStep}
						steps={steps}
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
