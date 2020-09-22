import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Button } from "../component/Button";

export const AccountSettingsPage = () => {
	return (
		<React.Fragment>
			<Header />
			<Button theme="big">Modify Password</Button>
			<Button theme="big">Delete Account</Button>
			<Footer />
		</React.Fragment>
	);
};
