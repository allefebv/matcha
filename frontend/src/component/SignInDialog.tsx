/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SignInDialog.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:07 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 16:24:11 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";

import { connect, ConnectedProps } from "react-redux";
import { actionUser_signin } from "../store/user/action";

import { useHistory } from "react-router-dom";

import { user } from "../types/types"

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function SignInDialogComponent(props: Props) {
	const [open, setOpen] = React.useState(false);
	let [email, setEmail] = React.useState<string | null>("");
	let [emailError, setEmailError] = React.useState(false);
	const [password, setPassword] = React.useState<string | null>("");
	let [passwordError, setPasswordError] = React.useState(false);

	const history = useHistory();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPassword(null);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		(isEmailValid(e.currentTarget.value) && setEmailError(false))
	}

	function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
		email !== "" && setEmailError(!isEmailValid(email))
	}

	function isEmailValid(email: string | null) {
		return (typeof email === "string" && email.match(constants.REGEX_EMAIL)) ? true : false;
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}
	
	const handleSignIn = () => {
		let details = {
			email: email,
			password: password,
		};

		fetchApi<{ user: user, token: string }>(
			constants.URL + constants.URI_SIGNIN,
			constants.POST_METHOD,
			details
		).then(({ user, token }) => {
			props.dispatch(actionUser_signin(token));
			history.push(constants.SEARCH_ROUTE);
			handleClose()
		}).catch((error) => {
			setEmailError(true)
			setPasswordError(true)
		});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Sign in
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Sign in</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Email Address"
							type="email"
							variant="filled"
							fullWidth
							value={email}
							onChange={handleEmail}
							error={emailError}
							helperText={emailError && constants.EMAIL_HELPER_ERROR}
							onBlur={handleBlurEmail}
						/>
						<TextField
							margin="dense"
							label="Password"
							type="password"
							variant="filled"
							fullWidth
							value={password}
							error={passwordError}
							helperText={passwordError && constants.PASSWORD_HELPER_ERROR}
							onChange={handlePassword}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<ForgotPasswordDialog />
						<Button onClick={handleSignIn} type="submit" color="primary">
							Sign in
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const SignInDialog = withReduxProps(SignInDialogComponent);
