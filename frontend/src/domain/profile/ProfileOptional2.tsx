/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional2.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:49:54 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/12 20:04:54 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Iprofile } from "../../types/types";
import { ProfilePictures } from "./ProfilePictures";

interface Props {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	setDisabled: (value: React.SetStateAction<boolean>) => void;
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

	function profileHasImages(profile: Iprofile) {
		const imgs = Object.values(props.profile.imgs);
		for (let img of imgs) {
			if (img !== null) {
				return true;
			}
		}
		return false;
	}

	function profileHasTags(profile: Iprofile) {
		console.log(profile.tagList);
		return !(
			props.profile.tagList === null || props.profile.tagList.length === 0
		);
	}

	useEffect(() => {
		console.log(profileHasTags(props.profile));
		if (
			profileHasImages(props.profile) &&
			profileHasTags(props.profile) &&
			props.profile.bio
		) {
			props.setDisabled(false);
		} else {
			props.setDisabled(true);
		}
	}, [props.profile]);

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
