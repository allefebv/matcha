/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/05 17:14:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";

import { CssBaseline, Grid, makeStyles } from "@material-ui/core";

import { GlobalSnackbar } from "../../component/GlobalSnackbar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Router } from "./Router";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	search: state.profilesList.search,
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	main: {
		marginTop: 64,
		display: "flex",
		flexGrow: 1,
		height: "92vh",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "cyan",
	},
}));

export const socket = socketIOClient("http://127.0.0.1:3001", {
	autoConnect: false,
});

const AppComponent = (props: Props) => {
	const classes = useStyles();

	useEffect(() => {
		if (props.loggedIn) {
			socket.connect();
			socket.on("connect", () => {
				socket.emit("online", {
					id: props.profile.userId,
				});
			});
		}
	}, [props.loggedIn]);

	return (
		<BrowserRouter>
			{/* <CssBaseline /> */}
			<Header />
			<div className={classes.main}>
				<GlobalSnackbar />
				<Router />
			</div>
			{/* <Footer /> */}
		</BrowserRouter>
	);
};

export const App = withReduxProps(AppComponent);
