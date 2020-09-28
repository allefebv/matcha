/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:11 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 12:00:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { Button } from "../component/Button";
import { AccountMenu } from "../component/AccountMenu";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

import { SignInDialog } from "../component/SignInDialog";
import { SignUpDialog } from "../component/SignUpDialog";

import * as constants from "../services/constants"

const styleHeader: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100vw",
	height: "8vh",
	backgroundColor: "transparent",
	zIndex: 10,
};

const styleNavStart: React.CSSProperties = {
	display: "flex",
	justifyContent: "flex-end",
	margin: "2vh",
};

const styleNavEnd: React.CSSProperties = {
	display: "flex",
	justifyContent: "flex-end",
};

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

class HeaderComponent extends React.Component<Props> {
	render() {
		const isDesktop = window.innerWidth > 480;
		return (
			<div style={styleHeader}>
				<div style={styleNavStart}>
					<Link to={this.props.loggedIn ? constants.SEARCH_ROUTE : constants.LANDING_ROUTE}>
						<Button theme="logo"></Button>
					</Link>
				</div>
				{isDesktop && (
					<div style={styleNavEnd}>
						{!this.props.loggedIn && (
							<React.Fragment>
								<SignInDialog />
								<SignUpDialog />
							</React.Fragment>
						)}
						{this.props.loggedIn && (
							<React.Fragment>
								<IconButton>
									<NotificationsIcon color="primary" />
								</IconButton>
								<IconButton>
									<PersonIcon color="primary" />
								</IconButton>
								<AccountMenu></AccountMenu>
							</React.Fragment>
						)}
					</div>
				)}
			</div>
		);
	}
}

export const Header = withReduxProps(HeaderComponent);
