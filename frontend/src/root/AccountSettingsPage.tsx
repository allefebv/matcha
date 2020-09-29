/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountSettingsPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/09/28 21:02:31 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { ModifyPasswordDialog } from "../component/ModifyPasswordDialog";
import { DeleteAccountDialog } from "../component/DeleteAccountDialog";
import { Button, Grid, TextField } from "@material-ui/core";
import * as constants from "../services/constants";

import { connect, ConnectedProps } from "react-redux";
import { fetchApi } from "../services/fetchApi";
import { ModifyEmailDialog } from "../component/ModifyEmailDialog";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
	user: state.user.signin.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const AccountSettingsPageComponent = (props: Props) => {
	return (
		<React.Fragment>
			<Grid
				item
				container
				xs={3}
				style={{ height: "100%" }}
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Grid item>
					<ModifyEmailDialog />
				</Grid>
				<Grid item>
					<ModifyPasswordDialog />
				</Grid>
				<Grid item>
					<DeleteAccountDialog />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export const AccountSettingsPage = withReduxProps(AccountSettingsPageComponent);
