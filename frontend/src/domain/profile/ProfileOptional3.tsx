/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional3.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/04 15:21:51 by allefebv          #+#    #+#             */
/*   Updated: 2020/12/05 17:45:56 by allefebv         ###   ########.fr       */
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

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
	obj: X,
	prop: Y
): obj is X & Record<Y, unknown> {
	return obj.hasOwnProperty(prop);
}

const withReduxProps = connect((state: any) => ({
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled?: (value: React.SetStateAction<boolean>) => void;
	usageLocation: Iaddress;
	setUsageLocation: React.Dispatch<React.SetStateAction<Iaddress>>;
	profile: Iprofile;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
} & ReduxProps;

function ProfileOptional3Component(props: Props) {
	const [value, setValue] = useState<Iaddress | {}>({});
	const [options, setOptions] = useState<(Iaddress | Object)[]>([{}]);
	const [input, setInput] = useState("");
	const ref = useRef(options);
	const [wait, setWait] = useState(true);
	const [first, setFirst] = useState(true);

	const updateOptions = (options: (Iaddress | {})[]) => {
		ref.current = options;
		setOptions(options);
	};

	useEffect(() => {
		let isMounted = true;
		if (
			isMounted &&
			Object.keys(props.usageLocation).length !== 0 &&
			props.usageLocation.city !== null
		) {
			let tmp = [...ref.current];
			tmp = tmp.filter((address) => {
				if (hasOwnProperty(address, "postCode")) {
					return address.postCode !== props.usageLocation?.postCode;
				}
				return true;
			});
			tmp.push(props.usageLocation);
			updateOptions(tmp);
			setValue(props.usageLocation);
		}
		let timeout = setTimeout(() => {
			setWait(false);
		}, 1000);
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
			tmp = tmp.filter((address) => {
				if (hasOwnProperty(address, "postCode")) {
					return address.isFromGeolocation === false;
				}
				return true;
			});
			tmp.unshift(props.currentGeolocation);
			updateOptions(tmp);
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

	useEffect(() => {
		let isMounted = true;
		if (Object.keys(value).length !== 0 && isMounted) {
			props.setDisabled && props.setDisabled(false);
			if (first) {
				setFirst(false);
			} else {
				const tmpProfile = { ...props.profile };
				tmpProfile.geoLocationAuthorization =
					hasOwnProperty(value, "isFromGeolocation") && value.isFromGeolocation
						? true
						: false;
				props.setProfile(tmpProfile);
				hasOwnProperty(value, "isFromGeolocation") &&
					props.setUsageLocation(value);
			}
		} else {
			props.setDisabled && props.setDisabled(true);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const autocomplete = async (input: string) => {
		autocompleteLocationAPI(input)
			.then((address) => {
				if (address) {
					address = address.filter(
						(memberAddress) => memberAddress.isFromGeolocation === false
					);
					address.unshift(props.currentGeolocation);
					address.unshift({});
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
		newValue: Iaddress | {}
	) {
		Object.keys(newValue).length !== 0 && setValue(newValue);
	}

	function getOptionLabel(option: Iaddress | {}) {
		if (
			option !== {} &&
			hasOwnProperty(option, "city") &&
			option.city !== null
		) {
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

	function renderOption(option: Iaddress | {}) {
		if (Object.keys(option).length === 0) {
			return <div style={{ display: "none" }}></div>;
		}
		return (
			<Grid container justify="center" alignItems="center" wrap="nowrap">
				<Grid item container xs={2}>
					{getOptionIcon(option as Iaddress)}
				</Grid>
				<Grid item xs={10}>
					<Typography noWrap>
						{option !== {}
							? hasOwnProperty(option, "isFromGeolocation") &&
							  option.isFromGeolocation
								? "Use my location"
								: hasOwnProperty(option, "postCode") &&
								  option.postCode + ", " + option.city + ", " + option.country
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
						// filterOptions={(x) => x.filter((y) => Object.keys(y).length > 0)}
						filterOptions={(x) => x}
						blurOnSelect
						autoComplete
						autoHighlight
						fullWidth
						options={options}
						value={value}
						onChange={handleValueChange as any}
						onInputChange={handleInputChange}
						getOptionSelected={(option, value) => true}
						getOptionLabel={getOptionLabel}
						renderOption={renderOption}
						renderInput={renderInput}
						disableClearable
					></Autocomplete>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional3 = withReduxProps(ProfileOptional3Component);
