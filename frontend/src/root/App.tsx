/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 20:43:02 by allefebv         ###   ########.fr       */
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
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Grid } from "@material-ui/core";
import { UserProfilePage } from "./UserProfilePage";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const styleApp: React.CSSProperties = {
	backgroundColor: "black",
	zIndex: -1,
	height: "100vh",
};

export class AppComponent extends React.Component<Props> {
	render() {
		return (
			<BrowserRouter>
				<Grid container alignContent="stretch" justify="center" alignItems="center" style={styleApp}>
					<Grid item container xs={12} style={{height: "6%", zIndex:10}} justify="space-between">
						<Header />
					</Grid>
					<Grid item container xs={12} style={{height: "90%"}} justify="center" alignItems="center">
						<Switch>
							<Route
								exact
								path={constants.LANDING_ROUTE}
								component={this.props.loggedIn ? MainPage : LandingPage}
							/>
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
							<PrivateRoute
								path={constants.USER_PROFILE_ROUTE}
								isLogged={this.props.loggedIn}
								component={UserProfilePage}
							/>
						</Switch>
					</Grid>
					<Grid item container xs={12} style={{height: "4%"}} justify="center" alignItems="center">
						<Footer />
					</Grid>
				</Grid>
			</BrowserRouter>
		);
	}
}

export const App = withReduxProps(AppComponent);
