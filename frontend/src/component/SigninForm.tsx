import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_login } from "../store/user/action";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { fetchApi } from "../services/fetchApi";
import * as fetchConstants from "../services/fetchConstants";
import { Redirect } from "react-router-dom";
import { render } from "@testing-library/react";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.login.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

class SigninFormComponent extends React.Component<Props> {
	handleSignIn = () => {
		let details = {
			email: "jeremy0@fleury.blue",
			password: "@Matcha1234",
		};

		fetchApi<{ user: Object; token: string }>(
			fetchConstants.URL + fetchConstants.URI_SIGNIN,
			fetchConstants.POST_METHOD,
			details
		).then(({ user, token }) => {
			this.props.dispatch(actionUser_login(token));
		});
	};

	render = () => {
		return (
			<React.Fragment>
				<FormInput placeholder="email" />
				<FormInput placeholder="password" type="password" />
				<Button
					theme="primary"
					type="submit"
					onClick={this.handleSignIn}
				>
					Sign in
				</Button>
				<Button theme="primary">Forgot Password ?</Button>
				{this.props.loggedIn && <Redirect push to="/search" />}
			</React.Fragment>
		);
	};
}

export const SigninForm = withReduxProps(SigninFormComponent);
