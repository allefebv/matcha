/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/26 15:35:05 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState, useCallback } from "react";
import { SliderDouble } from "../../component/SliderDouble";
import { CategoryFilterSort } from "../search/CategoryFilterSort";
import { Autocomplete } from "@material-ui/lab";
import {
	Drawer,
	IconButton,
	makeStyles,
	TextField,
	useTheme,
	Grid,
} from "@material-ui/core";
import { ProfileCard } from "../../component/ProfileCard";
import { KeyboardArrowRight } from "@material-ui/icons";
import { ToggleGroup } from "../../component/ToggleGroup";
import { getRecommendationAPI } from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionProfilesList_getRecco } from "../../store/profilesLists/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { getAge } from "../../services/profileUtils";
import { MaterialDoubleSlider } from "../../component/MaterialDoubleSlider";

const useStyles = makeStyles((theme) => ({
	drawer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	drawerContent: {
		display: "flex",
		flexDirection: "column",
		alignSelf: "center",
		justifySelf: "center",
		width: "30vw",
	},
	scrollable: {
		display: "flex",
		backgroundColor: "indigo",
	},
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	toggleGroup: {
		backgroundColor: "blue",
	},
	cards: {
		postion: "absolute",
		display: "flex",
		top: "10vh",
		height: "86.7vh",
		width: "80vw",
		[theme.breakpoints.down("sm")]: {
			width: "100vw",
		},
		flexWrap: "wrap",
		backgroundColor: "pink",
		justifyContent: "center",
		overflowY: "scroll",
		overflowX: "hidden",
	},
}));

interface Ilimits {
	minTS: number;
	maxTS: number;
	minPopularity: number;
	maxPopularity: number;
	maxDistance: number;
}

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profilesRecco: state.profilesList.recommendations as any[],
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const MainPageComponent = (props: Props) => {
	const theme = useTheme();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [limits, setLimits] = useState<Ilimits | null>(null);

	const handleOpenDrawer = () => {
		setOpen(true);
	};

	const handleCloseDrawer = () => {
		setOpen(false);
	};

	const getRecommendationList = () => {
		getRecommendationAPI(props.loggedIn)
			.then((json: any[]) => {
				props.dispatch(actionProfilesList_getRecco({ profiles: json }));
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
	};

	useEffect(() => {
		if (!props.profilesRecco) {
			getRecommendationList();
		}
		computeRangeLimits();
	}, []);

	useEffect(() => {
		if (props.profilesRecco) {
			const tmp = props.profilesRecco.filter((profile) => {
				return (
					getAge(profile.profile.profile.dob) >= value[0] &&
					getAge(profile.profile.profile.dob) <= value[1]
				);
			});
			setFilteredProfilesRecco(tmp);
		}
	}, [props.profilesRecco, limits, value]);

	const computeRangeLimits = useCallback(() => {
		if (props.profilesRecco) {
			let computedLimits = {
				minTS: Number.POSITIVE_INFINITY,
				maxTS: Number.NEGATIVE_INFINITY,
				minPopularity: 100,
				maxPopularity: 0,
				maxDistance: 0,
			} as Ilimits;

			for (let profileTop of props.profilesRecco) {
				const { profile } = profileTop.profile;
				if (profile.dob < computedLimits.minTS) {
					computedLimits.minTS = profile.dob;
				}
				if (profile.dob > computedLimits.maxTS) {
					computedLimits.maxTS = profile.dob;
				}
				if (profile.popularityScore < computedLimits.minPopularity) {
					computedLimits.minPopularity = profile.popularityScore;
				}
				if (profile.popularityScore > computedLimits.maxPopularity) {
					computedLimits.maxPopularity = profile.popularityScore;
				}
			}

			setLimits(computedLimits);
		}
	}, [props.profilesRecco]);

	const getCards = () => {
		return filteredProfilesRecco
			? filteredProfilesRecco.map(
					(profile: { profile: any; score: number }, index: number) => (
						<Grid item xs={12} sm={6} lg={4} key={index}>
							<ProfileCard profile={profile} />
						</Grid>
					)
			  )
			: null;
	};

	const handleChange = (event: any, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};

	return (
		<React.Fragment>
			<div className={classes.main}>
				<div className={classes.toggleGroup}>
					<ToggleGroup />
				</div>
				<IconButton onClick={handleOpenDrawer}>
					<KeyboardArrowRight />
				</IconButton>
				<Grid container className={classes.cards}>
					{getCards()}
				</Grid>
			</div>
			<Drawer
				anchor="left"
				open={open}
				onClose={handleCloseDrawer}
				className={classes.drawer}
			>
				<div className={classes.drawerContent}>
					{limits && limits.minTS && limits.maxTS && (
						<CategoryFilterSort label="Age">
							<MaterialDoubleSlider
								min={getAge(limits.maxTS)}
								max={getAge(limits.minTS)}
								value={value}
								handleChange={handleChange}
							/>
						</CategoryFilterSort>
					)}
					<CategoryFilterSort label="Location">
						<SliderDouble min={0} max={20000} step={1} />
					</CategoryFilterSort>
					{/* 					{limits &&
						limits.minPopularity &&
						limits.maxPopularity &&
						limits.maxPopularity !== limits.minPopularity && (
							<CategoryFilterSort label="Popularity">
								<MaterialDoubleSlider
									min={limits.minPopularity}
									max={limits.maxPopularity}
								/>
							</CategoryFilterSort>
						)} */}
					<CategoryFilterSort label="Tags">
						<Autocomplete
							multiple
							options={["John", "Lennon", "Toto"]}
							getOptionLabel={(option) => option}
							filterSelectedOptions
							renderInput={(params) => <TextField {...params} />}
						/>
					</CategoryFilterSort>
				</div>
			</Drawer>
		</React.Fragment>
	);
};

export const MainPage = withReduxProps(MainPageComponent);
