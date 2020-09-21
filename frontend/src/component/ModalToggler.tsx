import React from "react";
import { Modal } from "./Modal";

const styleShade: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "rgba(0, 0, 0, 0.4)",
	position: "absolute",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
};

interface Props {
	children: React.ReactNode;
	isModalActive: boolean;
	modalClose: (type: void) => void;
}

export const ModalToggler = (props: Props) => {
	return (
		<React.Fragment>
			{props.isModalActive && (
				<div style={styleShade} onClick={() => props.modalClose()}>
					<Modal modalClose={props.modalClose}>{props.children}</Modal>
				</div>
			)}
		</React.Fragment>
	);
};
