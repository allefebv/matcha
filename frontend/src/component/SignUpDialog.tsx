/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SignUpDialog.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 11:13:23 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { user } from "../types/types";

import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";

type Props = {};

export function SignUpDialog(props: Props) {
	const [open, setOpen] = useState(false);
	let [email, setEmail] = useState<string | null>("");
	let [emailError, setEmailError] = useState(false);
	let [password, setPassword] = useState<string | null>("");
	let [passwordError, setPasswordError] = useState(false);
	let [passwordConfirm, setPasswordConfirm] = useState<string | null>("");
	let [passwordConfirmError, setPasswordConfirmError] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPassword("");
		setPasswordConfirm("");
		setPasswordError(false);
		setPasswordConfirmError(false);
		setEmailError(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		isEmailValid(e.currentTarget.value) && setEmailError(false);
	}

	function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
		setEmailError(!isEmailValid(email));
	}

	function isEmailValid(email: string | null) {
		return typeof email === "string" && email.match(constants.REGEX_EMAIL)
			? true
			: false;
	}

	async function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
		setPasswordError(!isPasswordValid(e.currentTarget.value));
	}

	function handlePasswordConfirm(e: React.ChangeEvent<HTMLInputElement>) {
		setPasswordConfirm(e.currentTarget.value);
		setPasswordConfirmError(!arePasswordsIdentical(e.currentTarget.value));
	}

	function isPasswordValid(password: string | null) {
		return typeof password === "string" &&
			password.match(constants.REGEX_PASSWORD)
			? true
			: false;
	}

	function arePasswordsIdentical(passwordConfirm: string | null) {
		return password === passwordConfirm;
	}

	const handleSignUp = () => {
		let details = {
			email: email,
			password: password,
		};

		fetchApi<{ user: user; token: string }>(
			constants.URL + constants.URI_SIGNUP,
			constants.POST_METHOD,
			details
		).then(({ user, token }) => {
			handleClose();
		}).catch(error => {
			setEmailError(true);
			setPasswordError(true);
			setPasswordConfirmError(true);
		});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Sign up
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Sign up</DialogTitle>
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
							onChange={handlePassword}
							error={passwordError}
							helperText={passwordError && constants.PASSWORD_HELPER_ERROR}
						/>
						<TextField
							margin="dense"
							label="Confirm Password"
							type="password"
							variant="filled"
							fullWidth
							value={passwordConfirm}
							onChange={handlePasswordConfirm}
							error={passwordConfirmError}
							helperText={
								passwordConfirmError && constants.PASSWORD_CONFIRM_HELPER_ERROR
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
						disabled={!isEmailValid(email) || !isPasswordValid(password) || !arePasswordsIdentical(passwordConfirm)} 
						onClick={handleSignUp} type="submit" color="primary">
							Sign up
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
