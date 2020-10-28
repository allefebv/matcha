/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/27 19:11:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { CategoryFilterSort } from "../search/CategoryFilterSort";
import { Autocomplete, Pagination } from "@material-ui/lab";
import {
	Drawer,
	IconButton,
	makeStyles,
	TextField,
	Grid,
	Slider,
	CircularProgress,
	Typography,
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
	actionProfilesList_getMatches,
	actionProfilesList_getRecco,
	actionProfilesList_getSearch,
} from "../../store/profilesLists/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { getAge, isProfileComplete } from "../../services/profileUtils";
import { MaterialDoubleSlider } from "../../component/MaterialDoubleSlider";
import { IlistProfiles } from "../../types/types";
import { TagSearch } from "../../component/TagSearch";

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
	profilesRecco: state.profilesList.recommendations as IlistProfiles[],
	profilesSearch: state.profilesList.search as IlistProfiles[],
	profilesMatches: state.profilesList.matches as IlistProfiles[],
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
	const [currentProfilesList, setCurrentProfilesList] = useState<
		null | IlistProfiles[]
	>(null);
	const [filteredProfilesList, setFilteredProfilesList] = useState<
		null | IlistProfiles[]
	>(null);
	const [loading, setLoading] = useState(false);
	const [toggleList, setToggleList] = useState<string | null>(null);
	const [pageIndex, setPageIndex] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [tagList, setTagList] = useState<string[]>();
	const ITEMS_PER_PAGES = 20;

	const getRecommendationList = () => {
		getRecommendationAPI(props.loggedIn)
			.then((json) => {
				if (json && json.length) {
					const withAge = json.map((entry) => {
						if (entry.profile.dob) {
							entry.profile.age = entry.profile.dob
								? getAge(entry.profile.dob)
								: null;
						}
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
			.then((json) => {
				if (json && json.length) {
					const withAge = json.map((entry) => {
						entry.profile.age = entry.profile.dob
							? getAge(entry.profile.dob)
							: null;
						return entry;
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
			.then((json) => {
				if (json && json.length) {
					const withAge = json.map((entry) => {
						entry.profile.age = entry.profile.dob
							? getAge(entry.profile.dob)
							: null;
						return entry;
					});
					props.dispatch(actionProfilesList_getMatches({ profiles: withAge }));
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
		if (props.isProfileComplete && props.profilesRecco) {
			setToggleList("Preselection");
		} else if (!props.isProfileComplete && props.profilesSearch) {
			setToggleList("Search");
		}
	}, [props.profilesRecco, props.profilesSearch]);

	useEffect(() => {
		if (toggleList === "Search") {
			setCurrentProfilesList(props.profilesSearch);
		} else if (toggleList === "Preselection") {
			setCurrentProfilesList(props.profilesRecco);
		} else if (toggleList === "Matches") {
			setCurrentProfilesList(props.profilesMatches);
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

	const computeFilterLimits = (profilesArray: IlistProfiles[]) => {
		if (profilesArray.length) {
			const limitsArr = profilesArray.reduce<number[]>(
				(acc: number[], entry) => {
					const { age, popularityScore } = entry.profile;
					const { distance } = entry.location;
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
					if (distance) {
						acc[4] = !acc[4] || acc[4] < distance ? distance : acc[4];
					}
					return acc;
				},
				[]
			);
			const newLimits = {
				...filterLimits,
				minAge: limitsArr[0],
				maxAge: limitsArr[1],
				minPopularity: limitsArr[2],
				maxPopularity: limitsArr[3],
				maxDistance: limitsArr[4],
			};
			console.log(newLimits);
			setFilterLimits(newLimits);
			setFilterValues(newLimits);
		}
	};

	const filterList = () => {
		if (currentProfilesList && filterValues) {
			console.log(filterValues);
			const tmp = currentProfilesList.filter((entry) => {
				const { age, popularityScore } = entry.profile;
				const distance = entry.location ? entry.location.distance : undefined;
				const distanceFilter = distance
					? distance <= filterValues.maxDistance
					: true;
				return (
					age &&
					age >= filterValues.minAge &&
					age <= filterValues.maxAge &&
					popularityScore >= filterValues.minPopularity &&
					popularityScore <= filterValues.maxPopularity &&
					distanceFilter
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
				.map((entry: IlistProfiles, index: number) => (
					<Grid item xs={12} sm={6} lg={4} key={index}>
						<ProfileCard entry={entry} />
					</Grid>
				));
		}
		return null;
	};

	const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
		setPageIndex(page - 1);
	};

	function handleChangeTags(
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) {
		let tags = typeof value === "string" ? [value] : value;
		console.log(tags);
		setTagList(tags);
	}

	const renderList = () => {
		return (
			<React.Fragment>
				<IconButton onClick={handleOpenDrawer}>
					<KeyboardArrowRight />
				</IconButton>
				<Grid container className={classes.cards} spacing={5} justify="center">
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
		);
	};

	const renderNoMatches = () => {
		return (
			<Typography>Oh snap, you don't have any matches at the moment</Typography>
		);
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
				) : toggleList === "Matches" && !currentProfilesList ? (
					renderNoMatches()
				) : (
					renderList()
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
					{filterLimits.maxDistance && (
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
					)}
					<CategoryFilterSort label="Tags">
						<TagSearch
							handleChangeTags={handleChangeTags}
							tagList={tagList || []}
						/>
					</CategoryFilterSort>
				</div>
			</Drawer>
		</React.Fragment>
	);
};

export const MainPage = withReduxProps(MainPageComponent);
