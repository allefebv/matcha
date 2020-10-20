/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 14:35:04 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { SliderDouble } from "../../component/SliderDouble";
import { CategoryFilterSort } from "../search/CategoryFilterSort";
import { Autocomplete } from "@material-ui/lab";
import {
	Drawer,
	Grid,
	IconButton,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { ProfileCard } from "../../component/ProfileCard";
import { KeyboardArrowRight } from "@material-ui/icons";

interface Props {}

const useStyles = makeStyles({
	drawer: {
		width: "10vw",
	},
	scrollable: {
		backgroundColor: "indigo",
		overflow: "scroll",
		overflowX: "hidden",
		maxHeight: "90%",
		alignSelf: "flex-end",
	},
});

export const MainPage = (props: Props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpenDrawer = () => {
		setOpen(true);
	};

	const handleCloseDrawer = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<IconButton onClick={handleOpenDrawer}>
				<KeyboardArrowRight />
			</IconButton>
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
			<Grid
				item
				container
				xs={10}
				justify="center"
				alignItems="flex-end"
				spacing={2}
				className={classes.scrollable}
			>
				<Grid
					container
					item
					justify="center"
					alignContent="center"
					spacing={3}
					xs={10}
				>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard />
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};
