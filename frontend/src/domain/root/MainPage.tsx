/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/26 15:33:46 by allefebv         ###   ########.fr       */
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

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: "15vw",
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

	const computeRangeLimits = useCallback(() => {
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

		console.log(computedLimits);
		setLimits(computedLimits);
	}, [props.profilesRecco]);

	const getCards = () => {
		return props.profilesRecco
			? props.profilesRecco.map(
					(profile: { profile: any; score: number }, index: number) => (
						<Grid item xs={12} sm={6} lg={4} key={index}>
							<ProfileCard profile={profile} />
						</Grid>
					)
			  )
			: null;
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
			<Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
				<div className={classes.drawer}>
					<CategoryFilterSort label="Age">
						<SliderDouble min={18} max={100} step={1} />
					</CategoryFilterSort>
					<CategoryFilterSort label="Location">
						<SliderDouble min={0} max={20000} step={1} />
					</CategoryFilterSort>
					<CategoryFilterSort label="Popularity">
						<SliderDouble min={0} max={40000} step={1} />
					</CategoryFilterSort>
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
