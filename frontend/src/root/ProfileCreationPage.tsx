/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCreationPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/10/12 15:51:19 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { Grid } from "@material-ui/core";

import { MandatoryProfileStepper } from "../component/MandatoryProfileStepper";
import { Redirect } from "react-router-dom";
import * as constants from "../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ProfileCreationPageComponent = (props: Props) => {
	const [redirect, setRedirect] = useState<string | null>(null);

	useEffect(() => {
		if (props.loggedIn === false) {
			setRedirect(constants.LANDING_ROUTE);
		}
	}, [props.loggedIn]);

	if (redirect !== null) {
		return <Redirect to={redirect} />;
	} else {
		return (
			<React.Fragment>
				<Grid
					item
					container
					xs={8}
					md={6}
					lg={3}
					justify="center"
					alignItems="center"
				>
					<MandatoryProfileStepper />
				</Grid>
			</React.Fragment>
		);
	}
};

export const ProfileCreationPage = withReduxProps(ProfileCreationPageComponent);
