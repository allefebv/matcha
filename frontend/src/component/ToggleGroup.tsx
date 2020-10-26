/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ToggleGroup.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 18:11:34 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/23 19:49:52 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect, ConnectedProps } from "react-redux";
import { isProfileComplete } from "../services/profileUtils";
import { ExtendedProfileDialog } from "../domain/profile/ExtendedProfileDialog";
import { makeStyles } from "@material-ui/core";

const withReduxProps = connect((state: any) => ({
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	value: string | null;
	setValue: React.Dispatch<React.SetStateAction<string | null>>;
} & ReduxProps;

const useStyles = makeStyles({
	button: (isProfileComplete) => {
		return {
			color: isProfileComplete ? "default" : "red",
		};
	},
	toggleGroup: {
		display: "flex",
		justifySelf: "center",
	},
});

function ToggleGroupComponent(props: Props) {
	const classes = useStyles(props.isProfileComplete);
	const [open, setOpen] = useState(false);

	function handleChangeToggle(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			if (nextView === "Preselection" && !props.isProfileComplete) {
				setOpen(true);
				return;
			}
			props.setValue(nextView);
		}
	}

	return (
		<React.Fragment>
			<ExtendedProfileDialog open={open} setOpen={setOpen} />
			<ToggleButtonGroup
				orientation="horizontal"
				value={props.value}
				onChange={handleChangeToggle}
				exclusive
				className={classes.toggleGroup}
			>
				<ToggleButton value="Matches">Matches</ToggleButton>
				<ToggleButton value="Preselection" className={classes.button}>
					Preselection
				</ToggleButton>
				<ToggleButton value="Search">Search</ToggleButton>
			</ToggleButtonGroup>
		</React.Fragment>
	);
}

export const ToggleGroup = withReduxProps(ToggleGroupComponent);
