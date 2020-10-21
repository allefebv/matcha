/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 17:33:30 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { Router } from "./Router";
import { GlobalSnackbar } from "../../component/GlobalSnackbar";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const styleApp: React.CSSProperties = {
	backgroundColor: "grey",
	zIndex: -1,
	height: "100vh",
};

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
}));

const AppComponent = (props: Props) => {
	const classes = useStyles();
	//TODO: pas fou char A pour afficher div hauteur du header qui est en fixed
	return (
		<BrowserRouter>
			{/* <CssBaseline /> */}
			<Header />
			<div style={{ marginTop: 80, backgroundColor: "green" }}>
				<GlobalSnackbar />
				<Router />
			</div>
			{/* <Grid
					item
					container
					xs={12}
					style={{ height: "3%" }}
					justify="center"
					alignItems="center"
				>
					<Footer />
				</Grid> */}
		</BrowserRouter>
	);
};

export const App = withReduxProps(AppComponent);
