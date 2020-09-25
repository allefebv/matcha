/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModifyPasswordDialog.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 16:08:48 by allefebv         ###   ########.fr       */
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

function ModifyPasswordDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
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
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
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

	const handleModifyPassword = () => {
		let details = {
			password: password,
		};

		fetchApi<{ user: Object; token: string }>(
			constants.URL + constants.URI_MODIFY_PASSWORD,
			{
				method: constants.POST_METHOD,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
					Authorization: props.loggedIn,
				},
				credentials: "include",
				body: details
			}
		).then(({ user, token }) => {
		});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Modify Password
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Modify Password</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							label="New password"
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
							label="Confirm new password"
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
						<Button onClick={handleModifyPassword} type="submit" color="primary">
							Confirm
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ModifyPasswordDialog = withReduxProps(ModifyPasswordDialogComponent)