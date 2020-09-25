/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ForgotPasswordDialog.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:44 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 16:14:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect, ConnectedProps } from "react-redux";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ForgotPasswordDialogComponent(props: Props) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	};

	return (
		<div>
			<Button color="primary" onClick={handleClickOpen}>
				Forgot password
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Forgot password</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Email Address"
							type="email"
							variant="filled"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Reset password
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ForgotPasswordDialog = withReduxProps(ForgotPasswordDialogComponent);