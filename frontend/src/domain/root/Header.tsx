/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:11 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 15:36:39 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import { AccountMenu } from "../user/AccountMenu";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import { SignInDialog } from "../user/SignInDialog";
import { SignUpDialog } from "../user/SignUpDialog";
import * as constants from "../../services/constants";
import { ToggleGroup } from "../../component/ToggleGroup";

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
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const HeaderComponent = (props: Props) => {
	const classes = useStyles();

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
							<Button startIcon={<ChatIcon />}>CHAT</Button>
							<Button startIcon={<FavoriteIcon />}>EXPLORE</Button>
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
							<IconButton>
								<NotificationsIcon />
							</IconButton>
							<Link
								to={"/my-profile"}
								style={{ color: "inherit", textDecoration: "inherit" }}
							>
								<IconButton>
									<PersonIcon />
								</IconButton>
							</Link>
							<AccountMenu></AccountMenu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export const Header = withReduxProps(HeaderComponent);
