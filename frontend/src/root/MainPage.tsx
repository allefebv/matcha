import React from "react";
import { Button } from "../component/Button";
import { SliderSimple } from "../component/SliderSimple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { SliderDouble } from "../component/SliderDouble";

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
	// alignItems: "center",
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
		<div style={styleMainPage}>
			<div style={stylePlaceHolderCategories}>
				<Button theme="primary">Matches</Button>
				<Button theme="primary">Selection</Button>
				<Button theme="primary">Search</Button>
			</div>
			<div style={stylePlaceHolderMain}>
				<div style={stylePlaceHolderFiltersSorts}>
					<div style={stylePlaceHolderComboFilterSort}>
					<Button theme="primary">Age Filter</Button>
						<Button theme="primary">
							Age
							<FontAwesomeIcon icon={faChevronUp} />
							<FontAwesomeIcon icon={faChevronDown} />
						</Button>
					</div>
					<div style={stylePlaceHolderComboFilterSort}>
						<SliderSimple min={0} max={20000} step={1} />
						<Button theme="primary">
							Location
							<FontAwesomeIcon icon={faChevronUp} />
							<FontAwesomeIcon icon={faChevronDown} />
						</Button>
					</div>
					<div style={stylePlaceHolderComboFilterSort}>
						<SliderSimple min={0} max={20000} step={1} />
						<Button theme="primary">
							Popularity
							<FontAwesomeIcon icon={faChevronUp} />
							<FontAwesomeIcon icon={faChevronDown} />
						</Button>
					</div>
					<div style={stylePlaceHolderComboFilterSort}>
						<SliderDouble min={0} max={20000} step={1} />
						<Button theme="primary">
							Tag
							<FontAwesomeIcon icon={faChevronUp} />
							<FontAwesomeIcon icon={faChevronDown} />
						</Button>
					</div>
				</div>
				<div style={stylePlaceHolderCards}></div>
			</div>
		</div>
	);
};
