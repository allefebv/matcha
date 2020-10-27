/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional2.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:49:54 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/27 18:42:46 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { ProfilePictures } from "./ProfilePictures";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_setTagList } from "../../store/user/action";
import { getTagAutocompleteAPI } from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { TagSearch } from "../../component/TagSearch";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	tagList: state.user.tagList,
	isLoggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled: (value: React.SetStateAction<boolean>) => void;
	imgs: (string | null)[];
	setImgs: React.Dispatch<React.SetStateAction<(string | null)[]>>;
} & ReduxProps;

function ProfileOptional2Component(props: Props) {
	function handleChangeTags(
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) {
		let tags = typeof value === "string" ? [value] : value;
		props.dispatch(actionUser_setTagList({ tagList: tags }));
	}

	function profileHasTags() {
		return !(!props.tagList || props.tagList.length === 0);
	}

	useEffect(() => {
		if (profileHasTags() && props.profile.bio && props.imgs[0]) {
			props.setDisabled(false);
		} else {
			props.setDisabled(true);
		}
	}, [props.tagList, props.profile.bio, props.imgs]);

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<ProfilePictures
					imgs={props.imgs}
					setImgs={props.setImgs}
					modifiable
					username={props.profile.username}
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
				<TagSearch
					handleChangeTags={handleChangeTags}
					tagList={props.tagList}
				/>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional2 = withReduxProps(ProfileOptional2Component);
