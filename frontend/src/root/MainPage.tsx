/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 16:24:56 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { SliderDouble } from "../component/SliderDouble";
import { CategoryFilterSort } from "../component/CategoryFilterSort";
import { Autocomplete } from "@material-ui/lab";
import { Grid, TextField } from "@material-ui/core";
import { ProfileCard } from "../component/ProfileCard";
import { ToggleGroup } from "../component/ToggleGroup";

interface Props {}

export const MainPage = (props: Props) => {
	return (
		<React.Fragment>
			<Grid item style={{ alignSelf: "center" }}>
				<ToggleGroup />
			</Grid>
			<Grid
				item
				container
				xs={10}
				justify="center"
				style={{ height: "100%" }}
				spacing={2}
			>
				<Grid item container xs={8}>
					<Grid item xs={3}>
						<CategoryFilterSort label="Age">
							<SliderDouble min={18} max={100} step={1} />
						</CategoryFilterSort>
					</Grid>
					<Grid item xs={3}>
						<CategoryFilterSort label="Location">
							<SliderDouble min={0} max={20000} step={1} />
						</CategoryFilterSort>
					</Grid>
					<Grid item xs={3}>
						<CategoryFilterSort label="Popularity">
							<SliderDouble min={0} max={40000} step={1} />
						</CategoryFilterSort>
					</Grid>
					<Grid item xs={3}>
						<CategoryFilterSort label="Tags">
							<Autocomplete
								multiple
								options={["John", "Lennon", "Toto"]}
								getOptionLabel={(option) => option}
								filterSelectedOptions
								renderInput={(params) => <TextField {...params} />}
							/>
						</CategoryFilterSort>
					</Grid>
				</Grid>
				<Grid
					container
					item
					justify="center"
					alignContent="center"
					spacing={3}
					xs={10}
					style={{
						backgroundColor: "indigo",
						overflow: "scroll",
						maxHeight: "80%"
					}}
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
