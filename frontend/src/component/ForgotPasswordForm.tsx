import React from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

interface Props {
}

export const ForgotPasswordForm = (props: Props) => {
	return (
		<React.Fragment>
			<FormInput placeholder="email" />
			<Button theme="primary" type="submit">Reset Password</Button>
		</React.Fragment>
	);
};