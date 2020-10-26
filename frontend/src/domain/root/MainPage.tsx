/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/26 15:53:26 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { CategoryFilterSort } from "../search/CategoryFilterSort";
import { Autocomplete, Pagination, PaginationItem } from "@material-ui/lab";
import {
	Drawer,
	IconButton,
	makeStyles,
	TextField,
	Grid,
	Slider,
	CircularProgress,
} from "@material-ui/core";
import { ProfileCard } from "../../component/ProfileCard";
import { KeyboardArrowRight } from "@material-ui/icons";
import { ToggleGroup } from "../../component/ToggleGroup";
import {
	getAllProfilesAPI,
	getRecommendationAPI,
	getMatchesAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import {
	actionProfilesList_getRecco,
	actionProfilesList_getSearch,
} from "../../store/profilesLists/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { getAge, isProfileComplete } from "../../services/profileUtils";
import { MaterialDoubleSlider } from "../../component/MaterialDoubleSlider";
import { IextendedProfile } from "../../types/types";

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
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	toggleGroup: {
		backgroundColor: "blue",
	},
	cards: {
		display: "flex",
		backgroundColor: "pink",
		height: "85vh",
		overflow: "scroll",
		overflowX: "hidden",
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "80%",
		},
		justifyContent: "center",
		alignItems: "center",
	},
	loading: {
		alignSelf: "center",
		justifySelf: "center",
	},
	paginator: {
		justifyContent: "center",
		alignItems: "center",
	},
}));

interface Ilimits {
	minAge: number;
	maxAge: number;
	minPopularity: number;
	maxPopularity: number;
	maxDistance: number;
}

const initialValuesLimits = {
	minAge: 18,
	maxAge: 100,
	minPopularity: 0,
	maxPopularity: 100,
	maxDistance: 100,
};

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profilesRecco: state.profilesList.recommendations as any[],
	profilesSearch: state.profilesList.search as IextendedProfile[],
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList
	),
}));

type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const MainPageComponent = (props: Props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [filterLimits, setFilterLimits] = useState<Ilimits>(
		initialValuesLimits
	);
	const [filterValues, setFilterValues] = React.useState<Ilimits>(
		initialValuesLimits
	);
	const [currentProfilesList, setCurrentProfilesList] = useState<null | any[]>(
		null
	);
	const [filteredProfilesList, setFilteredProfilesList] = useState<
		null | any[]
	>(null);
	const [loading, setLoading] = useState(false);
	const [toggleList, setToggleList] = useState<string | null>(null);
	const [pageIndex, setPageIndex] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const ITEMS_PER_PAGES = 20;

	const getRecommendationList = () => {
		getRecommendationAPI(props.loggedIn)
			.then((json: any[]) => {
				if (json && json.length) {
					const withAge = json.map((entry) => {
						entry.profile.profile.age = getAge(entry.profile.profile.dob);
						return entry;
					});
					props.dispatch(actionProfilesList_getRecco({ profiles: withAge }));
				}
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

	const getSearchList = () => {
		getAllProfilesAPI(props.loggedIn)
			.then((json: IextendedProfile[]) => {
				if (json && json.length) {
					const withAge = json.map((profile) => {
						profile.age = profile.dob ? getAge(profile.dob) : null;
						return profile;
					});
					props.dispatch(actionProfilesList_getSearch({ profiles: withAge }));
				}
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

	const getMatchesList = () => {
		getMatchesAPI(props.loggedIn)
			.then((json: any[]) => {
				if (json && json.length) {
					// const withAge = json.map((profile) => {
					// 	profile.age = profile.dob ? getAge(profile.dob) : null;
					// 	return profile;
					// });
					// props.dispatch(actionProfilesList_getSearch({ profiles: withAge }));
				}
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
			setLoading(true);
			props.isProfileComplete && getRecommendationList();
			getSearchList();
			getMatchesList();
		}
	}, []);

	useEffect(() => {
		if (toggleList === "Search") {
			setCurrentProfilesList(props.profilesSearch);
		} else if (toggleList === "Preselection") {
			setCurrentProfilesList(props.profilesRecco);
		} else if (toggleList === "Matches") {
			setCurrentProfilesList(props.profilesRecco);
		}
	}, [toggleList]);

	useEffect(() => {
		if (currentProfilesList) {
			computeFilterLimits(currentProfilesList);
			setFilteredProfilesList(currentProfilesList);
		}
	}, [currentProfilesList]);

	useEffect(() => {
		if (filteredProfilesList) {
			loading && setLoading(false);
			setTotalPages(Math.ceil(filteredProfilesList.length / ITEMS_PER_PAGES));
		}
	}, [filteredProfilesList]);

	const computeFilterLimits = (profilesArray: any[]) => {
		if (profilesArray.length) {
			const limitsArr = profilesArray.reduce((acc, profile) => {
				const { age, popularityScore } = profile;
				if (age) {
					acc[0] = !acc[0] || acc[0] > age ? age : acc[0];
					acc[1] = !acc[1] || acc[1] < age ? age : acc[1];
				}
				if (popularityScore) {
					acc[2] =
						!acc[2] || acc[2] > popularityScore ? popularityScore : acc[2];
					acc[3] =
						!acc[3] || acc[3] < popularityScore ? popularityScore : acc[3];
				}
				//TODO: distance
				// acc[4] = 0;
				return acc;
			});
			const newLimits = {
				...filterLimits,
				minAge: limitsArr[0],
				maxAge: limitsArr[1],
				minPopularity: limitsArr[2],
				maxPopularity: limitsArr[3],
				// maxDistance: limitsArr[4],
			};
			setFilterLimits(newLimits);
			setFilterValues(newLimits);
		}
	};

	const filterList = () => {
		if (currentProfilesList && filterValues) {
			const tmp = currentProfilesList.filter((profile) => {
				const { age, popularityScore } = profile;
				return (
					age &&
					age >= filterValues.minAge &&
					age <= filterValues.maxAge &&
					popularityScore >= filterValues.minPopularity &&
					popularityScore <= filterValues.maxPopularity
				);
			});
			setFilteredProfilesList(tmp);
		}
	};

	const handleAgeFilter = (event: any, newAgeValues: number | number[]) => {
		const ageValues = newAgeValues as number[];
		setFilterValues({
			...filterValues,
			minAge: ageValues[0],
			maxAge: ageValues[1],
		});
	};

	const handlePopularityFilter = (
		event: any,
		newPopularityValues: number | number[]
	) => {
		const popularityValues = newPopularityValues as number[];
		setFilterValues({
			...filterValues,
			minPopularity: popularityValues[0],
			maxPopularity: popularityValues[1],
		});
	};

	const handleDistanceFilter = (
		event: any,
		newDistanceValue: number | number[]
	) => {
		const distanceValue = newDistanceValue as number;
		setFilterValues({
			...filterValues,
			maxDistance: distanceValue,
		});
	};

	const handleOpenDrawer = () => {
		setOpen(true);
	};

	const handleCloseDrawer = () => {
		setOpen(false);
		filterList();
	};

	const getCards = () => {
		if (filteredProfilesList) {
			return filteredProfilesList
				.slice(pageIndex * ITEMS_PER_PAGES, (pageIndex + 1) * ITEMS_PER_PAGES)
				.map((profile: IextendedProfile, index: number) => (
					<Grid item xs={12} sm={6} lg={4} key={index}>
						<ProfileCard profile={profile} />
					</Grid>
				));
		}
		return null;
	};

	const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
		setPageIndex(page - 1);
	};

	return (
		<React.Fragment>
			<div className={classes.main}>
				<div className={classes.toggleGroup}>
					<ToggleGroup value={toggleList} setValue={setToggleList} />
				</div>
				{loading ? (
					<CircularProgress
						size={80}
						color="primary"
						className={classes.loading}
					/>
				) : (
					<React.Fragment>
						<IconButton onClick={handleOpenDrawer}>
							<KeyboardArrowRight />
						</IconButton>
						<Grid
							container
							className={classes.cards}
							spacing={5}
							justify="center"
						>
							{getCards()}
							<Grid item xs={12}>
								<Pagination
									count={totalPages}
									showFirstButton
									showLastButton
									className={classes.paginator}
									onChange={changePage}
								/>
							</Grid>
						</Grid>
					</React.Fragment>
				)}
			</div>
			<Drawer
				anchor="left"
				open={open}
				onClose={handleCloseDrawer}
				className={classes.drawer}
			>
				<div className={classes.drawerContent}>
					{filterLimits.minAge !== filterLimits.maxAge && (
						<CategoryFilterSort label="Age">
							<MaterialDoubleSlider
								min={filterLimits.minAge}
								max={filterLimits.maxAge}
								value={[filterValues.minAge, filterValues.maxAge]}
								handleChange={handleAgeFilter}
							/>
						</CategoryFilterSort>
					)}
					{filterLimits.minPopularity !== filterLimits.maxPopularity && (
						<CategoryFilterSort label="Popularity">
							<MaterialDoubleSlider
								min={filterLimits.minPopularity}
								max={filterLimits.maxPopularity}
								value={[filterValues.minPopularity, filterValues.maxPopularity]}
								handleChange={handlePopularityFilter}
							/>
						</CategoryFilterSort>
					)}
					<CategoryFilterSort label="Location">
						<Slider
							min={0}
							max={filterLimits.maxDistance}
							value={filterValues.maxDistance}
							onChange={handleDistanceFilter}
							valueLabelDisplay="auto"
							aria-labelledby="range-slider"
						/>
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
