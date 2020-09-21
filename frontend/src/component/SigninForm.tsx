import React, { MouseEvent, FormEvent } from "react";
import { Form } from "./Form";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

interface Props {}

export const SigninForm = (props: Props) => {
	function handleSignIn() {
		fetch("http://localhost:3001/user/loginUser", {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
				email: "jeremy0@fleury.blue",
				password: "@Matcha1234",
			}),
		})
		.then()
		.catch()
	}

	return (
		<React.Fragment>
			<FormInput placeholder="email" />
			<FormInput placeholder="password" type="password" />
			<Button theme="primary" type="submit" onClick={handleSignIn}>
				Sign in
			</Button>
			<Button theme="primary">Forgot Password ?</Button>
		</React.Fragment>
	);
};
