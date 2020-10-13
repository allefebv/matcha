/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional2.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:49:54 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/13 15:49:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Iprofile } from "../../types/types";
import { ProfilePictures } from "./ProfilePictures";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_setTagList } from "../../store/user/action";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled: (value: React.SetStateAction<boolean>) => void;
	profile: Iprofile;
} & ReduxProps;

export function ProfileOptional2(props: Props) {
	const [imgUrls, setImgUrls] = useState<string[]>([]);

	function handleChangeTags(
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) {
		let tags = typeof value === "string" ? [value] : value;
		props.dispatch(actionUser_setTagList({ tagList: tags }));
	}

	//TODO: change this
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
		return !(
			props.profile.tagList === null || props.profile.tagList.length === 0
		);
	}

	useEffect(() => {
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
				<ProfilePictures imgUrls={imgUrls} setImgUrls={setImgUrls} />
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
				<Typography color="primary">
					List some of your interests
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Autocomplete
					multiple
					options={["John", "Lennon", "Toto"]}
					getOptionLabel={(option) => option}
					filterSelectedOptions
					onChange={handleChangeTags}
					renderInput={(params) => (
						<TextField {...params} fullWidth />
					)}
					freeSolo
				/>
			</Grid>
		</React.Fragment>
	);
}
