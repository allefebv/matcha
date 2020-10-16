/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseProfileFormContent.tsx                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/19 18:34:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { IbaseProfile, IextendedProfile } from "../../types/types";

type Props = {
	profile: IextendedProfile | IbaseProfile;
	setProfile: (profile: IextendedProfile | IbaseProfile) => void;
};

export function BaseProfileFormContent(props: Props) {
	const [dob, setDob] = useState<Date | null>(
		props.profile.dob ? new Date(props.profile.dob) : null
	);
	const date = new Date();

	const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setProfile({ ...props.profile, [e.target.name]: e.target.value });
	};

	function handleChangeDob(date: Date | null) {
		if (date) {
			setDob(date);
			props.setProfile({ ...props.profile, dob: date.valueOf() });
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
				value={props.profile && props.profile.firstname}
				onChange={handleChangeProfile}
				required
			/>
			<TextField
				label="Last Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="lastname"
				value={props.profile && props.profile.lastname}
				onChange={handleChangeProfile}
				required
			/>
			<TextField
				label="Username"
				variant="filled"
				margin="dense"
				fullWidth
				name="username"
				value={props.profile && props.profile.username}
				onChange={handleChangeProfile}
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
