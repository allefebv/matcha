import React from "react";
import { Button } from "../component/Button";
import { ModalToggler } from "../component/ModalToggler";
import { Form } from "../component/Form";
import { SigninForm } from "../component/SigninForm";
import { SignupForm } from "../component/SignupForm";
import { ForgotPasswordForm } from "../component/ForgotPasswordForm";

const styleLanding: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-end",
	justifyContent: "center",
	width: "100vw",
	height: "90vh",
};

const styleImg: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
	zIndex: -1,
	objectFit: "none",
};

const stylePlaceHolder: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "50vw",
	height: "30vh",
};

interface Props {}

export class LandingPage extends React.Component<Props> {
	bg = require("../images/background2.jpg");
	render() {
		const isMobile = window.innerWidth < 480;
		return (
			<div style={styleLanding}>
				<img src={this.bg} style={styleImg}></img>
				{isMobile && (
					<div style={stylePlaceHolder}>
						<Button theme="big">Sign in</Button>
						<Button theme="big">Sign up</Button>
					</div>
				)}
				<ModalToggler>
					<Form title="Sign In" submitValue="Sign In">
						<SigninForm />
					</Form>
				</ModalToggler>
			</div>
		);
	}
}
