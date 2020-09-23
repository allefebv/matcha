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

type Props = {}

export function SignUpDialog(props: Props) {
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
	}

	const handleSignUp = () => {
		let details = {
			email: "jeremy0@fleury.blueee",
            password: "@Matcha1234",
		};

		fetchApi<{ user: Object; token: string }>(
			constants.URL + constants.URI_SIGNUP,
			constants.POST_METHOD,
			details
		).then(({ user, token }) => {
			console.log("signedUp")
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
							fullWidth
						/>
						<TextField
							margin="dense"
							label="Password"
							type="password"
							fullWidth
						/>
						<TextField
							margin="dense"
							label="Confirm Password"
							type="password"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<ForgotPasswordDialog />
						<Button onClick={handleSignUp} type="submit" color="primary">
							Sign up
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
