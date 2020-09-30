import React from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Iprofile } from "../types/types";
import { ProfilePictures } from "./ProfilePictures";

interface Props {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	profile: Iprofile;
}

export function ProfileOptional2(props: Props) {
	function handleChangeTags(
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) {
		let tags = typeof value === "string" ? [value] : value;
		props.setProfile({
			...props.profile,
			tagList: tags,
		});
	}

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<ProfilePictures
					profile={props.profile}
					setProfile={props.setProfile}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary">About you</Typography>
			</Grid>
			<Grid item xs={12}>
				<TextField
					variant="filled"
					margin="dense"
					label="Bio"
					name="bio"
					value={props.profile.bio || ""}
					onChange={props.handleChange}
					fullWidth
					multiline
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary">List some of your interests</Typography>
			</Grid>
			<Grid item xs={12}>
				<Autocomplete
					multiple
					options={["John", "Lennon", "Toto"]}
					getOptionLabel={(option) => option}
					filterSelectedOptions
					onChange={handleChangeTags}
					renderInput={(params) => <TextField {...params} fullWidth />}
					freeSolo
				/>
			</Grid>
		</React.Fragment>
	);
}
