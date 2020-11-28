/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional3.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/04 15:21:51 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/28 19:32:27 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { connect, ConnectedProps } from "react-redux";
import { autocompleteLocationAPI } from "../../services/apiCalls";
import { Iaddress, Iprofile } from "../../types/types";
import { throttle } from "lodash";
import { errorHandling } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled?: (value: React.SetStateAction<boolean>) => void;
	usageLocation: Iaddress | null;
	setUsageLocation: React.Dispatch<React.SetStateAction<Iaddress | null>>;
	profile: Iprofile;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
} & ReduxProps;

function ProfileOptional3Component(props: Props) {
	const [value, setValue] = useState<Iaddress | null>(null);
	const [options, setOptions] = useState<Iaddress[]>([]);
	const [input, setInput] = useState("");
	const ref = useRef(options);
	const [wait, setWait] = useState(true);

	const updateOptions = (options: Iaddress[]) => {
		ref.current = options;
		setOptions(options);
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted && props.usageLocation && props.usageLocation.city !== null) {
			let tmp = [...ref.current];
			tmp = tmp.filter(
				(address) => address.postCode !== props.usageLocation?.postCode
			);
			tmp.push(props.usageLocation);
			updateOptions(tmp);
		}
		let timeout = setTimeout(() => {
			setWait(false);
		}, 1000);
		if (props.usageLocation && props.usageLocation.city !== null) {
			setValue(props.usageLocation);
			props.setDisabled && props.setDisabled(false);
		}
		return () => {
			isMounted = false;
			clearTimeout(timeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.usageLocation]);

	useEffect(() => {
		let isMounted = true;
		if (
			props.currentGeolocation &&
			isMounted &&
			props.currentGeolocation.postCode !== props.usageLocation?.postCode
		) {
			let tmp = [...ref.current];
			tmp = tmp.filter((address) => address.isFromGeolocation === false);
			tmp.unshift(props.currentGeolocation);
			updateOptions(tmp);
		}
		if (value && props.setDisabled && isMounted) {
			props.setDisabled(false);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.currentGeolocation]);

	useEffect(() => {
		let isMounted = true;
		if (input !== "" && !wait && isMounted) {
			MemoizedThrottledAutocomplete(input);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);

	const autocomplete = async (input: string) => {
		autocompleteLocationAPI(input)
			.then((address) => {
				if (address) {
					address = address.filter(
						(memberAddress) => memberAddress.isFromGeolocation === false
					);
					address.unshift(props.currentGeolocation);
					updateOptions(address);
				}
			})
			.catch((error) => errorHandling(error, props.dispatch));
	};
	const throttledAutocomplete = throttle(autocomplete, 1100);
	const MemoizedThrottledAutocomplete = useCallback(throttledAutocomplete, []);

	const handleInputChange = (
		event: React.ChangeEvent<{}>,
		newInputValue: string
	) => {
		setInput(newInputValue);
	};

	function handleValueChange(
		e: React.ChangeEvent<{}>,
		newValue: Iaddress | null
	) {
		setValue(newValue);
		if (newValue) {
			const tmpProfile = { ...props.profile };
			tmpProfile.geoLocationAuthorization = newValue.isFromGeolocation
				? true
				: false;
			props.setProfile(tmpProfile);
			props.setUsageLocation(newValue);
			props.setDisabled && props.setDisabled(false);
		} else {
			props.setDisabled && props.setDisabled(true);
		}
	}

	function getOptionLabel(option: Iaddress) {
		if (option !== null && option.city !== null) {
			return option.postCode + ", " + option.city + ", " + option.country;
		}
		return "";
	}

	function getOptionIcon(option: Iaddress) {
		if (option) {
			return option.isFromGeolocation ? (
				<MyLocationIcon style={{ color: "#16F02D" }} />
			) : (
				<LocationOnIcon />
			);
		}
		return null;
	}

	function renderOption(option: Iaddress) {
		return (
			<Grid container justify="center" alignItems="center" wrap="nowrap">
				<Grid item container xs={2}>
					{getOptionIcon(option)}
				</Grid>
				<Grid item xs={10}>
					<Typography noWrap>
						{option !== null
							? option.isFromGeolocation
								? "Use my location"
								: option.postCode + ", " + option.city + ", " + option.country
							: null}
					</Typography>
				</Grid>
			</Grid>
		);
	}

	const renderInput = (params: AutocompleteRenderInputParams) => (
		<TextField {...params} label="Location" variant="filled" margin="dense" />
	);

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography color="primary">City and PostCode</Typography>
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
						getOptionSelected={(option, value) => {
							if (option && option.city === value.city) return true;
							if (value === null) return true;
							return false;
						}}
						getOptionLabel={getOptionLabel}
						renderOption={renderOption}
						renderInput={renderInput}
					></Autocomplete>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional3 = withReduxProps(ProfileOptional3Component);
