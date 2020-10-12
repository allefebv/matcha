/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountSettingsPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/10/12 16:11:19 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { ModifyPasswordDialog } from "../user/ModifyPasswordDialog";
import { DeleteAccountDialog } from "../user/DeleteAccountDialog";
import { Grid } from "@material-ui/core";

import { connect, ConnectedProps } from "react-redux";
import { ModifyEmailDialog } from "../user/ModifyEmailDialog";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const AccountSettingsPageComponent = (props: Props) => {
	return (
		<React.Fragment>
			<Grid
				item
				container
				xs={8}
				md={6}
				lg={3}
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
