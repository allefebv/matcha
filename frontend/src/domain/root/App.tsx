/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 10:30:56 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Grid, Paper } from "@material-ui/core";
import { Router } from "./Router";
import { GlobalSnackbar } from "../../component/GlobalSnackbar";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const styleApp: React.CSSProperties = {
	backgroundColor: "black",
	zIndex: -1,
	height: "100vh",
};

const AppComponent = (props: Props) => {
	return (
		<BrowserRouter>
			<Grid
				container
				alignContent="stretch"
				justify="center"
				alignItems="center"
				style={styleApp}
			>
				<Grid
					item
					xs={11}
					container
					style={{ height: "8%", zIndex: 10 }}
					justify="space-between"
				>
					<Header />
				</Grid>
				<Grid
					item
					container
					xs={12}
					style={{ height: "89%" }}
					justify="center"
					alignItems="center"
				>
					<GlobalSnackbar />
					<Router />
				</Grid>
				<Grid
					item
					container
					xs={12}
					style={{ height: "3%" }}
					justify="center"
					alignItems="center"
				>
					<Footer />
				</Grid>
			</Grid>
		</BrowserRouter>
	);
};

export const App = withReduxProps(AppComponent);
