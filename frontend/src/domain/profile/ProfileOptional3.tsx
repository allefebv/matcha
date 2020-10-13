/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional3.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/04 15:21:51 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/13 14:37:31 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useCallback, useEffect, useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import { Iprofile } from "../../types/types";
import * as constants from "../../services/constants";
import { throttle } from "lodash";
import { renameKey } from "../../services/utils";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_setProfile,
	actionUser_usagelocation,
} from "../../store/user/action";

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

export function ProfileOptional3(props: Props) {
	const [value, setValue] = useState<any>(null);
	const [options, setOptions] = useState<Array<any>>([]);
	const [inputValue, setInputValue] = useState("");
	const [prevent, setPrevent] = useState(false);

	const getOptions = useCallback(
		throttle((input: string, location: any) => {
			fetch(
				constants.URI_AUTOCOMPLETE_API +
					constants.LOCATION_IQ_API_KEY +
					"&q=" +
					encodeURIComponent(input) +
					"&" +
					constants.PARAMETERS_AUTOCOMPLETE_API
			)
				.then((response) => response.json())
				.then((json) => {
					if (json.error) {
						return;
					}
					const jsonTmp = createAddressFromJson(json);
					jsonTmp.unshift(location);
					setOptions(jsonTmp);
				});
		}, 1300),
		[]
	);

	const createAddressFromJson = (json: Array<any>) => {
		return json
			.map((entry: any) => {
				return Object.entries(entry)
					.filter((subEntry) => subEntry[0] === "address")
					.map((subEntry: any) => {
						const array = Object.entries(subEntry[1]).filter(
							(subSub) =>
								subSub[0] === "name" ||
								subSub[0] === "country" ||
								subSub[0] === "postcode" ||
								subSub[0] === "country_code"
						);
						array.push(["isFromGeolocation", false]);
						let obj = Object.fromEntries(array);
						obj = renameKey(obj, "name", "city");
						obj = renameKey(obj, "country_code", "countryCode");
						obj = renameKey(obj, "postcode", "postCode");
						return obj;
					});
			})
			.map((entry) => entry[0]);
	};

	useEffect(() => {
		if (inputValue && props.profile.location) {
			getOptions(inputValue, props.profile.location.geoLocation);
		}
	}, [inputValue, props.profile, getOptions]);

	useEffect(() => {
		if (
			props.profile.location &&
			props.profile.location.geoLocation &&
			!options.length
		) {
			setOptions([props.profile.location.geoLocation]);
		}
	}, [options, props.profile.location]);

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

	function handleValueChange(event: React.ChangeEvent<{}>, newValue: any) {
		setValue(newValue);
		setPrevent(true);
		const tmpProfile = props.profile;
		tmpProfile.geoLocationAuthorization = tmpProfile.location.usageLocation
			?.isFromGeolocation
			? true
			: false;
		props.dispatch(actionUser_setProfile(tmpProfile));
		props.dispatch(actionUser_usagelocation(newValue));
		if (newValue) {
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
									option.postCode +
									", " +
									option.city +
									", " +
									option.country
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
											<MyLocationIcon
												style={{ color: "#16F02D" }}
											/>
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
