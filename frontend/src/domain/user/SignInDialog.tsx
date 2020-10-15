/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SignInDialog.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:07 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/14 22:27:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { getProfileAPI, signinAPI } from "../../services/apiCalls";
import * as constants from "../../services/constants";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_signin,
	actionUser_setProfile,
	actionUser_setTagList,
	actionUser_usagelocation,
} from "../../store/user/action";
import { actionUi_showSnackbar } from "../../store/ui/action";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function SignInDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	let [email, setEmail] = useState<string>("");
	let [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState<string>("");
	let [passwordError, setPasswordError] = useState(false);

	const handleClickOpen = () => {
		setEmailError(false);
		setPasswordError(false);
		setPassword("");
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPassword("");
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		isEmailValid(e.currentTarget.value) && setEmailError(false);
	}

	function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
		email !== "" && setEmailError(!isEmailValid(email));
	}

	function isEmailValid(email: string | null) {
		return typeof email === "string" && email.match(constants.REGEX_EMAIL)
			? true
			: false;
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const handleSignIn = () => {
		let details = {
			email: email,
			password: password,
		};
		signinAPI(details)
			.then(async ({ user, token }) => {
				if (user.activated) {
					const response: any = await getProfileAPI(token).catch((error) =>
						console.log(error.message)
					);
					if (response) {
						props.dispatch(
							actionUser_setProfile({ profile: response.profile })
						);
						props.dispatch(actionUser_setTagList({ tagList: response.tag }));
					}
					props.dispatch(actionUser_signin({ user, token }));
					props.dispatch(
						actionUser_usagelocation({ usagelocation: response.location })
					);
				} else {
					props.dispatch(
						actionUi_showSnackbar({
							message: "Please check your emails to activate your account",
							type: "error",
						})
					);
					handleClose();
				}
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({ message: error.message, type: "error" })
				);
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
						<Button
							disabled={!isEmailValid(email) || password === ""}
							onClick={handleSignIn}
							type="submit"
							color="primary"
						>
							Sign in
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const SignInDialog = withReduxProps(SignInDialogComponent);
