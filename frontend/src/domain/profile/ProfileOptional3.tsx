/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional3.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/04 15:21:51 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/16 01:18:40 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useCallback, useEffect, useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_setProfile,
	actionUser_usagelocation,
} from "../../store/user/action";
import { autocompleteLocationAPI } from "../../services/apiCalls";
import { Iaddress } from "../../types/types";
import { throttle } from "lodash";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	currentGeolocation: state.user.currentGeolocation,
	usagelocation: state.user.usagelocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	activeStep: number;
	steps: number[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled: (value: React.SetStateAction<boolean>) => void;
} & ReduxProps;

function ProfileOptional3Component(props: Props) {
	const [value, setValue] = useState<any>(props.usagelocation);
	const [options, setOptions] = useState<Array<any>>([]);
	const [inputValue, setInputValue] = useState("");
	const [prevent, setPrevent] = useState(false);

	const autocomplete = async (input: string) => {
		const address = await autocompleteLocationAPI(input);
		if (address) {
			address.unshift(props.currentGeolocation);
			setOptions(address);
		}
	};
	const throttledAutocomplete = throttle(autocomplete, 1100);
	const MemoizedThrottledAutocomplete = useCallback(throttledAutocomplete, []);

	useEffect(() => {
		if (inputValue) {
			MemoizedThrottledAutocomplete(inputValue);
		}
	}, [inputValue]);

	useEffect(() => {
		setOptions([props.currentGeolocation]);
		if (value) {
			props.setDisabled(false);
		}
	}, []);

	const handleInputChange = (
		event: React.ChangeEvent<{}>,
		newInputValue: string
	) => {
		if (prevent === true) {
			setPrevent(false);
			return;
		}
		setInputValue(newInputValue);
	};

	function handleValueChange(
		e: React.ChangeEvent<{}>,
		newValue: Iaddress | null
	) {
		setValue(newValue);
		setPrevent(true);
		if (newValue) {
			const tmpProfile = props.profile;
			tmpProfile.geoLocationAuthorization = newValue.isFromGeolocation
				? true
				: false;
			props.dispatch(actionUser_setProfile({ profile: tmpProfile }));
			props.dispatch(actionUser_usagelocation({ usagelocation: newValue }));
			props.setDisabled(false);
		} else {
			props.setDisabled(true);
		}
	}

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography color="primary">Where are you ?</Typography>
			</Grid>
			<Grid item xs={12} container direction="row" alignItems="center">
				<Grid item xs={12}>
					<Autocomplete
						filterOptions={(x) => x}
						blurOnSelect
						autoComplete
						autoHighlight
						fullWidth
						options={options}
						value={value}
						onChange={handleValueChange}
						onInputChange={handleInputChange}
						//TODO: dirty
						getOptionSelected={(option, value) => true}
						getOptionLabel={(option) => {
							if (option !== null) {
								return (
									option.postCode + ", " + option.city + ", " + option.country
								);
							}
							return "";
						}}
						renderOption={(option) => (
							<Grid
								container
								justify="center"
								alignItems="center"
								wrap="nowrap"
							>
								<Grid item container xs={2}>
									{option !== null ? (
										option.isFromGeolocation ? (
											<MyLocationIcon style={{ color: "#16F02D" }} />
										) : (
											<LocationOnIcon />
										)
									) : null}
								</Grid>
								<Grid item xs={10}>
									<Typography noWrap>
										{option !== null
											? option.isFromGeolocation
												? "Use my location"
												: option.postCode +
												  ", " +
												  option.city +
												  ", " +
												  option.country
											: null}
									</Typography>
								</Grid>
							</Grid>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Location"
								variant="filled"
								margin="dense"
							/>
						)}
					></Autocomplete>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional3 = withReduxProps(ProfileOptional3Component);
