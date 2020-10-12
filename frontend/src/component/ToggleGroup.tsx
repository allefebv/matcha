import React, { useEffect, useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect, ConnectedProps } from "react-redux";
import { isProfileComplete } from "../services/utils";
import { makeStyles } from "@material-ui/core";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles({
	button: {
		color: "red",
	},
});

function ToggleGroupComponent(props: Props) {
	const [view, setView] = useState("Matches");
	const [style, setStyle] = useState("");
	const classes = useStyles();

	function handleChange(e: React.MouseEvent<HTMLElement>, nextView: string) {
		if (nextView !== null) {
			setView(nextView);
		}
	}

	useEffect(() => {
		if (!isProfileComplete(props.profile)) {
			setStyle("secondary");
		}
	}, [props.profile]);

	return (
		<ToggleButtonGroup
			orientation="vertical"
			value={view}
			onChange={handleChange}
			exclusive
		>
			<ToggleButton value="Matches">Matches</ToggleButton>
			<ToggleButton value="Preselection" color={style}>
				Preselection
			</ToggleButton>
			<ToggleButton value="Search">Search</ToggleButton>
		</ToggleButtonGroup>
	);
}

export const ToggleGroup = withReduxProps(ToggleGroupComponent);
