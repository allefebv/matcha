import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import * as constants from '../services/constants';
import { fetchApi } from '../services/fetchApi';
import { Iprofile } from '../types/types';
import { ProfileMandatoryForm } from './ProfileMandatoryForm';
import { ProfileOptional1 } from './ProfileOptional1';
import { ProfileOptional2 } from './ProfileOptional2';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
	user: state.user.signin.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ProfileCreationStepperComponent(props: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	function getSteps() {
		return [0, 1, 2];
	}

	const [profile, setProfile] = useState<Iprofile>({
		firstName: "",
		lastName: "",
		userName: "",
		location: null,
		age: null,
		gender: null,
		sexualOrientation: null,
		bio: null,
		tagList: null,
		imgs: {
			img0: null,
			img1: null,
			img2: null,
			img3: null,
			img4: null,
		},
	});

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
			fetchApi(constants.URL + constants.URI_POST_PICTURES, {
				method: constants.POST_METHOD,
				headers: {
					"Content-Type": "multipart/form-data",
					token: props.loggedIn,
				},
				body: data,
				credentials: "include",
			})
				.then(() => {})
				.catch((error) => {});
		}
	}

	function submitProfile() {
		const body = Object.entries(profile).filter(
			(entry) => !["imgs", "tags"].includes(entry[0])
		);

		fetchApi(constants.URL + constants.URI_POST_PROFILE, {
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: props.loggedIn,
			},
			credentials: "include",
			body: profile,
		})
			.then(() => {})
			.catch((error) => {});
	}

	function submitTags() {
		fetchApi(constants.URL + constants.URI_POST_TAGS, {
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: props.loggedIn,
			},
			credentials: "include",
			body: JSON.stringify({ tagList: ["moto", "voiture"] }),
		})
			.then(() => {})
			.catch((error) => {});
	}

	const handleSubmit = () => {
		// submitPictures();
		submitProfile();
		submitTags();
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
			default:
				return <Typography color="primary">All steps completed</Typography>;
		}
	}

	return (
		<React.Fragment>
			<Grid item container xs={12} justify="center">
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
				<Button disabled={activeStep === 0} onClick={handleBack} fullWidth>
					Back
				</Button>
			</Grid>
			<Grid item xs={12} md={6}>
				<Button
					variant="contained"
					color="primary"
					onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
					fullWidth
					disabled={isDisabled()}
				>
					{activeStep === steps.length - 1 ? "Finish" : "Continue"}
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileCreationStepper = withReduxProps(
	ProfileCreationStepperComponent
);
