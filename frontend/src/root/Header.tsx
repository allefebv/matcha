/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:11 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/30 15:22:50 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { Button, Grid } from "@material-ui/core";
import { AccountMenu } from "../component/AccountMenu";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import { SignInDialog } from "../component/SignInDialog";
import { SignUpDialog } from "../component/SignUpDialog";
import * as constants from "../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

class HeaderComponent extends React.Component<Props> {
	render() {
		const isDesktop = window.innerWidth > 480;
		return (
			<React.Fragment>
				<Grid item xs={2} style={{ height: "100%" }}>
					<Link
						to={
							this.props.loggedIn
								? constants.SEARCH_ROUTE
								: constants.LANDING_ROUTE
						}
					>
						<img
							src={require("../images/logo_white.png")}
							style={{ height: "100%" }}
						/>
					</Link>
				</Grid>
				{isDesktop && (
					<Grid item container xs={2} justify="flex-end" alignItems="center">
						{!this.props.loggedIn && (
							<React.Fragment>
								<Grid item>
									<SignInDialog />
								</Grid>
								<Grid item>
									<SignUpDialog />
								</Grid>
							</React.Fragment>
						)}
						{this.props.loggedIn && (
							<React.Fragment>
								<IconButton>
									<NotificationsIcon color="primary" />
								</IconButton>
								<Link
									to={"/my-profile"}
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									<IconButton>
										<PersonIcon color="primary" />
									</IconButton>
								</Link>

								<AccountMenu></AccountMenu>
							</React.Fragment>
						)}
					</Grid>
				)}
			</React.Fragment>
		);
	}
}

export const Header = withReduxProps(HeaderComponent);
