/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 11:55:30 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { Button } from "../component/Button";
import { SliderDouble } from "../component/SliderDouble";
import { CategoryFilterSort } from "../component/CategoryFilterSort";
import { Autocomplete } from "@material-ui/lab";
import { Grid, TextField } from "@material-ui/core";
import { ProfileCard } from "../component/ProfileCard";

const styleMain: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	backgroundColor: "black",
	width: "100%",
	height: "100%"
};

const stylePlaceHolderCategories: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "greenyellow",
	justifyContent: "center",
};

const stylePlaceHolderMain: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "honeydew",
	flexGrow: 1,
};

const stylePlaceHolderFiltersSorts: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	backgroundColor: "hotpink",
	justifyContent: "center",
	alignItems: "center",
};

const stylePlaceHolderCardsGrid: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	backgroundColor: "grey",
	justifyContent: "center",
	alignItems: "center",
	flex: 1,
};

interface Props {}

export const MainPage = (props: Props) => {
	return (
		<React.Fragment>
			<div style={styleMain}>
				<div style={stylePlaceHolderCategories}>
					<Button theme="primary">Matches</Button>
					<Button theme="primary">Selection</Button>
					<Button theme="primary">Search</Button>
				</div>
				<div style={stylePlaceHolderMain}>
					<div style={stylePlaceHolderFiltersSorts}>
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
								options={["John", "Lennon", "Bitch"]}
								getOptionLabel={(option) => option}
								filterSelectedOptions
								renderInput={(params) => <TextField {...params} />}
							/>
						</CategoryFilterSort>
					</div>
					<div style={stylePlaceHolderCardsGrid}>
						<Grid container>
							<Grid item xs={1}></Grid>
							<Grid
								container
								item
								alignContent="center"
								alignItems="center"
								justify="center"
								spacing={3}
								xs={10}
							>
								<Grid item xs={4}>
									<ProfileCard />
								</Grid>
								<Grid item xs={4}>
									<ProfileCard />
								</Grid>
								<Grid item xs={4}>
									<ProfileCard />
								</Grid>
							</Grid>
							<Grid item xs={1}></Grid>
						</Grid>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
