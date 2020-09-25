/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountSettingsPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/09/25 12:36:53 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { ModifyPasswordDialog } from "../component/ModifyPasswordDialog";
import { DeleteAccountDialog } from "../component/DeleteAccountDialog";
import { TextField } from "@material-ui/core";
import * as constants from "../services/constants";

const stylePlaceHolder: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "20vw",
	height: "30vh",
	backgroundColor: "grey",
};

export const AccountSettingsPage = () => {
	const [email, setEmail] = useState("toto@toto.com");
	const [emailError, setEmailError] = useState(false);

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		isEmailValid(e.currentTarget.value) && setEmailError(false);
	}

	function isEmailValid(email: string | null) {
		return typeof email === "string" && email.match(constants.REGEX_EMAIL)
			? true
			: false;
	}

	return (
		<React.Fragment>
			<div style={stylePlaceHolder}>
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
				<ModifyPasswordDialog />
				<DeleteAccountDialog />
			</div>
		</React.Fragment>
	);
};
