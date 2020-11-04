/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:11 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/04 15:26:08 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";

import {
	AppBar,
	Button,
	makeStyles,
	MenuItem,
	Toolbar,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";

import * as constants from "../../services/constants";
import { AccountMenu } from "../user/AccountMenu";
import { SignInDialog } from "../user/SignInDialog";
import { SignUpDialog } from "../user/SignUpDialog";
import { NotificationsMenu } from "./NotificationsMenu";
import { socket } from "./App";
import { getNotificationsAPI } from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";

const useStyles = makeStyles({
	appBar: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		flex: 1,
		margin: 0,
	},
	menuOptions: {
		display: "flex",
	},
	logo: {
		display: "flex",
		justifySelf: "flex-start",
	},
	accountMenu: {
		display: "flex",
		justifySelf: "end",
	},
});

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	username: state.user.profile.username,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const HeaderComponent = (props: Props) => {
	const classes = useStyles();
	const [notifications, setNotifications] = useState<any[]>([]);
	const ref = useRef(notifications);

	function updateNotifications(notifications: any[]) {
		ref.current = notifications;
		setNotifications(notifications);
	}

	function pushNotification(notification: {
		notifierProfile: Object;
		notification: {
			notification: string;
			isRead: number;
			date: number;
		};
	}) {
		const tmp = [...ref.current];
		tmp.unshift(notification);
		updateNotifications(tmp);
	}

	useEffect(() => {
		props.loggedIn &&
			getNotificationsAPI(props.loggedIn)
				.then((json) => {
					json && json.length && updateNotifications(json);
				})
				.catch((error) => {
					props.dispatch(
						actionUi_showSnackbar({
							message: error.message,
							type: "error",
						})
					);
					console.log(error.message);
				});
		socket.on("notification" + props.username, pushNotification);
		console.log("logged in / mount ?");
	}, [props.loggedIn]);

	return (
		<React.Fragment>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.appBar}>
					<div className={classes.logo}>
						<Link
							to={
								props.loggedIn
									? constants.SEARCH_ROUTE
									: constants.LANDING_ROUTE
							}
						>
							<img
								src={require("../../images/logo_white.png")}
								style={{ maxWidth: 100 }}
								alt="logo"
							/>
						</Link>
					</div>

					{props.loggedIn && (
						<div className={classes.menuOptions}>
							<Link
								to={"/chat"}
								style={{ color: "inherit", textDecoration: "inherit" }}
							>
								<Button startIcon={<ChatIcon />}>CHAT</Button>
							</Link>
							<Link
								to={"/search"}
								style={{ color: "inherit", textDecoration: "inherit" }}
							>
								<Button startIcon={<FavoriteIcon />}>EXPLORE</Button>
							</Link>
						</div>
					)}
					{!props.loggedIn && (
						<div className={classes.accountMenu}>
							<SignInDialog />
							<SignUpDialog />
						</div>
					)}
					{props.loggedIn && (
						<div className={classes.accountMenu}>
							<NotificationsMenu notifications={ref.current} />
							<Link
								to={"/my-profile"}
								style={{ color: "inherit", textDecoration: "inherit" }}
							>
								<IconButton>
									<PersonIcon />
								</IconButton>
							</Link>
							<AccountMenu />
						</div>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export const Header = withReduxProps(HeaderComponent);
