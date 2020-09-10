import React, { MouseEvent, FormEvent } from "react";
import { Form } from "./Form";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

interface Props {}

export const SigninForm = (props: Props) => {
	return (
		<React.Fragment>
			<FormInput placeholder="email" />
			<FormInput placeholder="password" type="password" />
			<Button theme="primary" type="submit">Sign in</Button>
			<Button theme="primary">Forgot Password ?</Button>
		</React.Fragment>
	);
};
