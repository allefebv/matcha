/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional1.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:50:00 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/06 17:50:01 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";

import { Grid, Icon, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { Iprofile } from "../types/types";

import { DatePicker } from "@material-ui/pickers";

interface Props {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	profile: Iprofile;
}

export function ProfileOptional1(props: Props) {
	const [birthday, setBirthday] = useState<Date | null>(null);

	function handleChangeGender(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			props.setProfile({ ...props.profile, gender: nextView });
		}
	}

	function handleChangeSexualOrientation(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			props.setProfile({ ...props.profile, sexualOrientation: nextView });
		}
	}

	function handleChangeBirthDay(date: Date | null) {
		const tmpProfile = { ...props.profile };
		tmpProfile.birthDay = date;
		setBirthday(date);
		props.setProfile(tmpProfile);
	}

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<DatePicker
					margin="normal"
					label="Birthday"
					format="MM/dd/yyyy"
					value={birthday}
					onChange={handleChangeBirthDay}
					fullWidth
				/>
			</Grid>
			<Grid
				item
				container
				xs={12}
				justify="center"
				alignContent="center"
				alignItems="center"
				direction="column"
			>
				<Grid item xs={6}>
					<Typography color="primary">I am a</Typography>
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
				<Grid item xs={6}>
					<Typography color="primary">Looking for</Typography>
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
			</Grid>
		</React.Fragment>
	);
}
