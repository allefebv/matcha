import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LandingPage } from "./LandingPage";
import { MainPage } from "./MainPage";
import { FormInput } from "../component/FormInput"

const styleApp: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	backgroundColor: "black",
	zIndex: -1,
}

export class App extends React.Component {
	render() {
		return (
			<div style={styleApp}>
				<Header />
				{/* <LandingPage /> */}
				<MainPage />
				<Footer />
			</div>
		);
	}
}