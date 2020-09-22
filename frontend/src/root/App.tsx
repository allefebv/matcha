import React from "react";
import { LandingPage } from "./LandingPage";
import { MainPage } from "./MainPage";
import { AccountSettingsPage } from "./AccountSettingsPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

const styleApp: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	background:
		"radial-gradient(circle, transparent, rgba(0,0,0,0.6)50%, rgba(0,0,0,1) 100%)",
	zIndex: 0,
};

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.login.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

export class AppComponent extends React.Component<Props> {
	toto = () => console.log(this.props.loggedIn)
	render() {
		this.toto()
		return (
			<div style={styleApp}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/search" component={MainPage} />
						<Route
							exact
							path="/account-settings"
							component={AccountSettingsPage}
						/>
						{this.props.loggedIn ? <Redirect to="/search" /> : <Redirect to="/" />}
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export const App = withReduxProps(AppComponent);
