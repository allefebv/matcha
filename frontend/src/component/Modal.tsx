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
	modalClose: (type: void) => void
}

export const Modal = (props: Props) => {
	function handleFormClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	    e.stopPropagation();
	}

	return (
		<div style={styleModal} onClick={handleFormClick}>
			<Button theme="close" modifier="end" onClick={() => props.modalClose()}>X</Button>
			{props.children}
		</div>
	);
};
