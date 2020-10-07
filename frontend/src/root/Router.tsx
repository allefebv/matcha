/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Router.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 19:04:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/07 18:33:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { LandingPage } from "./LandingPage";
import { MainPage } from "./MainPage";
import { AccountSettingsPage } from "./AccountSettingsPage";
import { Switch, Route } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { PrivateRoute } from "../component/PrivateRoute";
import * as constants from "../services/constants";
import { UserProfilePage } from "./UserProfilePage";
import { ProfileCreationPage } from "./ProfileCreationPage";
import { ActivateAccountPage } from "./ActivateAccountPage";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

export class RouterComponent extends React.Component<Props> {
	render() {
		return (
			<Switch>
				<Route exact path={constants.LANDING_ROUTE} component={LandingPage} />
				<Route
					exact
					path={constants.ACCOUNT_ACTIVATION_ROUTE}
					component={ActivateAccountPage}
				></Route>
				<PrivateRoute path={constants.SEARCH_ROUTE} component={MainPage} />
				<PrivateRoute
					path={constants.ACCOUNT_SETTINGS_ROUTE}
					component={AccountSettingsPage}
				/>
				<PrivateRoute
					path={constants.USER_PROFILE_ROUTE}
					component={UserProfilePage}
				/>
				<Route
					path={constants.PROFILE_CREATION_ROUTE}
					component={ProfileCreationPage}
				/>
			</Switch>
		);
	}
}

export const Router = withReduxProps(RouterComponent);
