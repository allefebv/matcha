/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModifyEmailDialog.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 21:08:26 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect, ConnectedProps } from "react-redux";
import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
	user: state.user.signin.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ModifyEmailDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState(props.user.email);
	const [emailError, setEmailError] = useState(false);
	let [password, setPassword] = useState<string | null>("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPassword("");
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	}

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		setEmailError(!isEmailValid(e.currentTarget.value));
	}

	function isEmailValid(email: string | null) {
		return typeof email === "string" && email.match(constants.REGEX_EMAIL);
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const handleChangeEmail = () => {
		let details = {
			email: email,
			password: password,
		};

		fetchApi(constants.URL + constants.URI_UPDATE_EMAIL, {
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				Authorization: props.loggedIn,
			},
			body: details,
			credentials: "include",
		})
			.then(() => {})
			.catch((error) => {
				setEmailError(true);
			});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Modify Email
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Modify Email</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							label="Email Address"
							type="email"
							variant="filled"
							fullWidth
							value={email}
							onChange={handleEmail}
							error={emailError}
							helperText={emailError && constants.EMAIL_HELPER_ERROR}
						/>
						<TextField
							margin="dense"
							label="Password"
							type="password"
							variant="filled"
							fullWidth
							value={password}
							onChange={handlePassword}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={handleChangeEmail}
							type="submit"
							color="primary"
							disabled={!isEmailValid(email) || props.user.email === email}
						>
							Modify Email
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ModifyEmailDialog = withReduxProps(ModifyEmailDialogComponent);
