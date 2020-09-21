import React from "react";
import { LandingPage } from "./LandingPage";
import { MainPage } from "./MainPage";
import { BrowserRouter, Switch, Route, Link, Router } from "react-router-dom";
import { createStore } from "redux";
import { rootReducer } from "../store/rootReducer";

const styleApp: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	background:
		"radial-gradient(circle, transparent, rgba(0,0,0,0.6)50%, rgba(0,0,0,1) 100%)",
	zIndex: 0,
};

export class App extends React.Component {
	render() {
		return (
			<div style={styleApp}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/landing" component={LandingPage} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}
