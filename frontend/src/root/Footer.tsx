import React from "react";

const styleFooter: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100vw",
	height: "6vh",
	alignSelf: "flex-end",
	color: "white",
	zIndex: 2,
};

interface Props {}

export class Footer extends React.Component<Props> {
	render() {
		return <div style={styleFooter}>made by jfleury and allefebv</div>;
	}
}
