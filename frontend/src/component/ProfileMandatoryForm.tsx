import React from 'react';

import { TextField } from '@material-ui/core';

import { Iprofile } from '../types/types';

interface Props {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	profile: Iprofile;
}

export function ProfileMandatoryForm(props: Props) {
	return (
		<React.Fragment>
			<TextField
				label="First Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="firstName"
				value={props.profile.firstName}
				onChange={props.handleChange}
				required
			/>
			<TextField
				label="Last Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="lastName"
				value={props.profile.lastName}
				onChange={props.handleChange}
				required
			/>
			<TextField
				label="Username"
				variant="filled"
				margin="dense"
				fullWidth
				name="userName"
				value={props.profile.userName}
				onChange={props.handleChange}
				required
			/>
		</React.Fragment>
	);
}
