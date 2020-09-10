import React from "react";
import { Button } from "./Button"

const styleModal: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "top",
    flexDirection: "column",
	alignItems: "center",
    backgroundColor: "wheat",
};

interface Props {
	children: React.ReactNode;
}

export const Modal = (props: Props) => {
	return (
		<div style={styleModal}>
			<Button theme="close" modifier="end">X</Button>
			{props.children}
		</div>
	);
};
