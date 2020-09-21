import React, { MouseEvent, FormEvent } from "react";

const styleButtonPrimary: React.CSSProperties = {
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "black",
	color: "white",
	outline: "none",
	border: "none",
	borderRadius: "40px",
	width: "8vw",
	height: "4vh",
};

const styleButtonBig: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	width: "80vw",
	height: "7vh",
	alignItems: "center",
	backgroundColor: "black",
	borderRadius: "40px",
	border: "none",
	outline: "none",
	color: "white",
};

let bg = require("../images/logo_white.png");
const styleButtonLogo: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	width: "140px",
	height: "100px",
	alignItems: "center",
	backgroundImage: `url(${bg})`,
	backgroundColor: "transparent",
	backgroundRepeat: "no-repeat",
	backgroundSize: "100%",
	border: "none",
	outline: "none",
};

const styleButtonClose: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	width: "30px",
	height: "30px",
	alignItems: "center",
	backgroundColor: "black",
	outline: "none",
	border: "none",
	borderRadius: "40px",
	color: "white",
};

const modifierEnd: React.CSSProperties = {
	alignSelf: "flex-end",
};

const styleButtonCircle: React.CSSProperties = {
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "black",
	color: "white",
	outline: "none",
	border: "none",
	borderRadius: "50%",
	width: "5vh",
	height: "5vh",
}

interface Props {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	children?: React.ReactNode;
	theme: string;
	modifier?: string;
	type?: "submit";
}

export const Button = (props: Props) => {
	return (
		<button
			style={Object.assign(
				{},
				props.modifier === "end" && modifierEnd,
				props.theme === "logo" && styleButtonLogo,
				props.theme === "big" && styleButtonBig,
				props.theme === "primary" && styleButtonPrimary,
				props.theme === "circle" && styleButtonCircle,
				props.theme === "close" && styleButtonClose
			)}
			onClick={props.onClick}
			type={props.type}
		>
			{props.children}
		</button>
	);
};
