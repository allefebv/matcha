import React, { useEffect, useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect, ConnectedProps } from "react-redux";
import { isProfileComplete } from "../services/utils";
import { ExtendedProfileDialog } from "../domain/profile/ExtendedProfileDialog";
import { makeStyles } from "@material-ui/core";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
} & ReduxProps;

const useStyles = makeStyles({
	button: (profile) => {
		return {
			color: isProfileComplete(profile) ? "inherit" : "red",
		};
	},
});

function ToggleGroupComponent(props: Props) {
	const [view, setView] = useState("Matches");
	const classes = useStyles(props.profile);
	const [open, setOpen] = useState(false);

	function handleChange(e: React.MouseEvent<HTMLElement>, nextView: string) {
		if (nextView !== null) {
			if (
				nextView === "Preselection" &&
				!isProfileComplete(props.profile)
			) {
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
				orientation="vertical"
				value={view}
				onChange={handleChange}
				exclusive
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
