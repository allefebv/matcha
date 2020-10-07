/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCreationStepper.tsx                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/09 18:35:39 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { Iaddress, Iprofile } from "../types/types";
import { ProfileMandatoryForm } from "./ProfileMandatoryForm";
import { ProfileOptional1 } from "./ProfileOptional1";
import { ProfileOptional2 } from "./ProfileOptional2";
import { ProfileOptional3 } from "./ProfileOptional3";
import {
	postPicturesAPI,
	postProfileAPI,
	postTagsAPI,
} from "../services/apiCalls";
import * as constants from "../services/constants";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_geolocation } from "../store/user/action";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ProfileCreationStepperComponent(props: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
	const [geolocation, setGeolocation] = useState(props.currentGeolocation);
<<<<<<< HEAD
	const [loading, setLoading] = useState(false);
=======
>>>>>>> chore(front): some refacto, useEffect comments to avoid warnings, fetchApi externalized, routing refacto, routing for account creation

	useEffect(() => {
		if (!geolocation) {
			fetch("https://ipinfo.io/geo?token=11e860581699f1")
<<<<<<< HEAD
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((json: any) => {
					if (json.loc) {
						const coordinates = json.loc.split(",");
						fetch(
							constants.URI_REVERSE_GEOCODING_API +
								constants.LOCATION_IQ_API_KEY +
								"&lat=" +
								coordinates[0] +
								"&lon=" +
								coordinates[1] +
								constants.PARAMETERS_REVERSE_GEOCODING_API
						)
							.then((response) => {
								if (!response.ok) {
									throw new Error(response.statusText);
								}
								return response.json();
							})
							.then((json) => {
								if (json.address) {
									const tmp: Iaddress = {
										city: json.address.city_district
											? json.address.city_district
											: json.address.city,
										postCode: json.address.postcode,
										countryCode: json.address.country_code,
										country: json.address.country,
										isFromGeolocation: true,
										lat: parseInt(json.lat),
										lon: parseInt(json.lon),
									};
									setGeolocation(tmp);
									props.dispatch(
										actionUser_geolocation({
											geolocation: tmp,
										})
									);
								}
							})
							.catch((error: Error) => {
								console.log(error.message);
							});
					} else {
						throw new Error("Geolocation error");
					}
				})
				.catch((error: Error) => {
					console.log(error.message);
					return;
				});
		} // eslint-disable-next-line react-hooks/exhaustive-deps
=======
				.then((response) => response.json())
				.then((json) => {
					const coordinates = json.loc.split(",");
					fetch(
						constants.URI_REVERSE_GEOCODING_API +
							constants.LOCATION_IQ_API_KEY +
							"&lat=" +
							coordinates[0] +
							"&lon=" +
							coordinates[1] +
							constants.PARAMETERS_REVERSE_GEOCODING_API
					)
						.then((response) => {
							return response.json();
						})
						.then((json) => {
							const tmp: Iaddress = {
								city: json.address.city_district
									? json.address.city_district
									: json.address.city,
								postCode: json.address.postcode,
								countryCode: json.address.country_code,
								country: json.address.country,
								isFromGeolocation: true,
								lat: parseInt(json.lat),
								lon: parseInt(json.lon),
							};
							setGeolocation(tmp);
							props.dispatch(actionUser_geolocation({ geolocation: tmp }));
						});
				});
		}
>>>>>>> chore(front): some refacto, useEffect comments to avoid warnings, fetchApi externalized, routing refacto, routing for account creation
	}, []);

	function getSteps() {
		return [0, 1, 2, 3];
	}

	const [profile, setProfile] = useState<Iprofile>({
		firstName: "",
		lastName: "",
		userName: "",
		dob: null,
		gender: null,
		sexualOrientation: null,
		bio: null,
		geoLocationAuthorization: false,
		location: {
			usageLocation: null,
			geoLocation: null,
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
		if (geolocation !== null) {
			const tmpProfile = { ...profile };
			tmpProfile.location.geoLocation = geolocation;
			setProfile(tmpProfile);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocation]);

	async function submitPictures() {
		const data = new FormData();
		await Promise.all(
			Object.entries(profile.imgs).map(async (entry) => {
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

		if (Object.values(profile.imgs).some((value) => value !== null)) {
<<<<<<< HEAD
			return postPicturesAPI(data, props.loggedIn).then(() => {});
=======
			postPicturesAPI(data, props.loggedIn).then(() => {});
>>>>>>> chore(front): some refacto, useEffect comments to avoid warnings, fetchApi externalized, routing refacto, routing for account creation
		}
	}

	async function submitProfile() {
		const body = Object.fromEntries(
			Object.entries(profile).filter(
				(entry) => !["imgs", "tagList", "location"].includes(entry[0])
			)
		);
<<<<<<< HEAD
		return postProfileAPI(body, props.loggedIn);
=======

		postProfileAPI(body, props.loggedIn).then(() => {});
>>>>>>> chore(front): some refacto, useEffect comments to avoid warnings, fetchApi externalized, routing refacto, routing for account creation
	}

	function submitTags() {
		//TODO: hardcoded tags
<<<<<<< HEAD
		return postTagsAPI({}, props.loggedIn)
=======
		postTagsAPI({}, props.loggedIn)
>>>>>>> chore(front): some refacto, useEffect comments to avoid warnings, fetchApi externalized, routing refacto, routing for account creation
			.then(() => {})
			.catch((error) => {});
	}

	const handleSubmit = async () => {
		setLoading(true);
		await Promise.all([submitProfile(), submitTags()]);
		setLoading(false);
		// submitPictures();
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	const isDisabled = () => {
		return (
			profile.firstName === "" ||
			profile.lastName === "" ||
			profile.userName === ""
		);
	};

	function getStepContent() {
		switch (activeStep) {
			case 0:
				return (
					<ProfileMandatoryForm
						activeStep={activeStep}
						steps={steps}
						handleChange={handleChange}
						profile={profile}
					/>
				);
			case 1:
				return (
					<ProfileOptional1
						activeStep={activeStep}
						steps={steps}
						handleChange={handleChange}
						setProfile={setProfile}
						profile={profile}
					/>
				);
			case 2:
				return (
					<ProfileOptional2
						activeStep={activeStep}
						steps={steps}
						handleChange={handleChange}
						setProfile={setProfile}
						profile={profile}
					/>
				);
			case 3:
				return (
					<ProfileOptional3
						activeStep={activeStep}
						steps={steps}
						handleChange={handleChange}
						setProfile={setProfile}
						profile={profile}
					/>
				);
			default:
				return (
					<Typography color="primary">All steps completed</Typography>
				);
		}
	}

	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress size={80} color="primary" />
			) : (
				<React.Fragment>
					<Grid
						item
						container
						xs={12}
						justify="center"
						alignItems="center"
						alignContent="center"
					>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography>All steps completed</Typography>
							</React.Fragment>
						) : (
							getStepContent()
						)}
					</Grid>
					<Grid item xs={12}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, key) => (
								<Step key={key}>
									<StepLabel></StepLabel>
								</Step>
							))}
						</Stepper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							disabled={activeStep === 0}
							onClick={handleBack}
							fullWidth
						>
							Back
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="contained"
							color="primary"
							onClick={
								activeStep === steps.length - 1
									? handleSubmit
									: handleNext
							}
							fullWidth
							disabled={isDisabled()}
						>
							{activeStep === steps.length - 1
								? "Finish"
								: "Continue"}
						</Button>
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

export const ProfileCreationStepper = withReduxProps(
	ProfileCreationStepperComponent
);
