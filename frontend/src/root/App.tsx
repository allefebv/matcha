/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 12:37:35 by allefebv         ###   ########.fr       */
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
import { FilledInput } from "@material-ui/core";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const styleApp: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "black",
	zIndex: -1
};

const styleContent: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	flexGrow: 1,
	flexBasis: "fill",
	width: "100%"
};

export class AppComponent extends React.Component<Props> {
	render() {
		return (
			<div style={styleApp}>
				<BrowserRouter>
					<Header />
					<div style={styleContent}>
						<Switch>
							<Route
								exact
								path={constants.LANDING_ROUTE}
								component={LandingPage}
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
						</Switch>
					</div>
					<Footer />
				</BrowserRouter>
			</div>
		);
	}
}

export const App = withReduxProps(AppComponent);
