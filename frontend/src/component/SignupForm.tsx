import React from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button"

interface Props {}

export const SignupForm = (props: Props) => {
	return (
		<React.Fragment>
			<FormInput placeholder="email" />
			<FormInput placeholder="password" type="password" />
			<FormInput placeholder="confirm password" type="password" />
			<Button theme="primary" type="submit">Sign Up</Button>
		</React.Fragment>
	);
};
