/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DeleteAccountDialog.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 12:36:28 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";

type Props = {};

export function DeleteAccountDialog(props: Props) {
	const [open, setOpen] = useState(false);
	const [confirmation, setConfirmation] = useState("");
	const [confirmationError, setConfirmationError] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	}

	function handleConfirmation(e: React.ChangeEvent<HTMLInputElement>) {
		setConfirmation(e.currentTarget.value);
		setConfirmationError(!isConfirmationValid(e.currentTarget.value));
	}

	function isConfirmationValid(confirmation: string | null) {
		return confirmation === "DELETE";
	}

	const handleDeleteAccount = () => {
		fetchApi<{ user: Object; token: string }>(
			constants.URL + constants.URI_DELETE_ACCOUNT,
			constants.POST_METHOD
		).then(({ user, token }) => {});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Delete Account
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							label="DELETE"
							type="text"
							variant="filled"
							fullWidth
							value={confirmation}
							onChange={handleConfirmation}
							error={confirmationError}
							helperText={constants.DELETE_HELPER_TEXT}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleDeleteAccount} type="submit" color="primary">
							Confirm
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
