import React, { MouseEvent, FormEvent } from "react";
import { Form } from "./Form";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

interface Props {}

export const SigninForm = (props: Props) => {
	function handleSignIn() {
		let details = [
			["email", "jeremy0@fleury.blue"],
			["password", "@Matcha1234"],
		];
	
		let formBody: any = [];
		details.map(function (value) {
			console.log("doing")
			formBody.push(
				encodeURIComponent(value[0]) + "=" + encodeURIComponent(value[1])
			);
		});
		console.log("ended")
		formBody = formBody.join("&");

		fetch("http://localhost:3001/user/loginUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: formBody,
		})
			.then()
			.catch();

		
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
