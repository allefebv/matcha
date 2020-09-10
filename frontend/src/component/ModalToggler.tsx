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
}

// hold states for modal toggle
export const ModalToggler = (props: Props) => {
	return <div style={styleShade}>{true && <Modal>{props.children}</Modal>}</div>;
};
