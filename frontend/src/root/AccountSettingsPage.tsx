/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountSettingsPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/09/24 14:31:02 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ModifyPasswordDialog } from "../component/ModifyPasswordDialog";
import { TextField } from "@material-ui/core";
import * as constants from "../services/constants"

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
			<Header />
			<TextField
				margin="dense"
				label="Email Address"
				type="email"
				fullWidth
				value={email}
				onChange={handleEmail}
				error={emailError}
				helperText={emailError && constants.EMAIL_HELPER_ERROR}
			/>
			<ModifyPasswordDialog />
			<Footer />
		</React.Fragment>
	);
};
