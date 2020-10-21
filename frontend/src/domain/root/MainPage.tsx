/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/26 15:33:04 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { SliderDouble } from "../../component/SliderDouble";
import { CategoryFilterSort } from "../search/CategoryFilterSort";
import { Autocomplete } from "@material-ui/lab";
import {
	Drawer,
	IconButton,
	makeStyles,
	TextField,
	useTheme,
} from "@material-ui/core";
import { ProfileCard } from "../../component/ProfileCard";
import { KeyboardArrowRight } from "@material-ui/icons";
import { ToggleGroup } from "../../component/ToggleGroup";
import { getRecommendationAPI } from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionProfilesList_getRecco } from "../../store/profilesLists/action";

const useStyles = makeStyles({
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
		height: "81.5vh",
		width: "60vw",
		flexWrap: "wrap",
		backgroundColor: "pink",
		justifyContent: "center",
		overflowY: "scroll",
		overflowX: "hidden",
	},
});

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profilesRecco: state.profilesList.recommendations,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const MainPageComponent = (props: Props) => {
	const theme = useTheme();
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpenDrawer = () => {
		setOpen(true);
	};

	const handleCloseDrawer = () => {
		setOpen(false);
	};

	const getRecommendationList = () => {
		getRecommendationAPI(props.loggedIn).then((json: any[]) => {
			props.dispatch(actionProfilesList_getRecco({ profiles: json }));
		});
	};

	useEffect(() => {
		getRecommendationList();
	}, []);

	const getCards = () => {
		return props.profilesRecco.map(
			(profile: { profile: any; score: number }) => (
				<ProfileCard profile={profile} />
			)
		);
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
				<div className={classes.cards}>{getCards()}</div>
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
