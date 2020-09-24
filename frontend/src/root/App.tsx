/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:18:09 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { LandingPage } from "./LandingPage";
import { MainPage } from "./MainPage";
import { AccountSettingsPage } from "./AccountSettingsPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { PrivateRoute } from "../component/PrivateRoute";
import * as constants from "../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

export class AppComponent extends React.Component<Props> {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path={constants.LANDING_ROUTE} component={AccountSettingsPage} />
					<PrivateRoute
						path={constants.SEARCH_ROUTE}
						isLogged={this.props.loggedIn}
						component={MainPage}
					/>
					<PrivateRoute
						path={constants.ACCOUNT_SETTINGS_ROUTE}
						isLogged={this.props.loggedIn}
						component={AccountSettingsPage}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export const App = withReduxProps(AppComponent);
