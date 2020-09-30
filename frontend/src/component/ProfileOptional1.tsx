import React, { useState } from "react";

import { Grid, Icon, TextField, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { Iprofile } from "../types/types";
import * as constants from "../services/constants";

interface Props {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	profile: Iprofile;
}

export function ProfileOptional1(props: Props) {
	const [ageError, setAgeError] = useState(false);

	function handleChangeGender(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			console.log(nextView);
			props.setProfile({ ...props.profile, gender: nextView });
			console.log(props.profile);
		}
	}

	function handleChangeSexualOrientation(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			props.setProfile({ ...props.profile, sexualOrientation: nextView });
			console.log(props.profile);
		}
	}

	function isAgeValid(event: React.ChangeEvent<HTMLInputElement>) {
		const age = parseInt(event.currentTarget.value);
		if (age !== null && age >= 18 && age <= 115) {
			return;
		}
		setAgeError(true);
	}

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<TextField
					label="Age"
					variant="filled"
					margin="dense"
					type="number"
					name="age"
					fullWidth
					value={props.profile.age || ""}
					onChange={props.handleChange}
					error={ageError}
					helperText={ageError && constants.AGE_HELPER_ERROR}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary">I am</Typography>
				<ToggleButtonGroup
					onChange={handleChangeGender}
					exclusive
					value={props.profile.gender || ""}
				>
					<ToggleButton value="man">
						<Icon className="fa fa-mars" />
					</ToggleButton>
					<ToggleButton value="woman">
						<Icon className="fa fa-venus" />
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary">I am interested in</Typography>
				<ToggleButtonGroup
					onChange={handleChangeSexualOrientation}
					exclusive
					value={props.profile.sexualOrientation || ""}
				>
					<ToggleButton value="men">
						<Icon className="fa fa-mars" />
					</ToggleButton>
					<ToggleButton value="women">
						<Icon className="fa fa-venus" />
					</ToggleButton>
					<ToggleButton value="both">
						<Icon className="fa fa-venus-mars" />
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
		</React.Fragment>
	);
}
