/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional2.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:49:54 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 10:34:31 by allefebv         ###   ########.fr       */
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
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState<string[]>([]);

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

	function TagAutocomplete() {
		const details = {
			partial: inputValue,
			limit: 5,
		};
		if (!(inputValue === "")) {
			getTagAutocompleteAPI(details, props.isLoggedIn)
				.then((tagList) => {
					setOptions(tagList);
				})
				.catch((error) => {
					props.dispatch(
						actionUi_showSnackbar({
							message: error.message,
							type: "error",
						})
					);
					console.log(error.message);
				});
		}
	}

	const handleInputChange = (
		event: React.ChangeEvent<{}>,
		newInputValue: string
	) => {
		setInputValue(newInputValue);
	};

	useEffect(() => {
		TagAutocomplete();
	}, [inputValue]);

	useEffect(() => {
		if (profileHasTags() && props.profile.bio) {
			props.setDisabled(false);
		} else {
			props.setDisabled(true);
		}
	}, [props.tagList]);

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<ProfilePictures imgs={props.imgs} setImgs={props.setImgs} />
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
					options={options}
					value={props.tagList}
					getOptionLabel={(option) => "#" + option}
					filterSelectedOptions
					onChange={handleChangeTags}
					onInputChange={handleInputChange}
					renderInput={(params) => <TextField {...params} fullWidth />}
					freeSolo
				/>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional2 = withReduxProps(ProfileOptional2Component);
