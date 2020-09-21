import React from "react";
import { Button } from "./Button";

const styleForm: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

interface Props {
	children: React.ReactNode;
	title: string;
	submitValue?: string;
	optionalButton?: boolean;
	optionalButtonTheme?: string;
	optionalButtonValue?: string;
	optionalButtonType?: "submit";
}

export const Form = (props: Props) => {
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	};

	return (
		<React.Fragment>
			<h2>{props.title}</h2>
			<form style={styleForm} onSubmit={handleSubmit}>
				{props.children}
			</form>
		</React.Fragment>
	);
};
