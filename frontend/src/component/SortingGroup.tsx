/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SortingGroup.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 18:11:34 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/28 19:39:46 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles } from "@material-ui/core";

type Props = {
	sortAsc: boolean;
	sortMethod: string;
	setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
	setSortMethod: React.Dispatch<React.SetStateAction<string>>;
};
const useStyles = makeStyles({
	group: {
		display: "flex",
		justifyContent: "center",
	},
});

export function SortingGroup(props: Props) {
	const classes = useStyles();

	function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (event.currentTarget.value !== props.sortMethod) {
			props.setSortMethod(event.currentTarget.value);
			props.setSortAsc(true);
		} else {
			props.setSortAsc(!props.sortAsc);
		}
	}

	return (
		<div className={classes.group}>
			<ToggleButton
				selected={props.sortMethod === "Age"}
				value="Age"
				onClick={handleClick}
			>
				Age
			</ToggleButton>
			<ToggleButton
				value="Distance"
				onClick={handleClick}
				selected={props.sortMethod === "Distance"}
			>
				Distance
			</ToggleButton>
			<ToggleButton
				value="Popularity"
				onClick={handleClick}
				selected={props.sortMethod === "Popularity"}
			>
				Popularity
			</ToggleButton>
			<ToggleButton
				value="Shared Interests"
				onClick={handleClick}
				selected={props.sortMethod === "Shared Interests"}
			>
				Shared Interests
			</ToggleButton>
		</div>
	);
}
