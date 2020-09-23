import React from "react";
import { Button } from "../component/Button";
import { AccountMenu } from "../component/AccountMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

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
	zIndex: 2,
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
type Props = {
	accountHandler?: (type: React.MouseEvent) => void;
} & ReduxProps;

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
								<Button theme="circle">
									<FontAwesomeIcon icon={faBell} />
								</Button>
								<Button theme="circle">
									<FontAwesomeIcon icon={faUser} />
								</Button>
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
