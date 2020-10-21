import React, { useEffect, useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect, ConnectedProps } from "react-redux";
import { isProfileComplete } from "../services/profileUtils";
import { ExtendedProfileDialog } from "../domain/profile/ExtendedProfileDialog";
import * as constants from "../services/constants";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const withReduxProps = connect((state: any) => ({
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

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
	const [view, setView] = useState<string | null>(null);
	const classes = useStyles(props.isProfileComplete);
	const [open, setOpen] = useState(false);
	const [redirect, setRedirect] = useState<string | null>(null);

	function handleChange(e: React.MouseEvent<HTMLElement>, nextView: string) {
		if (nextView !== null) {
			if (nextView === "Preselection" && !props.isProfileComplete) {
				setOpen(true);
				return;
			}
			setView(nextView);
		}
	}

	return (
		<React.Fragment>
			<ExtendedProfileDialog open={open} setOpen={setOpen} />
			<ToggleButtonGroup
				orientation="horizontal"
				value={view}
				onChange={handleChange}
				exclusive
				className={classes.toggleGroup}
			>
				<ToggleButton value="Matches">Matches</ToggleButton>
				<ToggleButton value="Preselection" className={classes.button}>
					Preselection
				</ToggleButton>
				<ToggleButton value={constants.SEARCH_ROUTE}>Search</ToggleButton>
			</ToggleButtonGroup>
		</React.Fragment>
	);
}

export const ToggleGroup = withReduxProps(ToggleGroupComponent);
