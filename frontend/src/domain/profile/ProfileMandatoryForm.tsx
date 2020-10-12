import React, { useState } from "react";

import { TextField } from "@material-ui/core";

import { Iprofile } from "../../types/types";
import { DatePicker } from "@material-ui/pickers";

interface Props {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	profile: Iprofile;
}

export function ProfileMandatoryForm(props: Props) {
	const [dob, setDob] = useState<Date | null>(null);
	const date = new Date();

	function handleChangeDob(date: Date | null) {
		if (date) {
			const tmpProfile = { ...props.profile };
			tmpProfile.dob = date.valueOf();
			setDob(date);
			props.setProfile(tmpProfile);
		}
	}

	return (
		<React.Fragment>
			<TextField
				label="First Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="firstname"
				value={props.profile.firstname}
				onChange={props.handleChange}
				required
			/>
			<TextField
				label="Last Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="lastname"
				value={props.profile.lastname}
				onChange={props.handleChange}
				required
			/>
			<TextField
				label="Username"
				variant="filled"
				margin="dense"
				fullWidth
				name="username"
				value={props.profile.username}
				onChange={props.handleChange}
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
		</React.Fragment>
	);
}
