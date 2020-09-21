import React from "react";
import { Button } from "../component/Button";
import { SliderDouble } from "../component/SliderDouble";
import { CategoryFilterSort } from "../component/CategoryFilterSort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Header } from "./Header";
import { Footer } from "./Footer";

const styleMainPage: React.CSSProperties = {
	display: "flex",
	flexGrow: 1,
	backgroundColor: "grey",
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

const stylePlaceHolderCards: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	backgroundColor: "indianred",
	flexGrow: 1,
};

const stylePlaceHolderComboFilterSort: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "ivory",
	justifyContent: "center",
	alignItems: "center",
	border: "1vw",
};

interface Props {}

export const MainPage = (props: Props) => {
	return (
		<React.Fragment>
			<Header />
			<div style={styleMainPage}>
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
					<div style={stylePlaceHolderCards}></div>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};
