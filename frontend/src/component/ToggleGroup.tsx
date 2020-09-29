import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export function ToggleGroup() {
	const [view, setView] = useState("Matches");

	function handleChange(e: React.MouseEvent<HTMLElement>, nextView: string) {
        if (nextView !== null) {
            setView(nextView);
        }
	}

	return (
		<ToggleButtonGroup
			orientation="vertical"
			value={view}
			onChange={handleChange}
			exclusive
			style={{backgroundColor: "blue"}}
		>
			<ToggleButton value="Matches">Matches</ToggleButton>
			<ToggleButton value="Preselection">Preselection</ToggleButton>
			<ToggleButton value="Search">Search</ToggleButton>
		</ToggleButtonGroup>
	);
}
